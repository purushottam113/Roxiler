import React, { useState } from 'react'
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router';
import { BASE_URL } from '../utils/constants';
import { addUser } from '../utils/userSlice';

const Login = () => {
  const [email, setEmail] = useState("omi123@gmail.com")
  const [password, setPassword] = useState("password")
  const [role, setRole] = useState("USER")
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleLogin = async (e) => {

    try {
        e.preventDefault();

        const res = await axios.post(BASE_URL + "/login",{
            email,
            password,
            role
        },{withCredentials: true})
        dispatch(addUser(res.data))

        if(role === "STORE_OWNER"){
          return navigate("/owner/dashboard")
        }
        if(role === "USER"){
          return navigate("/user/dashboard")
        }
        if(role === "ADMIN"){
          return navigate("/admin/dashboard")
        }

    } catch (error) {
        console.log(error)
    }
  }

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <form onSubmit={handleLogin} className="bg-white p-6 rounded-2xl shadow-md w-full max-w-sm">
        <h2 className="text-2xl font-semibold mb-5 text-center">Login</h2>

        <input
          type="email"
          placeholder="Email"
          className="w-full mb-4 px-4 py-2 border border-gray-300 rounded-lg"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full mb-4 px-4 py-2 border border-gray-300 rounded-lg"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <select
          className="w-full mb-6 px-4 py-2 border border-gray-300 rounded-lg"
          value={role}
          onChange={(e) => setRole(e.target.value)}
        >
          <option value="USER">USER</option>
          <option value="ADMIN">ADMIN</option>
          <option value="STORE_OWNER">STORE_OWNER</option>
        </select>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
        >
          Login
        </button>
      </form>
    </div>
  )
}

export default Login
