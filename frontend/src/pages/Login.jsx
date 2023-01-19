import React from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import authService from "../utils/authService";
import { toast } from "react-toastify";
import { setLoading, setUser } from "../features/user/userSlice";

export const Login = () => {
  const schema = yup.object().shape({
    email: yup.string().email().required(),
    password: yup.string().required().min(6),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const { isLoading } = useSelector((state) => state.user);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  async function handleLogin(data) {
    try {
      dispatch(setLoading(true));
      const userData = await authService.loginUser(data.email, data.password);
      authService.saveUserToLocalStorage(userData);
      dispatch(setUser(userData));
      dispatch(setLoading(false));
      toast.success("Congrats on logging in!");
      navigate("/");
    } catch (e) {
      toast.error(e);
    }
  }

  return (
    <section className="">
      <div className="text-center bg-gradient-to-b from-slate-700 to-slate-400 text-white h-64 pt-12">
        <h1 className="text-4xl font-bold">Login</h1>
        <p className="font-bold text-gray-300 mt-2">Please Login</p>
      </div>
      <form
        onSubmit={handleSubmit(async (data) => await handleLogin(data))}
        className="bg-slate-100 shadow-xl p-4 border flex flex-col space-y-4 -mt-24 max-w-2xl mx-4 sm:mx-auto"
      >
        <input
          type="email"
          {...register("email")}
          placeholder="enter your email"
          className="placeholder:capitalize focus:outline-none border-b-lightgreen border-b-4 py-2"
          required
        />
        <ErrorText error={errors.email} />
        <input
          type="password"
          {...register("password")}
          placeholder="enter your password"
          className="placeholder:capitalize focus:outline-none border-b-lightgreen border-b-4 py-2"
          required
        />
        <ErrorText error={errors.password} />
        <button className="bg-slate-700 text-white font-bold text-center rounded py-2 hover:opacity-70">
          Submit
        </button>
      </form>
    </section>
  );
};

export const ErrorText = ({ error }) => {
  if (!error) {
    return null;
  }

  return <p className="text-red-400">{error?.message}</p>;
};
