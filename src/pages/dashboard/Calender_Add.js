import React, { useEffect, useRef, useState } from 'react';
import { Card, Space, Row, Col, Modal, Button, Input, Divider, DatePicker } from 'antd';

// API Hooks Start
import { useCalenderInsertMutation } from '../../hooks/api/CalenderManagement/CalenderManagement';
// API Hooks End

import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
dayjs.extend(customParseFormat);
import locale from 'antd/es/date-picker/locale/ko_KR';

export const Calender_Add = (props) => {
    const dateFormat = 'YYYY-MM-DD';
    const { RangePicker } = DatePicker;
    const [addContainer, setAddContainer] = useState([]); // 이벤트 클릭 정보

    const [CalenderInsert] = useCalenderInsertMutation();
    const handelCalenderInsert = async () => {
        const CalenderInsertResponse = await CalenderInsert({
            Edu_Nm: addContainer.Title,
            Edu_Type: addContainer.EduProc,
            Base_Line: addContainer.EduBaseline,
            Edu_Date_Start: addContainer.StartDate,
            Edu_Date_End: addContainer.EndDate,
            Edu_Personnel: addContainer.EduPeople
        });
        CalenderInsertResponse?.data?.RET_CODE === '0000'
            ? Modal.success({
                  content: '등록 완료',
                  onOk() {
                      props.eventClickModalClose();
                  }
              })
            : Modal.error({
                  content: '등록 오류',
                  onOk() {}
              });
    };

    // 등록
    const EventClickModal_Add = () => {
        handelCalenderInsert();
    };

    // 삭제
    const EventClickModal_Delete = () => {
        props.eventClickModalCancel();
    };

    useEffect(() => {
        setAddContainer(props.eventsAddContainer);
    }, [props.eventsAddContainer]);

    return (
        <>
            <Card
                size="small"
                style={{
                    backgroundColor: addContainer.EduColor,
                    color: '#FFFFFF',
                    border: '0px',
                    marginBottom: '12px',
                    borderRadius: '12px'
                }}
            >
                {addContainer.EduStated === 'Ing' ? (
                    <span style={{ fontSize: '16px', fontWeight: '600' }}>교육 모집중</span>
                ) : (
                    <span style={{ fontSize: '16px', fontWeight: '600' }}>교육종료</span>
                )}
            </Card>
            <Row gutter={[8, 12]}>
                <Col span={8}>
                    <Card
                        size="small"
                        style={{
                            backgroundColor: addContainer.EduColor,
                            color: '#FFFFFF',
                            borderRadius: '10px',
                            textAlign: 'center'
                        }}
                    >
                        <span style={{ fontSize: '15px' }}>교육 과정</span>
                    </Card>
                </Col>
                <Col span={16}>
                    <Input value={addContainer.Title} style={{ height: '45px' }} />
                </Col>
                <Col span={8}>
                    <Card
                        size="small"
                        style={{
                            backgroundColor: addContainer.EduColor,
                            color: '#FFFFFF',
                            borderRadius: '10px',
                            textAlign: 'center'
                        }}
                    >
                        <span style={{ fontSize: '15px' }}>교육 구분</span>
                    </Card>
                </Col>
                <Col span={16}>
                    <Input value={addContainer.EduProc} style={{ height: '45px' }} />
                </Col>
                <Col span={8}>
                    <Card
                        size="small"
                        style={{
                            backgroundColor: addContainer.EduColor,
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
                    <Input suffix="차수" value={addContainer.EduBaseline} style={{ height: '45px' }} />
                </Col>
                <Col span={8}>
                    <Card
                        size="small"
                        style={{
                            backgroundColor: addContainer.EduColor,
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
                            setAddContainer({
                                ...addContainer,
                                StartDate: dayjs(dates[0]).format('YYYY-MM-DD'),
                                EndDate: dayjs(dates[1]).format('YYYY-MM-DD')
                            });
                        }}
                        value={[dayjs(addContainer.StartDate), dayjs(addContainer.EndDate)]}
                    />
                </Col>
                <Col span={8}>
                    <Card
                        size="small"
                        style={{
                            backgroundColor: addContainer.EduColor,
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
                        value={addContainer.EduPeople}
                        onChange={(e) => setAddContainer({ ...addContainer, EduPeople: e.target.value })}
                        style={{ height: '45px' }}
                    />
                </Col>
                <Col span={8}>
                    <Card
                        size="small"
                        style={{
                            backgroundColor: addContainer.EduColor,
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
                        value={addContainer.EduComplete}
                        onChange={(e) => setAddContainer({ ...addContainer, EduComplete: e.target.value })}
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
                            onClick={EventClickModal_Delete}
                            style={{ width: '120px', height: '45px', backgroundColor: '#ed7d31' }}
                        >
                            <span style={{ fontSize: '16px' }}>취 소</span>
                        </Button>
                    </Col>
                    <Col span={12}>
                        <Button
                            type="primary"
                            id="open-eig-modal"
                            data-mact="open"
                            data-minfo="eig-modal"
                            className="modal_btn conbtn01"
                            onClick={EventClickModal_Add}
                            style={{ width: '120px', height: '45px' }}
                        >
                            <span style={{ fontSize: '16px' }}>등 록</span>
                        </Button>
                    </Col>
                </Row>
            </Space>
        </>
    );
};
