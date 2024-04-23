import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const BASE_URL = process.env.REACT_APP_API_BASE_URL;

export const preferencesManagement = createApi({
    reducerPath: 'preferencesManagement',
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
        // 환경 설정 > 교육일정 리스트
        CalenderList: builder.mutation({
            query: (body) => ({
                url: 'Adm/Calender_List',
                method: 'POST',
                body: body
            })
        }),
        // 환경 설정 > 교육일정 등록
        CalenderInsert: builder.mutation({
            query: (body) => ({
                url: 'Adm/Calender_Insert',
                method: 'POST',
                body: body
            })
        }),
        // 환경 설정 > 교육일정 수정
        CalenderUpdate: builder.mutation({
            query: (body) => ({
                url: 'Adm/Calender_Update',
                method: 'POST',
                body: body
            })
        }),
        // 환경 설정 > 교육일정 상세정보
        CalenderView: builder.mutation({
            query: (body) => ({
                url: 'Adm/Calender_View',
                method: 'POST',
                body: body
            })
        })
    })
});

export const { useCalenderListMutation, useCalenderInsertMutation, useCalenderUpdateMutation, useCalenderViewMutation } =
    preferencesManagement;
