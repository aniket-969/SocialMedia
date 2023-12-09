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
    <div>
      <div className="flex flex-col flex-between py-4 px-5">

        <Link to="/" className="flex gap-3 items-center">
          Home
        </Link>
      
      <Link to={`/profile/${user.id}`} className="flex-center gap-3">Profile</Link>

<Link to={'/create-post'}>CreatePost</Link>
      <button className=" w-20" onClick={signOutHandler}>SignOut</button>

      </div>


    </div>
  );
};

export default Sidebar;
