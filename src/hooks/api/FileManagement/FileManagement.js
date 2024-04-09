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
        // fileDown: builder.mutation({
        //     query: ({ atchFileId, fileSn }) => ({
        //         url: `adm/file/fileDown?atchFileId=${atchFileId}&fileSn=${fileSn}`,
        //         method: 'GET',
        //         contentType: 'multipart/form-data',
        //         responseType: 'blob'
        //     })
        // }),
        FileUpload: builder.mutation({
            query: (body) => ({
                url: 'FileUpload',
                method: 'POST',
                body: body,
                contentType: 'multipart/form-data'
            })
        })
    })
});

export const {
    useFileDeleteMutation,
    // useFileDownMutation,
    useFileUploadMutation
} = fileManagement;
