import api from "./api";

const myHabitsApi = api.injectEndpoints({
  endpoints: (build) => ({
    getMyHabits: build.query({
      query: () => "/api/habits/habit",
      transformResponse: (response) => response,
      providesTags: ["MyHabit"],
    }),
    getMyHabit: build.query({
      query: (id) => `/api/habits/habit/${id}`,
      transformResponse: (response) => response,
      providesTags: ["MyHabit"],
    }),
    addMyHabit: build.mutation({
      query: (myHabit) => ({
        url: `/api/habits/habit`,
        method: "POST",
        body: myHabit,
      }),
      transformResponse: (response) => response,
      invalidatesTags: ["MyHabit"],
    }),
    updateMyHabit: build.mutation({
      query: ({ id, ...myHabit }) => ({
        url: `/api/habits/habit/${id}`,
        method: "PATCH",
        body: myHabit,
      }),
      invalidatesTags: ["MyHabit"],
    }),
    deleteMyHabit: build.mutation({
      query: (id) => ({
        url: `/api/habits/habit/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["MyHabit"],
    }),
  }),
});

export const {
  useGetMyHabitsQuery,
  useGetMyHabitQuery,
  useAddMyHabitMutation,
  useUpdateMyHabitMutation,
  useDeleteMyHabitMutation,
} = myHabitsApi;
