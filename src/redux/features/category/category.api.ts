
import { tagTypes } from "../../../types/tagTypes";
import { baseApi } from "../../api/baseApi";

const categoryApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({ 
        createCategory: builder.mutation({
            query: (data) => ({
                url: `/category`,
                method: "POST",
                body: data
            }),
            invalidatesTags: [tagTypes.content],
        }),
        updateCategory: builder.mutation({
            query: ({data, id}) => ({
                url: `/category/${id}`,
                method: "PATCH",
                body: data
            }),
            invalidatesTags: [tagTypes.content],
        }),
        deleteCategory: builder.mutation({
            query: (id) => ({
                url: `/category/${id}`,
                method: "DELETE", 
            }),
            invalidatesTags: [tagTypes.content],
        }),
        getCategories: builder.query({
            query: (query: Record<string, any>) => ({
                url: `/category`,
                method: "GET",
                params:query
            }),
            providesTags: [tagTypes.content],
        }),
    }),
});

export const {useCreateCategoryMutation, useUpdateCategoryMutation,useDeleteCategoryMutation, useGetCategoriesQuery} =categoryApi;
