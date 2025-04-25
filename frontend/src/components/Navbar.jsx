import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router';
import { BASE_URL } from '../utils/constants';
import { removeUser } from '../utils/userSlice';
import axios from 'axios';

const Navbar = () => {
  const [isLogin, setIsLogin] = useState(false);
  const user = useSelector((store)=> store.user)

  useEffect(() => {
    if (user) {
      setIsLogin(true);
    } else {
      setIsLogin(false);
    }
  }, [user]);

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleLogout = async ()=>{
    try {
      await axios.post(BASE_URL + "/logout",{},{ withCredentials: true })
      dispatch(removeUser())
      return navigate("/login")
    } catch (error) {
      console.log(error)
    }
  }

  const handleLogin = async ()=> {
    return navigate("/login");
  }

  return (
      <nav className='flex justify-between p-5 '>
          <h1 className='text-2xl'>Store Rating System</h1>

          {isLogin?
            <button className='text-2xl'
                    onClick={handleLogout}
            >Logout</button>
          :
            <button className='text-2xl'
                    onClick={handleLogin}
            >Login</button>
          }
      </nav>
        

  )
}

export default Navbar
