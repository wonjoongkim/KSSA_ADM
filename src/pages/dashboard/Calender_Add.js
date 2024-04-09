import React, { useEffect, useRef, useState } from 'react';
import { Card, Space, Row, Col, Modal, Button, Input, Divider, DatePicker } from 'antd';

import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
dayjs.extend(customParseFormat);

export const Calender_Add = (props) => {
    const dateFormat = 'YYYY-MM-DD';
    const { RangePicker } = DatePicker;
    const [addContainer, setAddContainer] = useState([]); // 이벤트 클릭 정보

    const EventClickModal_Close = () => {
        props.eventClickModalClose();
    };

    const EventDeleteModal_Close = () => {
        props.eventDeleteModalClose();
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
                    <Input defaultValue={addContainer.Title} style={{ height: '45px' }} />
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
                    <Input defaultValue={addContainer.EduProc} style={{ height: '45px' }} />
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
                    <Input suffix="차수" defaultValue={addContainer.EduBaseline} style={{ height: '45px' }} />
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
                    <RangePicker
                        size="large"
                        value={[dayjs(addContainer.StartDate), dayjs(addContainer.EndDate)]}
                        allowEmpty={[true, true]}
                        onChange={(date, dateString) => {
                            console.log(date, dateString);
                        }}
                        style={{ width: '100%', height: '45px' }}
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
                    <Input suffix="명" defaultValue={addContainer.EduPeople} style={{ height: '45px' }} />
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
                    <Input suffix="명" defaultValue={addContainer.EduComplete} style={{ height: '45px' }} />
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
                            onClick={EventClickModal_Close}
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
