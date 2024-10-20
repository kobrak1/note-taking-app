import { configureStore, } from "@reduxjs/toolkit";
import { notesApi } from "./services/notesApi"
import { userSlice } from "./features/user/userSlice"

export const store = configureStore({
    reducer: {
        [notesApi.reducerPath]: notesApi.reducer,
        user: userSlice.reducer
    },
    middleware: (getDefaultMiddleware) => 
        getDefaultMiddleware().concat(notesApi.middleware)
})