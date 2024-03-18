/* eslint-disable*/
import React from 'react';
import { FloatButton, Breadcrumb, Row, Col } from 'antd';
import MainCard from 'components/MainCard';
import { HomeOutlined } from '@ant-design/icons';
import { Editor_Conteiner } from '../editor/Editor_Conteiner';

export const Facility = () => {
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
                                    title: '교육시설'
                                }
                            ]}
                        />
                    </>
                }
            ></MainCard>

            <Row style={{ marginTop: '30px' }}>
                <Col span={24}>
                    <Editor_Conteiner />
                </Col>
            </Row>

            <FloatButton.BackTop />
        </>
    );
};
