import React, { useState, useEffect } from 'react';
import { Input, Button, Row, Col, Card, Typography, Pagination, Select, message } from 'antd';
import { useNavigate } from 'react-router-dom';
import watchApi from '../api/watchApi';

const { Title } = Typography;
const { Option } = Select;

const Home = () => {
    const [watchData, setWatchData] = useState([]);
    const [brands, setBrands] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedBrand, setSelectedBrand] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);

    useEffect(() => {
        fetchWatchData();
    }, [searchQuery, selectedBrand, currentPage]);

    const fetchWatchData = async () => {
        try {
            const response = await watchApi.getAllWatch({
                page: currentPage,
                search: searchQuery,
                brand: selectedBrand,
            });
            if (response?.data) {
                setWatchData(response?.data?.watches || []);
                setBrands(response?.data?.brands || []);
                setTotalPages(response?.data?.totalPages || 0);
            } else {
                message.error('Failed to fetch watch data. Please try again.');
            }
        } catch (error) {
            message.error('Failed to fetch watch data. Please try again.');
        }
    };

    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
    };

    const handleSearchClick = () => {
        handlePageChange(1);
        fetchWatchData();
    };

    const handleBrandFilter = (brandId) => {
        setSelectedBrand(brandId);
    };

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const navigation = useNavigate();

    const handleCardClick = (watchId) => {
        navigation(`/watches/${watchId}`);
    };

    return (
        <>
            <Row gutter={[16, 16]}>
                <Col span={24}>
                    <Input
                        placeholder="Search by name..."
                        value={searchQuery}
                        onChange={handleSearchChange}
                        style={{ width: 300, marginRight: 16 }}
                    />
                    <Button type="primary" onClick={handleSearchClick}>
                        Search
                    </Button>
                </Col>
            </Row>

            <Row gutter={[16, 16]} style={{ marginTop: 16 }}>
                <Col span={6}>
                    <Select
                        defaultValue="All brands"
                        style={{ width: '100%' }}
                        onChange={handleBrandFilter}
                    >
                        <Option value="">All brands</Option>
                        {brands.map((brand) => (
                            <Option key={brand._id} value={brand._id.toString()}>
                                {brand.brandName}
                            </Option>
                        ))}
                    </Select>
                </Col>

                <Col span={18}>
                    <Row gutter={[16, 16]}>
                        {watchData.map((watch) => (
                            <Col span={8} key={watch._id}>
                                <Card
                                    hoverable
                                    cover={<img alt={watch.watchName} src={watch.image} style={{ borderBottom: '1px solid #D0D3D9', height: 300, objectFit: 'cover' }} />}
                                    className="watch-card"
                                    onClick={() => handleCardClick(watch._id)}
                                >
                                    <div style={{ height: 80, marginBottom: 20 }}>
                                        <Title level={3}>{watch?.watchName}</Title>
                                    </div>
                                    <Title style={{ color: 'gray' }} level={4}>{watch?.brand?.brandName || 'No brand'}</Title>
                                    <div>
                                        <span>Price: </span>
                                        <span style={{ color: 'red', fontSize: '25px', letterSpacing: '2px', fontWeight: 'bold' }}>${watch?.price}</span>
                                    </div>
                                </Card>
                            </Col>
                        ))}
                    </Row>

                    <Pagination
                        current={currentPage}
                        total={totalPages * 9}
                        onChange={handlePageChange}
                        style={{ marginTop: 16, textAlign: 'center' }}
                    />
                </Col>
            </Row>
        </>
    );
};

export default Home;
