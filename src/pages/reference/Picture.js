/* eslint-disable*/
import React, { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { FloatButton, Breadcrumb, Spin, Row, Col, Card, Input, Image, Divider, Pagination, Checkbox, Space, Button } from 'antd';
import MainCard from 'components/MainCard';
import { HomeOutlined, EditFilled, DeleteFilled, ScissorOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import './Style.css';
import g1 from '../../assets/images/g1.png';
import g2 from '../../assets/images/g2.png';
import g3 from '../../assets/images/g3.png';
import g4 from '../../assets/images/g4.png';
import g5 from '../../assets/images/g5.png';
import g6 from '../../assets/images/g6.png';
import g7 from '../../assets/images/g7.png';
import g8 from '../../assets/images/g8.png';
import g9 from '../../assets/images/g9.png';
import g10 from '../../assets/images/g10.png';

export const Picture = () => {
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    const [loading, setLoading] = useState(true); // 로딩 초기값
    const [pages, setPages] = useState(8);

    const StyledCheckbox = styled.div`
        .ant-checkbox .ant-checkbox-inner {
            border: 1px solid #94c7fa;
            width: 28px;
            height: 28px;
        }
        .ant-checkbox .ant-checkbox-inner:after {
            box-sizing: border-box;
            position: absolute;
            top: 50%;
            inset-inline-start: 21.5%;
            display: table;
            width: 9.7142857142857135px;
            height: 16.142857142857142px;
            border: 4px solid #fff;
            border-top: 0;
            border-inline-start: 0;
            transition: all 0.1s cubic-bezier(0.71, -0.46, 0.88, 0.6), opacity 0.1s;
        }
    `;

    const data = [
        {
            key: '1',
            title: '항공경비 초기교육 1차',
            date: '2023-10-31',
            unit: '40',
            images: [g4, g2, g3]
        },
        {
            key: '2',
            title: '항공경비 초기교육 2,3차',
            date: '2023-10-30',
            unit: '40',
            images: [g6, g3, g4, g5]
        },
        {
            key: '3',
            title: '항공경비 초기교육 4,5차',
            date: '2023-10-29',
            unit: '40',
            images: [g7, g4, g5]
        },
        {
            key: '4',
            title: '항공경비 초기교육 6차',
            date: '2023-10-28',
            unit: '40',
            images: [g5, g3, g5]
        },
        {
            key: '5',
            title: '보안검색 초기교육 1차',
            date: '2023-10-27',
            unit: '40',
            images: [g8, g5]
        },
        {
            key: '6',
            title: '항공경비 초기교육 2차',
            date: '2023-10-26',
            unit: '40',
            images: [g1, g4]
        }
    ];
    // const pages = 1; // 페이지당 표시할 데이터 수
    const [currentPage, setCurrentPage] = useState(1); // 현재 페이지
    const indexOfLastData = currentPage * pages; // 현재 페이지의 마지막 데이터 인덱스
    const indexOfFirstData = indexOfLastData - pages; // 현재 페이지의 첫 데이터 인덱스
    const currentData = data.slice(indexOfFirstData, indexOfLastData); // 현재 페이지에 표시할 데이터

    const onPageChange = (page, pageSize) => {
        setCurrentPage(page);
    };

    const onPageSizeChange = (current, size) => {
        setPages(size);
        console.log(current, size);
    };

    // 체크박스 Start
    const onSelectChange = (newSelectedRowKeys) => {
        // console.log('selectedRowKeys changed: ', ...newSelectedRowKeys);
        if (selectedRowKeys.includes(newSelectedRowKeys)) {
            setSelectedRowKeys(selectedRowKeys.filter((selectedKey) => selectedKey !== newSelectedRowKeys));
        } else {
            setSelectedRowKeys([...selectedRowKeys, newSelectedRowKeys]);
        }
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

    useEffect(() => {
        const timerId = setTimeout(() => {
            setLoading(false);
        }, 300);
        return () => clearTimeout(timerId);
    }, []);

    console.log(selectedRowKeys);

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
                                    title: '자료실'
                                },
                                {
                                    title: '사진자료'
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
                    사진자료
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
                                state={{ board: '자료실', flag: 'Picture', title: '사진자료', form: 'Write' }}
                            >
                                <Button icon={<EditFilled />} type="primary" style={{ height: '45px', width: '80px' }}>
                                    추가
                                </Button>
                            </Link>
                        </Space>
                    </Col>
                </Row>

                <Row gutter={[34, 32]} stify="space-evenly" style={{ marginTop: '20px' }}>
                    {currentData.map((d, i) => (
                        <>
                            <Col key={i} xs={24} lg={6} style={{ textAlign: 'center' }}>
                                <Card style={{ border: '2px solid #aac9f5', height: '430px' }} rowSelection={rowSelection}>
                                    <Row gutter={[0, 8]} style={{ border: '1px solid #e0e0e0', borderRadius: '5px', padding: '10px 0' }}>
                                        <Col span={24} style={{ fontSize: '17px', color: '#3d3d3de0', fontWeight: '600' }}>
                                            {d.title} [{d.unit}명]
                                        </Col>
                                        <Col span={24} style={{ fontSize: '15px', color: '#3d3d3de0' }}>
                                            {d.date}
                                        </Col>
                                    </Row>
                                    <Row style={{ marginTop: '10px' }}>
                                        <Col span={24} style={{ position: 'relative' }}>
                                            <div
                                                style={{
                                                    position: 'absolute',
                                                    right: '7px',
                                                    top: '7px',
                                                    zIndex: '1'
                                                }}
                                            >
                                                <StyledCheckbox>
                                                    <Checkbox
                                                        onChange={() => onSelectChange(d.key)}
                                                        checked={selectedRowKeys.includes(d.key)}
                                                    ></Checkbox>
                                                </StyledCheckbox>
                                            </div>
                                            <Image.PreviewGroup items={d.images}>
                                                <Image src={d.images[0]} style={{ borderRadius: '5px', minHeight: '290px' }} />
                                            </Image.PreviewGroup>
                                            <div
                                                style={{
                                                    position: 'absolute',
                                                    right: '7px',
                                                    bottom: '7px',
                                                    zIndex: '1'
                                                }}
                                            >
                                                <Link
                                                    to={{ pathname: '/reference/Write' }}
                                                    state={{ board: '자료실', flag: 'Picture', title: '사진자료', form: 'Edit' }}
                                                >
                                                    <Button
                                                        icon={<ScissorOutlined />}
                                                        type="primary"
                                                        style={{ backgroundColor: '#fa541c', color: '#ffffff', border: '0px' }}
                                                    >
                                                        수정
                                                    </Button>
                                                </Link>
                                            </div>
                                        </Col>
                                    </Row>
                                </Card>
                            </Col>
                        </>
                    ))}
                </Row>
                <Divider />
                <Row style={{ marginTop: '20px', diplay: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
                    <Col>
                        <Pagination
                            showSizeChanger
                            pageSize={pages}
                            defaultCurrent={1}
                            current={currentPage}
                            total={data.length}
                            onChange={onPageChange}
                            onShowSizeChange={onPageSizeChange}
                        />
                    </Col>
                </Row>
            </Spin>
            <FloatButton.BackTop />
        </>
    );
};
