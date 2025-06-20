import api from "./api";

const MyEventApi = api.injectEndpoints({
  endpoints: (build) => ({
    getMyEvents: build.query({
      query: () => "/api/events/event",
      transformResponse: (response) => response,
      providesTags: (result) =>
        result
          ? [
              ...result.map((event) => ({ type: "MyEvent", id: event.id })),
              { type: "MyEvent", id: "LIST" },
            ]
          : [{ type: "MyEvent", id: "LIST" }],
    }),

    getMyEvent: build.query({
      query: (id) => `/api/events/event/${id}`,
      transformResponse: (response) => response,
      providesTags: (result, error, id) => [{ type: "MyEvent", id }],
    }),

    updateMyEvent: build.mutation({
      query: ({ id, ...myEvent }) => ({
        url: `/api/events/event/${id}`,
        method: "PATCH",
        body: myEvent,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: "MyEvent", id },
        { type: "MyEvent", id: "LIST" },
      ],
    }),

    addMyEvent: build.mutation({
      query: (myEvent) => ({
        url: `/api/events/event/`,
        method: "POST",
        body: myEvent,
      }),
      transformResponse: (response) => response,
      invalidatesTags: [{ type: "MyEvent", id: "LIST" }],
    }),

    deleteMyEvent: build.mutation({
      query: (id) => ({
        url: `/api/events/event/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, id) => [
        { type: "MyEvent", id },
        { type: "MyEvent", id: "LIST" },
      ],
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
