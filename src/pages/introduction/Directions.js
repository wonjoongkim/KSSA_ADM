/* eslint-disable*/
import React, { useState } from 'react';
import { FloatButton, Breadcrumb, Row, Col, Input, Button } from 'antd';
import MainCard from 'components/MainCard';
import { HomeOutlined, EditOutlined, PhoneOutlined, PrinterOutlined, MailOutlined, IeOutlined, SearchOutlined } from '@ant-design/icons';
import { Editor_Conteiner } from '../editor/Editor_Conteiner';
import { KakaoMap } from './kakamap';

export const Directions = () => {
    const [address_disabled, setAddress_disabled] = useState(true);
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
                                    title: '교육원 소개'
                                },
                                {
                                    title: '오시는 길'
                                }
                            ]}
                        />
                    </>
                }
            ></MainCard>

            <Row gutter={[16, 16]} style={{ marginTop: '30px' }}>
                <Col xs={24} xl={12}>
                    <Input size="large" prefix={<PhoneOutlined style={{ color: '#777' }} />} placeholder="Tel" style={{ height: '55px' }} />
                </Col>
                <Col xs={24} xl={12}>
                    <Input
                        size="large"
                        prefix={<PrinterOutlined style={{ color: '#777' }} />}
                        placeholder="Fax"
                        style={{ height: '55px' }}
                    />
                </Col>
                <Col xs={24} xl={12}>
                    <Input
                        size="large"
                        prefix={<IeOutlined style={{ color: '#777' }} />}
                        placeholder="http://"
                        style={{ height: '55px' }}
                    />
                </Col>
                <Col xs={24} xl={12}>
                    <Input
                        size="large"
                        prefix={<MailOutlined style={{ color: '#777' }} />}
                        placeholder="Email"
                        style={{ height: '55px' }}
                    />
                </Col>
                <Col xs={24} xl={24}>
                    <Row gutter={[16, 16]}>
                        <Col xs={12} xl={4}>
                            <Button icon={<SearchOutlined />} type="primary" style={{ width: '100%', height: '55px' }}>
                                주소검색
                            </Button>
                        </Col>
                        <Col xs={12} xl={4}>
                            <Input
                                size="large"
                                prefix={<HomeOutlined style={{ color: '#777' }} />}
                                placeholder="우편번호"
                                style={{ height: '55px' }}
                                disabled
                            />
                        </Col>
                        <Col xs={24} xl={16}>
                            <Input
                                size="large"
                                placeholder="주소"
                                prefix={<EditOutlined />}
                                allowClear
                                enterButton="Search"
                                style={{ height: '55px' }}
                                disabled={address_disabled}
                            />
                        </Col>
                        <Col span={24}>
                            <Input
                                size="large"
                                prefix={<EditOutlined style={{ color: '#777' }} />}
                                placeholder="상세주소"
                                style={{ height: '55px' }}
                                disabled={address_disabled}
                            />
                        </Col>
                    </Row>
                </Col>
            </Row>
            <Row justify="center" style={{ marginTop: '20px' }}>
                <Col span={24}>
                    <KakaoMap />
                </Col>
            </Row>

            <FloatButton.BackTop />
        </>
    );
};
