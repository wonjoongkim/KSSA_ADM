import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const BASE_URL = process.env.REACT_APP_API_BASE_URL;

export const fileManagement = createApi({
    reducerPath: 'fileManagement',
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
        FileDelete: builder.mutation({
            query: (body) => ({
                url: 'FileDelete',
                method: 'POST',
                body: body
            })
        }),
        FileUpload: builder.mutation({
            query: (body) => ({
                url: 'FileUpload',
                method: 'POST',
                body: body,
                contentType: 'multipart/form-data'
            })
        }),
        // 파일 다운로드
        FileDownLoad: builder.mutation({
            query: (body) => ({
                url: 'FileDownLoad',
                method: 'POST',
                body: body
            })
        }),
        // 파일 미리보기
        FilePreView: builder.mutation({
            query: (body) => ({
                url: 'FilePreView',
                method: 'POST',
                body: body
            })
        })
    })
});

export const { useFileDeleteMutation, useFileUploadMutation, useFileDownLoadMutation, useFilePreViewMutation } = fileManagement;
