import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseURI = "https://expense-track-mern.herokuapp.com";
// const baseURI = `${window.location.origin}`;

export const apiSlice = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: baseURI }),
  endpoints: (builder) => ({
    // get categories
    getCategories: builder.query({
      // get: 'http://localhost:8080/api/categories'
      query: () => "/api/categories",
      providesTags: ['categories']
    }),
    // get labels
    getLabels: builder.query({
      // get 'http://localhost:8080/api/labels'
      query: () => "/api/labels",
      providesTags: ['transactions']
    }),
    // add new Transaction
    addTransaction: builder.mutation({
      query: (initialTransaction) => ({
          // post: 'http://localhost:8080/api/transaction'
        url: "/api/transaction",
        method: "POST",
        body: initialTransaction,
      }),
      invalidatesTags: ['transactions']
    }),
    // delete record
    deleteTransaction: builder.mutation({
      query: (recordId) => ({
          // delete: 'http://localhost:8080/api/transaction'
        url: "/api/transaction",
        method: "DELETE",
        body: recordId,
      }),
      invalidatesTags: ['transactions']
    }),
  }),
});

export default apiSlice;
