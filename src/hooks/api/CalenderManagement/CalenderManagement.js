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
        // Calender List
        CalenderList: builder.mutation({
            query: (body) => ({
                url: '/Adm/Calender_List',
                method: 'POST',
                body: body
            })
        }),

        // Calender View
        CalenderView: builder.mutation({
            query: (body) => ({
                url: '/Adm/Calender_View',
                method: 'POST',
                body: body
            })
        })
    })
});

export const { useCalenderListMutation, useCalenderViewMutation } = calenderManagement;
