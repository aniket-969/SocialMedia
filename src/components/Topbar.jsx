import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useUserContext } from '../context/AuthProvider';
import { Link } from 'react-router-dom';
import logo from '../images/logo.png'
import Sidebar from '../components/sidebar'

const Topbar = () => {

  const {  user, isLoading } = useUserContext()

  if (isLoading) {
    return <p>Loading...</p>
  }

  return ( 

    <div className='flex items-center justify-between gap-10 m-2 py-4 px-10 bg-[rgb(241,234,255)] shadow-md '>
      <div className=""> 
        <Link to="/" className="flex gap-3 items-center">
          <img
            src={logo}
            width={130}
            height={325}
          />
        </Link>
      </div>

      <Link to={`/profile/${user.id}`} className=" hidden lg:flex gap-7 justify-center items-center  ">
        
        <img
          src={user?.imageUrl}
          alt="profile"
          className="h-10 w-10 rounded-full"
        />
        <p className='bg-[#9d4edd] text-white font-semibold py-3 px-5 rounded-[3rem]'>{user?.name}</p>
      </Link>
 
      <Sidebar/>
    </div>

  )
}

export default Topbar