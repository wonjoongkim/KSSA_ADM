/* eslint-disable*/
import React, { useState, useEffect } from 'react';
import { FloatButton, Breadcrumb, Table, Row, Space, Col, Spin, Input, Button, Modal, Select } from 'antd';
import MainCard from 'components/MainCard';
import { HomeOutlined, ScissorOutlined, EditFilled, DeleteFilled } from '@ant-design/icons';
import { useLocation, Link } from 'react-router-dom';
import { useCalenderListMutation } from '../../hooks/api/PreferencesManagement/PreferencesManagement';

export const EduSchedule = () => {
    const location = useLocation();
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const [loading, setLoading] = useState(false);
    const [viewLoading, setViewLoading] = useState(false);
    const [viewModal, setViewModal] = useState(false);
    const [calender_ListData, setCalender_ListData] = useState(false);
    const [calender_Total, setCalender_Total] = useState(false);

    const DataOptions = { year: 'numeric', month: '2-digit', day: '2-digit' };

    //=================================================================
    // 교육일정 리스트 Start
    const [CalenderListApi] = useCalenderListMutation();
    const handleCalenderList = async (search) => {
        const CalenderListResponse = await CalenderListApi({
            Calender_Search: search
        });
        if (CalenderListResponse?.data?.RET_CODE === '0000') {
            setCalender_ListData(
                CalenderListResponse?.data?.RET_DATA.map((d, i) => ({
                    key: d.Idx,
                    num: i + 1,
                    Edu_Nm: d.Edu_Nm,
                    Edu_Type: d.Edu_Type,
                    Base_Line: d.Base_Line,
                    Edu_Date_Start: d.Edu_Date_Start,
                    Edu_Date_End: d.Edu_Date_End,
                    Edu_Personnel: d.Edu_Personnel,
                    Edu_State: d.Edu_State,
                    date: new Date(d.InDate).toLocaleTimeString('ko-KR', DataOptions).substring(0, 12)
                }))
            );
            setCalender_Total(
                CalenderListResponse?.data?.RET_DATA[0]?.Total === null || CalenderListResponse?.data?.RET_DATA[0]?.Total === undefined
                    ? '0'
                    : CalenderListResponse?.data?.RET_DATA[0]?.Total
            );
        } else {
            setCalender_ListData('');
        }
        setLoading(false);
    };
    // 교육일정 리스트 End
    //=================================================================

    // 교육일정 상태 변경 Start
    const handleCalenderState = async (state) => {};

    // 교육일정 상태 변경 End

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
            dataIndex: 'Edu_Nm',
            align: 'center'
        },
        {
            title: '교육타입',
            dataIndex: 'Edu_Type',
            render: (_, { Edu_Type }) =>
                Edu_Type === '1'
                    ? '검색요원 초기교육'
                    : Edu_Type === '2'
                    ? '검색요원 정기교육'
                    : Edu_Type === '3'
                    ? '검색요원 인증평가'
                    : Edu_Type === '4'
                    ? '항공경비 초기교육'
                    : Edu_Type === '5'
                    ? '항공경비 정기교육'
                    : Edu_Type === '6'
                    ? '항공경비 인증평가'
                    : '',
            align: 'center'
        },
        {
            title: '차수',
            dataIndex: 'Base_Line',
            align: 'center'
        },
        {
            title: '교육일정',
            dataIndex: 'EduDate',
            align: 'center',
            render: (_, { Edu_Date_Start, Edu_Date_End }) =>
                `${new Date(Edu_Date_Start).toLocaleTimeString('ko-KR', DataOptions).substring(0, 12)} ~ ${new Date(Edu_Date_End)
                    .toLocaleTimeString('ko-KR', DataOptions)
                    .substring(0, 12)}`
        },
        {
            title: '교육인원',
            dataIndex: 'Edu_Personnel',
            align: 'center'
        },
        {
            title: '등록일',
            dataIndex: 'date',
            align: 'center'
        },
        {
            title: '설정',
            render: (_, { Edu_State, Edu_Date_Start, key }) => (
                <Space>
                    <Row gutter={[0, 8]}>
                        {Edu_State === '0' ? (
                            <Col span={24} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
                                {new Date(Edu_Date_Start).toLocaleTimeString('ko-KR', DataOptions).substring(0, 12) <
                                new Date().toLocaleTimeString('ko-KR', DataOptions).substring(0, 12) ? (
                                    <Button
                                        icon={<ScissorOutlined />}
                                        type="primary"
                                        style={{ backgroundColor: '#70AD47', height: '33px', width: '110px' }}
                                        onClick={() => onCalenderState(0)}
                                    >
                                        모집중
                                    </Button>
                                ) : (
                                    <Button
                                        icon={<ScissorOutlined />}
                                        type="primary"
                                        style={{ backgroundColor: '#acacac', height: '33px', width: '110px' }}
                                        onClick={() => onCalenderState(1)}
                                    >
                                        모집완료
                                    </Button>
                                )}
                            </Col>
                        ) : Edu_State === '1' ? (
                            <Col span={24} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
                                <Button
                                    icon={<ScissorOutlined />}
                                    type="primary"
                                    style={{ backgroundColor: '#5b9bd5', height: '33px', width: '110px' }}
                                    onClick={() => onCalenderState(2)}
                                >
                                    마감
                                </Button>
                            </Col>
                        ) : Edu_State === '2' ? (
                            <Col span={24} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
                                <Button
                                    icon={<ScissorOutlined />}
                                    type="primary"
                                    style={{ backgroundColor: '#909090', height: '33px', width: '110px' }}
                                >
                                    이수
                                </Button>
                            </Col>
                        ) : (
                            ''
                        )}
                        <Col span={24} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
                            <Link
                                to={{ pathname: '/preferences/Write' }}
                                state={{ board: '환경설정', flag: 'preferences', title: '교육일정', form: 'Edit', idx: key }}
                            >
                                <Button
                                    icon={<ScissorOutlined />}
                                    type="primary"
                                    style={{ backgroundColor: '#fa541c', height: '33px', width: '110px' }}
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
    const onSearch = (value, _e, info) => {
        handleCalenderList(value);
    };

    const onSelect = (value) => {
        console.log(`selected ${value}`);
    };

    const onShowSizeChange = (current, pageSize) => {
        setPages(current);
        setPageSize(pageSize);
        // console.log(current, pageSize);
    };

    const onCalenderState = (flag) => {
        if (flag === 0) {
            const confirmDelete = window.confirm('아직 모집기간이 남아있습니다. 그래도 "모집완료"처리를 하실껀가요?');
            if (confirmDelete) {
                handleCalenderState(1);
            } else {
            }
        } else if (flag === 1) {
            const confirmDelete = window.confirm('"마감처리"하시겠습니까?');
            if (confirmDelete) {
                handleCalenderState(1);
            } else {
            }
        } else if (flag === 2) {
            const confirmDelete = window.confirm('"이수처리"하시겠습니까?');
            if (confirmDelete) {
                handleCalenderState(2);
            } else {
            }
        }
    };

    useEffect(() => {
        setLoading(true);
        handleCalenderList('');
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
                    총 {calender_Total} 건
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
                            dataSource={calender_ListData}
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
