/* eslint-disable @typescript-eslint/no-explicit-any */
import { tagTypes } from "../../../types/tagTypes";
import { baseApi } from "../../api/baseApi";

const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createVendor: builder.mutation({
      query: (userInfo) => ({
        url: "/users/create-vendor",
        method: "POST",
        body: userInfo,
      }),
      invalidatesTags: [tagTypes.user, tagTypes.shop],
    }),

    login: builder.mutation({
      query: (userInfo) => ({
        url: "/auth/login",
        method: "POST",
        body: userInfo,
      }),
      invalidatesTags: [tagTypes.user, tagTypes.shop],
    }),

    profile: builder.query({
      query: () => ({
        url: "/users/my-profile",
        method: "GET",
      }),
      providesTags: [tagTypes.user, tagTypes.shop],
    }),
    updateProfile: builder.mutation({
      query: (data) => ({
        url: "/users/update-my-profile",
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: [tagTypes.user],
    }),
    forgotPassword: builder.mutation({
      query: (data) => ({
        url: "/auth/forgot-password",
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: [tagTypes.user, tagTypes.shop],
    }),
    resetPassword: builder.mutation({
      query: (data) => ({
        url: "/auth/reset-password",
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: [tagTypes.user, tagTypes.shop],
    }),
    changePassword: builder.mutation({
      query: (data) => ({
        url: "/auth/change-password",
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: [tagTypes.user, tagTypes.shop],
    }),
    getAllUser: builder.query({
      query: (query) => ({
        url: "/users",
        method: "GET",
        params: query,
      }),
      providesTags: [tagTypes.user, tagTypes.shop],
    }),
    getSingleUser: builder.query({
      query: (id) => ({
        url: `/users/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.user, tagTypes.shop],
    }),
    updateUser: builder.mutation({
      query: (data) => ({
        url: `/users/update/${data?.id}`,
        method: "PATCH",
        body: data?.data,
      }),
      invalidatesTags: [tagTypes.user, tagTypes.shop],
    }),
    deleteUser: builder.mutation({
      query: (id:string) => ({
        url: `/users/${id}`,
        method: "DELETE", 
      }),
      invalidatesTags: [tagTypes.user, tagTypes.shop],
    }),
  }),
});

export const {
  useLoginMutation,
  useProfileQuery,
  useCreateVendorMutation,
  useForgotPasswordMutation,
  useChangePasswordMutation,
  useResetPasswordMutation,
  useUpdateProfileMutation,
  useUpdateUserMutation,
  useGetAllUserQuery,
  useGetSingleUserQuery,
  useDeleteUserMutation
} = authApi;
