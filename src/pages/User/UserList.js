import React, { useEffect, useState } from 'react';
import { Table, Pagination } from 'antd';
import memberApi from "../../api/memberApi";

const UserPage = () => {
    const [users, setUsers] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize] = useState(10);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const response = await memberApi.getAllAccounts();
            setUsers(response.data.users);
        } catch (error) {
            console.error("Error fetching users:", error);
        }
    };

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const columns = [
        {
            title: 'No',
            dataIndex: 'index',
            key: 'index',
            render: (text, record, index) => (pageSize * (currentPage - 1)) + index + 1,
        },
        {
            title: 'User Name',
            dataIndex: 'membername',
            key: 'membername',
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Year of Birth',
            dataIndex: 'YOB',
            key: 'YOB',
        },
    ];

    const paginatedUsers = users.slice((currentPage - 1) * pageSize, currentPage * pageSize);

    return (
        <div>
            <h1 className="title">User List</h1>
            <Table
                dataSource={paginatedUsers}
                columns={columns}
                rowKey="_id"
                pagination={false}
            />
            <Pagination
                current={currentPage}
                total={users.length}
                pageSize={pageSize}
                onChange={handlePageChange}
                style={{ marginTop: '16px', textAlign: 'right' }}
            />
        </div>
    );
};

export default UserPage;
