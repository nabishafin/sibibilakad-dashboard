import baseApi from "@/redux/api/baseApi";

export const statsApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getAdminStats: builder.query({
            query: () => "/admin/stats",
            providesTags: ["dashboardStats"],
        }),
        getChartData: builder.query({
            query: (params) => { // Use params object to construct query string properly if needed, or simple string interpolation
                const { days = 365, period = "monthly" } = params || {};
                return `/admin/charts?days=${days}&period=${period}`;
            },
            providesTags: ["dashboardStats"],
        }),
        getGameRounds: builder.query({
            query: ({ page = 1, limit = 10 } = {}) => `/admin/rounds?page=${page}&limit=${limit}`,
            providesTags: ["dashboardStats"],
        }),
    }),
});

export const { useGetAdminStatsQuery, useGetChartDataQuery, useGetGameRoundsQuery } = statsApi;
