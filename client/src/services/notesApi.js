import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const notesApi = createApi({
    reducerPath: "notesApi",
    baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3001/api/notes" }),
    endpoints: (builder) => ({
        fetchNotes: builder.query({
            query: () => "/fetch-notes",
            providesTags: ["Notes"]
        })
    })
})

// This will generate the hook named useFetchNotesQuery
export const { useFetchNotesQuery } = notesApi;