import React, { useState } from 'react'
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router';
import { BASE_URL } from '../utils/constants';

const SignUp = () => {
      const [name, setName] = useState("")
      const [email, setEmail] = useState("")
      const [password, setPassword] = useState("")
      const [address, setAddress] = useState("")
      const role = "USER"

      const handleSignUp = async (e) => {

        try {
            e.preventDefault();
    
            const res = await axios.post(BASE_URL + "/signup",{
                name,
                email,
                password,
                address,
                role
            },{withCredentials: true})
            // dispatch(addUser(res.data))
            // return navigate("/feed")
    
        } catch (error) {
            console.log(error)
        }
    }

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
    <form onSubmit={handleSignUp} className="bg-white p-6 rounded-2xl shadow-md w-full max-w-sm">
      <h2 className="text-2xl font-semibold mb-5 text-center">Register New User</h2>

      <input
        type="text"
        placeholder="Name"
        className="w-full mb-4 px-4 py-2 border border-gray-300 rounded-lg"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
        minLength={20}
        maxLength={60}
      />

      <input
        type="email"
        placeholder="Email"
        className="w-full mb-4 px-4 py-2 border border-gray-300 rounded-lg"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />

      <input
        type="text"
        placeholder="Address"
        className="w-full mb-4 px-4 py-2 border border-gray-300 rounded-lg"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        required
        maxLength={400}
      />

      <input
        type="password"
        placeholder="Password"
        className="w-full mb-4 px-4 py-2 border border-gray-300 rounded-lg"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />

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

export default SignUp
