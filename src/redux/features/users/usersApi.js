import baseApi from "@/redux/api/baseApi";

export const usersApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getUsers: builder.query({
            query: ({ page = 1, limit = 10, search = "" } = {}) =>
                `/admin/users?page=${page}&limit=${limit}&search=${search}`,
            providesTags: ["admin-users"],
        }),
        getUserDetails: builder.query({
            query: (userId) => `/admin/users/${userId}`,
            providesTags: ["admin-users"],
        }),
        getUserGameLogs: builder.query({
            query: ({ userId, page = 1, limit = 10 }) =>
                `/admin/users/${userId}/logs?page=${page}&limit=${limit}`,
            providesTags: ["admin-users"],
        }),
    }),
});

export const { useGetUsersQuery, useGetUserDetailsQuery, useGetUserGameLogsQuery } = usersApi;
