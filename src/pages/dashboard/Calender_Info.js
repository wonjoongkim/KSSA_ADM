import React, { useEffect, useRef, useState } from 'react';
import { Card, Space, Row, Col, Modal, Button, Input, Divider, DatePicker } from 'antd';

// API Hooks Start
import {
    useCalenderViewMutation,
    useCalenderUpdateMutation,
    useCalenderDeleteMutation
} from '../../hooks/api/CalenderManagement/CalenderManagement';
// API Hooks End

import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
dayjs.extend(customParseFormat);
import locale from 'antd/es/date-picker/locale/ko_KR';

export const Calender_Info = (props) => {
    const dateFormat = 'YYYY-MM-DD';
    const { RangePicker } = DatePicker;
    const [eventsViewContainer, setEventsViewContainer] = useState(null); // 이벤트 클릭 정보

    // ==================================================================================================
    // 교육일정 상세 (Calender View)
    const [CalenderViewApi] = useCalenderViewMutation();
    const handelCalenderView = async (idx) => {
        const CalenderViewResponse = await CalenderViewApi({
            Idx: idx
        });
        if (CalenderViewResponse?.data?.RET_CODE === '0000') {
            setEventsViewContainer({
                id: CalenderViewResponse?.data?.RET_DATA[0]?.Idx,
                title: CalenderViewResponse?.data?.RET_DATA[0]?.Edu_Nm,
                start:
                    props.updateStartDate === null
                        ? CalenderViewResponse?.data?.RET_DATA[0]?.Edu_Date_Start.slice(0, 10)
                        : props.updateStartDate,
                end:
                    props.updateEndDate === null ? CalenderViewResponse?.data?.RET_DATA[0]?.Edu_Date_End.slice(0, 10) : props.updateEndDate,
                allDay: true,
                color:
                    CalenderViewResponse?.data?.RET_DATA[0]?.Edu_State === '0'
                        ? CalenderViewResponse?.data?.RET_DATA[0]?.Edu_Type === '1'
                            ? '#ed7d31'
                            : CalenderViewResponse?.data?.RET_DATA[0]?.Edu_Type === '2'
                            ? '#cd5402'
                            : CalenderViewResponse?.data?.RET_DATA[0]?.Edu_Type === '3'
                            ? '#a54504'
                            : CalenderViewResponse?.data?.RET_DATA[0]?.Edu_Type === '4'
                            ? '#5b9bd5'
                            : CalenderViewResponse?.data?.RET_DATA[0]?.Edu_Type === '5'
                            ? '#3085d3'
                            : CalenderViewResponse?.data?.RET_DATA[0]?.Edu_Type === '6'
                            ? '#255d91'
                            : ''
                        : '#aeaeae',
                EduColor:
                    CalenderViewResponse?.data?.RET_DATA[0]?.Edu_State === '0'
                        ? CalenderViewResponse?.data?.RET_DATA[0]?.Edu_Type === '1'
                            ? '#ed7d31'
                            : CalenderViewResponse?.data?.RET_DATA[0]?.Edu_Type === '2'
                            ? '#cd5402'
                            : CalenderViewResponse?.data?.RET_DATA[0]?.Edu_Type === '3'
                            ? '#a54504'
                            : CalenderViewResponse?.data?.RET_DATA[0]?.Edu_Type === '4'
                            ? '#5b9bd5'
                            : CalenderViewResponse?.data?.RET_DATA[0]?.Edu_Type === '5'
                            ? '#3085d3'
                            : CalenderViewResponse?.data?.RET_DATA[0]?.Edu_Type === '6'
                            ? '#255d91'
                            : ''
                        : '#aeaeae',
                EduStated: CalenderViewResponse?.data?.RET_DATA[0]?.Edu_State === '0' ? 'Ing' : 'End',
                EduProc:
                    CalenderViewResponse?.data?.RET_DATA[0]?.Edu_Type === '1' || CalenderViewResponse?.data?.RET_DATA[0]?.Edu_Type === '4'
                        ? '초기'
                        : CalenderViewResponse?.data?.RET_DATA[0]?.Edu_Type === '2' ||
                          CalenderViewResponse?.data?.RET_DATA[0]?.Edu_Type === '5'
                        ? '정기'
                        : CalenderViewResponse?.data?.RET_DATA[0]?.Edu_Type === '3' ||
                          CalenderViewResponse?.data?.RET_DATA[0]?.Edu_Type === '6'
                        ? '인증'
                        : '',
                EduBaseline: CalenderViewResponse?.data?.RET_DATA[0]?.Base_Line,
                EduPeople: CalenderViewResponse?.data?.RET_DATA[0]?.Edu_Personnel,
                EduComplete: CalenderViewResponse?.data?.RET_DATA[0]?.Edu_Personnel,
                EduType: CalenderViewResponse?.data?.RET_DATA[0]?.Edu_Type
            });
        }
    };
    // API INTERFACE END
    // ==================================================================================================
    // ==================================================================================================

    // 수정
    const [CalenderUpdate] = useCalenderUpdateMutation();
    const EventClickModal_Edit = async () => {
        const CalenderUpdateResponse = await CalenderUpdate({
            Edu_Nm: eventsViewContainer?.title,
            Edu_Type: eventsViewContainer?.EduType,
            Base_Line: eventsViewContainer?.EduBaseline,
            Edu_Date_Start: eventsViewContainer?.start,
            Edu_Date_End: eventsViewContainer?.end,
            Edu_Personnel: eventsViewContainer?.EduPeople,
            Idx: eventsViewContainer?.id
        });
        CalenderUpdateResponse?.data?.RET_CODE === '0000'
            ? Modal.success({
                  content: '수정 완료',
                  onOk() {
                      props.eventClickModalEdit();
                  }
              })
            : Modal.error({
                  content: '수정 오류',
                  onOk() {}
              });
    };

    // 삭제
    const [CalenderDelete] = useCalenderDeleteMutation();
    const EventDeleteModal_Close = async () => {
        const CalenderDeleteResponse = await CalenderDelete({
            Idx: viewContainer.id
        });
        CalenderDeleteResponse?.data?.RET_CODE === '0000'
            ? Modal.success({
                  content: '삭제 완료',
                  onOk() {
                      props.eventClickModalEdit();
                  }
              })
            : Modal.error({
                  content: '삭제 오류',
                  onOk() {}
              });
    };

    useEffect(() => {
        handelCalenderView(props.eventsViewIdx);
    }, [props.eventsViewIdx, props.updateStartDate, props.updateEndDate]);
    return (
        <>
            <Card
                size="small"
                style={{
                    backgroundColor: eventsViewContainer?.EduColor,
                    color: '#FFFFFF',
                    fontWeight: '600',
                    border: '0px',
                    fontSize: '18px',
                    marginBottom: '10px',
                    borderRadius: '12px'
                }}
            >
                교육 정보
            </Card>
            <Row gutter={[8, 12]}>
                <Col span={8}>
                    <Card
                        size="small"
                        style={{
                            backgroundColor: eventsViewContainer?.EduColor,
                            color: '#FFFFFF',
                            borderRadius: '10px',
                            textAlign: 'center'
                        }}
                    >
                        <span style={{ fontSize: '15px' }}>교육 과정</span>
                    </Card>
                </Col>
                <Col span={16}>
                    <Input value={eventsViewContainer?.title} style={{ border: '0px', height: '45px', fontWeight: '550' }} readonly />
                </Col>
                <Col span={8}>
                    <Card
                        size="small"
                        style={{
                            backgroundColor: eventsViewContainer?.EduColor,
                            color: '#FFFFFF',
                            borderRadius: '10px',
                            textAlign: 'center'
                        }}
                    >
                        <span style={{ fontSize: '15px' }}>교육 구분</span>
                    </Card>
                </Col>
                <Col span={16}>
                    <Input value={eventsViewContainer?.EduProc} style={{ border: '0px', height: '45px', fontWeight: '550' }} readonly />
                </Col>
                <Col span={8}>
                    <Card
                        size="small"
                        style={{
                            backgroundColor: eventsViewContainer?.EduColor,
                            color: '#FFFFFF',
                            fontSize: '15px',
                            borderRadius: '10px',
                            textAlign: 'center'
                        }}
                    >
                        <span style={{ fontSize: '15px' }}>교육 차수</span>
                    </Card>
                </Col>
                <Col span={16}>
                    <Input
                        suffix="차수"
                        onChange={(e) => setEventsViewContainer({ ...eventsViewContainer, EduBaseline: e.target.value })}
                        value={eventsViewContainer?.EduBaseline}
                        style={{ height: '45px' }}
                    />
                </Col>
                <Col span={8}>
                    <Card
                        size="small"
                        style={{
                            backgroundColor: eventsViewContainer?.EduColor,
                            color: '#FFFFFF',
                            fontSize: '15px',
                            borderRadius: '10px',
                            textAlign: 'center'
                        }}
                    >
                        <span style={{ fontSize: '15px' }}>교육일</span>
                    </Card>
                </Col>
                <Col span={16}>
                    <DatePicker.RangePicker
                        style={{ width: '100%', height: '45px' }}
                        locale={locale}
                        onChange={(dates) => {
                            setEventsViewContainer({
                                ...eventsViewContainer,
                                start: dayjs(dates[0]).format('YYYY-MM-DD'),
                                end: dayjs(dates[1]).format('YYYY-MM-DD')
                            });
                        }}
                        value={[dayjs(eventsViewContainer?.start), dayjs(eventsViewContainer?.end)]}
                    />
                </Col>
                <Col span={8}>
                    <Card
                        size="small"
                        style={{
                            backgroundColor: eventsViewContainer?.EduColor,
                            color: '#FFFFFF',
                            fontSize: '15px',
                            borderRadius: '10px',
                            textAlign: 'center'
                        }}
                    >
                        <span style={{ fontSize: '15px' }}>교육인원</span>
                    </Card>
                </Col>
                <Col span={16}>
                    <Input
                        suffix="명"
                        value={eventsViewContainer?.EduPeople}
                        onChange={(e) => setEventsViewContainer({ ...eventsViewContainer, EduPeople: e.target.value })}
                        style={{ height: '45px' }}
                    />
                </Col>
                <Col span={8}>
                    <Card
                        size="small"
                        style={{
                            backgroundColor: eventsViewContainer?.EduColor,
                            color: '#FFFFFF',
                            fontSize: '15px',
                            borderRadius: '10px',
                            textAlign: 'center'
                        }}
                    >
                        <span style={{ fontSize: '15px' }}>입교인원</span>
                    </Card>
                </Col>
                <Col span={16}>
                    <Input
                        suffix="명"
                        value={eventsViewContainer?.EduComplete}
                        onChange={(e) => setEventsViewContainer({ ...eventsViewContainer, EduComplete: e.target.value })}
                        style={{ height: '45px' }}
                    />
                </Col>
            </Row>
            <Divider />
            <Space style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Row gutter={[32, 16]}>
                    <Col span={12}>
                        <Button
                            type="primary"
                            id="open-eig-modal"
                            data-mact="open"
                            data-minfo="eig-modal"
                            className="modal_btn conbtn01"
                            onClick={() => EventDeleteModal_Close()}
                            style={{ width: '120px', height: '45px', backgroundColor: '#ed7d31' }}
                        >
                            <span style={{ fontSize: '16px' }}>삭 제</span>
                        </Button>
                    </Col>
                    <Col span={12}>
                        <Button
                            type="primary"
                            id="open-eig-modal"
                            data-mact="open"
                            data-minfo="eig-modal"
                            className="modal_btn conbtn01"
                            onClick={() => EventClickModal_Edit()}
                            style={{ width: '120px', height: '45px' }}
                        >
                            <span style={{ fontSize: '16px' }}>수 정</span>
                        </Button>
                    </Col>
                </Row>
            </Space>
        </>
    );
};
