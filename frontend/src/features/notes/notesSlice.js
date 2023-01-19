import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  notes: [],
  isLoading: false,
};

const notesSlice = createSlice({
  name: "notes",
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setNotes: (state, action) => {
      state.notes = action.payload;
    },
    addNotes: (state, action) => {
      state.notes.push(action.payload);
    },
  },
});

export const { setLoading, setNotes, addNotes } = notesSlice.actions;

export default notesSlice.reducer;
