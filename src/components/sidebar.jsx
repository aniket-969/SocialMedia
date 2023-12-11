import React from "react";
import { signOutUser } from "../lib/appwrite/api";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useUserContext } from "../context/AuthProvider";
import { Link } from "react-router-dom";

const Sidebar = () => {

  const navigate = useNavigate();
  const { setIsAuthenticated, user } = useUserContext();
  const signOutHandler = () => {
    signOutUser();

    navigate("./sign-up");
    setIsAuthenticated(false);
    toast.success("Signed out");
  };

  return (
   
      <div className="flex flex-row gap-20 py-2 px-5 mx-5 justify-center max-w-[40%] ">
        <div className="flex gap-8 py-2 px-4 ">
          <Link to="/" >
            Home
          </Link>

          <Link to={`/profile/${user.id}`} className="">Profile</Link>

          <Link to={'/create-post'}>CreatePost</Link>
        </div>


        <button className=" bg-[#9d4edd] text-white font-semibold py-2 px-6  rounded-[3rem] text-sm" onClick={signOutHandler}>SignOut</button>

      </div>

  );
};

export default Sidebar;
