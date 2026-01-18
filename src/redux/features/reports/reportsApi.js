import baseApi from "@/redux/api/baseApi";

export const reportsApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getUserReport: builder.query({
            query: ({ page = 1, limit = 20 } = {}) =>
                `/admin/reports/users?page=${page}&limit=${limit}`,
            providesTags: ["admin-users"],
        }),
        getFinancialReport: builder.query({
            query: ({ page = 1, limit = 20 } = {}) =>
                `/admin/reports/financials?page=${page}&limit=${limit}`,
            providesTags: ["admin-users"],
        }),
        getPerformanceReport: builder.query({
            query: ({ page = 1, limit = 20 } = {}) =>
                `/admin/reports/performance?page=${page}&limit=${limit}`,
            providesTags: ["admin-users"],
        }),
        getAuditLogs: builder.query({
            query: ({ page = 1, limit = 20 } = {}) =>
                `/admin/audit-logs?page=${page}&limit=${limit}`,
            providesTags: ["admin-users"],
        }),
    }),
});

export const {
    useGetUserReportQuery,
    useGetFinancialReportQuery,
    useGetPerformanceReportQuery,
    useGetAuditLogsQuery,
} = reportsApi;
