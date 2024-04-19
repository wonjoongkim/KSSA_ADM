/* eslint-disable*/
import React, { useState, useEffect } from 'react';
import { FloatButton, Breadcrumb, Table, Row, Space, Col, Spin, Input, Button, Modal, Select } from 'antd';
import MainCard from 'components/MainCard';
import { HomeOutlined, ScissorOutlined, EditFilled, DeleteFilled } from '@ant-design/icons';

import { useLocation, Link } from 'react-router-dom';

export const EduSchedule = () => {
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
            align: 'center',
            width: '80px'
        },
        {
            title: '교육명',
            dataIndex: 'EduNm',
            render: (text, record) => (
                <Link
                    type="text"
                    onClick={() => {
                        setViewModal(true);
                        // setViewLoading(true);
                    }}
                >
                    {text}
                </Link>
            )
        },
        {
            title: '차수',
            dataIndex: 'BaseLine',
            align: 'center'
        },
        {
            title: '교육일정',
            dataIndex: 'EduDate',
            align: 'center'
        },
        {
            title: '교육인원',
            dataIndex: 'People',
            align: 'center'
        },
        {
            title: '등록일',
            dataIndex: 'InDate',
            align: 'center'
        },
        {
            title: '설정',
            dataIndex: 'Setting',
            render: (text, record) => (
                <Space>
                    <Row gutter={[0, 8]}>
                        <Col span={24} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
                            <Button
                                icon={<ScissorOutlined />}
                                type="primary"
                                style={{ backgroundColor: '#5b9bd5', height: '33px', width: '80px' }}
                            >
                                마감
                            </Button>
                        </Col>
                        <Col span={24} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
                            <Button
                                icon={<ScissorOutlined />}
                                type="primary"
                                style={{ backgroundColor: '#909090', height: '33px', width: '80px' }}
                            >
                                이수
                            </Button>
                        </Col>
                        <Col span={24} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
                            <Link
                                to={{ pathname: '/preferences/Write' }}
                                state={{ board: '환경설정', flag: 'preferences', title: '교육일정', form: 'Edit' }}
                            >
                                <Button
                                    icon={<ScissorOutlined />}
                                    type="primary"
                                    style={{ backgroundColor: '#fa541c', height: '33px', width: '80px' }}
                                >
                                    수정
                                </Button>
                            </Link>
                        </Col>
                    </Row>
                </Space>
            ),
            align: 'center',
            width: '120px'
        }
    ];
    const data = [];
    for (let i = 1; i < 600; i++) {
        data.push({
            key: i,
            EduNm: '항공경비 초기교육',
            BaseLine: i,
            EduDate: '2024-03-04 ~ 2024-03-08',
            People: '35',
            InDate: '2024-03-04'
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

    const onSelect = (value) => {
        console.log(`selected ${value}`);
    };

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
                                    title: '환경설정'
                                },
                                {
                                    title: '교육일정'
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
                    교육일정
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
                {/* <Row justify="space-between" style={{ margin: '10px 0' }}>
                    <Col span={24} style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', height: '45px' }}>
                        <Space>
                            <Select
                                showSearch
                                placeholder="연도 계획표"
                                optionFilterProp="children"
                                onChange={onSelect}
                                onSearch={onSearch}
                                options={Array.from({ length: 5 }, (_, i) => ({
                                    value: new Date().getFullYear() + i,
                                    label: `${new Date().getFullYear() + i}년 계획표`
                                }))}
                                style={{ width: '160px' }}
                            />
                            <Button icon={<EditFilled />} type="primary" style={{ height: '45px', width: '130px' }}>
                                연간 계획표
                            </Button>
                        </Space>
                    </Col>
                </Row> */}
                <Row justify="space-between" style={{ margin: '10px 0' }}>
                    <Col
                        xs={{ span: 12, order: 1 }}
                        lg={{ span: 8, order: 1 }}
                        style={{ display: 'flex', justifyContent: 'start', alignItems: 'center', height: '55px' }}
                    >
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
                    <Col
                        xs={{ span: 24, order: 3 }}
                        lg={{ span: 8, order: 2 }}
                        style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', height: '55px' }}
                    >
                        <Col
                            xs={{ span: 12, order: 2 }}
                            lg={{ span: 8, order: 3 }}
                            style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', height: '55px' }}
                        >
                            <Space size="middle">
                                {hasSelected ? (
                                    <Button
                                        icon={<DeleteFilled />}
                                        type="primary"
                                        style={{ backgroundColor: '#fa541c', height: '55px', width: '80px' }}
                                    >
                                        삭제
                                    </Button>
                                ) : (
                                    ''
                                )}
                                <Link
                                    to={{ pathname: '/preferences/Write' }}
                                    state={{ board: '환경설정', flag: 'preferences', title: '교육일정', form: 'Write' }}
                                >
                                    <Button icon={<EditFilled />} type="primary" style={{ height: '55px', width: '80px' }}>
                                        추가
                                    </Button>
                                </Link>

                                <Select
                                    showSearch
                                    placeholder="연도 계획표"
                                    optionFilterProp="children"
                                    onChange={onSelect}
                                    onSearch={onSearch}
                                    options={Array.from({ length: 5 }, (_, i) => ({
                                        value: new Date().getFullYear() + i,
                                        label: `${new Date().getFullYear() + i}년 계획표`
                                    }))}
                                    style={{ width: '150px' }}
                                />
                                <Button
                                    icon={<EditFilled />}
                                    type="primary"
                                    style={{ backgroundColor: '#70AD47', height: '55px', width: '130px' }}
                                >
                                    연간 계획표
                                </Button>
                            </Space>
                        </Col>
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
