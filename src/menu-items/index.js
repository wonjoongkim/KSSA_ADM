// project import
// import dashboard from './dashboard';

import { Greeting, Groups, Facility, Directions } from '../pages/introduction';
import { Security, Airline, Operate, Admission } from '../pages/curriculum';
import { Reason, Application } from '../pages/support';
import { List as NList, Write as NWrite } from '../pages/notice';
import { List as RList, Write as RWrite, Picture } from '../pages/reference';
import { Members, Student, Write as MWrite } from '../pages/members';
import { EduSchedule, Write as EWrite } from '../pages/preferences';

// ==============================|| MENU ITEMS ||============================== //

const menuItems = {
    items: [
        Greeting,
        Groups,
        Facility,
        Directions,
        Security,
        Airline,
        Operate,
        Admission,
        Reason,
        Application,
        NList,
        NWrite,
        RList,
        // Notification,
        // Education,
        // Faq,
        // News,
        // Laws,
        // Datum,
        Picture,
        Members,
        MWrite,
        Student,
        EduSchedule,
        EWrite
    ]
};

export default menuItems;
