import React from 'react'
import { useContext,createContext,useEffect,useState } from 'react'
import { getCurrentUser } from '../lib/appwrite/api'
import { useNavigate } from 'react-router-dom' 

export const initialUser = {
    id: "",
  name: "",
  username: "",
  email: "",
  imageUrl: ""
}

const initialState ={
    user:initialUser,
    isLoading:false,
    isAuthenticated:false,
    setUser:()=>{},
    setIsAuthenticated:()=>{},
    checkAuthUser:async()=>false 
}

const AuthContext = createContext(initialState)

export const AuthProvider = ({children}) => {

    const [user,setUser] = useState(initialUser)
    const [isLoading,setIsLoading] = useState(true)
    const [isAuthenticated,setIsAuthenticated] = useState(false)
    const navigate = useNavigate()

    const checkAuthUser = async()=>{
        try { 
            console.log(isLoading);
            const currentAccount = await getCurrentUser()
            console.log(currentAccount);

            if(currentAccount) {
                setUser({
                    id:currentAccount.$id,
                    name:currentAccount.name,
                    username:currentAccount.username,
                    email:currentAccount.email,
                    imageUrl:currentAccount.imageUrl,
                    
                })
                setIsAuthenticated(true)
setIsLoading(false)
                return true
            }
            return false
        } catch (error) {
            console.log(error);
            return false
        }
        
    }
 
    useEffect(()=>{ 
       
        const cookieFallback = localStorage.getItem("cookieFallback");
        if (
          cookieFallback === "[]" ||
          cookieFallback === null ||
          cookieFallback === undefined
        ) {
          navigate("/sign-up");
        }
    
        checkAuthUser();  
    },[])


    const value = {
        user,setUser,isLoading, isAuthenticated,setIsAuthenticated,checkAuthUser
    }

  return (
     <AuthContext.Provider value={value}>
{children}
     </AuthContext.Provider>
  )
}

export const useUserContext = () => useContext(AuthContext);