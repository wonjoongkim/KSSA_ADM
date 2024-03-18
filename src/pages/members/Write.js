/* eslint-disable*/
import React, { useState, useEffect, useRef } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { FloatButton, Breadcrumb, Spin, Card, Row, Col, DatePicker, Input, Button, Select, Divider, Space } from 'antd';
import MainCard from 'components/MainCard';
import {
    HomeOutlined,
    EditOutlined,
    LockOutlined,
    EyeInvisibleOutlined,
    FileSyncOutlined,
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

const dateFormat = 'YYYY-MM-DD';

export const Write = () => {
    const location = useLocation();
    const [loading, setLoading] = useState(false);
    const editorRef = useRef(null);
    const [heightSize, setHeightSize] = useState(window.innerHeight);
    const [formProp, setFormProp] = useState(null); // 타겟 게시판 등록/수정
    const [typeState, setTypeState] = useState(false); // 분류별 폼
    const [itemContainer, setItemContainer] = useState(null); // 항목 컨테이너

    const [infoType, setInfoType] = useState(false);

    const onChange = (date, dateString) => {
        console.log(date, dateString);
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
            <Spin tip="Loading..." spinning={loading}>
                <Card title={formProp === 'Write' ? '등록' : '수정'} style={{ marginTop: '30px' }}>
                    <Row gutter={[16, 32]}>
                        <Col xs={24} xl={12}>
                            <Row>
                                <Col span={24}>
                                    <Row gutter={[16, 16]}>
                                        <Col span={16}>
                                            <Input
                                                size="large"
                                                placeholder="아이디를 입력해주세요"
                                                prefix={<EditOutlined />}
                                                allowClear
                                                enterButton="Search"
                                                style={{ height: '55px' }}
                                            />
                                        </Col>
                                        <Col span={8}>
                                            <Button type="primary" style={{ width: '100%', height: '55px' }}>
                                                중복확인
                                            </Button>
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                        </Col>
                        <Col xs={24} xl={12}>
                            <Row>
                                <Col span={24}>
                                    <DatePicker
                                        placeholder="등록일"
                                        defaultValue={dayjs('2024-03-04', dateFormat)}
                                        onChange={onChange}
                                        style={{ height: '55px', width: '100%' }}
                                    />
                                </Col>
                            </Row>
                        </Col>

                        <Col xs={24} xl={12}>
                            <Input.Password
                                prefix={<LockOutlined style={{ color: '#777' }} />}
                                iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                                size="large"
                                placeholder="비밀번호는 9~12자로 가능합니다."
                                style={{ height: '55px' }}
                            />
                        </Col>
                        <Col xs={24} xl={12}>
                            <Input.Password
                                prefix={<LockOutlined style={{ color: '#777' }} />}
                                iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                                size="large"
                                placeholder="비밀번호 확인"
                                style={{ height: '55px' }}
                            />
                        </Col>

                        <Col xs={24} xl={12}>
                            <Select
                                showSearch
                                placeholder="가입 분류"
                                optionFilterProp="children"
                                onChange={onSelect}
                                onSearch={onSearch}
                                filterOption={filterOption}
                                options={[
                                    {
                                        value: 'T',
                                        label: '교육생 (T)'
                                    },
                                    {
                                        value: 'C',
                                        label: '업체 (C)'
                                    },
                                    {
                                        value: 'A',
                                        label: '협회 (A)'
                                    }
                                ]}
                                style={{ width: '100%' }}
                            />
                        </Col>
                        <Col xs={24} xl={12}>
                            <Input.Password
                                prefix={<LockOutlined style={{ color: '#777' }} />}
                                iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
                                size="large"
                                placeholder="사용여부"
                                style={{ height: '55px' }}
                            />
                        </Col>
                        {/* 교육생 등록 폼 Start */}
                        <Col span={24} style={{ fontSize: '15px' }}>
                            {typeState === 'T' ? (
                                <>
                                    <Divider />
                                    <Row
                                        gutter={[24, 24]}
                                        justify="center"
                                        style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}
                                    >
                                        <Col xs={24} xl={5}>
                                            <Button
                                                type="primary"
                                                icon={<FileSyncOutlined style={{ fontSize: '50px' }} />}
                                                style={{
                                                    fontSize: '17px',
                                                    fontWeight: '600',
                                                    width: '100%',
                                                    height: '110px',
                                                    backgroundColor: '#ED7D31'
                                                }}
                                                onClick={() => setInfoType(false)}
                                            >
                                                기본 정보 [XBT정보 연동]
                                            </Button>
                                        </Col>
                                        <Col xs={24} xl={5}>
                                            <Button
                                                type="primary"
                                                icon={<FormOutlined style={{ fontSize: '50px' }} />}
                                                style={{
                                                    fontSize: '17px',
                                                    fontWeight: '600',
                                                    width: '100%',
                                                    height: '110px',
                                                    backgroundColor: '#4472C4'
                                                }}
                                                onClick={() => setInfoType(true)}
                                            >
                                                기본 정보 [직접입력]
                                            </Button>
                                        </Col>
                                    </Row>
                                    <Divider />
                                    {/* 기본정보1 */}
                                    <Card title="기본 정보 [XBT정보]">
                                        <Row gutter={[16, 16]}>
                                            <Col xs={24} xl={3} className="colTitle1 hidden-xs">
                                                교육과정 정보
                                            </Col>
                                            <Col xs={24} xl={21}>
                                                <Row gutter={[16, 16]}>
                                                    <Col xs={24} xl={10}>
                                                        <Input
                                                            size="large"
                                                            prefix={<HomeOutlined style={{ color: '#777' }} />}
                                                            placeholder="교육과정 이름"
                                                            style={{ height: '55px' }}
                                                        />
                                                    </Col>
                                                    <Col xs={24} xl={10}>
                                                        <Input
                                                            size="large"
                                                            placeholder="교육과정 아이디(휴대폰 번호)"
                                                            prefix={<EditOutlined />}
                                                            allowClear
                                                            enterButton="Search"
                                                            style={{ height: '55px' }}
                                                        />
                                                    </Col>
                                                    <Col xs={24} xl={4}>
                                                        <Button
                                                            icon={<SearchOutlined />}
                                                            type="primary"
                                                            style={{ width: '100%', height: '55px' }}
                                                        >
                                                            정보연동
                                                        </Button>
                                                    </Col>
                                                </Row>
                                            </Col>
                                        </Row>
                                    </Card>
                                    <br />
                                    <br />
                                    {/* 기본정보2 */}
                                    {infoType === true ? (
                                        <Card title="기본정보 [직접입력]">
                                            <Row gutter={[16, 16]}>
                                                <Col xs={24} xl={3} className="colTitle1 hidden-xs">
                                                    이름 / 연락처
                                                </Col>
                                                <Col xs={24} xl={21}>
                                                    <Row gutter={[16, 16]}>
                                                        <Col xs={24} xl={12}>
                                                            <Input
                                                                prefix={<EditOutlined style={{ color: '#777' }} />}
                                                                size="large"
                                                                placeholder="이름"
                                                                style={{ height: '55px' }}
                                                            />
                                                        </Col>
                                                        <Col xs={24} xl={12}>
                                                            <Input
                                                                prefix={<MobileOutlined style={{ color: '#777' }} />}
                                                                size="large"
                                                                placeholder="연락처"
                                                                style={{ height: '55px' }}
                                                            />
                                                        </Col>
                                                    </Row>
                                                </Col>
                                                <Col xs={24} xl={3} className="colTitle1 hidden-xs">
                                                    이메일
                                                </Col>
                                                <Col span={24} xl={21}>
                                                    <Input
                                                        prefix={<MailOutlined style={{ color: '#777' }} />}
                                                        size="large"
                                                        placeholder="담당자 이메일"
                                                        style={{ height: '55px' }}
                                                    />
                                                </Col>
                                                <Col xs={24} xl={3} className="colTitle1 hidden-xs">
                                                    주소
                                                </Col>
                                                <Col xs={24} xl={21}>
                                                    <Row gutter={[16, 16]}>
                                                        <Col xs={12} xl={4}>
                                                            <Button
                                                                icon={<SearchOutlined />}
                                                                type="primary"
                                                                style={{ width: '100%', height: '55px' }}
                                                            >
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
                                                            />
                                                        </Col>
                                                        <Col span={24}>
                                                            <Input
                                                                size="large"
                                                                prefix={<EditOutlined style={{ color: '#777' }} />}
                                                                placeholder="상세주소"
                                                                style={{ height: '55px' }}
                                                            />
                                                        </Col>
                                                    </Row>
                                                </Col>
                                            </Row>
                                        </Card>
                                    ) : (
                                        ''
                                    )}
                                    <Space
                                        style={{
                                            width: '100%',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            textAlign: 'center'
                                        }}
                                    >
                                        <Button
                                            type="primary"
                                            onClick={() => Save()}
                                            style={{ width: '120px', height: '50px', fontWeight: '600' }}
                                        >
                                            저장
                                        </Button>
                                        <Button
                                            type="primary"
                                            onClick={() => Cancel()}
                                            style={{ width: '120px', height: '50px', fontWeight: '600', backgroundColor: 'orange' }}
                                        >
                                            취소
                                        </Button>
                                    </Space>
                                </>
                            ) : /* 교육생 등록 폼 End */

                            /* 업체 등록 폼 Start */
                            typeState === 'C' ? (
                                <>
                                    {/* 업체 정보 */}
                                    <Divider />
                                    <Card title="업체 정보">
                                        <Row gutter={[16, 16]}>
                                            <Col xs={24} xl={3} className="colTitle1 hidden-xs">
                                                업체명
                                            </Col>
                                            <Col xs={24} xl={21}>
                                                <Input
                                                    prefix={<EditOutlined style={{ color: '#777' }} />}
                                                    placeholder="업체명"
                                                    size="large"
                                                    style={{ height: '55px' }}
                                                />
                                            </Col>
                                            <Col xs={24} xl={3} className="colTitle1 hidden-xs">
                                                업체주소
                                            </Col>
                                            <Col xs={24} xl={21}>
                                                <Row gutter={[16, 16]}>
                                                    <Col xs={12} xl={4}>
                                                        <Button
                                                            icon={<SearchOutlined />}
                                                            type="primary"
                                                            style={{ width: '100%', height: '55px' }}
                                                        >
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
                                                            prefix={<EnvironmentOutlined />}
                                                            allowClear
                                                            enterButton="Search"
                                                            style={{ height: '55px' }}
                                                        />
                                                    </Col>
                                                    <Col span={24}>
                                                        <Input
                                                            size="large"
                                                            prefix={<EditOutlined style={{ color: '#777' }} />}
                                                            placeholder="상세주소"
                                                            style={{ height: '55px' }}
                                                        />
                                                    </Col>
                                                </Row>
                                            </Col>
                                        </Row>
                                    </Card>
                                    <br />
                                    <br />
                                    {/* 담당자 정보 */}
                                    <Card title="담당자 정보">
                                        <Row gutter={[16, 16]}>
                                            <Col xs={24} xl={3} className="colTitle1 hidden-xs">
                                                이름 / 연락처
                                            </Col>
                                            <Col xs={24} xl={21}>
                                                <Row gutter={[16, 16]}>
                                                    <Col xs={24} xl={12}>
                                                        <Input
                                                            prefix={<EditOutlined style={{ color: '#777' }} />}
                                                            size="large"
                                                            placeholder="담당자 이름"
                                                            style={{ height: '55px' }}
                                                        />
                                                    </Col>
                                                    <Col xs={24} xl={12}>
                                                        <Input
                                                            prefix={<MobileOutlined style={{ color: '#777' }} />}
                                                            size="large"
                                                            placeholder="담당자 연락처"
                                                            style={{ height: '55px' }}
                                                        />
                                                    </Col>
                                                </Row>
                                            </Col>
                                            <Col xs={24} xl={3} className="colTitle1 hidden-xs">
                                                이메일
                                            </Col>
                                            <Col span={24} xl={21}>
                                                <Input
                                                    prefix={<MailOutlined style={{ color: '#777' }} />}
                                                    size="large"
                                                    placeholder="담당자 이메일"
                                                    style={{ height: '55px' }}
                                                />
                                            </Col>
                                        </Row>
                                    </Card>
                                    <br />
                                    <br />
                                    <Space
                                        style={{
                                            width: '100%',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            textAlign: 'center'
                                        }}
                                    >
                                        <Button
                                            type="primary"
                                            onClick={() => Save()}
                                            style={{ width: '120px', height: '50px', fontWeight: '600' }}
                                        >
                                            저장
                                        </Button>
                                        <Button
                                            type="primary"
                                            onClick={() => Cancel()}
                                            style={{ width: '120px', height: '50px', fontWeight: '600', backgroundColor: 'orange' }}
                                        >
                                            취소
                                        </Button>
                                    </Space>
                                </> /* 업체 등록 폼 End */
                            ) : /* 협회 등록 폼 Start */
                            typeState === 'C' ? (
                                '협회' /* 협회 등록 폼 End */
                            ) : (
                                ''
                            )}
                        </Col>
                    </Row>
                </Card>
            </Spin>
            <FloatButton.BackTop />
        </>
    );
};
