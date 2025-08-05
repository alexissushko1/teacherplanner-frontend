import api from "./api";

const myToDoListsApi = api.injectEndpoints({
  endpoints: (build) => ({
    getMyToDoLists: build.query({
      query: () => "/api/lists/todo",
      transformResponse: (response) => response,
      providesTags: ["MyToDoList"],
    }),
    getMyToDoList: build.query({
      query: (id) => `/api/lists/todo/${id}`,
      transformResponse: (response) => response,
      providesTags: ["MyToDoList"],
    }),
    addMyToDoList: build.mutation({
      query: (myToDoList) => ({
        url: `/api/lists/todo`,
        method: "POST",
        body: myToDoList,
      }),
      transformResponse: (response) => response,
      invalidatesTags: ["MyToDoList"],
    }),
    updateMyToDoList: build.mutation({
      query: ({ id, ...myToDoList }) => ({
        url: `/api/lists/todo/${id}`,
        method: "PATCH",
        body: myToDoList,
      }),
      invalidatesTags: ["MyToDoList"],
    }),
    deleteMyToDoList: build.mutation({
      query: (id) => ({
        url: `/api/lists/todo/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["MyToDoList"],
    }),
  }),
});

export const {
  useGetMyToDoListsQuery,
  useGetMyToDoListQuery,
  useAddMyToDoListMutation,
  useUpdateMyToDoListMutation,
  useDeleteMyToDoListMutation,
} = myToDoListsApi;
