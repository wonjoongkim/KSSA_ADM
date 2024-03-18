/* eslint-disable */
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const BASE_URL = process.env.REACT_APP_API_BASE_URL;

export const boardManagement = createApi({
    reducerPath: 'boardManagement',
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
        // 콘텐츠 관리 > 언어 관리 > 목록
        BoardInsert: builder.mutation({
            query: (body) => ({
                url: 'adm/Board_Insert',
                method: 'POST',
                body: body
            })
        })
    })
});

export const { useBoardInsertMutation } = boardManagement;
