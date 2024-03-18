/* eslint-disable*/
import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { FloatButton, Breadcrumb, Spin, Row, Col, Table, Input, Button, Space, Modal } from 'antd';
import MainCard from 'components/MainCard';
import { HomeOutlined, EditOutlined, SearchOutlined, ScissorOutlined, EditFilled, DeleteFilled } from '@ant-design/icons';

import './Style.css';
export const List = () => {
    const location = useLocation();
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const [loading, setLoading] = useState(false);
    const [viewLoading, setViewLoading] = useState(false);
    const [viewModal, setViewModal] = useState(false);

    const [boardProp, setBoardProp] = useState(null); // 타겟 타이틀 명
    const [flagProp, setFlagProp] = useState(null); // 타겟 게시판 명
    const [titleProp, setTitleProp] = useState(null); // 타겟 게시판 타이틀

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

    const columns = [
        {
            title: 'No',
            dataIndex: 'key',
            width: '80px',
            align: 'center'
        },
        {
            title: '제목',
            dataIndex: 'title',
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
            title: '조회수',
            dataIndex: 'stated',
            width: '120px',
            align: 'center'
        },
        {
            title: '등록일',
            dataIndex: 'indate',
            width: '150px',
            align: 'center'
        },
        {
            title: '수정',
            dataIndex: 'edit',
            render: (text, record) => (
                <Space>
                    <Link
                        to={{ pathname: '/reference/Write' }}
                        state={{ board: boardProp, flag: flagProp, title: titleProp, form: 'Edit' }}
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
            title: `${titleProp} ${i}`,
            stated: i,
            indate: `2024-02-09`
        });
    }

    const onShowSizeChange = (current, pageSize) => {
        console.log(current, pageSize);
    };

    const handelviewModal_Close = () => {
        setViewModal(false);
    };

    useEffect(() => {
        const timerId = setTimeout(() => {
            setLoading(false);
        }, 300);
        return () => clearTimeout(timerId);
    }, []);

    useEffect(() => {
        setBoardProp(location.state.board);
        setFlagProp(location.state.flag);
        setTitleProp(location.state.title);
    }, [location.state]);

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
                                    title: boardProp
                                },
                                {
                                    title: titleProp
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
                    {titleProp}
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
                                to={{ pathname: '/reference/Write' }}
                                state={{ board: boardProp, flag: flagProp, title: titleProp, form: 'Write' }}
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

            <Modal
                open={viewModal}
                closable={true}
                onCancel={handelviewModal_Close}
                maskClosable={false}
                centered
                width={820}
                style={{
                    zIndex: 999
                }}
                footer={null}
            >
                <Spin tip="Loading..." spinning={viewLoading}>
                    <Row
                        style={{
                            border: '2px solid #aaaaaa',
                            borderRadius: '12px',
                            marginTop: '20px',
                            height: '90px'
                        }}
                    >
                        <Col
                            span={24}
                            style={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                textAlign: 'center',
                                fontSize: '21px',
                                fontWeight: '600'
                            }}
                        >
                            2023년 보안검색장비산업 발전세미나 개최
                        </Col>
                        <Col
                            span={24}
                            style={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                textAlign: 'center',
                                fontSize: '15px'
                            }}
                        >
                            2023-10-31
                        </Col>
                    </Row>
                    <Row style={{ padding: '30px 0px' }}>
                        <Col>
                            <p>❍ 행사명 : 2023년 보안검색장비산업 발전세미나</p>
                            <p>❍ 일 시 : ′23. 9.15 (금) 13:30∼17:30</p>
                            <p>❍ 장 소 : 킨텍스 제2전시장 308호</p>
                            <p>❍ 주 관 : 대한민국항공보안협회 ∙ 충남 서천군</p>
                            <p>❍ 주 최 : 한국항공우주산업진흥협회 ∙ 한서대학교</p>
                        </Col>
                    </Row>
                    <Row
                        style={{
                            border: '2px solid #aaaaaa',
                            borderRadius: '12px',
                            display: 'flex',
                            alignItems: 'center',
                            padding: '0 20px',
                            height: '90px'
                        }}
                    >
                        <Col xs={11} lg={14} style={{ display: 'flex', alignItems: 'center', justifyContent: 'start' }}>
                            <a href="#">보안검색장비_보안검색장비_보안검색장비_보안검색장비.PDF</a>
                        </Col>
                        <Col xs={13} lg={10} style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
                            <Space>
                                <Button type="default" style={{ height: '45px', backgroundColor: '#efefef' }}>
                                    다운로드
                                </Button>
                                <Button type="default" style={{ height: '45px', backgroundColor: '#efefef' }}>
                                    미리보기
                                </Button>
                            </Space>
                        </Col>
                    </Row>
                    <Row
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginTop: '20px'
                        }}
                    >
                        <Col>
                            <Button
                                type="primary"
                                onClick={() => {
                                    handelviewModal_Close();
                                }}
                                style={{ width: '120px', height: '45px' }}
                            >
                                닫기
                            </Button>
                        </Col>
                    </Row>
                </Spin>
            </Modal>
            <FloatButton.BackTop />
        </>
    );
};
