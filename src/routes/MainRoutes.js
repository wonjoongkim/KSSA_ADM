/* eslint-disable no-unused-vars */
// project import
import MainLayout from 'layout/MainLayout';

// 메인 대시보드
import { DashboardDefault } from 'pages/dashboard';

// 교육원소개
import { Greeting } from 'pages/introduction/Greeting'; // 원장인사
import { Groups } from 'pages/introduction/Groups'; // 조직도
import { Facility } from 'pages/introduction/Facility'; // 교육시설
import { Directions } from 'pages/introduction/Directions'; // 오시는 길

// 교육과정
import { Security } from 'pages/curriculum/Security'; // 보안검색 교육과정
import { Airline } from 'pages/curriculum/Airline'; // 항공경비 교육과정
import { Operate } from 'pages/curriculum/Operate'; // 정원 및 운영계획
import { Admission } from 'pages/curriculum/Admission'; // 입교절차

// 직업훈련비지원
import { Reason } from 'pages/support/Reason'; // 관련근거
import { Application } from 'pages/support/Application'; // 신청방법

// 게시판
import { List as NList } from 'pages/notice/List';
import { Write as NWrite } from 'pages/notice/Write';

// 자료실
import { List as RList } from 'pages/reference/List';
import { Write as RWrite } from 'pages/reference/Write';
import { Picture } from 'pages/reference/Picture'; // 사진자료

// 회원관리
import { Members } from 'pages/members/Members'; // 회원리스트
import { Student } from 'pages/members/Student'; // 교육 신청 리스트
import { Write as MWrite } from 'pages/members/Write'; // 회원등록

// 환경설정
import { EduSchedule } from 'pages/preferences/EduSchedule'; // 교육일정
import { Write as EWrite } from 'pages/preferences/Write'; // 교육일정 등록

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
    path: '/',
    element: <MainLayout />,
    children: [
        {
            // 데시보드
            path: '/',
            element: <DashboardDefault />
        },
        {
            // 데시보드
            path: 'dashboard',
            element: <DashboardDefault />
        },
        {
            // 교육원소개 > 원장인사
            path: '/introduction/Greeting',
            element: <Greeting />
        },
        {
            // 교육원소개 > 조직도
            path: '/introduction/Groups',
            element: <Groups />
        },
        {
            // 교육원소개 > 교육시설
            path: '/introduction/Facility',
            element: <Facility />
        },
        {
            // 교육원소개 > 오시는 길
            path: '/introduction/Directions',
            element: <Directions />
        },
        //============================================================
        {
            // 교육과정 > 보안검색 교육과정
            path: '/curriculum/Security',
            element: <Security />
        },
        {
            // 교육과정 > 항공경비 교육과정
            path: '/curriculum/Airline',
            element: <Airline />
        },
        {
            // 교육과정 > 정원 및 운영계획
            path: '/curriculum/Operate',
            element: <Operate />
        },
        {
            // 교육과정 > 입교절차
            path: '/curriculum/Admission',
            element: <Admission />
        },
        //============================================================
        {
            // 직업훈련비지원 > 관련근거
            path: '/support/Reason',
            element: <Reason />
        },
        {
            // 직업훈련비지원 > 신청방법
            path: '/support/Application',
            element: <Application />
        },

        //============================================================
        {
            // 게시판 > 리스트
            path: '/notice/List',
            element: <NList />
        },
        {
            // 게시판 > 등록
            path: '/notice/Write',
            element: <NWrite />
        },
        //============================================================
        {
            // 게시판 > 리스트
            path: '/reference/List',
            element: <RList />
        },
        {
            // 게시판 > 등록
            path: '/reference/Write',
            element: <RWrite />
        },
        {
            // 자료실 > 사진자료
            path: '/reference/Picture',
            element: <Picture />
        },
        //============================================================
        {
            // 회원관리 > 회원리스트
            path: '/members/Members',
            element: <Members />
        },
        {
            // 회원관리 > 교육생 연동 리스트
            path: '/members/Student',
            element: <Student />
        },
        {
            // 회원관리 > 회원 등록
            path: '/members/Write',
            element: <MWrite />
        },
        //============================================================
        {
            // 환경설정 > 교육일정
            path: '/preferences/EduSchedule',
            element: <EduSchedule />
        },
        {
            // 환경설정 > 교육일정
            path: '/preferences/Write',
            element: <EWrite />
        }

        //============================================================
    ]
};

export default MainRoutes;
