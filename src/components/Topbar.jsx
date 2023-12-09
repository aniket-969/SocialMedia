import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useUserContext } from '../context/AuthProvider';
import { Link } from 'react-router-dom';

const Topbar = () => {
    
    const { setIsAuthenticated,user,isLoading } = useUserContext()
   
if(isLoading){
  return <p>Loading...</p>
}

    return (
        <div>
            <div className="flex-between py-4 px-5">
        <Link to="/" className="flex gap-3 items-center">
          <img
            src="https://static.vecteezy.com/system/resources/previews/022/283/190/original/single-messenger-icon-social-media-icon-design-social-media-icon-icon-design-free-vector.jpg"
            alt="logo"
            width={130}
            height={325}
          />
         
        </Link> 
        <p>InstaChat</p></div>

            <Link to={`/profile/${user.id}`} className="flex-center gap-3">
            <img
              src={user?.imageUrl } 
              alt="profile"
              className="h-8 w-8 rounded-full"
            />
          </Link>
        </div>
    )
}

export default Topbar