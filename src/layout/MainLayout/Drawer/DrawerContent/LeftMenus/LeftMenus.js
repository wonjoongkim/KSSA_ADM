/* eslint-disable*/
import { useState } from 'react';
import cookies from 'react-cookies';
import { Link, useNavigate } from 'react-router-dom';
// import 'antd/dist/antd.css';

import { Stack } from '@mui/material';
import DrawerHeaderStyled from '../../DrawerHeader/DrawerHeaderStyled';
import { useTheme } from '@mui/material/styles';

import { AppstoreAddOutlined, BlockOutlined, FileTextOutlined } from '@ant-design/icons';
import { Menu, Divider } from 'antd';
import Logo_Bottom from 'components/Logo_Bottom';

function getItem(label, key, icon, children, type) {
    return {
        key,
        icon,
        children,
        label,
        type
    };
}

const items = [
    // getItem('교육원소개', 'sub1', <AppstoreAddOutlined />, [
    //     getItem(<Link to="/introduction/Greeting">원장인사</Link>, '11', <FileTextOutlined />),
    //     getItem(<Link to="/introduction/Groups">조직도</Link>, '12', <FileTextOutlined />),
    //     getItem(<Link to="/introduction/Facility">교육시설</Link>, '13', <FileTextOutlined />),
    //     getItem(<Link to="/introduction/Directions">오시는길</Link>, '14', <FileTextOutlined />)
    // ]),

    // getItem('교육과정', 'sub2', <AppstoreAddOutlined />, [
    //     getItem(<Link to="/curriculum/Security">보안검색 교육과정</Link>, '21', <FileTextOutlined />),
    //     getItem(<Link to="/curriculum/Airline">항공경비 교육과정</Link>, '22', <FileTextOutlined />),
    //     getItem(<Link to="/curriculum/Operate">정원 및 운영계획</Link>, '23', <FileTextOutlined />),
    //     getItem(<Link to="/curriculum/Admission">입교절차</Link>, '24', <FileTextOutlined />)
    // ]),

    // getItem('직업훈련비지원', 'sub3', <AppstoreAddOutlined />, [
    //     getItem(<Link to="/support/Reason">관련근거</Link>, '31', <FileTextOutlined />),
    //     getItem(<Link to="/support/Application">신청방법</Link>, '32', <FileTextOutlined />)
    // ]),

    getItem('게시판', 'sub4', <AppstoreAddOutlined />, [
        // getItem(<Link to="/notice/Notification">공지사항</Link>, '41', <FileTextOutlined />),
        getItem(
            <Link to={{ pathname: '/notice/List' }} state={{ board: '게시판', flag: 'Notice', title: '공지사항' }}>
                공지사항
            </Link>,
            '41',
            <FileTextOutlined />
        ),
        getItem(
            <Link to={{ pathname: '/notice/List' }} state={{ board: '게시판', flag: 'Education', title: '교육안내' }}>
                교육안내
            </Link>,
            '42',
            <FileTextOutlined />
        ),
        getItem(
            <Link to={{ pathname: '/notice/List' }} state={{ board: '게시판', flag: 'Faq', title: 'FAQ' }}>
                FAQ
            </Link>,
            '43',
            <FileTextOutlined />
        )
    ]),

    getItem('자료실', 'sub5', <AppstoreAddOutlined />, [
        getItem(
            <Link to={{ pathname: '/reference/List' }} state={{ board: '자료실', flag: 'News', title: '최신뉴스' }}>
                최신뉴스
            </Link>,
            '51',
            <FileTextOutlined />
        ),
        getItem(
            <Link to={{ pathname: '/reference/List' }} state={{ board: '자료실', flag: 'Laws', title: '관련법령' }}>
                관련법령
            </Link>,
            '52',
            <FileTextOutlined />
        ),
        getItem(
            <Link to={{ pathname: '/reference/List' }} state={{ board: '자료실', flag: 'Datum', title: '교육자료' }}>
                교육자료
            </Link>,
            '53',
            <FileTextOutlined />
        ),
        getItem(
            <Link to={{ pathname: '/reference/Picture' }} state={{ board: '자료실', flag: 'Picture', title: '사진자료' }}>
                사진자료
            </Link>,
            '54',
            <FileTextOutlined />
        )
    ]),

    getItem('회원관리', 'sub6', <AppstoreAddOutlined />, [
        getItem(<Link to="/members/Members">회원 리스트</Link>, '61', <FileTextOutlined />),
        getItem(<Link to="/members/Student">교육생 연동 리스트</Link>, '62', <FileTextOutlined />)
    ]),

    getItem('환경설정', 'sub7', <AppstoreAddOutlined />, [
        getItem(<Link to="/preferences/EduSchedule">교육일정</Link>, '71', <FileTextOutlined />)
    ])
];

const LeftMenus = () => {
    const [defaultSelectedKeys] = useState(cookies.load('defaultSelectedKey') === undefined ? '' : cookies.load('defaultSelectedKey'));
    const [defaultOpenKeys] = useState(cookies.load('defaultOpenKey') === undefined ? '' : cookies.load('defaultOpenKey'));
    const [defaultOpenKeySubs] = useState(cookies.load('defaultOpenKeySub') === undefined ? '' : cookies.load('defaultOpenKeySub'));

    const onClick = (e) => {
        const expires = new Date();
        expires.setMinutes(expires.getDay() + 1);
        cookies.save('defaultSelectedKey', e.keyPath[0], expires);
        cookies.save('defaultOpenKey', e.keyPath[2], expires);
        cookies.save('defaultOpenKeySub', e.keyPath[1], expires);
    };

    // const theme = useTheme();
    // const navigate = useNavigate();

    const DashCalls = () => {
        cookies.remove('defaultSelectedKey', { path: '/' }, 1000);
        cookies.remove('defaultOpenKey', { path: '/' }, 1000);
        cookies.remove('defaultOpenKeySub', { path: '/' }, 1000);

        // navigate('/');
        window.location.replace('/');
        // location.reload();
    };

    return (
        <>
            <div style={{ textAlign: 'center', fontSize: '23px', paddingTop: '20px', color: '#7da7cb' }}>
                <Logo_Bottom />
            </div>
            <DrawerHeaderStyled sx={{ height: '130px', marginTop: '-20px' }}>
                <Stack direction="row" spacing={1} alignItems="center" onClick={DashCalls}>
                    <Link style={{ textDecoration: 'none' }}>
                        <div style={{ textAlign: 'center', fontSize: '23px', paddingBottom: '10px', color: '#7da7cb' }}>
                            한국보안인재개발원 KSSA
                        </div>
                        <div style={{ textAlign: 'center', fontSize: '15px', color: '#fff' }}>Korea security Specialist Academy</div>
                    </Link>
                </Stack>
            </DrawerHeaderStyled>

            <Menu
                onClick={onClick}
                defaultSelectedKeys={[defaultSelectedKeys]}
                defaultOpenKeys={[defaultOpenKeys, defaultOpenKeySubs]}
                mode="inline"
                inlineCollapsed={!open}
                items={window.localStorage.getItem('LoginId') === 'admin' ? items : ''}
                theme={'dark'}
            />
        </>
    );
};
export default LeftMenus;
