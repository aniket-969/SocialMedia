import React from "react";
import { useForm } from "react-hook-form";
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { createUserAccount } from '../../../lib/appwrite/api'
import toast from "react-hot-toast";
import { useUserContext } from "../../../context/AuthProvider";
import { Link, useNavigate } from 'react-router-dom';
import { signInUser } from "../../../lib/appwrite/api";
import { FaEnvelope } from "react-icons/fa6";
import { FaImagePortrait } from "react-icons/fa6"
import { FaUser } from "react-icons/fa6";
import { FaRegKeyboard } from "react-icons/fa6";

const SignupForm = () => {


  const schema = yup.object().shape({
    name: yup.string().required("Pls write your first name"),
    email: yup.string().email().required(),
    password: yup.string().min(4).required()
  })


  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema)
  });

  const navigate = useNavigate()
  const { checkAuthUser, isLoading } = useUserContext()

  const signUserUp = async (data) => {
    console.log('dsfs');
    const newUser = await createUserAccount(data)
    console.log(newUser);
    if (!newUser) {
      return toast.error("User not found")
    }

    const loggedInUser = await signInUser(data)

    console.log(loggedInUser);

    if (!loggedInUser) {

      navigate("/sign-in")
      return toast.error("Please sign in to your new account")
    }

    const isLoggedIn = await checkAuthUser()

    if (isLoggedIn) {

      navigate("/");
    } else {
      return toast.error("Login failed")


    }

    return toast.success("User signed in successfully")
  };


  return (
    <div className="flex flex-col items-center gap-12 py-8">

      <div>
        <h1>Sign Up</h1>
        <h2>Create Your Account</h2>
      </div>

      <div>
        <form onSubmit={handleSubmit(signUserUp)}>

          <FaUser />
          <input
            type="text"
            placeholder="Enter your name"
            {...register("name")}
          />
          <p className="text-red-500">{errors.firstName?.message}</p>

          <FaImagePortrait />
          <input
            type="text"
            placeholder="Enter your username"
            {...register("username")}
          />
          <p className="text-red-500">{errors.firstName?.message}</p>

          <FaEnvelope />
          <input type="email" {...register("email")} placeholder="Enter your email" />

          <FaRegKeyboard />
          <input type="password" {...register("password")} placeholder="Enter the password" />
          <input type="submit" value="Sign Up" />
        </form>
      </div>

      <div>
        <p>Already a user?</p>
        <Link to='/sign-in'>Sign in</Link>
      </div>
    </div>

  );
};

export default SignupForm;
