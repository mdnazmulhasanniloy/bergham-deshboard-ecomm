
import { tagTypes } from "../../../types/tagTypes";
import { baseApi } from "../../api/baseApi";

const contentsApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({ 
        updateContent: builder.mutation({
            query: (data) => ({
                url: `/contents`,
                method: "PUT",
                body: data
            }),
            invalidatesTags: [tagTypes.content],
        }),
        deleteBanner: builder.mutation({
            query: (data) => ({
                url: `/contents/${data}`,
                method: "DELETE", 
            }),
            invalidatesTags: [tagTypes.content],
        }),
        getContents: builder.query({
            query: () => ({
                url: `/contents`,
                method: "GET",
            }),
            providesTags: [tagTypes.content],
        }),
    }),
});

export const {useUpdateContentMutation, useGetContentsQuery, useDeleteBannerMutation} =contentsApi;
