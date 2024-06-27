import { Button, Form, Input, InputNumber, message } from "antd";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import memberApi from "../../api/memberApi";

const RegisterPage = () => {
    const [passwordVisible, setPasswordVisible] = useState(false);
    const navigate = useNavigate();

    const onFinish = async (values) => {
        try {
            const response = await memberApi.register({
                membername: values.membername,
                password: values.password,
                name: values.name,
                YOB: values.yob,
            });
            if (response.status === 201) {
                message.success("Registration successful!");
                navigate("/");
            } else {
                message.error("Registration failed!");
            }
        } catch (error) {
            if (error.response && error.response.data && error.response.data.error) {
                message.error(error.response.data.error);
            } else {
                console.error("Registration error:", error);
                message.error("An error occurred during registration.");
            }
        }
    };

    return (
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh", backgroundColor: "#f0f2f5" }}>
            <div style={{ backgroundColor: "#ffffff", width: "30vw", maxWidth: "360px", marginTop: "32px", borderRadius: "8px", boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)" }}>
                <div style={{ display: "flex", justifyContent: "center", my: "5", fontSize: "20px", fontWeight: "bold", width: "100%", marginBottom: '5px' }}>
                    Register
                </div>

                <div style={{ display: "flex", justifyContent: "center" }}>
                    <Form
                        labelCol={{ span: 9 }}
                        wrapperCol={{ span: 15 }}
                        layout="horizontal"
                        style={{ maxWidth: 600 }}
                        onFinish={onFinish}
                    >
                        <Form.Item
                            label={<span>Membername</span>}
                            name="membername"
                            rules={[{ required: true, message: "Please input your username!" }]}
                        >
                            <Input placeholder="Input username" />
                        </Form.Item>
                        <Form.Item
                            label={<span>Name</span>}
                            name="name"
                            rules={[{ required: true, message: "Please input your name!" }]}
                        >
                            <Input placeholder="Input name" />
                        </Form.Item>
                        <Form.Item
                            label={<span>Password</span>}
                            name="password"
                            rules={[{ required: true, message: "Please input your password!" }]}
                        >
                            <Input.Password
                                placeholder="Input password"
                                visibilityToggle={{
                                    visible: passwordVisible,
                                    onVisibleChange: setPasswordVisible,
                                }}
                            />
                        </Form.Item>
                        <Form.Item
                            label={<span>Year of birth</span>}
                            name="yob"
                            rules={[{ required: true, type: 'number', min: 1975.0, message: "Please input your year of birth!" }]}
                        >
                            <InputNumber type="number" min={1975.0} style={{ width: '100%' }} placeholder="Input year of birth" />
                        </Form.Item>
                        <p style={{ textAlign: 'center' }}>
                            Already have an account? Please{" "}
                            <Link to="/login" style={{ fontWeight: "bold", color: "#ff0000" }}>
                                Login
                            </Link>
                        </p>
                        <div style={{ display: "flex", justifyContent: "center", marginBottom: "20px" }}>
                            <Link to="/">
                                <Button style={{ height: "32px", width: "64px" }}>Back</Button>
                            </Link>
                            <Button type="primary" htmlType="submit" style={{ height: "32px", width: "64px", backgroundColor: "#3b436a" }}>Register</Button>
                        </div>
                    </Form>
                </div>
            </div>
        </div>
    );
};

export default RegisterPage;
