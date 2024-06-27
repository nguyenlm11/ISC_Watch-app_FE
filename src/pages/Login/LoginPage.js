import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, Form, Input, message } from "antd";
import memberApi from "../../api/memberApi";
import { useAuth } from "../../AuthContext";

const LoginPage = () => {
    const [passwordVisible, setPasswordVisible] = useState(false);
    const navigate = useNavigate();
    const { login } = useAuth();

    const onFinish = async (values) => {
        try {
            const response = await memberApi.login(values);
            const userData = response.data;
            login(userData);
            localStorage.setItem("token", userData.token);
            message.success("Login successful!");
            navigate("/");
        } catch (error) {
            if (error.response && error.response.data && error.response.data.error) {
                message.error(error.response.data.error);
            } else {
                message.error("Login failed! Please check your credentials.");
            }
        }
    };

    return (
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh", backgroundColor: "#f0f2f5" }}>
            <div style={{ backgroundColor: "#ffffff", padding: "24px", borderRadius: "8px", boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)", width: "100%", maxWidth: "360px" }}>
                <h2 style={{ fontSize: "24px", fontWeight: "bold", color: "#333333", textAlign: "center", marginBottom: "16px" }}>Login</h2>
                <Form layout="vertical" onFinish={onFinish}>
                    <Form.Item
                        label={<span style={{ color: "#000000" }}>Membername</span>}
                        name="membername"
                        rules={[{ required: true, message: "Please input your membername!" }]}
                    >
                        <Input placeholder="Membername" />
                    </Form.Item>
                    <Form.Item
                        label={<span style={{ color: "#000000" }}>Password</span>}
                        name="password"
                        rules={[{ required: true, message: "Please input your password!" }]}
                    >
                        <Input.Password
                            placeholder="Password"
                            visibilityToggle={{
                                visible: passwordVisible,
                                onVisibleChange: setPasswordVisible,
                            }}
                        />
                    </Form.Item>
                    <div style={{ marginTop: "24px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <span style={{ fontSize: "14px", color: "#666666" }}>
                            Don't have an account? <Link to="/register" style={{ fontWeight: "bold", color: "#ff0000" }}>Register</Link>
                        </span>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                            <Link to="/">
                                <Button style={{ height: "32px", width: "64px", color: "#000000" }}>Back</Button>
                            </Link>
                            <Button type="primary" htmlType="submit" style={{ height: "32px", width: "64px", backgroundColor: "#000000", color: "#ffffff" }}>Login</Button>
                        </div>
                    </div>
                </Form>
            </div>
        </div>
    );
};

export default LoginPage;
