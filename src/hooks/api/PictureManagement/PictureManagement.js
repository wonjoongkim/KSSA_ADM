/* eslint-disable */
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const BASE_URL = process.env.REACT_APP_API_BASE_URL;

export const pictureManagement = createApi({
    reducerPath: 'pictureManagement',
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
        // 사진자료 리스트
        PictureList: builder.mutation({
            query: (body) => ({
                url: 'Adm/Picture_List',
                method: 'POST',
                body: body
            })
        }),
        // 사진자료 수정
        PictureUpdate: builder.mutation({
            query: (body) => ({
                url: 'Adm/Picture_Update',
                method: 'POST',
                body: body
            })
        }),
        // 사진자료 삭제
        PictureDelete: builder.mutation({
            query: (body) => ({
                url: 'Adm/Picture_Delete',
                method: 'POST',
                body: body
            })
        })
    })
});

export const { usePictureListMutation, usePictureUpdateMutation, usePictureDeleteMutation } = pictureManagement;
