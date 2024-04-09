import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const BASE_URL = process.env.REACT_APP_API_BASE_URL;

export const mainManagement = createApi({
    reducerPath: 'mainManagement',
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
        // 관리자 정보
        getAdminInfo: builder.mutation({
            query: (body) => ({
                url: 'Adm/Admin_Info',
                method: 'POST',
                body: body
            })
        }),
        // 통계 - 교육상황
        selectMainEduStatistics: builder.mutation({
            query: (body) => ({
                url: 'adm/statistics/selectMainEduStatistics.do',
                method: 'POST',
                body: body
            })
        }),
        // 통계 - 연도별합격별
        selectMainYearStatistics: builder.mutation({
            query: (body) => ({
                url: 'adm/statistics/selectMainYearStatistics.do',
                method: 'POST',
                body: body
            })
        })
    })
});

export const { useGetAdminInfoMutation, useSelectMainEduStatisticsMutation, useSelectMainYearStatisticsMutation } = mainManagement;
