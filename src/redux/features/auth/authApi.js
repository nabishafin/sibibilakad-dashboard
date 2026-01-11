import baseApi from "@/redux/api/baseApi";
import {
  clearResetEmail,
} from "@/redux/slices/forgotPasswordSlice";

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // 01. login
    login: builder.mutation({
      query: (loginData) => ({
        url: "/auth/login",
        method: "POST",
        body: loginData,
      }),
      invalidatesTags: ["auth"],
    }),

    // 01.1 register
    register: builder.mutation({
      query: (data) => ({
        url: "/auth/register",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["auth"],
    }),

    // 02. refresh token
    refreshToken: builder.mutation({
      query: () => {
        const refreshToken = localStorage.getItem("refreshToken");
        return {
          url: "/auth/refresh-auth",
          method: "POST",
          body: { refreshToken },
        };
      },
      invalidatesTags: ["auth"],
    }),

    // 03. logout
    logout: builder.mutation({
      query: () => {
        const refreshToken = localStorage.getItem("refreshToken");
        return {
          url: "/auth/logout",
          method: "POST",
          body: { refreshToken },
        };
      },
      invalidatesTags: ["auth"],
    }),



    // 05. update user
    updateUser: builder.mutation({
      query: (data) => ({
        url: `/user/update`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["auth"],
    }),

    // 06. forgot password
    forgotPassword: builder.mutation({
      query: (data) => ({
        url: `/auth/forgot-password`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["auth"],
    }),

    // 06.1 recover password
    recoverPassword: builder.mutation({
      query: (data) => ({
        url: "/auth/recover",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["auth"],
    }),

    // 07. verify email/OTP
    verifyEmail: builder.mutation({
      query: ({ email, otp }) => ({
        url: "/auth/verify-email-otp",
        method: "POST",
        body: { email, otp },
      }),
      invalidatesTags: ["auth"],
    }),

    // 08. reset password
    resetPassword: builder.mutation({
      query: (data) => {
        return {
          url: `/auth/reset-password`,
          method: "POST",
          body: data,
        };
      },
      invalidatesTags: ["auth"],
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          dispatch(clearResetEmail());
        } catch (error) {
          console.error("Reset password error:", error);
        }
      },
    }),

    // 09. change password (logged-in user)
    changePassword: builder.mutation({
      query: (data) => ({
        url: `/users/update-admin-password`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["auth"],
    }),
  }),
});

export const {
  useLoginMutation,
  useRefreshTokenMutation,
  useLogoutMutation,
  useForgotPasswordMutation,
  useVerifyEmailMutation,
  useResetPasswordMutation,
  useChangePasswordMutation,
  useGetUserByTokenQuery,
  useUpdateUserMutation,
  useRegisterMutation,
  useRecoverPasswordMutation,
} = authApi;
