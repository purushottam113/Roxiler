import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { BASE_URL } from '../utils/constants'

const OwnerDashboard = () => {
    const [userData, setUserData] = useState([])

    const storedData = async ()=> {
        try {
            const res = await axios.get(BASE_URL+ "/owner/userDetails",{ withCredentials: true })
            setUserData(res?.data);
        } 
        catch (error) {
            console.log(error.message)
        }
    }


    useEffect(()=>{
        storedData();
    },[]);

    if(!userData || userData.length === 0)  return <h2 className="text-2xl font-bold mb-4">Not rated yat your store</h2> ;

  return (
    <div className="p-8">
    <h2 className="text-2xl font-bold mb-4">{userData?.name} Rating Dashboard</h2>
    <h2 className="text-xl font-bold mb-4">Overall Rating: {userData?.avgratings}</h2>
    <div className="overflow-x-auto">
      <table className="min-w-full border border-gray-300 text-left">
        <thead className="bg-gray-200">
          <tr>
            <th className="p-3 border">Name</th>
            <th className="p-3 border">Email</th>
            <th className="p-3 border">Rating</th>
          </tr>
        </thead>
        <tbody>
          {userData?.ratings.map((user, index) => (
            <tr key={index} className="hover:bg-gray-100">
              <td className="p-3 border">{user?.user?.name}</td>
              <td className="p-3 border">{user?.user?.email}</td>
              <td className="p-3 border">{user?.rating || "N/A"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
  )
}

export default OwnerDashboard
