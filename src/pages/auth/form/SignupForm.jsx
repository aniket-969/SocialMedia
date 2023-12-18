import React from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { createUserAccount } from "../../../lib/appwrite/api";
import toast from "react-hot-toast";
import { useUserContext } from "../../../context/AuthProvider";
import { Link, useNavigate } from "react-router-dom";
import { signInUser } from "../../../lib/appwrite/api";
import { FaEnvelope } from "react-icons/fa6";
import { FaImagePortrait } from "react-icons/fa6";
import { FaUser } from "react-icons/fa6";
import { FaRegKeyboard } from "react-icons/fa6";

const SignupForm = () => {

  const schema = yup.object().shape({
    name: yup.string().required("Pls write your first name"),
    username: yup.string().required("Pls write your username"),
    email: yup.string().email().required("Pls provide your email"),
    password: yup.string().min(8).required("Add password to Proceed.."),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const navigate = useNavigate();
  const { checkAuthUser, isLoading } = useUserContext();

  const signUserUp = async (data) => {
    console.log("dsfs");
    const newUser = await createUserAccount(data);
    console.log(newUser);
    if (!newUser) {
      return toast.error("User not found");
    }

    const loggedInUser = await signInUser(data);

    console.log(loggedInUser);

    if (!loggedInUser) {
      navigate("/sign-in");
      return toast.error("Please sign in to your new account");
    }

    const isLoggedIn = await checkAuthUser();

    if (isLoggedIn) {
      navigate("/");
    } else {
      return toast.error("Login failed");
    }

    return toast.success("User signed in successfully");
  };

  return (

    <div className=" flex flex-col items-center gap-12 py-8 ">

      <div className=" flex flex-col gap-5 items-center ">
        <h1 className="font-bold text-3xl">Sign Up</h1>
        <h2 className="text-xl">Create Your Account</h2>
      </div>
 
      <div>

        <form
          onSubmit={handleSubmit(signUserUp)}
          className="  w-[20rem] flex flex-col gap-6"
        >

          <div >
            <div className="bg-[#f1eaff]  py-4 px-8 mx-2 flex items-center gap-4  rounded-3xl">
              <FaUser />
              <input
                className="bg-[#f1eaff]"
                type="text"
                placeholder=" Name"
                {...register("name")}
              />
            </div>

            <p className="text-red-500">{errors.name?.message}</p>
          </div>

          <div>
            <div className="bg-[#f1eaff]  py-4 px-8 mx-2 flex  items-center gap-4  rounded-3xl">
              {" "}
              <FaImagePortrait />
              <input
                className="bg-[#f1eaff]"
                type="text"
                placeholder=" Username"
                {...register("username")}
              />

            </div> <p className="text-red-500">{errors.username?.message}</p>
          </div>


          <div>
            <div className="bg-[#f1eaff]  py-4 px-8 mx-2 flex items-center gap-4  rounded-3xl">
              <FaEnvelope />
              <input
                type="email"
                {...register("email")}
                placeholder=" Email"
                className="bg-[#f1eaff]"
              />

            </div> <p className="text-red-500">{errors.email?.message}</p>
          </div>

          <div>
            <div className="bg-[#f1eaff]  py-4 px-8 mx-2 flex items-center gap-4  rounded-3xl">
              <FaRegKeyboard />
              <input
                type="password"
                {...register("password")}
                placeholder=" Password"
                className="bg-[#f1eaff]"
              />
            </div>
            <p className="text-red-500">{errors.password?.message}</p>
          </div>


          <input
            type="submit"
            value="Sign Up"
            className="bg-[#9d4edd] text-white font-semibold py-4 mx-2 px-8  rounded-[3rem] text-2xl"
          />
        </form>
      </div>

      <div className="flex gap-5">
        <p>Already a user?</p>
        <Link to="/sign-in" className="text-[#9d4edd] font-semibold">
          Sign in
        </Link>
      </div>

    </div>
  );
};

export default SignupForm;
