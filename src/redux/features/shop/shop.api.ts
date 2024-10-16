/* eslint-disable @typescript-eslint/no-explicit-any */
import { tagTypes } from "../../../types/tagTypes";
import { baseApi } from "../../api/baseApi";

const shopApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getSingleShop: builder.query({
      query: (id) => ({
        url: `/shop/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.shop],
    }),

    getMyShop: builder.query({
      query: () => ({
        url: "/shop/my-shop",
        method: "GET",
      }),

      providesTags: [tagTypes.shop],
    }),

    updateMyShop: builder.mutation({
      query: (data) => ({
        url: "/shop/my-shop",
        method: "PATCH",
        body: data,
      }),

      invalidatesTags: [tagTypes.shop],
    }),

    rejectShopVerifications: builder.mutation({
      query: (data) => ({
        url: `/shop/reject-verify-request/${data?.id}`,
        method: "POST",
        body: data.data,
      }),
      invalidatesTags: [tagTypes.shop],
    }),

    updateShop: builder.mutation({
      query: (data) => ({
        url: `/shop/${data?.id}`,
        method: "PATCH",
        body: data?.data,
      }),
      invalidatesTags: [tagTypes.shop],
    }),
  }),
});

export const {
  useGetSingleShopQuery,
  useGetMyShopQuery,
  useRejectShopVerificationsMutation,
  useUpdateShopMutation,
  useUpdateMyShopMutation,
} = shopApi;
