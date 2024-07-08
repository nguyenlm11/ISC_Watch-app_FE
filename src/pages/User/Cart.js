import React, { useState, useEffect } from "react";
import { Button, Table, InputNumber, message } from "antd";
import { useNavigate } from "react-router-dom";

const CartPage = () => {
    const [cart, setCart] = useState([]);
    const [total, setTotal] = useState(0);
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

    const handleCheckout = () => {
        if (!cart.length) {
            message.error("Your cart is empty");
            return;
        }
        navigate('/checkout');
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
            title: 'Image',
            dataIndex: ['watch', 'image'],
            key: 'image',
            render: (image) => <img src={image} alt="Watch" style={{ width: '100px', height: '100px', objectFit: 'cover' }} />,
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
            <h2 style={{ fontSize: "24px", fontWeight: "bold" }}>Cart</h2>
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
            <Button type="primary" onClick={handleCheckout} disabled={!cart.length} style={{ marginTop: "20px" }}>
                Proceed to Checkout
            </Button>
        </div>
    );
};

export default CartPage;
