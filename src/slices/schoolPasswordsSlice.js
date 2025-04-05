import api from "./api";

const mySchoolPasswordsApi = api.injectEndpoints({
  endpoints: (build) => ({
    getMySchoolPasswords: build.query({
      query: () => "/api/schoolpasswords/school-password",
      transformResponse: (response) => response,
      providesTags: ["MySchoolPassword"],
    }),
    getMySchoolPassword: build.query({
      query: (id) => `/api/schoolpasswords/school-password/${id}`,
      transformResponse: (response) => response,
      providesTags: ["MySchoolPassword"],
    }),
    addMySchoolPassword: build.mutation({
      query: (mySchoolPassword) => ({
        url: `/api/schoolpasswords/school-password`,
        method: "POST",
        body: mySchoolPassword,
      }),
      transformResponse: (response) => response,
      invalidatesTags: ["MySchoolPassword"],
    }),
    updateMySchoolPassword: build.mutation({
      query: ({ id, ...mySchoolPassword }) => ({
        url: `/api/schoolpasswords/school-password/${id}`,
        method: "PATCH",
        body: mySchoolPassword,
      }),
      invalidatesTags: ["MySchoolPassword"],
    }),
    deleteMySchoolPassword: build.mutation({
      query: (id) => ({
        url: `/api/schoolpasswords/school-password/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["MySchoolPassword"],
    }),
  }),
});

export const {
  useGetMySchoolPasswordsQuery,
  useGetMySchoolPasswordQuery,
  useAddMySchoolPasswordMutation,
  useUpdateMySchoolPasswordMutation,
  useDeleteMySchoolPasswordMutation,
} = mySchoolPasswordsApi;
