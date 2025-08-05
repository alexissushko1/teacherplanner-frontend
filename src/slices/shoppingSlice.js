import api from "./api";

const myShoppingListsApi = api.injectEndpoints({
  endpoints: (build) => ({
    getMyShoppingLists: build.query({
      query: () => "/api/lists/shopping",
      transformResponse: (response) => response,
      providesTags: ["MyShoppingList"],
    }),
    getMyShoppingList: build.query({
      query: (id) => `/api/lists/shopping/${id}`,
      transformResponse: (response) => response,
      providesTags: ["MyShoppingList"],
    }),
    addMyShoppingList: build.mutation({
      query: (myShoppingList) => ({
        url: `/api/lists/shopping`,
        method: "POST",
        body: myShoppingList,
      }),
      transformResponse: (response) => response,
      invalidatesTags: ["MyShoppingList"],
    }),
    updateMyShoppingList: build.mutation({
      query: ({ id, ...myShoppingList }) => ({
        url: `/api/lists/shopping/${id}`,
        method: "PATCH",
        body: myShoppingList,
      }),
      invalidatesTags: ["MyShoppingList"],
    }),
    deleteMyShoppingList: build.mutation({
      query: (id) => ({
        url: `/api/lists/shopping/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["MyShoppingList"],
    }),
  }),
});

export const {
  useGetMyShoppingListsQuery,
  useGetMyShoppingListQuery,
  useAddMyShoppingListMutation,
  useUpdateMyShoppingListMutation,
  useDeleteMyShoppingListMutation,
} = myShoppingListsApi;
