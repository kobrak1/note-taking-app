import { fetchBaseQuery, createApi } from "@reduxjs/toolkit/query/react";

const authApi = createApi({
    reducerPath: "authApi",
    baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3000/api/auth/v1" }),
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (credentials) => ({
                url: "/login",
                method: "POST",
                body: credentials,
            })
        }),
        register: builder.mutation({
            query: (credentials) => ({
                url: "/register",
                method: "POST",
                body: credentials,
            })
        }),
        logout: builder.mutation({
            query: () => ({
                url: "/logout",
                method: "POST",
            })
        })
    })
})

export const { useRegisterMutation, useLoginMutation, useLogoutMutation } = authApi;