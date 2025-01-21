import api from "./api";

const MyEventApi = api.injectEndpoints({
  endpoints: (build) => ({
    getMyEvents: build.query({
      query: () => "/api/events/event",
      transformResponse: (response) => response,
      providesTags: ["MyEvent"],
    }),
    getMyEvent: build.query({
      query: (id) => `/api/events/event/${id}`,
      transformResponse: (response) => response,
      providesTags: ["MyEvent"],
    }),
    updateMyEvent: build.mutation({
      query: ({ id, ...myEvent }) => ({
        url: `/api/events/event/${id}`,
        method: "PATCH",
        body: myEvent,
      }),
      invalidatesTags: ["MyEvent"],
    }),
    addMyEvent: build.mutation({
      query: (myEvent) => ({
        url: `api/events/event/`,
        method: "POST",
        body: myEvent,
      }),
      transformResponse: (response) => response,
      invalidatesTags: ["MyEvent"],
    }),
    deleteMyEvent: build.mutation({
      query: (id) => ({
        url: `/api/events/event/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["MyEvent"],
    }),
  }),
});

export const {
  useGetMyEventsQuery,
  useGetMyEventQuery,
  useAddMyEventMutation,
  useUpdateMyEventMutation,
  useDeleteMyEventMutation,
} = MyEventApi;
