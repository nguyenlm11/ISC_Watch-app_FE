import React, { useEffect, useState } from 'react';
import { Form, Input, Button, InputNumber, Spin, Table, Typography, Row, Col, message } from 'antd';
import memberApi from '../../api/memberApi';
import orderApi from '../../api/orderApi';

const { Title } = Typography;

const Profile = () => {
    const [loading, setLoading] = useState(true);
    const [form] = Form.useForm();
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await memberApi.getProfile();
                form.setFieldsValue(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Failed to fetch profile:', error);
                setLoading(false);
            }
        };

        const fetchOrders = async () => {
            try {
                const response = await orderApi.getOrdersByMember();
                setOrders(response.data);
            } catch (error) {
                console.error('Failed to fetch orders:', error);
            }
        };

        fetchProfile();
        fetchOrders();
    }, [form]);

    const handleUpdateProfile = async () => {
        try {
            const values = form.getFieldsValue();
            await memberApi.updateProfile(values);
            message.success('Profile updated successfully');
        } catch (error) {
            message.error('Failed to update profile');
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
    ];

    if (loading) {
        return <Spin />;
    }

    return (
        <div style={{ padding: '20px' }}>
            <Title level={2}>My Profile</Title>
            <Row gutter={16}>
                <Col span={12}>
                    <Form form={form} layout="vertical">
                        <Form.Item label="Membername" name="membername">
                            <Input disabled />
                        </Form.Item>
                        <Form.Item label="Name" name="name">
                            <Input />
                        </Form.Item>
                        <Form.Item label="Year of Birth" name="YOB">
                            <InputNumber min={1900} max={2023} style={{ width: '100%' }} />
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" onClick={handleUpdateProfile}>Update Profile</Button>
                        </Form.Item>
                    </Form>
                </Col>
            </Row>
            <Title level={2}>My Orders</Title>
            <Table dataSource={orders} columns={columns} rowKey="_id" />
        </div>
    );
};

export default Profile;
