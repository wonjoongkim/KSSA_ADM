/* eslint-disable*/
import React, { useState, useEffect, useRef } from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import { FloatButton, Breadcrumb, Spin, Card, Row, Col, DatePicker, Input, Button, Select, Divider, Space, InputNumber, Modal } from 'antd';
import MainCard from 'components/MainCard';
import { HomeOutlined, EditOutlined } from '@ant-design/icons';
import {
    useCalenderInsertMutation,
    useCalenderUpdateMutation,
    useCalenderViewMutation
} from '../../hooks/api/PreferencesManagement/PreferencesManagement';
import './Style.css';

import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
dayjs.extend(customParseFormat);
import locale from 'antd/es/date-picker/locale/ko_KR';

export const Write = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [itemContainer, setItemContainer] = useState(null); // 항목 컨테이너
    const [boardProp, setBoardProp] = useState(null); // 타겟 타이틀 명
    const [flagProp, setFlagProp] = useState(null); // 타겟 게시판 명
    const [titleProp, setTitleProp] = useState(null); // 타겟 게시판 타이틀
    const [formProp, setFormProp] = useState(null); // 타겟 게시판 등록/수정
    const [boardIdx, setBoardIdx] = useState(null); // 타겟 게시판 Idx

    //=================================================================
    // 교육일정 등록 Start
    const [CalenderInsertApi] = useCalenderInsertMutation();
    const handleCalenderInser = async (search) => {
        const CalenderInserResponse = await CalenderInsertApi({
            Edu_Nm: itemContainer.Edu_Nm,
            Edu_Type: itemContainer.Edu_Type,
            Base_Line: itemContainer.Base_Line,
            Edu_Date_Start: itemContainer.Edu_Date_Start,
            Edu_Date_End: itemContainer.Edu_Date_End,
            Edu_Personnel: itemContainer.Edu_Personnel
        });
        if (CalenderInserResponse?.data?.RET_CODE === '0000') {
            Lists();
        } else {
            setItemContainer('');
        }
        setLoading(false);
    };
    // 교육일정 등록 End
    //=================================================================

    //=================================================================
    // 교육일정 수정 Start
    const [CalenderUpdateApi] = useCalenderUpdateMutation();
    const handleCalenderUpdate = async () => {
        const CalenderUpdateResponse = await CalenderUpdateApi({
            Edu_Nm: itemContainer.Edu_Nm,
            Edu_Type: itemContainer.Edu_Type,
            Edu_State: itemContainer.Edu_State,
            Base_Line: itemContainer.Base_Line,
            Edu_Date_Start: itemContainer.Edu_Date_Start,
            Edu_Date_End: itemContainer.Edu_Date_End,
            Edu_Personnel: itemContainer.Edu_Personnel,
            Idx: boardIdx
        });
        if (CalenderUpdateResponse?.data?.RET_CODE === '0000') {
            handleCalenderView(boardIdx);
        } else {
            setItemContainer('');
        }
        setLoading(false);
    };
    // 교육일정 수정 End
    //=================================================================

    //=================================================================
    // 교육일정 상세정보 Start
    const [CalenderViewApi] = useCalenderViewMutation();
    const handleCalenderView = async (boardIdx) => {
        const CalenderViewResponse = await CalenderViewApi({
            Idx: boardIdx
        });
        if (CalenderViewResponse?.data?.RET_CODE === '0000') {
            setItemContainer({
                ...itemContainer,
                Edu_Nm: CalenderViewResponse?.data?.RET_DATA[0].Edu_Nm,
                Edu_Type: CalenderViewResponse?.data?.RET_DATA[0].Edu_Type,
                Base_Line: CalenderViewResponse?.data?.RET_DATA[0].Base_Line,
                Edu_Date_Start: CalenderViewResponse?.data?.RET_DATA[0].Edu_Date_Start.substring(0, 10),
                Edu_Date_End: CalenderViewResponse?.data?.RET_DATA[0].Edu_Date_End.substring(0, 10),
                Edu_State: CalenderViewResponse?.data?.RET_DATA[0].Edu_State,
                Edu_Personnel: CalenderViewResponse?.data?.RET_DATA[0].Edu_Personnel
            });
        } else {
            setItemContainer('');
        }
        setLoading(false);
    };
    // 교육일정 상세정보 End
    //=================================================================

    //=================================================================
    // 분류 Start
    const onSelect_State = (value) => {
        console.log(value);
        setItemContainer({ ...itemContainer, Edu_State: value });
    };

    const onSelect_Type = (value) => {
        setItemContainer({ ...itemContainer, Edu_Type: value });
    };

    const onSearch = (value) => {
        console.log('search:', value);
    };

    const filterOption = (input, option) => (option?.label ?? '').toLowerCase().includes(input.toLowerCase());
    // 분류 End
    //=================================================================

    //=================================================================
    // 등록 Start
    const handel_Insert = () => {
        console.log(itemContainer);
        if (
            itemContainer.Edu_State &&
            itemContainer.Edu_Nm &&
            itemContainer.Edu_Type &&
            itemContainer.Edu_Date_Start &&
            itemContainer.Edu_Date_End &&
            itemContainer.Edu_Personnel
        ) {
            setLoading(true);
            handleCalenderInser();
        } else {
            Modal.error({
                content: '모든 항목은 필수 항목입니다.',
                onOk() {}
            });
        }
    };
    // 등록 End
    //=================================================================

    //=================================================================
    // 수정 Start

    const handel_Update = () => {
        if (
            itemContainer.Edu_State &&
            itemContainer.Edu_Nm &&
            itemContainer.Edu_Type &&
            itemContainer.Edu_Date_Start &&
            itemContainer.Edu_Date_End &&
            itemContainer.Edu_Personnel
        ) {
            setLoading(true);
            handleCalenderUpdate();
        } else {
            Modal.error({
                content: '모든 항목은 필수 항목입니다.',
                onOk() {}
            });
        }
    };
    // 수정 End
    //=================================================================

    //=================================================================
    // 목록 Start
    const Lists = () => {
        navigate('/preferences/EduSchedule', { state: { board: boardProp, flag: flagProp, title: titleProp } });
    };
    // 목록 End
    //=================================================================

    useEffect(() => {
        setBoardProp(location.state.board);
        setFlagProp(location.state.flag);
        setTitleProp(location.state.title);
        setFormProp(location.state.form);
        setBoardIdx(location.state.idx);
        location.state.idx !== '' ? handleCalenderView(location.state.idx) : '';
    }, [location.state]);

    console.log(itemContainer);
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
                                onChange={onSelect_State}
                                name="Edu_State"
                                onSearch={onSearch}
                                filterOption={filterOption}
                                value={itemContainer?.Edu_State}
                                options={[
                                    {
                                        value: '0',
                                        label: '모집 (R)'
                                    },
                                    {
                                        value: '1',
                                        label: '마감 (D)'
                                    },
                                    {
                                        value: '2',
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
                                        value={itemContainer?.Edu_Nm}
                                        onChange={(e) => setItemContainer({ ...itemContainer, Edu_Nm: e.target.value })}
                                        allowClear
                                        name="Edu_Nm"
                                        enterButton="Search"
                                        style={{ height: '55px' }}
                                    />
                                </Col>
                            </Row>
                        </Col>
                        <Col span={24}>
                            <Row>
                                <Col span={24}>
                                    <Select
                                        showSearch
                                        placeholder="교육타입"
                                        optionFilterProp="children"
                                        onChange={onSelect_Type}
                                        onSearch={onSearch}
                                        name="Edu_Type"
                                        value={itemContainer?.Edu_Type}
                                        filterOption={filterOption}
                                        options={[
                                            {
                                                value: '1',
                                                label: '검색요원 초기교육'
                                            },
                                            {
                                                value: '2',
                                                label: '검색요원 정기교육'
                                            },
                                            {
                                                value: '3',
                                                label: '검색요원 인증평가'
                                            },
                                            {
                                                value: '4',
                                                label: '항공경비 초기교육'
                                            },
                                            {
                                                value: '5',
                                                label: '항공경비 정기교육'
                                            },
                                            {
                                                value: '6',
                                                label: '항공경비 인증평가'
                                            }
                                        ]}
                                        style={{ width: '100%' }}
                                    />
                                </Col>
                            </Row>
                        </Col>
                        <Col span={24}>
                            <DatePicker.RangePicker
                                style={{ width: '100%', height: '45px' }}
                                locale={locale}
                                onChange={(dates) => {
                                    setItemContainer({
                                        ...itemContainer,
                                        Edu_Date_Start: dayjs(dates[0]).format('YYYY-MM-DD'),
                                        Edu_Date_End: dayjs(dates[1]).format('YYYY-MM-DD')
                                    });
                                }}
                                value={[
                                    itemContainer?.Edu_Date_Start === undefined ? '' : dayjs(itemContainer?.Edu_Date_Start),
                                    itemContainer?.Edu_Date_End === undefined ? '' : dayjs(itemContainer?.Edu_Date_End)
                                ]}
                                placeholder={['시작일', '종료일']}
                            />
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
                                    name="Edu_Personnel"
                                    value={itemContainer?.Edu_Personnel}
                                    addonAfter="명"
                                    onChange={(e) => setItemContainer({ ...itemContainer, Edu_Personnel: e })}
                                    style={{ height: '55px', width: '100%' }}
                                />
                            </Space>
                        </Col>

                        <Col xs={24} xl={12}>
                            <InputNumber
                                min={1}
                                max={100}
                                placeholder="차수"
                                name="Base_Line"
                                value={itemContainer?.Base_Line}
                                addonAfter="차수"
                                onChange={(e) => setItemContainer({ ...itemContainer, Base_Line: e })}
                                style={{ height: '55px', width: '100%' }}
                            />
                        </Col>
                    </Row>
                </Card>
                <Divider />
                <Row style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <Col
                        xs={{
                            span: 12,
                            offset: 1
                        }}
                        lg={{
                            span: 2,
                            offset: 2
                        }}
                    >
                        {formProp === 'Write' ? (
                            <Button
                                icon={<EditOutlined />}
                                onClick={(e) => handel_Insert()}
                                type="primary"
                                style={{ height: '45px', width: '160px' }}
                            >
                                등록
                            </Button>
                        ) : (
                            <Button
                                icon={<EditOutlined />}
                                onClick={(e) => handel_Update()}
                                type="primary"
                                style={{ height: '45px', width: '160px' }}
                            >
                                수정
                            </Button>
                        )}
                    </Col>
                    <Col
                        xs={{
                            span: 8,
                            offset: 1
                        }}
                        lg={{
                            span: 4,
                            offset: 2
                        }}
                    >
                        <Button
                            icon={<EditOutlined />}
                            onClick={(e) => Lists()}
                            type="primary"
                            style={{ backgroundColor: '#70AD47', height: '45px', width: '80px' }}
                        >
                            목록
                        </Button>
                    </Col>
                </Row>
            </Spin>
            <FloatButton.BackTop />
        </>
    );
};
