/* eslint-disable*/
import React from 'react';
import { FloatButton, Breadcrumb } from 'antd';
import MainCard from 'components/MainCard';
import { HomeOutlined } from '@ant-design/icons';

export const Student = () => {
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
                                    title: '교육 신청 리스트'
                                }
                            ]}
                        />
                    </>
                }
            ></MainCard>
            <FloatButton.BackTop />
        </>
    );
};
