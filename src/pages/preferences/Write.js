/* eslint-disable*/
import React, { useState, useEffect, useRef } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { FloatButton, Breadcrumb, Spin, Card, Row, Col, DatePicker, Input, Button, Select, Divider, Space, InputNumber } from 'antd';
import MainCard from 'components/MainCard';
import {
    HomeOutlined,
    EditOutlined,
    LockOutlined,
    FormOutlined,
    SearchOutlined,
    MobileOutlined,
    MailOutlined,
    EnvironmentOutlined
} from '@ant-design/icons';
import '@toast-ui/editor/dist/i18n/ko-kr';
import '@toast-ui/editor/dist/toastui-editor.css';
import colorSyntax from '@toast-ui/editor-plugin-color-syntax';
import 'tui-color-picker/dist/tui-color-picker.css';
import '@toast-ui/editor-plugin-color-syntax/dist/toastui-editor-plugin-color-syntax.css';
import { Editor } from '@toast-ui/react-editor';

import { useDropzone } from 'react-dropzone';
import dayjs from 'dayjs';
import './Style.css';

export const Write = () => {
    const { RangePicker } = DatePicker;
    const location = useLocation();
    const [loading, setLoading] = useState(false);
    const editorRef = useRef(null);
    const [heightSize, setHeightSize] = useState(window.innerHeight);
    const [formProp, setFormProp] = useState(null); // 타겟 게시판 등록/수정
    const [typeState, setTypeState] = useState(false); // 분류별 폼
    const [itemContainer, setItemContainer] = useState(null); // 항목 컨테이너

    const [infoType, setInfoType] = useState(false);

    const disabledDate = (current) => {
        console.log(current);
        // Can not select days before today and today
        return current <= dayjs().endOf('day');
    };

    const onChange = (date, dateString) => {
        console.log(date, dateString);
    };

    const onNumChange = (value) => {
        console.log('changed', value);
    };

    // 분류 Start
    const onSelect = (value) => {
        setTypeState(value);
        console.log(`selected ${value}`);
    };

    const onSearch = (value) => {
        console.log('search:', value);
    };

    const filterOption = (input, option) => (option?.label ?? '').toLowerCase().includes(input.toLowerCase());
    // 분류 End

    const editor_onChange = (html) => {
        // props.editor_onChange(html);
        console.log(html);
    };

    const handleResize = () => {
        setHeightSize(window.innerHeight);
    };

    useEffect(() => {
        window.addEventListener('resize', handleResize);
        const timerId = setTimeout(() => {
            setLoading(false);
        }, 300);
        return () => {
            clearTimeout(timerId);
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    useEffect(() => {
        setFormProp(location.state.form);
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
            <Spin tip="Loading..." spinning={loading}>
                <Card title={formProp === 'Write' ? '등록' : '수정'} style={{ marginTop: '30px' }}>
                    <Row gutter={[16, 32]}>
                        <Col span={24}>
                            <Select
                                showSearch
                                placeholder="상태"
                                optionFilterProp="children"
                                onChange={onSelect}
                                onSearch={onSearch}
                                filterOption={filterOption}
                                options={[
                                    {
                                        value: 'Recruited',
                                        label: '모집 (R)'
                                    },
                                    {
                                        value: 'Deadline',
                                        label: '마감 (D)'
                                    },
                                    {
                                        value: 'Complete',
                                        label: '이수 (C)'
                                    }
                                ]}
                                style={{ width: '100%' }}
                            />
                        </Col>
                        <Col span={24}>
                            <Row>
                                <Col span={24}>
                                    <Input
                                        size="large"
                                        placeholder="교육명"
                                        prefix={<EditOutlined />}
                                        allowClear
                                        enterButton="Search"
                                        style={{ height: '55px' }}
                                    />
                                </Col>
                            </Row>
                        </Col>

                        <Col span={24}>
                            <RangePicker style={{ height: '55px', width: '100%' }} size="large" placeholder={['시작일', '종료일']} />
                        </Col>

                        <Col xs={24} xl={12}>
                            <Space
                                direction="vertical"
                                style={{
                                    width: '100%'
                                }}
                            >
                                <InputNumber
                                    min={1}
                                    max={100}
                                    placeholder="교육인원"
                                    // defaultValue={30}
                                    onChange={onNumChange}
                                    style={{ height: '55px', width: '100%' }}
                                />
                            </Space>
                        </Col>

                        <Col xs={24} xl={12}>
                            <Input
                                prefix={<FormOutlined style={{ color: '#777' }} />}
                                size="large"
                                placeholder="차수"
                                style={{ height: '55px' }}
                            />
                        </Col>
                    </Row>
                </Card>
            </Spin>
            <FloatButton.BackTop />
        </>
    );
};
