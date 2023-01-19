import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { ErrorText } from "./Login";
import ticketService from "../utils/ticketService";
import { toast } from "react-toastify";
import { setLoading } from "../features/tickets/ticketSlice";

export const NewTicket = () => {
  const { user, isLoading } = useSelector((state) => state.user);
  const { isLoading: ticketLoading } = useSelector((state) => state.ticket);
  const dispatch = useDispatch();
  const schema = yup.object().shape({
    product: yup.string().required(),
    description: yup.string().required(),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  if (isLoading || ticketLoading) {
    return <h1>Loading...</h1>;
  }

  if (!user) {
    return <Navigate to="/" />;
  }

  async function handleCreateTicket(data) {
    try {
      dispatch(setLoading(true));
      const response = await ticketService.createTicket(data, user.token);
      console.log(response);
      dispatch(setLoading(false));
      toast.success("did it!!");
    } catch (e) {
      toast.error(e);
    }
  }

  return (
    <section className="">
      <div className="text-center bg-gradient-to-b from-slate-700 to-slate-400 text-white h-64 pt-12">
        <h1 className="text-4xl font-bold">New ticket</h1>
        <p className="font-bold text-gray-300 mt-2">Create a new ticket here</p>
      </div>
      <form
        onSubmit={handleSubmit(async (data) => await handleCreateTicket(data))}
        className="bg-slate-100 shadow-xl p-4 border flex flex-col space-y-4 -mt-24 max-w-2xl mx-4 sm:mx-auto"
      >
        <input
          type="email"
          value={user.email}
          placeholder="enter your email"
          className="placeholder:capitalize focus:outline-none border-b-lightgreen border-b-4 p-2 bg-gray-400 rounded"
          readOnly
        />
        <input
          type="text"
          value={user.name}
          placeholder="enter your name"
          className="placeholder:capitalize focus:outline-none border-b-lightgreen border-b-4 p-2 bg-gray-400 rounded"
          readOnly
        />
        <select
          {...register("product")}
          className="border-b-lightgreen border-b-4 p-2"
        >
          <option value="iPhone">iPhone</option>
          <option value="Android">Android</option>
          <option value="Macbook">Macbook</option>
        </select>
        <ErrorText error={errors.product} />
        <input
          type="text"
          {...register("description")}
          placeholder="enter a description"
          className="placeholder:capitalize focus:outline-none border-b-lightgreen border-b-4 p-2"
        />
        <ErrorText error={errors.description} />

        <button className="bg-slate-700 text-white font-bold text-center rounded py-2 hover:opacity-70">
          Submit
        </button>
      </form>
    </section>
  );
};
