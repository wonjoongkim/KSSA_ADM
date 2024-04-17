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
        // 게시판 리스트
        BoardList: builder.mutation({
            query: (body) => ({
                url: 'Adm/Board_List',
                method: 'POST',
                body: body
            })
        }),
        // 게시판 상세
        BoardView: builder.mutation({
            query: (body) => ({
                url: 'Adm/Board_View',
                method: 'POST',
                body: body
            })
        }),
        // 게시판 등록
        BoardInsert: builder.mutation({
            query: (body) => ({
                url: 'Adm/Board_Insert',
                method: 'POST',
                body: body
            })
        }),
        // 게시판 수정
        BoardUpdate: builder.mutation({
            query: (body) => ({
                url: 'Adm/Board_Update',
                method: 'POST',
                body: body
            })
        }),
        // 게시판 삭제
        BoardDelete: builder.mutation({
            query: (body) => ({
                url: 'Adm/Board_Delete',
                method: 'POST',
                body: body
            })
        })
    })
});

export const { useBoardListMutation, useBoardViewMutation, useBoardInsertMutation, useBoardUpdateMutation, useBoardDeleteMutation } =
    boardManagement;
