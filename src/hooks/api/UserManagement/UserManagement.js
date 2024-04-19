import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const BASE_URL = process.env.REACT_APP_API_BASE_URL;

export const userManagement = createApi({
    reducerPath: 'userManagement',
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
        MemberList: builder.mutation({
            query: (body) => ({
                url: 'Adm/Member_List',
                method: 'POST',
                body: body
            })
        }),
        MemberInsert: builder.mutation({
            query: (body) => ({
                url: 'Adm/Member_Insert',
                method: 'POST',
                body: body
            })
        }),
        MemberView: builder.mutation({
            query: (body) => ({
                url: 'Adm/Member_View',
                method: 'POST',
                body: body
            })
        }),
        MemberUpdate: builder.mutation({
            query: (body) => ({
                url: 'Adm/Member_Update',
                method: 'POST',
                body: body
            })
        })
    })
});

export const { useMemberListMutation, useMemberInsertMutation, useMemberViewMutation, useMemberUpdateMutation } = userManagement;
