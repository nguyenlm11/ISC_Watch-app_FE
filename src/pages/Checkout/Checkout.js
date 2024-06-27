import React, { useState, useEffect } from "react";
import { Button, Table, InputNumber, Select, Form, Input, message } from "antd";
import { useNavigate } from "react-router-dom";
import orderApi from "../../api/orderApi";

const { Option } = Select;

const CheckoutPage = () => {
    const [cart, setCart] = useState([]);
    const [total, setTotal] = useState(0);
    const [name, setName] = useState("");
    const [address, setAddress] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [form] = Form.useForm();
    const navigate = useNavigate();

    useEffect(() => {
        const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
        setCart(cartItems);
        calculateTotal(cartItems);
    }, []);

    const calculateTotal = (items) => {
        const totalAmount = items.reduce((acc, item) => acc + item.watch.price * item.quantity, 0);
        setTotal(totalAmount);
    };

    const handleQuantityChange = (index, quantity) => {
        const newCart = [...cart];
        newCart[index].quantity = quantity;
        setCart(newCart);
        localStorage.setItem('cart', JSON.stringify(newCart));
        calculateTotal(newCart);
    };

    const handleRemoveItem = (index) => {
        const newCart = [...cart];
        newCart.splice(index, 1);
        setCart(newCart);
        localStorage.setItem('cart', JSON.stringify(newCart));
        calculateTotal(newCart);
    };

    const handleSubmit = async (values) => {
        try {
            const orderItems = cart.map(item => ({
                watch: item.watch._id,
                quantity: item.quantity
            }));

            const orderData = {
                items: orderItems,
                paymentMethod: values.paymentMethod,
                deliveryInfo: {
                    name,
                    address,
                    phoneNumber
                }
            };

            const response = await orderApi.createOrder(orderData);
            message.success("Order placed successfully!");
            localStorage.removeItem('cart');
            navigate('/checkout-success');
        } catch (error) {
            message.error("Failed to place order. Please try again.");
        }
    };

    const columns = [
        {
            title: 'Watch',
            dataIndex: ['watch', 'watchName'],
            key: 'watchName',
        },
        {
            title: 'Brand',
            dataIndex: ['watch', 'brand', 'brandName'],
            key: 'brandName',
        },
        {
            title: 'Price',
            dataIndex: ['watch', 'price'],
            key: 'price',
            render: (price) => `$${price}`,
        },
        {
            title: 'Quantity',
            key: 'quantity',
            render: (text, record, index) => (
                <InputNumber
                    min={1}
                    value={record.quantity}
                    onChange={(value) => handleQuantityChange(index, value)}
                />
            ),
        },
        {
            title: 'Total',
            key: 'total',
            render: (text, record) => `$${record.watch.price * record.quantity}`,
        },
        {
            title: 'Actions',
            key: 'actions',
            render: (text, record, index) => (
                <Button danger onClick={() => handleRemoveItem(index)}>
                    Remove
                </Button>
            ),
        },
    ];

    return (
        <div style={{ padding: "20px" }}>
            <h2 style={{ fontSize: "24px", fontWeight: "bold" }}>Checkout</h2>
            <Table
                columns={columns}
                dataSource={cart}
                rowKey={(record) => record.watch._id}
                pagination={false}
                summary={() => (
                    <Table.Summary.Row>
                        <Table.Summary.Cell colSpan={4} align="right">
                            Total
                        </Table.Summary.Cell>
                        <Table.Summary.Cell colSpan={2}>
                            <strong>${total}</strong>
                        </Table.Summary.Cell>
                    </Table.Summary.Row>
                )}
            />
            <Form form={form} onFinish={handleSubmit} layout="vertical" style={{ marginTop: "20px" }}>
                <Form.Item name="name" label="Full Name" rules={[{ required: true, message: 'Please enter your full name!' }]}>
                    <Input placeholder="Enter your full name" onChange={(e) => setName(e.target.value)} />
                </Form.Item>
                <Form.Item name="address" label="Address" rules={[{ required: true, message: 'Please enter your address!' }]}>
                    <Input.TextArea placeholder="Enter your address" onChange={(e) => setAddress(e.target.value)} />
                </Form.Item>
                <Form.Item name="phoneNumber" label="Phone Number" rules={[{ required: true, message: 'Please enter your phone number!' }]}>
                    <Input placeholder="Enter your phone number" onChange={(e) => setPhoneNumber(e.target.value)} />
                </Form.Item>
                <Form.Item name="paymentMethod" label="Payment Method" rules={[{ required: true, message: 'Please select a payment method!' }]}>
                    <Select placeholder="Select payment method">
                        <Option value="Bank Transfer">Bank Transfer</Option>
                        <Option value="COD">Cash on Delivery (COD)</Option>
                    </Select>
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        Place Order
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default CheckoutPage;
