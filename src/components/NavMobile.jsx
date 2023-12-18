import React from "react";
import { Link } from "react-router-dom";
import { useUserContext } from "../context/AuthProvider";
import { signOutUser } from "../lib/appwrite/api";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";


const NavMobile = (prop) => {

  const {user} = useUserContext();
  console.log(user.id);
  const navigate = useNavigate();

const signOutHandler = () => {
    signOutUser();

    navigate("./sign-up");
    toast.success("Signed out");
  };

  return (
    <>
      {prop.show ? ( 
        <></>
      ) : (
        <nav className=" flex flex-col justify-center items-center gap-3 w-full ">
          <Link to="/">Home</Link>
 
          <Link to={`/profile/${user.id}`} >
            Profile
          </Link>

          <Link to={"/create-post"}>CreatePost</Link>

          <button className=" bg-[#9d4edd] text-white font-semibold py-2 px-6  rounded-[3rem] text-sm" onClick={signOutHandler}>SignOut</button>
        </nav>
      )}
    </>
  );
};

export default NavMobile;
