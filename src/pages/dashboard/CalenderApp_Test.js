import React, { useEffect, useRef, useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import { Calendar } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import { Card, Space, Row, Col, Modal, Button, Input, Divider, DatePicker } from 'antd';

import interactionPlugin, { Draggable } from '@fullcalendar/interaction'; // 이 부분을 수정

// API Hooks Start
import { useCalenderScheduleMutation, useCalenderViewMutation } from '../../hooks/api/CalenderManagement/CalenderManagement';
// API Hooks End
import { Calender_Add } from './Calender_Add';
import { Calender_Info } from './Calender_Info';
import './Style.css';

const CalenderApp_Test = () => {
    const { confirm } = Modal;
    const calendarRef = useRef(null);
    const [EventClickModal, setEventClickModal] = useState(false); // 이벤트 클릭 모달
    const [eventsListContainer, setEventsListContainer] = useState([]); // 이벤트 리스트 정보
    const [eventsViewContainer, setEventsViewContainer] = useState([]); // 이벤트 상세 정보
    const [eventsAddContainer, setEventsAddContainer] = useState([]); // 이벤트 추가 정보

    const [eventClickModalAdd, setEventClickModalAdd] = useState(false); // 이벤트 추가 모달
    const [eventClickModalInfo, setEventClickModalInfo] = useState(false); // 이벤트 상세정보 모달

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

    // ==================================================================================================
    // 교육일정 정보 (Calender Schedule)
    const [CalenderScheduleApi] = useCalenderScheduleMutation();
    const handelCalenderSchedule = async () => {
        const CalenderScheduleResponse = await CalenderScheduleApi({});
        CalenderScheduleResponse?.data?.RET_CODE === '0000'
            ? setEventsListContainer(
                  CalenderScheduleResponse?.data?.RET_DATA.map((e) => ({
                      id: e.Idx,
                      title: e.Edu_Nm,
                      start: e.Edu_Date_Start,
                      end: e.Edu_Date_End,
                      constraint: 'availableForMeeting',
                      allDay: true,
                      color:
                          e.Edu_State === '0'
                              ? e.Edu_Type === '1'
                                  ? '#ed7d31'
                                  : e.Edu_Type === '2'
                                  ? '#cd5402'
                                  : e.Edu_Type === '3'
                                  ? '#a54504'
                                  : e.Edu_Type === '4'
                                  ? '#5b9bd5'
                                  : e.Edu_Type === '5'
                                  ? '#3085d3'
                                  : e.Edu_Type === '6'
                                  ? '#255d91'
                                  : ''
                              : '#aeaeae',
                      EduColor:
                          e.Edu_State === '0'
                              ? e.Edu_Type === '1'
                                  ? '#ed7d31'
                                  : e.Edu_Type === '2'
                                  ? '#cd5402'
                                  : e.Edu_Type === '3'
                                  ? '#a54504'
                                  : e.Edu_Type === '4'
                                  ? '#5b9bd5'
                                  : e.Edu_Type === '5'
                                  ? '#3085d3'
                                  : e.Edu_Type === '6'
                                  ? '#255d91'
                                  : ''
                              : '#aeaeae',
                      EduStated: e.Edu_State === '0' ? 'Ing' : 'End',
                      EduProc:
                          e.Edu_Type === '1' || e.Edu_Type === '4'
                              ? '초기'
                              : e.Edu_Type === '2' || e.Edu_Type === '5'
                              ? '정기'
                              : e.Edu_Type === '3' || e.Edu_Type === '6'
                              ? '인증'
                              : '',
                      EduBaseline: e.Base_Line,
                      EduPeople: e.Edu_Personnel,
                      EduComplete: e.Edu_Personnel
                  }))
              )
            : '';
    };

    // ==================================================================================================
    // 교육일정 상세 (Calender View)
    const [CalenderView] = useCalenderViewMutation();
    const handelCalenderView = async (idx) => {
        const CalenderViewResponse = await CalenderView({
            Idx: idx
        });
        CalenderViewResponse?.data?.RET_CODE === '0000'
            ? setEventsViewContainer({
                  id: CalenderViewResponse?.data?.RET_DATA[0].Idx,
                  title: CalenderViewResponse?.data?.RET_DATA[0].Edu_Nm,
                  start: CalenderViewResponse?.data?.RET_DATA[0].Edu_Date_Start.slice(0, 10),
                  end: CalenderViewResponse?.data?.RET_DATA[0].Edu_Date_End.slice(0, 10),
                  constraint: 'availableForMeeting',
                  allDay: true,
                  color:
                      CalenderViewResponse?.data?.RET_DATA[0].Edu_State === '0'
                          ? CalenderViewResponse?.data?.RET_DATA[0].Edu_Type === '1'
                              ? '#ed7d31'
                              : CalenderViewResponse?.data?.RET_DATA[0].Edu_Type === '2'
                              ? '#cd5402'
                              : CalenderViewResponse?.data?.RET_DATA[0].Edu_Type === '3'
                              ? '#a54504'
                              : CalenderViewResponse?.data?.RET_DATA[0].Edu_Type === '4'
                              ? '#5b9bd5'
                              : CalenderViewResponse?.data?.RET_DATA[0].Edu_Type === '5'
                              ? '#3085d3'
                              : CalenderViewResponse?.data?.RET_DATA[0].Edu_Type === '6'
                              ? '#255d91'
                              : ''
                          : '#aeaeae',
                  EduColor:
                      CalenderViewResponse?.data?.RET_DATA[0].Edu_State === '0'
                          ? CalenderViewResponse?.data?.RET_DATA[0].Edu_Type === '1'
                              ? '#ed7d31'
                              : CalenderViewResponse?.data?.RET_DATA[0].Edu_Type === '2'
                              ? '#cd5402'
                              : CalenderViewResponse?.data?.RET_DATA[0].Edu_Type === '3'
                              ? '#a54504'
                              : CalenderViewResponse?.data?.RET_DATA[0].Edu_Type === '4'
                              ? '#5b9bd5'
                              : CalenderViewResponse?.data?.RET_DATA[0].Edu_Type === '5'
                              ? '#3085d3'
                              : CalenderViewResponse?.data?.RET_DATA[0].Edu_Type === '6'
                              ? '#255d91'
                              : ''
                          : '#aeaeae',
                  EduStated: CalenderViewResponse?.data?.RET_DATA[0].Edu_State === '0' ? 'Ing' : 'End',
                  EduProc:
                      CalenderViewResponse?.data?.RET_DATA[0].Edu_Type === '1' || CalenderViewResponse?.data?.RET_DATA[0].Edu_Type === '4'
                          ? '초기'
                          : CalenderViewResponse?.data?.RET_DATA[0].Edu_Type === '2' ||
                            CalenderViewResponse?.data?.RET_DATA[0].Edu_Type === '5'
                          ? '정기'
                          : CalenderViewResponse?.data?.RET_DATA[0].Edu_Type === '3' ||
                            CalenderViewResponse?.data?.RET_DATA[0].Edu_Type === '6'
                          ? '인증'
                          : '',
                  EduBaseline: CalenderViewResponse?.data?.RET_DATA[0].Base_Line,
                  EduPeople: CalenderViewResponse?.data?.RET_DATA[0].Edu_Personnel,
                  EduComplete: CalenderViewResponse?.data?.RET_DATA[0].Edu_Personnel,
                  EduType: CalenderViewResponse?.data?.RET_DATA[0].Edu_Type
              })
            : '';
    };
    // API INTERFACE END
    // ==================================================================================================
    // ==================================================================================================

    useEffect(() => {
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
                    title: '검색요원 초기교육',
                    start: '2024-04-02 00:00:00',
                    end: '2024-04-05 24:00:00',
                    // constraint: 'availableForMeeting',
                    allDay: true,
                    color: '#aeaeae',
                    EduColor: '#aeaeae',
                    EduStated: 'End',
                    EduProc: '초기',
                    EduBaseline: '1',
                    EduPeople: '21',
                    EduComplete: '21'
                },
                {
                    id: '2',
                    title: '검색요원 초기교육',
                    start: '2024-04-12 00:00:00',
                    end: '2024-04-15 24:00:00',
                    // constraint: 'availableForMeeting',
                    allDay: true,
                    color: '#ed7d31',
                    EduColor: '#ed7d31',
                    EduStated: 'Ing',
                    EduProc: '초기',
                    EduBaseline: '2',
                    EduPeople: '30',
                    EduComplete: '30'
                },
                {
                    id: '3',
                    title: '검색요원 정기교육',
                    start: '2024-04-22 00:00:00',
                    end: '2024-04-22 24:00:00',
                    // constraint: 'availableForMeeting',
                    allDay: true,
                    color: '#cd5402',
                    EduColor: '#cd5402',
                    EduStated: 'Ing',
                    EduProc: '정기',
                    EduBaseline: '1',
                    EduPeople: '30',
                    EduComplete: '30'
                },
                {
                    id: '4',
                    title: '검색요원 정기교육',
                    start: '2024-04-27 00:00:00',
                    end: '2024-04-27 24:00:00',
                    // constraint: 'availableForMeeting',
                    allDay: true,
                    color: '#cd5402',
                    EduColor: '#cd5402',
                    EduStated: 'Ing',
                    EduProc: '정기',
                    EduBaseline: '2',
                    EduPeople: '30',
                    EduComplete: '30'
                },
                {
                    id: '5',
                    title: '항공경비 초기교육',
                    start: '2024-04-23 00:00:00',
                    end: '2024-04-26 24:00:00',
                    // constraint: 'availableForMeeting',
                    allDay: true,
                    color: '#5b9bd5',
                    EduColor: '#5b9bd5',
                    EduStated: 'Ing',
                    EduProc: '초기',
                    EduBaseline: '1',
                    EduPeople: '28',
                    EduComplete: '28'
                },
                {
                    id: '6',
                    title: '항공경비 정기교육',
                    start: '2024-04-30 00:00:00',
                    end: '2024-04-30 24:00:00',
                    // constraint: 'availableForMeeting',
                    allDay: true,
                    color: '#3085d3',
                    EduColor: '#3085d3',
                    EduStated: 'Ing',
                    EduProc: '정기',
                    EduBaseline: '1',
                    EduPeople: '30',
                    EduComplete: '30'
                },
                {
                    id: '7',
                    title: '검색요원 인증평가',
                    start: '2024-04-30 00:00:00',
                    end: '2024-04-30 24:00:00',
                    // constraint: 'availableForMeeting',
                    allDay: true,
                    color: '#a54504',
                    EduColor: '#a54504',
                    EduStated: 'Ing',
                    EduProc: '인증',
                    EduBaseline: '1',
                    EduPeople: '25',
                    EduComplete: '25'
                }
            ],
            // dateClick: handleDateClick,
            eventDrop: handleEventDrag,
            eventClick: handleEventClick,
            eventReceive: handleEventReceive
            // dayClick: handleDayClick
        });

        calendar.render();

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
    }, [eventsListContainer]);

    // 이벤트를 드래그 하여 옮겼을때 발생
    const handleEventDrag = (info) => {
        const event = info.event; // 이벤트 객체 가져오기
        const newStartDate = info.event.startStr;
        const newEndDate = info.event.endStr || newStartDate; // 종료 날짜 있으면 사용

        // 새로운 날짜로 이벤트 객체 업데이트
        event.setStart(newStartDate);
        if (newEndDate) {
            event.setEnd(newEndDate);
        }
        console.log(newStartDate, newEndDate);

        // 서버/데이터베이스에서 이벤트 데이터를 업데이트하는 함수 호출
        // updateEventData(event); // 이벤트 데이터 업데이트 함수로 교체

        // 변경 사항 반영하기 위해 캘린더 다시 렌더링
        info.view.calendar.render();
    };

    // 이벤트가 추가 되었을때 발생
    // 이벤트가 캘린더에 놓였을 때 처리할 로직을 여기에 추가
    const handleEventReceive = (info) => {
        handleEventClickModalAdd_Open();
        setEventsAddContainer({
            EduStated: 'Ing',
            EduColor: info.event.backgroundColor,
            EduProc: info.draggedEl.attributes.eduproc.value,
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
        handelCalenderView(info.event.id);
    };

    // 이벤트 추가 모달 열기
    const handleEventClickModalAdd_Open = () => {
        setEventClickModalAdd(true);
    };

    // 이벤트 추가 모달 닫기
    const handleEventClickModalAdd_Close = () => {
        setEventClickModalAdd(false);
        handelCalenderSchedule();
    };

    // 이벤트 상세정보 모달 열기
    const handleEventClickModalInfo_Open = () => {
        setEventClickModalInfo(true);
    };

    // 이벤트 상세정보 모달 닫기
    const handleEventClickModalInfo_Close = () => {
        setEventClickModalInfo(false);
    };

    // 이벤트 상세정보 수정 모달 닫기
    const handleEventClickModalInfo_Edit = () => {
        setEventClickModalInfo(false);
        handelCalenderSchedule();
    };

    // 이벤트 삭제 모달 닫기
    const handleEventDeleteModal_Close = () => {
        setEventClickModalAdd(false);
        handelCalenderSchedule();
    };

    useEffect(() => {
        handelCalenderSchedule();
    }, []);

    console.log(eventsListContainer);
    return (
        <>
            <div id="external-events" style={{ marginBottom: '30px' }}>
                <Row gutter={[8, 8]} style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Col xs={{ flex: '100%' }} sm={{ flex: '75%' }} md={{ flex: '45%' }} lg={{ flex: '25%' }} xl={{ flex: '10%' }}>
                        <div className="fc-event fc-color fc-color_1" color="#ed7d31" value="초기" eduproc="1">
                            검색요원 초기교육
                        </div>
                    </Col>
                    <Col xs={{ flex: '100%' }} sm={{ flex: '75%' }} md={{ flex: '45%' }} lg={{ flex: '25%' }} xl={{ flex: '10%' }}>
                        <div className="fc-event fc-color fc-color_2" color="#cd5402" value="정기" eduproc="2">
                            검색요원 정기교육
                        </div>
                    </Col>
                    <Col xs={{ flex: '100%' }} sm={{ flex: '75%' }} md={{ flex: '45%' }} lg={{ flex: '25%' }} xl={{ flex: '10%' }}>
                        <div className="fc-event fc-color fc-color_3" color="#a54504" value="인증" eduproc="3">
                            검색요원 인증평가
                        </div>
                    </Col>

                    <Col xs={{ flex: '100%' }} sm={{ flex: '75%' }} md={{ flex: '45%' }} lg={{ flex: '25%' }} xl={{ flex: '10%' }}>
                        <div className="fc-event fc-color fc-color_4" color="#5b9bd5" value="초기" eduproc="4">
                            항공경비 초기교육
                        </div>
                    </Col>
                    <Col xs={{ flex: '100%' }} sm={{ flex: '75%' }} md={{ flex: '45%' }} lg={{ flex: '25%' }} xl={{ flex: '10%' }}>
                        <div className="fc-event fc-color fc-color_5" color="#3085d3" value="정기" eduproc="5">
                            항공경비 정기교육
                        </div>
                    </Col>
                    <Col xs={{ flex: '100%' }} sm={{ flex: '75%' }} md={{ flex: '45%' }} lg={{ flex: '25%' }} xl={{ flex: '10%' }}>
                        <div className="fc-event fc-color fc-color_6" color="#255d91" value="인증" eduproc="6">
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
                onOk={handleEventClickModalAdd_Close}
                closable={false}
                width={450}
                style={{
                    zIndex: 999
                }}
                footer={[]}
            >
                <div style={{ textAlign: 'center' }}>
                    <Calender_Add
                        eventsAddContainer={eventsAddContainer}
                        eventClickModalClose={handleEventClickModalAdd_Close}
                        eventClickModalCancel={handleEventDeleteModal_Close}
                    />
                    <Button
                        style={{
                            marginTop: '20px',
                            width: '120px',
                            height: '50px',
                            borderRadius: '10px',
                            backgroundColor: eventsAddContainer.EduColor,
                            color: '#ffffff',
                            border: '0px',
                            fontWeight: '500',
                            fontSize: '17px'
                        }}
                        id="open-eig-modal"
                        data-mact="open"
                        data-minfo="eig-modal"
                        onClick={handleEventClickModalAdd_Close}
                    >
                        Close
                    </Button>
                </div>
            </Modal>
            {/* 이벤트 추가 창 End */}

            {/* 이벤트 상세정보 Start */}
            <Modal
                maskClosable={false}
                open={eventClickModalInfo}
                onOk={handleEventClickModalInfo_Close}
                closable={false}
                width={450}
                style={{
                    zIndex: 999
                }}
                footer={[]}
            >
                <div style={{ textAlign: 'center' }}>
                    <Calender_Info
                        eventsViewContainer={eventsViewContainer}
                        eventClickModalEdit={handleEventClickModalInfo_Edit}
                        eventClickModalDelete={handleEventDeleteModal_Close}
                    />
                    <Button
                        style={{
                            marginTop: '20px',
                            width: '120px',
                            height: '50px',
                            borderRadius: '10px',
                            backgroundColor: eventsViewContainer.EduColor,
                            color: '#ffffff',
                            border: '0px',
                            fontWeight: '500',
                            fontSize: '17px'
                        }}
                        id="open-eig-modal"
                        data-mact="open"
                        data-minfo="eig-modal"
                        onClick={handleEventClickModalInfo_Close}
                    >
                        Close
                    </Button>
                </div>
            </Modal>
            {/* 이벤트 상세정보 창 End */}
        </>
    );
};

export default CalenderApp_Test;