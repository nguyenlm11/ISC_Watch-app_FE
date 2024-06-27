// OrderManagementPage.js

import React, { useState, useEffect } from 'react';
import { Table } from 'antd';
import orderApi from '../../api/orderApi';

const OrderManagementPage = () => {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        try {
            const response = await orderApi.getAllOrders(); // Implement your API method
            setOrders(response.data.orders); // Adjust according to your API response structure
        } catch (error) {
            console.error('Error fetching orders:', error);
        }
    };

    const columns = [
        { title: 'Order ID', dataIndex: '_id', key: 'orderId' },
        { title: 'Product ID', dataIndex: 'productId', key: 'productId' },
        { title: 'Quantity', dataIndex: 'quantity', key: 'quantity' },
        { title: 'Delivery Address', dataIndex: 'deliveryAddress', key: 'deliveryAddress' },
        { title: 'Phone Number', dataIndex: 'phoneNumber', key: 'phoneNumber' },
        { title: 'User Name', dataIndex: 'userName', key: 'userName' },
        { title: 'Payment Method', dataIndex: 'paymentMethod', key: 'paymentMethod' },
        { title: 'Status', dataIndex: 'status', key: 'status' }
    ];

    return (
        <div>
            <h2>Order Management</h2>
            <Table dataSource={orders} columns={columns} />
        </div>
    );
};

export default OrderManagementPage;
