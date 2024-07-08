import React, { useState, useEffect } from 'react';
import { Table, Select, Button, Modal, Input, Form, message, Card, Space, Typography } from 'antd';
import orderApi from '../../api/orderApi';

const { Option } = Select;
const { Title } = Typography;

const OrderManagementPage = () => {
    const [orders, setOrders] = useState([]);
    const [creatingOrder, setCreatingOrder] = useState(false);
    const [editingOrder, setEditingOrder] = useState(null);
    const [form] = Form.useForm();

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        try {
            const response = await orderApi.getAllOrders();
            setOrders(response.data);
        } catch (error) {
            console.error('Error fetching orders:', error);
        }
    };

    const handleStatusChange = async (orderId, status) => {
        try {
            await orderApi.updateOrderStatus(orderId, status);
            message.success('Order status updated successfully');
            fetchOrders(); // Fetch orders again to reflect changes
        } catch (error) {
            console.error('Error updating order status:', error);
            message.error('Failed to update order status');
        }
    };

    const handleCreateOrder = async () => {
        try {
            const values = form.getFieldsValue();
            await orderApi.createOrder(values);
            message.success('Order created successfully');
            fetchOrders(); // Fetch orders again to reflect changes
            setCreatingOrder(false);
            form.resetFields();
        } catch (error) {
            console.error('Error creating order:', error);
            message.error('Failed to create order');
        }
    };

    const handleEditOrder = (order) => {
        setEditingOrder(order);
        form.setFieldsValue(order);
    };

    const handleUpdateOrder = async () => {
        try {
            const values = form.getFieldsValue();
            await orderApi.updateOrder(editingOrder._id, values);
            message.success('Order updated successfully');
            fetchOrders(); // Fetch orders again to reflect changes
            setEditingOrder(null);
            form.resetFields();
        } catch (error) {
            console.error('Error updating order:', error);
            message.error('Failed to update order');
        }
    };

    const handleDeleteOrder = async (orderId) => {
        try {
            await orderApi.deleteOrder(orderId);
            setOrders(orders.filter(order => order._id !== orderId));
            message.success('Order deleted successfully');
        } catch (error) {
            console.error('Error deleting order:', error);
            message.error('Failed to delete order');
        }
    };

    const columns = [
        { title: 'Order ID', dataIndex: '_id', key: '_id' },
        { title: 'Member Name', dataIndex: ['member', 'membername'], key: 'membername' },
        { title: 'Full Name', dataIndex: ['deliveryInfo', 'name'], key: 'fullName' },
        { title: 'Address', dataIndex: ['deliveryInfo', 'address'], key: 'address' },
        { title: 'Phone Number', dataIndex: ['deliveryInfo', 'phoneNumber'], key: 'phoneNumber' },
        { title: 'Status', dataIndex: 'status', key: 'status',
            render: (text, record) => (
                <Select defaultValue={text} onChange={(value) => handleStatusChange(record._id, value)}>
                    <Option value="Pending">Pending</Option>
                    <Option value="Confirmed">Confirmed</Option>
                    <Option value="Shipped">Shipped</Option>
                    <Option value="Delivered">Delivered</Option>
                </Select>
            )
        },
        { title: 'Total', dataIndex: 'total', key: 'total', render: (total) => `$${total}` },
        {
            title: 'Items', dataIndex: 'items', key: 'items',
            render: (items) => (
                <ul>
                    {items.map(item => (
                        <li key={item.watch._id} style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                            <img src={item.watch.image} alt={item.watch.watchName} style={{ width: '50px', height: '50px', objectFit: 'cover', marginRight: '10px' }} />
                            <span>{item.watch.watchName} - Quantity: {item.quantity}</span>
                        </li>
                    ))}
                </ul>
            )
        },
        {
            title: 'Actions',
            key: 'actions',
            render: (_, record) => (
                <>
                    <Button type="link" onClick={() => handleEditOrder(record)}>
                        Edit
                    </Button>
                    <Button type="link" danger onClick={() => handleDeleteOrder(record._id)}>
                        Delete
                    </Button>
                </>
            ),
        },
    ];

    return (
        <div style={{ padding: '20px' }}>
            <Card>
                <Space direction="vertical" size="large" style={{ display: 'flex' }}>
                    <Title level={2}>Order Management</Title>
                    
                    <Table dataSource={orders} columns={columns} rowKey="_id" />
                </Space>
            </Card>

           

            {/* Edit Order Modal */}
            <Modal
                title="Edit Order"
                visible={!!editingOrder}
                onOk={handleUpdateOrder}
                onCancel={() => setEditingOrder(null)}
                okText="Update Order"
                cancelText="Cancel"
            >
                <Form
                    form={form}
                    layout="vertical"
                >
                    <Form.Item label="Full Name" name={['deliveryInfo', 'name']}>
                        <Input />
                    </Form.Item>
                    <Form.Item label="Address" name={['deliveryInfo', 'address']}>
                        <Input />
                    </Form.Item>
                    <Form.Item label="Phone Number" name={['deliveryInfo', 'phoneNumber']}>
                        <Input />
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

export default OrderManagementPage;
