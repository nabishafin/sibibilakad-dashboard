import baseApi from "@/redux/api/baseApi";

export const usersApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
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

export const { useGetUserDetailsQuery, useGetUserGameLogsQuery } = usersApi;
