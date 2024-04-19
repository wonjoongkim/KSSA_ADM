// assets
import { ProjectOutlined } from '@ant-design/icons';
import { useLocation } from 'react-router-dom';

// icons
const location = useLocation();
const icons = { ProjectOutlined };

// ==============================|| MENU ITEMS - DASHBOARD ||============================== //
export const Greeting = {
    id: '11',
    title: 'Navigation',
    type: 'group',
    children: [
        {
            id: '/introduction/Greeting',
            title: '교육원소개 > 원장인사',
            subtitle: '원장인사',
            type: 'item',
            url: '/introduction/Greeting',
            icon: icons.ProjectOutlined,
            breadcrumbs: true
        }
    ]
};
export const Groups = {
    id: '12',
    title: 'Navigation',
    type: 'group',
    children: [
        {
            id: '/introduction/Groups',
            title: '교육원소개 > 조직도',
            subtitle: '조직도',
            type: 'item',
            url: '/introduction/Groups',
            icon: icons.ProjectOutlined,
            breadcrumbs: true
        }
    ]
};
export const Facility = {
    id: '13',
    title: 'Navigation',
    type: 'group',
    children: [
        {
            id: '/introduction/Facility',
            title: '교육원소개 > 교육시설',
            subtitle: '교육시설',
            type: 'item',
            url: '/introduction/Facility',
            icon: icons.ProjectOutlined,
            breadcrumbs: true
        }
    ]
};
export const Directions = {
    id: '14',
    title: 'Navigation',
    type: 'group',
    children: [
        {
            id: '/introduction/Directions',
            title: '교육원소개 > 오시는 길',
            subtitle: '오시는 길',
            type: 'item',
            url: '/introduction/Directions',
            icon: icons.ProjectOutlined,
            breadcrumbs: true
        }
    ]
};
// ======================================================================
export const Security = {
    id: '21',
    title: 'Navigation',
    type: 'group',
    children: [
        {
            id: '/curriculum/Security',
            title: '교육과정 > 보안검색 교육과정',
            subtitle: '보안검색 교육과정',
            type: 'item',
            url: '/curriculum/Security',
            icon: icons.ProjectOutlined,
            breadcrumbs: true
        }
    ]
};

export const Airline = {
    id: '22',
    title: 'Navigation',
    type: 'group',
    children: [
        {
            id: '/curriculum/Airline',
            title: '교육과정 > 항공경비 교육과정',
            subtitle: '항공경비 교육과정',
            type: 'item',
            url: '/curriculum/Airline',
            icon: icons.ProjectOutlined,
            breadcrumbs: true
        }
    ]
};

export const Operate = {
    id: '23',
    title: 'Navigation',
    type: 'group',
    children: [
        {
            id: '/curriculum/Operate',
            title: '교육과정 > 정원 및 운영계획',
            subtitle: '정원 및 운영계획',
            type: 'item',
            url: '/curriculum/Operate',
            icon: icons.ProjectOutlined,
            breadcrumbs: true
        }
    ]
};

export const Admission = {
    id: '24',
    title: 'Navigation',
    type: 'group',
    children: [
        {
            id: '/curriculum/Admission',
            title: '교육과정 > 입교절차',
            subtitle: '입교절차',
            type: 'item',
            url: '/curriculum/Admission',
            icon: icons.ProjectOutlined,
            breadcrumbs: true
        }
    ]
};
// ======================================================================
export const Reason = {
    id: '31',
    title: 'Navigation',
    type: 'group',
    children: [
        {
            id: '/support/Reason',
            title: '직업훈련비지원 > 관련근거',
            subtitle: '관련근거',
            type: 'item',
            url: '/support/Reason',
            icon: icons.ProjectOutlined,
            breadcrumbs: true
        }
    ]
};

