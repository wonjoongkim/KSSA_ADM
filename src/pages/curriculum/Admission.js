/* eslint-disable*/
import React from 'react';
import { FloatButton, Breadcrumb, Row, Col } from 'antd';
import MainCard from 'components/MainCard';
import { HomeOutlined } from '@ant-design/icons';
import { Editor_Conteiner } from '../editor/Editor_Conteiner';

export const Admission = () => {
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
                                    title: '교육과정'
                                },
                                {
                                    title: '입교절차'
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
