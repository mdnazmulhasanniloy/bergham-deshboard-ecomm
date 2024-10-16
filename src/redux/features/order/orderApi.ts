/* eslint-disable @typescript-eslint/no-explicit-any */
import { url } from "inspector";
import { tagTypes } from "../../../types/tagTypes";
import { baseApi } from "../../api/baseApi";

const orderApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getOrderById: builder.query({
      query: (id) => { 
        return ({
          url: `/orders/${id}`,
          method: "GET",
        })
      },
      providesTags: [tagTypes.order],
    }),

    // getOrderItems: builder.query({
    //   query: (arg: Record<string, any>) => ({
    //     url: `/order-items`,
    //     method: "GET",
    //   }),
    //   providesTags: [tagTypes.order],
    // }),

    getallOrders: builder.query({
      query: (arg) => ({
        url: "/orders",
        method: "GET",
        params: arg,
      }),

      providesTags: [tagTypes.order],
    }),

    updateOrder: builder.mutation({
      query: ({id, data}) =>{
        console.log(id, data)
        return({url: `/orders/${id}`,
          method: "PATCH",
          body: data,})
      },

      invalidatesTags: [tagTypes.order],
    }),
  }),
});

export const {
  useGetOrderByIdQuery,
  useGetallOrdersQuery,
  useUpdateOrderMutation
} = orderApi;
