import React, { useEffect, useRef, useState } from 'react';
import { Card, Space, Row, Col, Modal, Button, Input, Divider, DatePicker } from 'antd';

import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
dayjs.extend(customParseFormat);

export const Calender_Info = (props) => {
    const dateFormat = 'YYYY-MM-DD';
    const { RangePicker } = DatePicker;
    const [viewContainer, setViewContainer] = useState([]); // 이벤트 클릭 정보

    const EventClickModal_Close = () => {
        props.eventClickModalClose();
    };

    const EventDeleteModal_Close = () => {
        props.eventDeleteModalClose();
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
                    marginBottom: '25px',
                    borderRadius: '12px'
                }}
            >
                {viewContainer.EduStated === 'Ing' ? '교육 모집중' : '교육종료'}
            </Card>
            <Row gutter={[8, 8]}>
                <Col span={8}>
                    <Card
                        size="small"
                        style={{
                            backgroundColor: viewContainer.EduColor,
                            color: '#FFFFFF',
                            fontSize: '15px',
                            borderRadius: '50px',
                            fontWeight: '550'
                        }}
                    >
                        교육 과정
                    </Card>
                </Col>
                <Col span={16}>
                    <Card
                        size="small"
                        style={{
                            backgroundColor: '#f0f0f0',
                            fontSize: '15px'
                        }}
                    >
                        {viewContainer.title}
                    </Card>
                </Col>
                <Col span={8}>
                    <Card
                        size="small"
                        style={{
                            backgroundColor: viewContainer.EduColor,
                            color: '#FFFFFF',
                            fontSize: '15px',
                            borderRadius: '50px',
                            fontWeight: '550'
                        }}
                    >
                        교육 구분
                    </Card>
                </Col>
                <Col span={16}>
                    <Card
                        size="small"
                        style={{
                            backgroundColor: '#f0f0f0',
                            fontSize: '15px'
                        }}
                    >
                        {viewContainer.EduProc}
                    </Card>
                </Col>
                <Col span={8}>
                    <Card
                        size="small"
                        style={{
                            backgroundColor: viewContainer.EduColor,
                            color: '#FFFFFF',
                            fontSize: '15px',
                            borderRadius: '50px',
                            fontWeight: '550'
                        }}
                    >
                        교육 차수
                    </Card>
                </Col>
                <Col span={16}>
                    <Card
                        size="small"
                        style={{
                            backgroundColor: '#f0f0f0',
                            fontSize: '15px'
                        }}
                    >
                        {viewContainer.EduBaseline}차수
                    </Card>
                </Col>
                <Col span={8}>
                    <Card
                        size="small"
                        style={{
                            backgroundColor: viewContainer.EduColor,
                            color: '#FFFFFF',
                            fontSize: '15px',
                            borderRadius: '50px',
                            fontWeight: '550'
                        }}
                    >
                        교육 시작일
                    </Card>
                </Col>
                <Col span={16}>
                    <Card
                        size="small"
                        style={{
                            backgroundColor: '#f0f0f0',
                            fontSize: '15px'
                        }}
                    >
                        {viewContainer.start}
                    </Card>
                </Col>
                <Col span={8}>
                    <Card
                        size="small"
                        style={{
                            backgroundColor: viewContainer.EduColor,
                            color: '#FFFFFF',
                            fontSize: '15px',
                            borderRadius: '50px',
                            fontWeight: '550'
                        }}
                    >
                        교육 종료일
                    </Card>
                </Col>
                <Col span={16}>
                    <Card
                        size="small"
                        style={{
                            backgroundColor: '#f0f0f0',
                            fontSize: '15px'
                        }}
                    >
                        {viewContainer.end}
                    </Card>
                </Col>
                <Col span={8}>
                    <Card
                        size="small"
                        style={{
                            backgroundColor: viewContainer.EduColor,
                            color: '#FFFFFF',
                            fontSize: '15px',
                            borderRadius: '50px',
                            fontWeight: '550'
                        }}
                    >
                        교육 인원
                    </Card>
                </Col>
                <Col span={16}>
                    <Card
                        size="small"
                        style={{
                            backgroundColor: '#f0f0f0',
                            fontSize: '15px'
                        }}
                    >
                        {viewContainer.EduPeople}명
                    </Card>
                </Col>
                <Col span={8}>
                    <Card
                        size="small"
                        style={{
                            backgroundColor: viewContainer.EduColor,
                            color: '#FFFFFF',
                            fontSize: '15px',
                            borderRadius: '50px',
                            fontWeight: '550'
                        }}
                    >
                        교육 이수
                    </Card>
                </Col>
                <Col span={16}>
                    <Card
                        size="small"
                        style={{
                            backgroundColor: '#f0f0f0',
                            fontSize: '15px'
                        }}
                    >
                        {viewContainer.EduComplete}명
                    </Card>
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
                            <span style={{ fontSize: '16px' }}>확 인</span>
                        </Button>
                    </Col>
                </Row>
            </Space>
        </>
    );
};
