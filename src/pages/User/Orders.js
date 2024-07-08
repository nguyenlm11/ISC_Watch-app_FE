import React, { useEffect, useState } from 'react';
import { Table, Button, message, Modal, Form, Input, Typography } from 'antd';
import orderApi from '../../api/orderApi';

const { Title } = Typography;

const Orders = () => {
    const [orders, setOrders] = useState([]);
    const [editingOrder, setEditingOrder] = useState(null);
    const [form] = Form.useForm();

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await orderApi.getOrdersByMember();
                setOrders(response.data);
            } catch (error) {
                console.error('Failed to fetch orders:', error);
            }
        };

        fetchOrders();
    }, []);

    const handleCancelOrder = async (orderId) => {
        try {
            await orderApi.cancelOrder(orderId);
            setOrders(orders.map(order => order._id === orderId ? { ...order, status: 'Cancelled' } : order));
            message.success('Order cancelled successfully');
        } catch (error) {
            message.error('Failed to cancel order');
        }
    };

    const handleEditOrder = (order) => {
        setEditingOrder(order);
    };

    const handleUpdateOrder = async () => {
        try {
            const values = form.getFieldsValue();
            await orderApi.updateOrder(editingOrder._id, values);
            setOrders(orders.map(order => order._id === editingOrder._id ? { ...order, ...values } : order));
            setEditingOrder(null);
            message.success('Order updated successfully');
        } catch (error) {
            message.error('Failed to update order');
        }
    };

    const handleDeleteOrder = async (orderId) => {
        try {
            await orderApi.deleteOrder(orderId);
            setOrders(orders.filter(order => order._id !== orderId));
            message.success('Order deleted successfully');
        } catch (error) {
            message.error('Failed to delete order');
        }
    };

    const columns = [
        { title: 'Order ID', dataIndex: '_id', key: '_id' },
        { title: 'Total', dataIndex: 'total', key: 'total', render: (total) => `$${total}` },
        { title: 'Status', dataIndex: 'status', key: 'status' },
        { title: 'Date', dataIndex: 'createdAt', key: 'createdAt', render: (date) => new Date(date).toLocaleDateString() },
        { title: 'Full Name', dataIndex: ['deliveryInfo', 'name'], key: 'fullName' },
        { title: 'Address', dataIndex: ['deliveryInfo', 'address'], key: 'address' },
        { title: 'Phone Number', dataIndex: ['deliveryInfo', 'phoneNumber'], key: 'phoneNumber' },
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
                    {record.status === 'Pending' && (
                        <>
                            <Button type="link" danger onClick={() => handleCancelOrder(record._id)}>
                                Cancel Order
                            </Button>
                            <Button type="link" onClick={() => handleEditOrder(record)}>
                                Edit Order
                            </Button>
                        </>
                    )}
                    {record.status === 'Cancelled' && (
                        <Button type="link" danger onClick={() => handleDeleteOrder(record._id)}>
                            Delete Order
                        </Button>
                    )}
                </>
            ),
        },
    ];

    return (
        <div style={{ padding: '20px' }}>
            <Title level={2}>My Orders</Title>
            <Table dataSource={orders} columns={columns} rowKey="_id" />

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
                    initialValues={editingOrder}
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

export default Orders;
