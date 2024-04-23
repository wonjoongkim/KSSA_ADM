/* eslint-disable */
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const BASE_URL = process.env.REACT_APP_API_BASE_URL;

export const calenderManagement = createApi({
    reducerPath: 'calenderManagement',
    baseQuery: fetchBaseQuery({
        baseUrl: `${BASE_URL}`,
        prepareHeaders: (headers) => {
            const jwtToken = localStorage.getItem('userToken');
            if (jwtToken) {
                headers.set('authorization', `Bearer ${jwtToken}`);
            }
            return headers;
        }
    }),
    endpoints: (builder) => ({
        // Calender List (리스트)
        CalenderSchedule: builder.mutation({
            query: (body) => ({
                url: '/Adm/Calender_Schedule',
                method: 'POST',
                body: body
            })
        }),

        // Calender View (상세)
        CalenderView: builder.mutation({
            query: (body) => ({
                url: '/Adm/Calender_View',
                method: 'POST',
                body: body
            })
        }),

        // Calender Insert (입력)
        CalenderInsert: builder.mutation({
            query: (body) => ({
                url: '/Adm/Calender_Insert',
                method: 'POST',
                body: body
            })
        }),

        // Calender Update (수정)
        CalenderUpdate: builder.mutation({
            query: (body) => ({
                url: '/Adm/Calender_Update',
                method: 'POST',
                body: body
            })
        }),

        // Calender Delete (삭제)
        CalenderDelete: builder.mutation({
            query: (body) => ({
                url: '/Adm/Calender_Delete',
                method: 'POST',
                body: body
            })
        })
    })
});

export const {
    useCalenderScheduleMutation,
    useCalenderViewMutation,
    useCalenderInsertMutation,
    useCalenderUpdateMutation,
    useCalenderDeleteMutation
} = calenderManagement;
