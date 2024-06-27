import { useEffect, useState } from 'react';
import { Modal, Form, Input, Select, Button, message, InputNumber, Switch } from 'antd';
import watchApi from '../../api/watchApi';
import brandApi from "../../api/brandApi";

const { Option } = Select;

const ModalAddWatch = ({ isVisible, onClose, onAddWatch }) => {
    const [form] = Form.useForm();
    const [brands, setBrands] = useState([]);

    useEffect(() => {
        fetchBrands();
    }, []);

    const fetchBrands = async () => {
        try {
            const response = await brandApi.getAllBrand();
            setBrands(response?.data);
        } catch (error) {
            message.error('Failed to load brands. Please try again.');
        }
    };

    const handleAddWatch = async (values) => {
        try {
            const response = await watchApi.addWatch(values);
            message.success(response?.data?.message);
            onAddWatch();
            onClose();
            form.resetFields();
        } catch (error) {
            message.error('Failed to add watch. Please try again.');
        }
    };

    const handleCancel = () => {
        onClose();
        form.resetFields();
    };

    return (
        <Modal
            title="Add New Watch"
            open={isVisible}
            onCancel={handleCancel}
            footer={[
                <Button key="cancel" onClick={handleCancel}>
                    Cancel
                </Button>,
                <Button key="submit" type="primary" htmlType="submit" form="watchForm">
                    Add Watch
                </Button>,
            ]}
        >
            <Form
                id="watchForm"
                form={form}
                layout="vertical"
                onFinish={handleAddWatch}
            >
                <Form.Item
                    name="watchName"
                    label="Watch Name"
                    rules={[{ required: true, message: 'Please enter the watch name' }]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    name="image"
                    label="Image URL"
                    rules={[{ required: true, message: 'Please enter the image URL' }]}
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
                <Form.Item
                    name="watchDescription"
                    label="Description"
                    rules={[{ required: true, message: 'Please enter the description' }]}
                >
                    <Input.TextArea />
                </Form.Item>
                <Form.Item
                    name="brand"
                    label="Brand"
                    rules={[{ required: true, message: 'Please select a brand' }]}
                >
                    <Select>
                        {brands.map((brand) => (
                            <Option key={brand._id} value={brand._id}>{brand.brandName}</Option>
                        ))}
                    </Select>
                </Form.Item>
                <Form.Item name="Automatic" label="Automatic" valuePropName="checked">
                    <Switch checkedChildren="Yes" unCheckedChildren="No" />
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default ModalAddWatch;
