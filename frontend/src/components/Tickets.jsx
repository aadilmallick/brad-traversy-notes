import React from "react";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import ticketService from "../utils/ticketService";
import { Link, Navigate } from "react-router-dom";
import { setLoading, setTickets } from "../features/tickets/ticketSlice";
import { toast } from "react-toastify";
export const Tickets = () => {
  const { user, isLoading } = useSelector((state) => state.user);
  const { isLoading: ticketLoading, tickets } = useSelector(
    (state) => state.ticket
  );
  const dispatch = useDispatch();

  useEffect(() => {
    async function fetchTickets() {
      try {
        dispatch(setLoading(true));
        const ticketsData = await ticketService.getTickets(user.token);
        console.log(ticketsData);
        dispatch(setLoading(false));
        dispatch(setTickets(ticketsData));
        toast.success("CONGRATS ong etting tickets back!");
      } catch (e) {
        toast.error(e);
      }
    }
    if (user) {
      fetchTickets();
    }
  }, [user]);

  if (isLoading || ticketLoading) {
    return <h1>Loading...</h1>;
  }

  if (!user) {
    return <Navigate to="/" />;
  }

  return (
    <>
      {tickets.map((ticket) => (
        <Ticket {...ticket} key={ticket._id} id={ticket._id} />
      ))}
    </>
  );
};

const Ticket = ({ description, product, status, id }) => {
  return (
    <div className="p-4 border bg-slate-200 m-12">
      <h3>{product}</h3>
      <p>{description}</p>
      <p>{status}</p>
      <Link to={`/tickets/${id}`}>View ticket</Link>
    </div>
  );
};
