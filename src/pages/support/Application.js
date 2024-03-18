/* eslint-disable*/
import React from 'react';
import { FloatButton, Breadcrumb, Row, Col } from 'antd';
import MainCard from 'components/MainCard';
import { HomeOutlined } from '@ant-design/icons';
import { Editor_Conteiner } from '../editor/Editor_Conteiner';

export const Application = () => {
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
                                    title: '직업훈련비지원'
                                },
                                {
                                    title: '신청방법'
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
