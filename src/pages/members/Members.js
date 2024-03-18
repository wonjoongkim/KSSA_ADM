/* eslint-disable*/
import React, { useState, useEffect } from 'react';
import { FloatButton, Breadcrumb, Spin, Table, Row, Col, Space, Button, Input, Modal } from 'antd';
import MainCard from 'components/MainCard';
import { HomeOutlined, EditOutlined, SearchOutlined, ScissorOutlined, EditFilled, DeleteFilled } from '@ant-design/icons';
import { useLocation, Link } from 'react-router-dom';

export const Members = () => {
    const location = useLocation();
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const [loading, setLoading] = useState(false);
    const [viewLoading, setViewLoading] = useState(false);
    const [viewModal, setViewModal] = useState(false);

    // 임시 사용
    const [pages, setPages] = useState('1');
    const [pageSize, setPageSize] = useState('10');

    const columns = [
        {
            title: 'No',
            dataIndex: 'key',
            width: '80px',
            align: 'center'
        },
        {
            title: '이름',
            dataIndex: 'UserNm',
            render: (text, record) => (
                <Button
                    type="text"
                    onClick={() => {
                        setViewModal(true);
                        // setViewLoading(true);
                    }}
                >
                    {text}
                </Button>
            )
        },
        {
            title: '아이디',
            dataIndex: 'UserId',
            width: '120px',
            align: 'center'
        },
        {
            title: '분류',
            dataIndex: 'UserType',
            width: '150px',
            align: 'center'
        },
        {
            title: '등록일',
            dataIndex: 'InDate',
            width: '150px',
            align: 'center'
        },
        {
            title: '접속횟수',
            dataIndex: 'Connect',
            width: '150px',
            align: 'center'
        },
        {
            title: '수정',
            dataIndex: 'edit',
            render: (text, record) => (
                <Space>
                    <Link
                        to={{ pathname: '/members/Write' }}
                        state={{ board: '회원관리', flag: 'member', title: '회원리스트', form: 'Edit' }}
                    >
                        <Button
                            icon={<ScissorOutlined />}
                            type="primary"
                            style={{ backgroundColor: '#fa541c', height: '33px', width: '80px' }}
                        >
                            수정
                        </Button>
                    </Link>
                </Space>
            ),
            width: '100px',
            align: 'center'
        }
    ];
    const data = [];
    for (let i = 1; i < 600; i++) {
        data.push({
            key: i,
            UserNm: `${i === pages * pageSize ? '업체' : '교육생'} ${i}`,
            UserId: `Member ${i}`,
            UserType: `${i === pages * pageSize ? '업체' : '교육생'} ${i}`,
            InDate: `2024-03-04`,
            Connect: i
        });
    }

    // 총 개시물
    const showTotal = (total) => `Total ${total} items`;

    // 체크박스 Start
    const onSelectChange = (newSelectedRowKeys) => {
        console.log('selectedRowKeys changed: ', newSelectedRowKeys);
        setSelectedRowKeys(newSelectedRowKeys);
    };

    const rowSelection = {
        selectedRowKeys,
        onChange: onSelectChange
    };
    // 체크박스 End

    // 체크박스 선택수량
    const hasSelected = selectedRowKeys.length > 0;

    // 검색 Search
    const onSearch = (value, _e, info) => console.log(value);

    const onShowSizeChange = (current, pageSize) => {
        setPages(current);
        setPageSize(pageSize);
        console.log(current, pageSize);
    };

    useEffect(() => {
        const timerId = setTimeout(() => {
            setLoading(false);
        }, 300);
        return () => clearTimeout(timerId);
    }, []);

    return (
        <>
            <MainCard
                title={
                    <>
                        <Breadcrumb
                            items={[
                                {
                                    href: '/',
                                    title: <HomeOutlined />
                                },
                                {
                                    title: '회원관리'
                                },
                                {
                                    title: '회원리스트'
                                }
                            ]}
                        />
                    </>
                }
            ></MainCard>

            <Row
                style={{
                    display: 'flex',
                    justifyContent: 'start',
                    alignItems: 'center',
                    backgroundColor: '#eeeeee',
                    marginTop: '-40px',
                    padding: '0px',
                    height: '75px'
                }}
            >
                <Col
                    xs={{ span: 5, offset: 1 }}
                    lg={{ span: 2, offset: 1 }}
                    style={{ fontSize: '15px', fontWeight: '600', display: 'flex', justifyContent: 'start', alignItems: 'center' }}
                >
                    회원리스트
                </Col>
                <Col xs={{ span: 10, offset: 0 }} lg={{ span: 16, offset: 0 }}>
                    <Input.Search
                        placeholder="※ 통합 검색 (차수명, 차수, 교육기간)"
                        onSearch={onSearch}
                        allowClear
                        enterButton
                        className="custom-search-input"
                    />
                </Col>
                <Col
                    xs={{ span: 5, offset: 1 }}
                    lg={{ span: 2, offset: 1 }}
                    style={{ fontSize: '14px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
                >
                    총 {data.length} 건
                </Col>
            </Row>

            <Spin tip="Loading..." spinning={loading}>
                <Row justify="space-between" style={{ margin: '10px 0' }}>
                    <Col span={8} style={{ display: 'flex', justifyContent: 'start', alignItems: 'center', height: '45px' }}>
                        {hasSelected ? (
                            <span
                                style={{
                                    margin: '8px'
                                }}
                            >
                                Selected <span style={{ fontWeight: '600', color: '#fa541c' }}>{selectedRowKeys.length}</span> items
                            </span>
                        ) : (
                            ''
                        )}
                    </Col>
                    <Col span={8} offset={8} style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', height: '45px' }}>
                        <Space size="middle">
                            {hasSelected ? (
                                <Button
                                    icon={<DeleteFilled />}
                                    type="primary"
                                    style={{ backgroundColor: '#fa541c', height: '45px', width: '80px' }}
                                >
                                    삭제
                                </Button>
                            ) : (
                                ''
                            )}
                            <Link
                                to={{ pathname: '/members/Write' }}
                                state={{ board: '회원관리', flag: 'member', title: '회원리스트', form: 'Write' }}
                            >
                                <Button icon={<EditFilled />} type="primary" style={{ height: '45px', width: '80px' }}>
                                    추가
                                </Button>
                            </Link>
                        </Space>
                    </Col>
                </Row>

                <Row>
                    <Col span={24}>
                        <Table
                            bordered
                            rowSelection={rowSelection}
                            columns={columns}
                            dataSource={data}
                            size="large"
                            pagination={{
                                showQuickJumper: true,
                                showTotal: showTotal,
                                onChange: onShowSizeChange
                            }}
                        />
                    </Col>
                </Row>
            </Spin>
            <FloatButton.BackTop />
        </>
    );
};
