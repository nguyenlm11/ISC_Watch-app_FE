import React, { useState, useEffect } from 'react';
import { Table, Button, Select, message } from 'antd';
import orderApi from '../../api/orderApi';

const { Option } = Select;

const OrderManagementPage = () => {
    const [orders, setOrders] = useState([]);

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
    ];

    return (
        <div>
            <h2>Order Management</h2>
            <Table dataSource={orders} columns={columns} rowKey="_id" />
        </div>
    );
};

export default OrderManagementPage;
