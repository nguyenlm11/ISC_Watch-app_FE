import React from 'react';
import { Modal, Form, Input, Button, message } from 'antd';
import brandApi from "../../api/brandApi";

const ModalAddBrand = ({ visible, onCancel, onSuccess }) => {
    const [form] = Form.useForm();

    const handleAddBrandSubmit = async (values) => {
        try {
            await brandApi.addBrand(values);
            message.success('Brand added successfully');
            onSuccess();
            onCancel();
            form.resetFields();
        } catch (error) {
            if (error.response && error.response.data && error.response.data.error) {
                message.error(error.response.data.error);
            } else {
                message.error('Failed to add brand');
            }
        }
    };

    const handleCancel = () => {
        onCancel();
        form.resetFields();
    };

    return (
        <Modal
            title="Add New Brand"
            open={visible}
            onCancel={handleCancel}
            footer={[
                <Button key="cancel" onClick={handleCancel}>
                    Cancel
                </Button>,
                <Button key="submit" type="primary" htmlType="submit" form="brandForm">
                    Submit
                </Button>,
            ]}
        >
            <Form id="brandForm" form={form} onFinish={handleAddBrandSubmit}>
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

export default ModalAddBrand;
