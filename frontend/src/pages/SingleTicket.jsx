import React from "react";
import { useEffect } from "react";
import { Navigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { setLoading } from "../features/tickets/ticketSlice";
import ticketService from "../utils/ticketService";
import { toast } from "react-toastify";
import {
  setLoading as setNotesLoading,
  setNotes,
} from "../features/notes/notesSlice";
import noteService from "../utils/noteService";
import { NotesModal } from "../components/NotesModal";

export const SingleTicket = () => {
  const { id: ticketId } = useParams();
  const { user, isLoading } = useSelector((state) => state.user);
  const { isLoading: ticketLoading, tickets } = useSelector(
    (state) => state.ticket
  );
  const { isLoading: notesLoading, notes } = useSelector(
    (state) => state.notes
  );
  const dispatch = useDispatch();
  const [ticket, setTicket] = useState(null);

  useEffect(() => {
    async function fetchTicket() {
      try {
        dispatch(setLoading(true));
        dispatch(setNotesLoading(true));
        const response = await ticketService.getTicket(ticketId, user.token);
        const response2 = await noteService.getNotes(ticketId, user.token);
        console.log(response2);
        setTicket({
          product: response.product,
          description: response.description,
          status: response.status,
        });

        dispatch(setNotes(response2));
        dispatch(setLoading(false));
        dispatch(setNotesLoading(false));

        toast.success("CONGRATS ong etting tickets back!");
      } catch (e) {
        toast.error(e);
      }
    }

    if (user) {
      fetchTicket();
    }
  }, [user, ticketId]);

  if (isLoading || ticketLoading || notesLoading) {
    return <h1>Loading...</h1>;
  }

  if (!user) {
    return <Navigate to="/" />;
  }

  if (!ticket) {
    return <div>SingleTicket</div>;
  }
  return (
    <>
      <div>
        <h1>{ticket.product}</h1>
        <p>{ticket.description}</p>
        <p>{ticket.status}</p>
      </div>
      <div className="my-12 border p-8">
        {notes.map((note) => (
          <div key={note._id}>{note.text}</div>
        ))}
      </div>
      <div>
        <NotesModal id={ticketId} token={user.token} />
      </div>
    </>
  );
};
