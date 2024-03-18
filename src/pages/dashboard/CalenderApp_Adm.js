import React, { useEffect, useRef, useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import { Calendar } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';

import { Card, Space, Row, Col, Modal, Button, Input, Divider, DatePicker } from 'antd';

import interactionPlugin, { Draggable } from '@fullcalendar/interaction'; // 이 부분을 수정

import { Calender_Add } from './Calender_Add';
import { Calender_Info } from './Calender_Info';
import './Style.css';

import moment from 'moment';
import 'moment/locale/ko';

const CalenderApp_Adm = () => {
    const { confirm } = Modal;
    const calendarRef = useRef(null);
    const [EventClickModal, setEventClickModal] = useState(false); // 이벤트 클릭 모달
    const [eventClickModalAdd, setEventClickModalAdd] = useState(false); // 이벤트 추가 모달
    const [eventClickModalInfo, setEventClickModalInfo] = useState(false); // 이벤트 상세정보 모달
    const [EventDeleteModal, setEventDeleteModal] = useState(false); // 이벤트 삭제 모달

    const [eventsContainer, setEventsContainer] = useState(''); // 이벤트 클릭 정보

    // 현재 일자를 가져오기 위해 Date 객체를 생성합니다.
    const currentDate = new Date();

    // 년, 월, 일을 각각 가져옵니다.
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth() + 1; // getMonth()는 0부터 시작하므로 +1 해줍니다.
    const day = currentDate.getDate();

    // 월과 일이 한 자리 숫자일 경우 앞에 0을 붙여 두 자리로 만듭니다.
    const formattedMonth = month < 10 ? `0${month}` : month;
    const formattedDay = day < 10 ? `0${day}` : day;

    // 현재 일자를 yyyy-mm-dd 형식으로 표시합니다.
    const formattedDate = `${year}-${formattedMonth}-${formattedDay}`;

    const Calender_Call = () => {
        const calendarEl = calendarRef.current;
        const calendar = new Calendar(calendarEl, {
            plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin, listPlugin],
            headerToolbar: {
                left: 'prev,next today',
                center: 'title',
                right: 'dayGridMonth,timeGridWeek,timeGridDay,listMonth'
            },

            height: '850px',
            // defaultView: 'agendaDay',
            initialDate: formattedDate,
            businessHours: true,
            buttonIcons: true,
            editable: true,
            locale: 'ko',
            weekends: true,
            dayMaxEvents: true,
            displayEventTime: false,
            themeSystem: 'Sandstone',
            events: [
                {
                    id: '1',
                    title: '항공경비 초기 [1차]',
                    start: '2024-02-01 00:00:00',
                    end: '2024-02-04 24:00:00',
                    constraint: 'availableForMeeting',
                    allDay: true,
                    color: '#5B9BD5',
                    EduColor: '#5B9BD5',
                    EduStated: 'Ing',
                    EduProc: '초기',
                    EduBaseline: '1',
                    EduPeople: '30',
                    EduComplete: '30'
                },
                {
                    id: '2',
                    title: '항공경비 초기 [2차]',
                    start: '2024-02-08 00:00:00',
                    end: '2024-02-11 24:00:00',
                    allDay: true,
                    color: '#5B9BD5',
                    EduStated: 'Ing',
                    EduColor: '#5B9BD5',
                    EduProc: '초기',
                    EduBaseline: '2',
                    EduPeople: '28',
                    EduComplete: '25'
                },
                {
                    id: '3',
                    title: '항공경비 인증평가 [1차]',
                    start: '2024-02-12 00:00:00',
                    end: '2024-02-12 24:00:00',
                    allDay: true,
                    color: '#FFC000',
                    EduStated: 'Ing',
                    EduColor: '#FFC000',
                    EduProc: '초기',
                    EduBaseline: '1',
                    EduPeople: '30',
                    EduComplete: '29'
                },
                {
                    id: '4',
                    title: '항공경비 초기 [3차]',
                    start: '2024-02-13 00:00:00',
                    end: '2024-02-16 24:00:00',
                    allDay: true,
                    color: '#5B9BD5',
                    EduStated: 'Ing',
                    EduColor: '#5B9BD5',
                    EduProc: '초기',
                    EduBaseline: '3',
                    EduPeople: '24',
                    EduComplete: '24'
                }
                // {
                //     groupId: 'availableForMeeting',
                //     start: '2024-01-23T10:00:00',
                //     end: '2024-01-23T16:00:00',
                //     display: 'day'
                // }
            ],
            // dateClick: handleDateClick,
            eventDrop: handleEventDrag,
            eventClick: handleEventClick,
            eventReceive: handleEventReceive
            // dayClick: handleDayClick
        });

        calendar.render();

        // Draggable functionality
        // const externalEventsContainer = document.getElementById('external-events');
        // externalEventsContainer.innerHTML = ''; // 기존에 있는 외부 이벤트 삭제

        // Draggable functionality
        const draggable = new Draggable(document.getElementById('external-events'), {
            itemSelector: '.fc-event',
            eventData: function (eventEl) {
                return {
                    title: eventEl.innerText.trim(),
                    color: eventEl.getAttribute('color')
                };
            }
        });

        return () => {
            calendar.destroy();
            draggable.destroy();
        };
    };
    useEffect(() => {
        Calender_Call();
    }, []);

    // 이벤트를 드래그 하여 옮겼을때 발생
    const handleEventDrag = (info) => {
        alert('Day clicked: ' + info.dateStr);
        alert(`${info.event.startStr} ~ ${info.event.endStr}`);
    };

    // 이벤트가 추가 되었을때 발생
    // 이벤트가 캘린더에 놓였을 때 처리할 로직을 여기에 추가
    const handleEventReceive = (info) => {
        handleEventClickModalAdd_Open();
        setEventsContainer({
            EduStated: 'Ing',
            EduColor: info.event.backgroundColor,
            EduProc: info.draggedEl.attributes.value.nodeValue,
            EduBaseline: '1',
            Title: info.event.title,
            StartDate: info.event.startStr,
            EndDate: info.event.startStr,
            EduPeople: '',
            EduComplete: ''
        });
    };

    // 이벤트를 클릭했을때 발생
    const handleEventClick = (info) => {
        handleEventClickModalInfo_Open();
        console.log(info);
        let modifiedEndDate;
        if (info.event.endStr === '') {
            modifiedEndDate = info.event.startStr;
        } else {
            const endDate = new Date(info.event.endStr);
            endDate.setDate(endDate.getDate() - 1);
            modifiedEndDate = endDate.toISOString();
        }

        setEventsContainer({
            EduStated: info.event.extendedProps.EduStated,
            // EduColor: info.event.extendedProps.EduColor,
            EduColor: info.event.backgroundColor,
            EduProc: info.event.extendedProps.EduProc,
            EduBaseline: info.event.extendedProps.EduBaseline,
            Title: info.event.title,
            StartDate: info.event.startStr,
            // EndDate: info.event.endStr,
            EndDate: moment(modifiedEndDate).format('YYYY-MM-DD'),
            EduPeople: info.event.extendedProps.EduPeople,
            EduComplete: info.event.extendedProps.EduComplete
        });
        // if (window.confirm(`'[${info.event.title}]' 이벤트를 삭제하시겠습니까? ?`)) {
        //     info.event.remove();
        // }
    };

    // 이벤트 추가 모달 열기
    const handleEventClickModalAdd_Open = () => {
        setEventClickModalAdd(true);
    };

    // 이벤트 추가 모달 닫기
    const handleEventClickModalAdd_Close = () => {
        setEventClickModalAdd(false);
        // Calender_Call();
    };

    // 이벤트 상세정보 모달 열기
    const handleEventClickModalInfo_Open = () => {
        setEventClickModalInfo(true);
    };

    // 이벤트 상세정보 모달 닫기
    const handleEventClickModalInfo_Close = () => {
        setEventClickModalInfo(false);
    };

    // 이벤트 삭제 모달 열기
    const handleEventDeleteModal_Open = () => {
        setEventDeleteModal(true);
    };

    // 이벤트 삭제 모달 닫기
    const handleEventDeleteModal_Close = () => {
        setEventDeleteModal(false);
    };

    return (
        <>
            <div id="external-events" style={{ marginBottom: '30px' }}>
                <Row gutter={[8, 8]} style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Col xs={{ flex: '100%' }} sm={{ flex: '75%' }} md={{ flex: '45%' }} lg={{ flex: '25%' }} xl={{ flex: '10%' }}>
                        <div className="fc-event fc-color fc-color_1" color="#ed7d31" value="초기">
                            검색요원 초기교육
                        </div>
                    </Col>
                    <Col xs={{ flex: '100%' }} sm={{ flex: '75%' }} md={{ flex: '45%' }} lg={{ flex: '25%' }} xl={{ flex: '10%' }}>
                        <div className="fc-event fc-color fc-color_2" color="#cd5402" value="정기">
                            검색요원 정기교육
                        </div>
                    </Col>
                    <Col xs={{ flex: '100%' }} sm={{ flex: '75%' }} md={{ flex: '45%' }} lg={{ flex: '25%' }} xl={{ flex: '10%' }}>
                        <div className="fc-event fc-color fc-color_3" color="#a54504" value="인증">
                            검색요원 인증평가
                        </div>
                    </Col>

                    <Col xs={{ flex: '100%' }} sm={{ flex: '75%' }} md={{ flex: '45%' }} lg={{ flex: '25%' }} xl={{ flex: '10%' }}>
                        <div className="fc-event fc-color fc-color_4" color="#5b9bd5">
                            항공경비 초기교육
                        </div>
                    </Col>
                    <Col xs={{ flex: '100%' }} sm={{ flex: '75%' }} md={{ flex: '45%' }} lg={{ flex: '25%' }} xl={{ flex: '10%' }}>
                        <div className="fc-event fc-color fc-color_5" color="#3085d3">
                            항공경비 정기교육
                        </div>
                    </Col>
                    <Col xs={{ flex: '100%' }} sm={{ flex: '75%' }} md={{ flex: '45%' }} lg={{ flex: '25%' }} xl={{ flex: '10%' }}>
                        <div className="fc-event fc-color fc-color_6" color="#255d91">
                            항공경비 인증평가
                        </div>
                    </Col>
                </Row>
            </div>
            <div ref={calendarRef} />

            {/* 이벤트 추가 Start */}
            <Modal
                maskClosable={false}
                open={eventClickModalAdd}
                // onOk={handleEventClickModalAdd_Close}
                closable={false}
                width={590}
                style={{
                    zIndex: 999
                }}
                footer={[]}
            >
                <>
                    <Calender_Add
                        eventsContainer={eventsContainer}
                        eventClickModalClose={handleEventClickModalAdd_Close}
                        // eventDeleteModalOpen={handleEventDeleteModal_Open}
                        // eventDeleteModalClose={handleEventDeleteModal_Close}
                    />
                </>
            </Modal>
            {/* 이벤트 추가 창 End */}

            {/* 이벤트 상세정보 Start */}
            <Modal
                maskClosable={false}
                open={eventClickModalInfo}
                onOk={handleEventClickModalInfo_Close}
                closable={false}
                width={590}
                style={{
                    zIndex: 999
                }}
                footer={[]}
            >
                <>
                    <Calender_Info
                        eventsContainer={eventsContainer}
                        eventClickModalClose={handleEventClickModalInfo_Close}
                        // eventDeleteModal_Open={handleEventDeleteModal_Open}
                        // eventDeleteModal_Close={handleEventDeleteModal_Close}
                    />
                </>
            </Modal>
            {/* 이벤트 상세정보 창 End */}

            {/* 이벤트 삭제 창 End */}
            <Modal
                maskClosable={false}
                open={EventDeleteModal}
                onOk={handleEventDeleteModal_Close}
                // closable={false}
                width={590}
                style={{
                    zIndex: 999
                }}
                footer={[]}
            >
                <div style={{ width: '542px', textAlign: 'center', padding: '50px 0px' }}>
                    <div className="scwd_txt02">
                        <h1>
                            <span className="scwd_fail">확인후 다시 이용해주시기 바랍니다.</span>
                        </h1>
                    </div>
                    <Button
                        id="open-eig-modal"
                        data-mact="open"
                        data-minfo="eig-modal"
                        className="modal_btn conbtn01"
                        onClick={handleEventDeleteModal_Close}
                    >
                        확인
                    </Button>
                </div>
            </Modal>
            {/* 이벤트 삭제 창 End */}
        </>
    );
};

export default CalenderApp_Adm;
