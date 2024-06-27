import { Form, Input, Button, Modal, message } from 'antd';
import memberApi from '../../api/memberApi';
import { useAuth } from '../../AuthContext';

const ModalChangePassword = ({ visible, onClose }) => {
    const [form] = Form.useForm();
    const { logout } = useAuth();

    const handlePasswordChange = async () => {
        try {
            const values = await form.validateFields();
            const response = await memberApi.changePassword(values);
            if (response.status === 200) {
                message.success("Password changed successfully!");
                form.resetFields();
                onClose();
                logout();
            } else {
                const errorMessage = response?.data?.error;
                message.error(errorMessage);
            }
        } catch (error) {
            const errorMessage = error.response?.data?.error;
            message.error(errorMessage);
        }
    };


    return (
        <Modal
            title="Change Password"
            open={visible}
            onCancel={onClose}
            footer={[
                <Button key="back" onClick={onClose}>
                    Cancel
                </Button>,
                <Button key="submit" type="primary" onClick={handlePasswordChange}>
                    Change Password
                </Button>,
            ]}
        >
            <Form form={form} layout="vertical">
                <Form.Item
                    label="Current Password"
                    name="oldPassword"
                    rules={[{ required: true, message: 'Please input your current password!' }]}
                >
                    <Input.Password />
                </Form.Item>
                <Form.Item
                    label="New Password"
                    name="newPassword"
                    rules={[{ required: true, message: 'Please input your new password!' }]}
                >
                    <Input.Password />
                </Form.Item>
                <Form.Item
                    label="Confirm New Password"
                    name="confirmPassword"
                    rules={[
                        { required: true, message: 'Please confirm your new password!' },
                        ({ getFieldValue }) => ({
                            validator(_, value) {
                                if (!value || getFieldValue('newPassword') === value) {
                                    return Promise.resolve();
                                }
                                return Promise.reject(new Error('The two passwords do not match!'));
                            },
                        }),
                    ]}
                >
                    <Input.Password />
                </Form.Item>
            </Form>
        </Modal>
    );
};

export default ModalChangePassword;
