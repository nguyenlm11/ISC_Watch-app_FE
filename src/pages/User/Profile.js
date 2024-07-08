// src/components/Profile.js
import React, { useEffect, useState } from 'react';
import { Form, Input, Button, InputNumber, Typography, Row, Col, message } from 'antd';
import memberApi from '../../api/memberApi';

const { Title } = Typography;

const Profile = () => {
    const [loading, setLoading] = useState(true);
    const [form] = Form.useForm();

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

        fetchProfile();
    }, [form]);

    const handleUpdateProfile = async () => {
        try {
            const values = form.getFieldsValue();
            await memberApi.updateProfile(values);
            message.success('Profile updated successfully');
        } catch (error) {
            message.error('Failed to update profile');
        }
    };

    return (
        <div style={{ padding: '20px' }}>
            <Title level={2}>My Profile</Title>
            <Row gutter={16}>
                <Col span={12}>
                    <Form form={form} layout="vertical">
                        <Form.Item label="Membername" name="membername">
                            <Input disabled />
                        </Form.Item>
                        <Form.Item label="Name" name="name">
                            <Input />
                        </Form.Item>
                        <Form.Item label="Year of Birth" name="YOB">
                            <InputNumber min={1900} max={2023} style={{ width: '100%' }} />
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" onClick={handleUpdateProfile}>Update Profile</Button>
                        </Form.Item>
                    </Form>
                </Col>
            </Row>
        </div>
    );
};

export default Profile;
