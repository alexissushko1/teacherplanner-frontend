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
    addMyPersonalPassword: build.mutation({
      query: (myPersonalPassword) => ({
        url: `/api/personalPasswords/password/`,
        method: "POST",
        body: myPersonalPassword,
      }),
      transformResponse: (response) => response,
      invalidatesTags: ["MyPersonalPassword"],
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
      invalidatesTags: ["MyPersonalPassword"],
    }),
  }),
});

export const {
  useGetMyPersonalPasswordsQuery,
  useGetMyPersonalPasswordQuery,
  useAddMyPersonalPasswordMutation,
  useUpdateMyPersonalPasswordMutation,
  useDeleteMyPersonalPasswordMutation,
} = myPersonalPasswordsApi;