export const Application = {
    id: '32',
    title: 'Navigation',
    type: 'group',
    children: [
        {
            id: '/support/Application',
            title: '직업훈련비지원 > 신청방법',
            subtitle: '신청방법',
            type: 'item',
            url: '/support/Application',
            icon: icons.ProjectOutlined,
            breadcrumbs: true
        }
    ]
};
// ======================================================================
export const NList = {
    id: '41',
    title: 'Navigation',
    type: 'group',
    children: [
        {
            id: '/notice/List',
            title: `${location.state.board} > ${location.state.title}`,
            subtitle: location.state.title,
            type: 'item',
            url: '/notice/List',
            icon: icons.ProjectOutlined,
            breadcrumbs: true
        }
    ]
};

export const NWrite = {
    id: '42',
    title: 'Navigation',
    type: 'group',
    children: [
        {
            id: '/notice/Write',
            title: `${location.state.board} > ${location.state.title}`,
            subtitle: location.state.title,
            type: 'item',
            url: '/notice/Write',
            icon: icons.ProjectOutlined,
            breadcrumbs: true
        }
    ]
};

// ======================================================================
export const RList = {
    id: '51',
    title: 'Navigation',
    type: 'group',
    children: [
        {
            id: '/reference/List',
            title: `${location.state.board} > ${location.state.title}`,
            subtitle: location.state.title,
            type: 'item',
            url: '/reference/List',
            icon: icons.ProjectOutlined,
            breadcrumbs: true
        }
    ]
};

export const RWrite = {
    id: '52',
    title: 'Navigation',
    type: 'group',
    children: [
        {
            id: '/reference/Write',
            title: `${location.state.board} > ${location.state.title}`,
            subtitle: location.state.title,
            type: 'item',
            url: '/reference/Write',
            icon: icons.ProjectOutlined,
            breadcrumbs: true
        }
    ]
};

export const Picture = {
    id: '53',
    title: 'Navigation',
    type: 'group',
    children: [
        {
            id: '/reference/Picture',
            title: '자료실 > 사진자료',
            subtitle: '사진자료',
            type: 'item',
            url: '/reference/Picture',
            icon: icons.ProjectOutlined,
            breadcrumbs: true
        }
    ]
};

// ======================================================================
export const Members = {
    id: '61',
    title: 'Navigation',
    type: 'group',
    children: [
        {
            id: '/members/Members',
            title: '회원관리 > 회원리스트',
            subtitle: '회원리스트',
            type: 'item',
            url: '/members/Members',
            icon: icons.ProjectOutlined,
            breadcrumbs: true
        }
    ]
};

export const Student = {
    id: '62',
    title: 'Navigation',
    type: 'group',
    children: [
        {
            id: '/members/Student',
            title: '회원관리 > 교육 신청 리스트',
            subtitle: '교육 신청 리스트',
            type: 'item',
            url: '/members/Student',
            icon: icons.ProjectOutlined,
            breadcrumbs: true
        }
    ]
};

export const MWrite = {
    id: '52',
    title: 'Navigation',
    type: 'group',
    children: [
        {
            id: '/member/Write',
            title: '회원관리 > 회원 등록',
            subtitle: '회원 등록',
            type: 'item',
            url: '/member/Write',
            icon: icons.ProjectOutlined,
            breadcrumbs: true
        }
    ]
};

// ======================================================================
export const EduSchedule = {
    id: '71',
    title: 'Navigation',
    type: 'group',
    children: [
        {
            id: '/preferences/EduSchedule',
            title: '환경설정 > 교육일정',
            subtitle: '교육일정',
            type: 'item',
            url: '/preferences/EduSchedule',
            icon: icons.ProjectOutlined,
            breadcrumbs: true
        }
    ]
};

export const EWrite = {
    id: '72',
    title: 'Navigation',
    type: 'group',
    children: [
        {
            id: '/preferences/Write',
            title: '환경설정 > 교육일정 등록',
            subtitle: '교육일정 등록',
            type: 'item',
            url: '/preferences/Write',
            icon: icons.ProjectOutlined,
            breadcrumbs: true
        }
    ]
};
// ======================================================================
