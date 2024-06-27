import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Table, Space, Button, message, Modal } from 'antd';
import { DeleteOutlined, EditOutlined, EyeOutlined, PlusOutlined } from '@ant-design/icons';
import ModalAddWatch from './ModalAddWatch';
import ModalEditWatch from './ModalEditWatch';
import watchApi from '../../api/watchApi';

const WatchesPage = () => {
    const navigate = useNavigate();
    const [watches, setWatches] = useState([]);
    const [loading, setLoading] = useState(true);

    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isEditModalVisible, setIsEditModalVisible] = useState(false);
    const [deleteModalVisible, setDeleteModalVisible] = useState(false);
    const [selectedWatch, setSelectedWatch] = useState(null);

    useEffect(() => {
        fetchWatchesByAdmin();
    }, []);

    const fetchWatchesByAdmin = async () => {
        try {
            const response = await watchApi.getAllWatchbyAdmin();
            setWatches(response?.data?.watches);
            setLoading(false);
        } catch (error) {
            message.error('Failed to load watches for admin. Please try again.');
            setLoading(false);
        }
    };

    const handleViewClick = (id) => {
        navigate(`/watches/${id}`);
    };

    const handleDeleteWatch = async (id) => {
        try {
            await watchApi.deleteWatch(id);
            message.success('Watch deleted successfully');
            fetchWatchesByAdmin();
        } catch (error) {
            message.error('Failed to delete watch. Please try again.');
        }
        setDeleteModalVisible(false);
        setSelectedWatch(null);
    };

    const showDeleteConfirm = (watch) => {
        setSelectedWatch(watch);
        setDeleteModalVisible(true);
    };

    const handleDeleteCancel = () => {
        setDeleteModalVisible(false);
        setSelectedWatch(null);
    };

    const handleAddWatch = () => {
        setIsModalVisible(true);
    };

    const handleAddModalCancel = () => {
        setIsModalVisible(false);
    };

    const handleAddModalSuccess = () => {
        fetchWatchesByAdmin();
        setIsModalVisible(false);
    };

    const showEditModal = (watch) => {
        setSelectedWatch(watch);
        setIsEditModalVisible(true);
    };

    const handleEditModalCancel = () => {
        setIsEditModalVisible(false);
        setSelectedWatch(null);
    };

    const handleEditModalSuccess = () => {
        fetchWatchesByAdmin();
        setIsEditModalVisible(false);
    };

    const columns = [
        {
            title: 'Image',
            dataIndex: 'image',
            key: 'image',
            render: (text) => (
                <div style={{ width: '100px', height: '100px', overflow: 'hidden', borderRadius: '50%', border: '1px solid #ccc' }}>
                    <img src={text} alt="Watch" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
            ),
        },
        {
            title: 'Watch Name',
            dataIndex: 'watchName',
            key: 'watchName',
        },
        {
            title: 'Brand',
            dataIndex: ['brand', 'brandName'],
            key: 'brand',
        },
        {
            title: 'Price',
            dataIndex: 'price',
            key: 'price',
            render: (text) => `$${text}`,
        },
        {
            title: 'Automatic',
            dataIndex: 'Automatic',
            key: 'Automatic',
            render: (text) => (text ? 'Yes' : 'No'),
        },
        {
            title: 'Description',
            dataIndex: 'watchDescription',
            key: 'watchDescription',
        },
        {
            title: 'Actions',
            key: 'actions',
            render: (text, record) => (
                <Space size="middle">
                    <Button icon={<EditOutlined />} onClick={() => showEditModal(record)} />
                    <Button icon={<DeleteOutlined />} danger onClick={() => showDeleteConfirm(record)} />
                    <Button icon={<EyeOutlined />} onClick={() => handleViewClick(record._id)} />
                </Space>
            ),
        },
    ];

    return (
        <div>
            <h1>Manage Watches</h1>
            <Button type="primary" style={{ marginBottom: '16px' }} onClick={handleAddWatch}>
                <PlusOutlined /> Add New Watch
            </Button>
            <Table columns={columns} dataSource={watches} rowKey="_id" loading={loading} />

            <ModalAddWatch
                isVisible={isModalVisible}
                onClose={handleAddModalCancel}
                onAddWatch={handleAddModalSuccess}
            />

            <ModalEditWatch
                isVisible={isEditModalVisible}
                onClose={handleEditModalCancel}
                watch={selectedWatch}
                onEditSuccess={handleEditModalSuccess}
            />

            <Modal
                title="Confirm Delete"
                open={deleteModalVisible}
                onOk={() => handleDeleteWatch(selectedWatch._id)}
                onCancel={handleDeleteCancel}
                okText="Delete"
                cancelText="Cancel"
            >
                {selectedWatch && (
                    <p>Are you sure you want to delete watch <strong>{selectedWatch.watchName}</strong>?</p>
                )}
            </Modal>
        </div>
    );
};

export default WatchesPage;
