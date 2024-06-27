import React, { useState, useEffect } from 'react';
import { Modal, Form, Input, InputNumber, Switch, Select, message } from 'antd';
import watchApi from '../../api/watchApi';
import brandApi from "../../api/brandApi";

const { Option } = Select;

const ModalEditWatch = ({ isVisible, onClose, watch, onEditSuccess }) => {
    const [loading, setLoading] = useState(false);
    const [brands, setBrands] = useState([]);
    const [form] = Form.useForm();

    useEffect(() => {
        const fetchBrands = async () => {
            try {
                const response = await brandApi.getAllBrand();
                setBrands(response?.data);
            } catch (error) {
                message.error('Failed to load brands. Please try again.');
            }
        };

        fetchBrands();

        if (watch) {
            form.setFieldsValue({
                watchName: watch.watchName,
                brand: watch.brand._id,
                price: watch.price,
                Automatic: watch.Automatic,
                watchDescription: watch.watchDescription,
                image: watch.image,
            });
        }
    }, [watch, form]);

    const handleOk = async () => {
        try {
            const values = await form.validateFields();
            setLoading(true);
            await watchApi.updateWatch({
                id: watch._id,
                ...values,
            });
            message.success('Watch updated successfully');
            onEditSuccess();
        } catch (error) {
            message.error('Failed to update watch. Please try again.');
        } finally {
            setLoading(false);
            onClose();
        }
    };

    return (
        <Modal
            title="Edit Watch"
            open={isVisible} 
            onOk={handleOk}
            onCancel={onClose}
            confirmLoading={loading}
            okText="Update"
            cancelText="Cancel"
        >
            <Form form={form} layout="vertical">
                <Form.Item
                    name="watchName"
                    label="Watch Name"
                    rules={[{ required: true, message: 'Please input the watch name!' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="image"
                    label="Image URL"
                    rules={[{ required: true, message: 'Please input the image URL!' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="price"
                    label="Price"
                    rules={[{ required: true, type: 'number', min: 1.0, message: 'Please enter a price greater than 0' }]}
                >
                    <InputNumber type="number" min={1.0} style={{ width: '100%' }} />
                </Form.Item>
                <Form.Item name="watchDescription" label="Description">
                    <Input.TextArea />
                </Form.Item>
                <Form.Item
                    name="brand"
                    label="Brand"
                    rules={[{ required: true, message: 'Please select the brand!' }]}
                >
                    <Select>
                        {brands.map(brand => (
                            <Option key={brand._id} value={brand._id}>{brand.brandName}</Option>
                        ))}
                    </Select>
                </Form.Item>
                <Form.Item name="Automatic" label="Automatic" valuePropName="checked">
                    <Switch />
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default ModalEditWatch;
