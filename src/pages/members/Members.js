/* eslint-disable*/
import React, { useState, useEffect } from 'react';
import { FloatButton, Breadcrumb, Spin, Table, Row, Col, Space, Button, Input, Modal } from 'antd';
import MainCard from 'components/MainCard';
import { HomeOutlined, EditOutlined, SearchOutlined, ScissorOutlined, EditFilled, DeleteFilled } from '@ant-design/icons';
import { useLocation, Link } from 'react-router-dom';
import {
    useMemberListMutation,
    useMemberInsertMutation,
    useMemberViewMutation,
    useMemberUpdateMutation
} from '../../hooks/api/UserManagement/UserManagement';

export const Members = () => {
    const location = useLocation();
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const [loading, setLoading] = useState(false);
    const [member_ListData, setMember_ListData] = useState(null);
    const [member_Total, setMember_Total] = useState('0');

    const [viewLoading, setViewLoading] = useState(false);
    const [viewModal, setViewModal] = useState(false);

    const DataOptions = { year: 'numeric', month: '2-digit', day: '2-digit' };

    // 회원 리스트 Start
    const [MemberListApi] = useMemberListMutation();
    const handleMemberList = async (search) => {
        const MemberListResponse = await MemberListApi({
            Member_Search: search
        });
        if (MemberListResponse?.data?.RET_CODE === '0000') {
            console.log(MemberListResponse?.data?.RET_DATA[0].InDate);
            setMember_ListData(
                MemberListResponse?.data?.RET_DATA.map((d, i) => ({
                    key: d.Idx,
                    num: i + 1,
                    idx: d.Idx,
                    User_Nm: d.User_Nm,
                    User_Id: d.User_Id,
                    User_Phone: d.User_Phone,
                    User_Email: d.User_Email,
                    User_Type: d.User_Type,
                    Visited: d.Visited,
                    date: new Date(d.InDate).toLocaleTimeString('ko-KR', DataOptions).substring(0, 12)
                }))
            );
            setMember_Total(
                MemberListResponse?.data?.RET_DATA[0]?.Total === null || MemberListResponse?.data?.RET_DATA[0]?.Total === undefined
                    ? '0'
                    : MemberListResponse?.data?.RET_DATA[0]?.Total
            );
        } else {
            setMember_ListData('');
        }
        setLoading(false);
    };
    // 회원 리스트 End

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
            dataIndex: 'User_Nm',
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
            dataIndex: 'User_Id',
            width: '120px',
            align: 'center'
        },
        {
            title: 'HP',
            dataIndex: 'User_Phone',
            width: '120px',
            align: 'center'
        },
        {
            title: 'E-Mail',
            dataIndex: 'User_Email',
            width: '120px',
            align: 'center'
        },
        {
            title: '분류',
            dataIndex: 'User_Type',
            width: '150px',
            align: 'center'
        },
        {
            title: '등록일',
            dataIndex: 'date',
            width: '150px',
            align: 'center'
        },
        {
            title: '접속횟수',
            dataIndex: 'Visited',
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
        handleMemberList('');
        // const timerId = setTimeout(() => {
        //     setLoading(false);
        // }, 300);
        // return () => clearTimeout(timerId);
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
                    총 {member_Total} 건
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
                            dataSource={member_ListData}
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
