import { createSlice } from "@reduxjs/toolkit";

const notesSlice = createSlice({
    name: "notes",
    initialState: { isModal: false, data: [] },
    reducers: {
        toggleModal: (state) => {
            !state.isModal
        },
        setData: (state, action) => {
            state.data = action.payload
        }
    }
});

export const { toggleModal } = notesSlice.actions;
export default notesSlice.reducer