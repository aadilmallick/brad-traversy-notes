import React from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch, useSelector } from "react-redux";
import { register as registerUser } from "../features/user/userSlice";
import { useEffect } from "react";
import authService from "../utils/authService";
import { toast } from "react-toastify";
import { setLoading, setUser } from "../features/user/userSlice";
import { useNavigate } from "react-router-dom";
export const Register = () => {
  const dispatch = useDispatch();
  const { user, isLoading } = useSelector((state) => state.user);
  const schema = yup.object().shape({
    name: yup.string().required(),
    email: yup.string().email().required(),
    password: yup.string().required().min(6),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password"), null], "Passwords must be equal!"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const navigate = useNavigate();

  async function handleRegister(data) {
    try {
      dispatch(setLoading(true));
      const userData = await authService.registerUser({
        name: data.name,
        email: data.email,
        password: data.password,
      });
      dispatch(setUser(userData));
      dispatch(setLoading(false));
      authService.saveUserToLocalStorage(userData);
      toast.success("Congrats on signing up!");
      navigate("/");
    } catch (e) {
      toast.error(e);
    }
  }

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  return (
    <section>
      <div className="text-center bg-gradient-to-b from-slate-700 to-slate-400 text-white h-64 pt-12">
        <h1 className="text-4xl font-bold">Register</h1>
        <p className="font-bold text-gray-300 mt-2">Please create an account</p>
      </div>
      <form
        onSubmit={handleSubmit(async (data) => {
          await handleRegister(data);
        })}
        className="bg-slate-100 shadow-xl p-4 border flex flex-col space-y-4 -mt-24 max-w-2xl mx-4 sm:mx-auto"
      >
        <input
          type="text"
          {...register("name")}
          placeholder="enter your name"
          className="placeholder:capitalize focus:outline-none border-b-lightgreen border-b-4 py-2"
          required
        />
        <ErrorText error={errors.name} />
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
        <input
          type="password"
          {...register("confirmPassword")}
          placeholder="confirm your password"
          className="placeholder:capitalize focus:outline-none border-b-lightgreen border-b-4 py-2"
          required
        />
        <ErrorText error={errors.confirmPassword} />
        <button className="bg-slate-700 text-white font-bold text-center rounded py-2 hover:opacity-70">
          Submit
        </button>
      </form>
    </section>
  );
};

const ErrorText = ({ error }) => {
  if (!error) {
    return null;
  }

  return <p className="text-red-400">{error?.message}</p>;
};
