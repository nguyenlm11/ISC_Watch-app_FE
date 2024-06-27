import React, { useState, useEffect } from 'react';
import { Modal, Form, Input, message } from 'antd';
import brandApi from "../../api/brandApi"; // Assuming you have a brand API module

const ModalEditBrand = ({ visible, onCancel, brand, onSuccess }) => {
    const [loading, setLoading] = useState(false);
    const [form] = Form.useForm();

    useEffect(() => {
        form.setFieldsValue({
            brandName: brand ? brand.brandName : ''
        });
    }, [brand, form]);

    const handleOk = async () => {
        try {
            setLoading(true);
            const values = await form.validateFields();
            await brandApi.updateBrand({ id: brand._id, ...values }); // Using brandApi to update brand
            message.success('Brand updated successfully');
            onSuccess(); // Callback to handle success action
            onCancel(); // Close modal
        } catch (error) {
            if (error.response && error.response.data && error.response.data.error) {
                message.error(error.response.data.error);
            } else {
                message.error('Failed to update brand');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <Modal
            title="Edit Brand"
            open={visible}
            onCancel={onCancel}
            onOk={handleOk}
            confirmLoading={loading}
            destroyOnClose={true}
        >
            <Form
                form={form}
                initialValues={{ brandName: brand ? brand.brandName : '' }}
            >
                <Form.Item
                    name="brandName"
                    label="Brand Name"
                    rules={[{ required: true, message: 'Please enter brand name' }]}
                >
                    <Input />
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default ModalEditBrand;
