import api from "./api";

const myPersonalPasswordsApi = api.injectEndpoints({
  endpoints: (build) => ({
    getMyPersonalPasswords: build.query({
      query: () => "/api/personalPasswords/password",
      transformResponse: (response) => response,
      providesTags: ["MyPersonalPassword"],
    }),
    getMyPersonalPassword: build.query({
      query: (id) => `/api/personalPasswords/password/${id}`,
      transformResponse: (response) => response,
      providesTags: ["MyPersonalPassword"],
    }),
    updateMyPersonalPassword: build.mutation({
      query: ({ id, ...myPersonalPassword }) => ({
        url: `/api/personalPasswords/password/${id}`,
        method: "PATCH",
        body: myPersonalPassword,
      }),
      invalidatesTags: ["MyPersonalPassword"],
    }),
    deleteMyPersonalPassword: build.mutation({
      query: (id) => ({
        url: `/api/personalPasswords/password/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["MyPersonalPAssword"],
    }),
  }),
});

export const {
  useGetMyPersonalPasswordsQuery,
  useGetMyPersonalPasswordQuery,
  useUpdateMyPersonalPasswordMutation,
  useDeleteMyPersonalPasswordMutation,
} = myPersonalPasswordsApi;
