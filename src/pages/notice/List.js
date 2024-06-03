/* eslint-disable*/
import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { FloatButton, Breadcrumb, Spin, Row, Col, Table, Input, Button, Space, Modal, Tooltip } from 'antd';
import MainCard from 'components/MainCard';
import {
    HomeOutlined,
    FileDoneOutlined,
    DownloadOutlined,
    EyeOutlined,
    ScissorOutlined,
    EditFilled,
    DeleteFilled
} from '@ant-design/icons';
import { useBoardListMutation, useBoardViewMutation, useBoardDeleteMutation } from '../../hooks/api/BoardManagement/BoardManagement';

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
    const [board_ListData, setBoard_ListData] = useState(null); // 게시판 리스트 Data
    const [board_ViewData, setBoard_ViewData] = useState(null); // 게시판 상세정보 Data
    const [fileContainer, setFileContainer] = useState(null); // 게시판 파일 Data

    const [board_Search_Data, setBoard_Search_Data] = useState(''); // 게시판 검색 Data

    const [board_Total, setBoard_Total] = useState('0'); // 게시판 리스트 Data

    const DataOptions = { year: 'numeric', month: '2-digit', day: '2-digit' };
    // API Start

    // 게시물 리스트 Start
    const [BoardListApi] = useBoardListMutation();
    const handleBoardList = async (flag, search) => {
        const BoardListResponse = await BoardListApi({
            Board_Type: flag,
            Board_Search: search
        });
        if (BoardListResponse?.data?.RET_CODE === '0000') {
            setBoard_ListData(
                BoardListResponse?.data?.RET_DATA.map((d, i) => ({
                    key: d.Idx,
                    num: i + 1,
                    idx: d.Idx,
                    board_Type: d.Board_Type,
                    title: d.Subject,
                    visited: d.Visited,
                    date: new Date(d.InDate).toLocaleTimeString('ko-KR', DataOptions).substring(0, 12)
                }))
            );
            setBoard_Total(
                BoardListResponse?.data?.RET_DATA[0]?.Total === null || BoardListResponse?.data?.RET_DATA[0]?.Total === undefined
                    ? '0'
                    : BoardListResponse?.data?.RET_DATA[0]?.Total
            );
        } else {
            setBoard_ListData('');
        }
        setLoading(false);
    };
    // 게시물 리스트 End

    // 게시물 상세정보 Start
    const [BoardViewApi] = useBoardViewMutation();
    const handleBoardView = async (idx) => {
        const BoardViewResponse = await BoardViewApi({
            Board_Type: flagProp,
            Idx: idx
        });

        if (BoardViewResponse?.data?.RET_CODE === '0000') {
            setBoard_ViewData({
                Title: BoardViewResponse?.data?.RET_DATA?.result[0].Subject,
                Contents: BoardViewResponse?.data?.RET_DATA?.result[0].Contents,
                Date: BoardViewResponse?.data?.RET_DATA?.result[0].InDate
            });
            setFileContainer(BoardViewResponse?.data?.RET_DATA?.file_result);
        } else {
            setBoard_ViewData('');
        }
        setViewModal(true);
    };
    // 게시물 상세정보 End

    // 게시물 삭제 Start
    const [BoardDeleteApi] = useBoardDeleteMutation();
    const handleBoardDelete = async (idx) => {
        const BoardDeleteResponse = await BoardDeleteApi({
            Board_Type: flagProp,
            Idx: selectedRowKeys
        });
        if (BoardDeleteResponse?.data?.RET_CODE === '0000') {
            console.log(hasSelected);
            Modal.success({
                content: '삭제 성공.',
                onOk() {
                    setSelectedRowKeys('');
                    handleBoardList(flagProp, '');
                }
            });
        } else {
            Modal.error({
                content: '삭제 실패.',
                onOk() {}
            });
        }
    };
    // 게시물 삭제 End

    // API End

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
    const hasSelected = selectedRowKeys.length > 0 ? true : false;

    // 검색 Search
    const onSearch = (value, _e, info) => {
        // console.log(value);
        setBoard_Search_Data(value);
        handleBoardList(flagProp, value);
    };

    const columns = [
        {
            title: 'No',
            dataIndex: 'num',
            width: '80px',
            align: 'center'
        },
        {
            title: '제목',
            dataIndex: 'title',
            render: (_, { title, idx }) => (
                <Button
                    type="text"
                    onClick={() => {
                        handleBoardView(idx);
                    }}
                >
                    {title}
                </Button>
            )
        },
        {
            title: '조회수',
            dataIndex: 'visited',
            width: '120px',
            align: 'center'
        },
        {
            title: '등록일',
            dataIndex: 'date',
            width: '150px',
            align: 'center'
        },
        {
            title: '수정',
            dataIndex: 'edit',
            render: (text, { idx }) => (
                <Space>
                    <Link
                        to={{ pathname: '/notice/Write' }}
                        state={{ board: boardProp, flag: flagProp, title: titleProp, form: 'Edit', Idx: idx }}
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

    const onShowSizeChange = (current, pageSize) => {
        console.log(current, pageSize);
    };

    const handelviewModal_Close = () => {
        setViewModal(false);
    };

    useEffect(() => {
        setLoading(true);
        setBoardProp(location.state.board);
        setFlagProp(location.state.flag);
        setTitleProp(location.state.title);
        handleBoardList(location.state.flag, '');
    }, [location.state]);

    return (
        <>
            <MainCard
                title={
                    <Breadcrumb
                        items={[
                            {
                                href: '/',
                                title: <HomeOutlined />
                            },
                            {
                                title: `${boardProp}`
                            },
                            {
                                title: `${titleProp}`
                            }
                        ]}
                    />
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
                        placeholder="※ 통합 검색 (제목)"
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
                    총 {board_Total} 건
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
                                    onClick={() => handleBoardDelete()}
                                    style={{ backgroundColor: '#fa541c', height: '45px', width: '80px' }}
                                >
                                    삭제
                                </Button>
                            ) : (
                                ''
                            )}
                            <Link
                                to={{ pathname: '/notice/Write' }}
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
                            dataSource={board_ListData}
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
                width={'auto'}
                style={{
                    top: '85px',
                    zIndex: 99999
                }}
                footer={null}
            >
                <Spin tip="Loading..." spinning={viewLoading}>
                    <div id="contents">
                        {' '}
                        {/* Contents를 감싸는 div에 id를 부여하여 실제 너비를 계산합니다. */}
                        <Row
                            style={{
                                border: '2px solid #cfcfcf',
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
                                {board_ViewData?.Title}
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
                                {new Date(board_ViewData?.Date).toLocaleTimeString('ko-KR', DataOptions)}
                            </Col>
                        </Row>
                        <Row style={{ padding: '30px 0px' }}>
                            <Col>
                                <div dangerouslySetInnerHTML={{ __html: board_ViewData?.Contents }} />
                            </Col>
                        </Row>
                        {fileContainer.lenght > 0 ? (
                            <Row
                                gutter={[0, 8]}
                                style={{
                                    border: '2px solid #cfcfcf',
                                    borderRadius: '12px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    padding: '5px 20px'
                                }}
                            >
                                {fileContainer?.map((d, i) => (
                                    <>
                                        <Col xs={11} lg={14} style={{ display: 'flex', alignItems: 'center', justifyContent: 'start' }}>
                                            <a href="#">
                                                <FileDoneOutlined /> {d.Original_FileName}
                                            </a>
                                        </Col>
                                        <Col xs={13} lg={10} style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
                                            <Space>
                                                <Tooltip
                                                    title={<span style={{ fontSize: '13px' }}>다운로드</span>}
                                                    color={'#f50'}
                                                    placement="top"
                                                >
                                                    <Button
                                                        type="default"
                                                        icon={<DownloadOutlined />}
                                                        style={{
                                                            height: '30px',
                                                            width: '45px',
                                                            backgroundColor: '#efefef',
                                                            fontSize: '13px'
                                                        }}
                                                    ></Button>
                                                </Tooltip>
                                                <Tooltip
                                                    title={<span style={{ fontSize: '13px' }}>미리보기</span>}
                                                    color={'#108ee9'}
                                                    placement="top"
                                                >
                                                    <Button
                                                        type="default"
                                                        icon={<EyeOutlined />}
                                                        style={{
                                                            height: '30px',
                                                            width: '45px',
                                                            backgroundColor: '#efefef',
                                                            fontSize: '13px'
                                                        }}
                                                    ></Button>
                                                </Tooltip>
                                            </Space>
                                        </Col>
                                    </>
                                ))}
                            </Row>
                        ) : (
                            ''
                        )}
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
                                    Close
                                </Button>
                            </Col>
                        </Row>
                    </div>
                </Spin>
            </Modal>
            <FloatButton.BackTop />
        </>
    );
};
