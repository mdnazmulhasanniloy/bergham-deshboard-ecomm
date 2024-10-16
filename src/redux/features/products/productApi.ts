import { tagTypes } from "../../../types/tagTypes";
import { baseApi } from "../../api/baseApi";

const productApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getallProduct: builder.query({
      query: (arg) => ({
        url: "/products",
        method: "GET",
        params: arg,
      }),

      providesTags: [tagTypes.products],
    }),

    addProduct: builder.mutation({
      query: (data) => ({
        url: "/products",
        method: "POST",
        body: data,
      }),

      invalidatesTags: [tagTypes.products],
    }),

    getSingleProduct: builder.query({
      query: (productId) => ({
        url: `/products/${productId}`,
        method: "GET",
      }),

      providesTags: [tagTypes.product, tagTypes.products],
    }),

    deleteProduct: builder.mutation({
      query: (productId) => ({
        url: `/products/${productId}`,
        method: "DELETE",
      }),

      invalidatesTags: [tagTypes.products],
    }),

    updateProduct: builder.mutation({
      query: (data) => ({
        url: `/products/${data?._id}`,
        method: "PATCH",
        body: data.data,
      }),

      invalidatesTags: [tagTypes.products, tagTypes.product],
    }),
  }),
});

export const {
  useGetallProductQuery,
  useAddProductMutation,
  useDeleteProductMutation,
  useGetSingleProductQuery,
  useUpdateProductMutation,
} = productApi;
