import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./features/user/userSlice";
import ticketSlice from "./features/tickets/ticketSlice";
import notesSlice from "./features/notes/notesSlice";
export const store = configureStore({
  reducer: {
    user: userSlice,
    ticket: ticketSlice,
    notes: notesSlice,
  },
});
