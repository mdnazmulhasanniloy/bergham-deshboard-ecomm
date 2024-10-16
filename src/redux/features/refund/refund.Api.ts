import { tagTypes } from "../../../types/tagTypes";
import { baseApi } from "../../api/baseApi";

const productApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllRefundRequest: builder.query({
      query: (arg) => ({
        url: "/refund-request",
        method: "GET",
        params: arg,
      }),

      providesTags: [tagTypes.products],
    }),

    approvedRefundRequest: builder.mutation({
      query: (data) => ({
        url: `/refund-request/approved-request/${data?.id}`,
        method: "PATCH",
        body: data?.data,
      }),

      invalidatesTags: [tagTypes.products],
    }),
    cancelRefundRequest: builder.mutation({
      query: ({ id, data }) => ({
        url: `/refund-request/cancel-request/${id}`,
        method: "PATCH",
        body: data,
      }),

      invalidatesTags: [tagTypes.products],
    }),
  }),
});

export const {
  useGetAllRefundRequestQuery,
  useApprovedRefundRequestMutation,
  useCancelRefundRequestMutation,
} = productApi;
