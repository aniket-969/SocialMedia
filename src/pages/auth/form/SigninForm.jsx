import React from "react";
import { useForm } from "react-hook-form"; 
import * as yup from 'yup'
import {yupResolver} from '@hookform/resolvers/yup'
import {createUserAccount, signInUser} from '../../../lib/appwrite/api'
import toast from "react-hot-toast";
import { useUserContext } from "../../../context/AuthProvider";
import { useNavigate } from "react-router-dom";
 

const SigninForm = () => {
  const { checkAuthUser, isLoading } = useUserContext()
  const schema = yup.object().shape({
    
    email:yup.string().email().required(),
    password:yup.string().min(4).required()
  })
  const navigate = useNavigate() 
  
  const { register, handleSubmit,formState:{errors} } = useForm({
    resolver: yupResolver(schema)
  });
  
  const login = async(data) => {
    console.log('dsfs');
      

       const loggedInUser = await signInUser(data)
     
       console.log(loggedInUser);
   
       if(!loggedInUser){
   
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
    <div>
    <form onSubmit={handleSubmit(login)}>
      
      <label>email</label>
      <input type="email" {...register("email")} placeholder="Enter your email"/>

      <label>password</label>
      <input type="password" {...register("password")} placeholder="Enter the password"/>

      <input type="submit" />
    </form>
  </div>
  )
}

export default SigninForm