import React, { useEffect, useRef, useState } from 'react';
import { Card, Space, Row, Col, Modal, Button, Input, Divider, DatePicker } from 'antd';

// API Hooks Start
import { useCalenderUpdateMutation, useCalenderDeleteMutation } from '../../hooks/api/CalenderManagement/CalenderManagement';
// API Hooks End

import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
dayjs.extend(customParseFormat);
import locale from 'antd/es/date-picker/locale/ko_KR';

export const Calender_Info = (props) => {
    const dateFormat = 'YYYY-MM-DD';
    const { RangePicker } = DatePicker;
    const [viewContainer, setViewContainer] = useState([]); // 이벤트 클릭 정보

    // 수정
    const [CalenderUpdate] = useCalenderUpdateMutation();
    const EventClickModal_Edit = async () => {
        const CalenderUpdateResponse = await CalenderUpdate({
            Edu_Nm: viewContainer.title,
            Edu_Type: viewContainer.EduType,
            Base_Line: viewContainer.EduBaseline,
            Edu_Date_Start: viewContainer.start,
            Edu_Date_End: viewContainer.end,
            Edu_Personnel: viewContainer.EduPeople,
            Idx: viewContainer.id
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
        setViewContainer(props.eventsViewContainer);
    }, [props.eventsViewContainer]);

    return (
        <>
            <Card
                size="small"
                style={{
                    backgroundColor: viewContainer.EduColor,
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
                            backgroundColor: viewContainer.EduColor,
                            color: '#FFFFFF',
                            borderRadius: '10px',
                            textAlign: 'center'
                        }}
                    >
                        <span style={{ fontSize: '15px' }}>교육 과정</span>
                    </Card>
                </Col>
                <Col span={16}>
                    <Input value={viewContainer.title} style={{ border: '0px', height: '45px', fontWeight: '550' }} readonly />
                </Col>
                <Col span={8}>
                    <Card
                        size="small"
                        style={{
                            backgroundColor: viewContainer.EduColor,
                            color: '#FFFFFF',
                            borderRadius: '10px',
                            textAlign: 'center'
                        }}
                    >
                        <span style={{ fontSize: '15px' }}>교육 구분</span>
                    </Card>
                </Col>
                <Col span={16}>
                    <Input value={viewContainer.EduProc} style={{ border: '0px', height: '45px', fontWeight: '550' }} readonly />
                </Col>
                <Col span={8}>
                    <Card
                        size="small"
                        style={{
                            backgroundColor: viewContainer.EduColor,
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
                        onChange={(e) => setViewContainer({ ...viewContainer, EduBaseline: e.target.value })}
                        value={viewContainer.EduBaseline}
                        style={{ height: '45px' }}
                    />
                </Col>
                <Col span={8}>
                    <Card
                        size="small"
                        style={{
                            backgroundColor: viewContainer.EduColor,
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
                            setViewContainer({
                                ...viewContainer,
                                start: dayjs(dates[0]).format('YYYY-MM-DD'),
                                end: dayjs(dates[1]).format('YYYY-MM-DD')
                            });
                        }}
                        value={[dayjs(viewContainer.start), dayjs(viewContainer.end)]}
                    />
                </Col>
                <Col span={8}>
                    <Card
                        size="small"
                        style={{
                            backgroundColor: viewContainer.EduColor,
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
                        value={viewContainer.EduPeople}
                        onChange={(e) => setViewContainer({ ...viewContainer, EduPeople: e.target.value })}
                        style={{ height: '45px' }}
                    />
                </Col>
                <Col span={8}>
                    <Card
                        size="small"
                        style={{
                            backgroundColor: viewContainer.EduColor,
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
                        value={viewContainer.EduComplete}
                        onChange={(e) => setViewContainer({ ...viewContainer, EduComplete: e.target.value })}
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
                            onClick={EventDeleteModal_Close}
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
                            onClick={EventClickModal_Edit}
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
