import React from 'react';
import { Layout, Row, Col, Typography } from 'antd';
import {
    FacebookOutlined,
    TwitterOutlined,
    InstagramOutlined,
    LinkedinOutlined,
    GithubOutlined,
} from '@ant-design/icons';

const { Title, Text } = Typography;

const Footer = () => {
    return (
        <Layout style={{ backgroundColor: '#001529', color: 'white', textAlign: 'center' }}>
            <Row gutter={[16, 16]} justify="center">
                <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                    <Title style={{ color: 'white' }} level={4}>About Us</Title>
                </Col>
                
                <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                    <Title style={{ color: 'white' }} level={4}>Follow Us</Title>
                    <Row gutter={[8, 8]} justify="center">
                        <Col>
                            <a href="https://facebook.com">
                                <FacebookOutlined style={{ fontSize: '24px', color: 'white' }} />
                            </a>
                        </Col>
                        <Col>
                            <a href="https://instagram.com">
                                <InstagramOutlined style={{ fontSize: '24px', color: 'white' }} />
                            </a>
                        </Col>
                        <Col>
                            <a href="https://github.com">
                                <GithubOutlined style={{ fontSize: '24px', color: 'white' }} />
                            </a>
                        </Col>
                    </Row>
                </Col>

                <Col xs={24} sm={24} md={8} lg={8} xl={8}>
                    <Title style={{ color: 'white' }} level={4}>Contact Us</Title>
                    <Text style={{ color: 'white' }} >Email: nguyenlmsa170196@fpt.edu.vn</Text>
                    <br />
                    <Text style={{ color: 'white' }} >Phone: 0327 953 466</Text>
                </Col>
            </Row>
            <div style={{ marginTop: '24px' }}>
                <Text style={{ color: 'white' }}>
                    © {new Date().getFullYear()} Nguyên. All rights reserved.
                </Text>
            </div>
        </Layout>
    );
};

export default Footer;
