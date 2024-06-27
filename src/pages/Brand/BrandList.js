import React, { useEffect, useState } from 'react';
import { Table, Button, Space, message, Modal } from 'antd';
import { DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';
import ModalAddBrand from './ModalAddBrand';
import ModalEditBrand from './ModalEditBrand';
import brandApi from "../../api/brandApi";

const BrandPage = () => {
    const [brands, setBrands] = useState([]);
    const [loading, setLoading] = useState(true);

    const [selectedBrand, setSelectedBrand] = useState(null);
    const [deleteModalVisible, setDeleteModalVisible] = useState(false);
    const [addModalVisible, setAddModalVisible] = useState(false);
    const [editModalVisible, setEditModalVisible] = useState(false);

    useEffect(() => {
        fetchBrands();
    }, []);

    const fetchBrands = async () => {
        try {
            const response = await brandApi.getAllBrand();
            setBrands(response?.data);
            setLoading(false);
        } catch (error) {
            message.error('Failed to load brands. Please try again.');
            setLoading(false);
        }
    };

    const showDeleteConfirm = (id) => {
        const brand = brands.find(item => item._id === id);
        setSelectedBrand(brand);
        setDeleteModalVisible(true);
    };

    const handleDeleteOk = async () => {
        if (!selectedBrand) return;
        try {
            await brandApi.deleteBrand(selectedBrand._id);
            message.success('Brand deleted successfully');
            fetchBrands();
        } catch (error) {
            message.error('Failed to delete brand');
        }
        setDeleteModalVisible(false);
        setSelectedBrand(null);
    };

    const handleDeleteCancel = () => {
        setDeleteModalVisible(false);
        setSelectedBrand(null);
    };

    const handleAddBrand = () => {
        setAddModalVisible(true);
    };

    const handleAddModalCancel = () => {
        setAddModalVisible(false);
    };

    const handleAddModalSuccess = () => {
        fetchBrands();
    };

    const handleEditModal = (brand) => {
        setSelectedBrand(brand);
        setEditModalVisible(true);
    };

    const handleEditModalCancel = () => {
        setEditModalVisible(false);
        setSelectedBrand(null);
    };

    const handleEditModalSuccess = () => {
        fetchBrands();
    };

    const columns = [
        {
            title: 'Brand Name',
            dataIndex: 'brandName',
            key: 'brandName',
        },
        {
            title: 'Actions',
            key: 'actions',
            align: 'right',
            render: (text, record) => (
                <Space size="middle">
                    <Button icon={<EditOutlined />} onClick={() => handleEditModal(record)} />
                    <Button
                        icon={<DeleteOutlined />}
                        onClick={() => showDeleteConfirm(record._id)}
                        danger
                    />
                </Space>
            ),
        },
    ];

    return (
        <div>
            <h1>Manage Brands</h1>
            <Button type="primary" style={{ marginBottom: '16px' }} onClick={handleAddBrand}>
                <PlusOutlined /> Add New Brand
            </Button>
            <Table columns={columns} dataSource={brands} rowKey="_id" loading={loading} />

            <ModalAddBrand
                visible={addModalVisible}
                onCancel={handleAddModalCancel}
                onSuccess={handleAddModalSuccess}
            />

            <ModalEditBrand
                visible={editModalVisible}
                onCancel={handleEditModalCancel}
                brand={selectedBrand}
                onSuccess={handleEditModalSuccess}
            />

            <Modal
                title="Confirm Delete"
                open={deleteModalVisible}
                onOk={handleDeleteOk}
                onCancel={handleDeleteCancel}
                okText="Delete"
                cancelText="Cancel"
            >
                {selectedBrand && (
                    <p>Are you sure you want to delete brand <strong>{selectedBrand.brandName}</strong>?</p>
                )}
            </Modal>
        </div>
    );
};

export default BrandPage;
