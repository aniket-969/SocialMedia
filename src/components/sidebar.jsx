import React, { useState } from "react";
import { signOutUser } from "../lib/appwrite/api";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useUserContext } from "../context/AuthProvider";
import { Link } from "react-router-dom";
import { IoReorderThree } from "react-icons/io5";
import { ImCross } from "react-icons/im";
import NavMobile from './NavMobile';


const Sidebar = () => {

  const navigate = useNavigate();
  const[show,setShow] = useState(true)
  const { setIsAuthenticated, user } = useUserContext();
  
  const signOutHandler = () => {
    signOutUser();

    navigate("./sign-up");
    setIsAuthenticated(false);
    toast.success("Signed out");
  };
// console.log(show);
  return (

   < >

      <div className="hidden md:flex flex-col py-2 justify-center md:flex-row">
        <div className="hidden md:flex gap-8 py-2 px-4 ">
          <Link to="/" >
            Home
          </Link>

          <Link to={`/profile/${user.id}`} className="">Profile</Link>

          <Link to={'/create-post'}>CreatePost</Link>
        </div>


        <button className=" bg-[#9d4edd] text-white font-semibold py-2 px-6  rounded-[3rem] text-sm" onClick={signOutHandler}>SignOut</button>

      </div>
      {show?
      <div className=" md:hidden">
         <IoReorderThree className="text-3xl " onClick={()=>setShow(false)}/>
      </div>:

      <div className="shadow-xl bg-black text-white flex flex-col justify-center items-center opacity-80 h-[50%] w-[100%] p-1 absolute top-0 left-0 gap-4 md:hidden"><ImCross onClick={()=>setShow(true)} className="text-xl "/>  <NavMobile show={show}/>
      </div>

      }
    
     
</>
  );
};

export default Sidebar;
