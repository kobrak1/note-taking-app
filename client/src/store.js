import { configureStore } from "@reduxjs/toolkit"

import filterReducer from "./reducers/filterReducer"
import noteReducer from "./reducers/noteReducer"

// main store that combines reducers with configureStore function
const store = configureStore({
    reducer: {
        notes: noteReducer,
        filterNote: filterReducer,
    }
})

export default store