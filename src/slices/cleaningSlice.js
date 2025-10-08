import api from "./api";

const myTasksApi = api.injectEndpoints({
  endpoints: (build) => ({
    getMyTasks: build.query({
      query: () => "/api/habits/cleaning",
      transformResponse: (response) => response,
      providesTags: ["MyTask"],
    }),
    getMyTask: build.query({
      query: (id) => `/api/habits/cleaning/${id}`,
      transformResponse: (response) => response,
      providesTags: ["MyTask"],
    }),
    addMyTask: build.mutation({
      query: (myTask) => ({
        url: `/api/habits/cleaning`,
        method: "POST",
        body: myTask,
      }),
      transformResponse: (response) => response,
      invalidatesTags: ["MyTask"],
    }),
    updateMyTask: build.mutation({
      query: ({ id, ...myTask }) => ({
        url: `/api/habits/cleaning/${id}`,
        method: "PATCH",
        body: myTask,
      }),
      invalidatesTags: ["MyTask"],
    }),
    deleteMyTask: build.mutation({
      query: (id) => ({
        url: `/api/habits/cleaning/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["MyTask"],
    }),
  }),
});

export const {
  useGetMyTasksQuery,
  useGetMyTaskQuery,
  useAddMyTaskMutation,
  useUpdateMyTaskMutation,
  useDeleteMyTaskMutation,
} = myTasksApi;
