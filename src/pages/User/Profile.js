import React, { useEffect, useState } from 'react';
import { Form, Input, Button, InputNumber, Spin, message, Table } from 'antd';
import memberApi from '../../api/memberApi';
import orderApi from '../../api/orderApi';

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

    const columns = [
        { title: 'Order ID', dataIndex: '_id', key: '_id' },
        { title: 'Total', dataIndex: 'total', key: 'total', render: (total) => `$${total}` },
        { title: 'Status', dataIndex: 'status', key: 'status' },
        { title: 'Date', dataIndex: 'createdAt', key: 'createdAt', render: (date) => new Date(date).toLocaleDateString() },
        { title: 'Full Name', dataIndex: ['deliveryInfo', 'name'], key: 'fullName' },
        { title: 'Address', dataIndex: ['deliveryInfo', 'address'], key: 'address' },
        { title: 'Phone Number', dataIndex: ['deliveryInfo', 'phoneNumber'], key: 'phoneNumber' },
    ];

    if (loading) {
        return <Spin />;
    }

    return (
        <div>
            <h2>My Profile</h2>
            <Form form={form} layout="vertical">
                <Form.Item label="Membername" name="membername">
                    <Input disabled />
                </Form.Item>
                <Form.Item label="Name" name="name">
                    <Input />
                </Form.Item>
                <Form.Item label="Year of Birth" name="YOB">
                    <InputNumber min={1900} max={2023} />
                </Form.Item>
                <Button type="primary">Update Profile</Button>
            </Form>
            <h2>My Orders</h2>
            <Table dataSource={orders} columns={columns} rowKey="_id" />
        </div>
    );
};

export default Profile;
