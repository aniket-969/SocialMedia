import React from "react";
import { useForm } from "react-hook-form";
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { createUserAccount, signInUser } from '../../../lib/appwrite/api'
import toast from "react-hot-toast";
import { useUserContext } from "../../../context/AuthProvider";
import { useNavigate } from "react-router-dom";
import { FaEnvelope } from "react-icons/fa6";
import { FaRegKeyboard } from "react-icons/fa6";
import { Link } from "react-router-dom";

const SigninForm = () => {

  const { checkAuthUser } = useUserContext()

  const schema = yup.object().shape({

    email: yup.string().email().required(),
    password: yup.string().min(4).required()
  })
  const navigate = useNavigate()

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema)
  });

  const login = async (data) => {

    const loggedInUser = await signInUser(data)

    console.log(loggedInUser);

    if (!loggedInUser) {

      return toast.error("Please try again")
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

      <div  className="flex flex-col gap-5 items-center">
        <h1 className="font-bold text-3xl">Welcome Back</h1>
        <h2  className="text-xl">Enter your credential to login</h2>
      </div>

<div >
      <form onSubmit={handleSubmit(login)} className="flex flex-col gap-6">
 
        <div className="bg-[#f1eaff] px-12 py-4 flex  items-center gap-4 rounded-3xl">
          <FaEnvelope />
          <input className="bg-[#f1eaff]" type="email" {...register("email")} placeholder="Email" />
        </div>

        <div className="bg-[#f1eaff] px-12 py-4 flex  items-center gap-4 rounded-3xl">
          <FaRegKeyboard />
          <input className="bg-[#f1eaff]" type="password" {...register("password")} placeholder="Password" />

        </div>
        <input type="submit" value="Sign in" className="bg-[#9d4edd] text-white font-semibold py-4 px-8  rounded-[3rem] text-2xl"/>
      </form>
</div>

      <div>
        <p>Don't have an account?</p>
        <Link to="/sign-up" className="text-[#9d4edd] font-semibold">Sign Up</Link>
      </div>
    </div>
  )
}

export default SigninForm