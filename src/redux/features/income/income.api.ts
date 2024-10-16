/* eslint-disable @typescript-eslint/no-explicit-any */
import { tagTypes } from "../../../types/tagTypes";
import { baseApi } from "../../api/baseApi";

const incomesApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    allEarnings: builder.query({
      query: (query) => ({
        url: `/payments/earnings`,
        method: "GET",
        params: query,
      }),
      providesTags: [tagTypes.income],
    }),
    getDashboardData: builder.query({
      query: (query) => ({
        url: `/payments/dashboard-data`,
        method: "GET",
        params: query,
      }),
      providesTags: [tagTypes.income],
    }),
   
  }),
});

export const {
  useAllEarningsQuery,
  useGetDashboardDataQuery
 
} = incomesApi;
