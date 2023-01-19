import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  tickets: [],
  isLoading: false,
};

const ticketSlice = createSlice({
  name: "ticket",
  initialState,
  reducers: {
    /**
     *
     * @param {*} state
     * @param {{payload: boolean}} action
     * sets the ticket loading state
     */
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setTickets: (state, action) => {
      state.tickets = action.payload;
    },
  },
});

export const { setLoading, setTickets } = ticketSlice.actions;

export default ticketSlice.reducer;
