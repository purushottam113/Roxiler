import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { BASE_URL } from '../utils/constants'

const User = () => {
    const [storedData, setStoredData] = useState([])
    const [rating, setRating] = useState(5)

    const fetchData = async ()=> {
        try {
            const res = await axios.get(BASE_URL+ "/user/storeList",{ withCredentials: true })
            setStoredData(res?.data);
            console.log(res?.data)
        } 
        catch (error) {
            console.log(error.message)
        }
    }

    const handalRating = async (storeId, newRating)=> {
        try {
            setRating(newRating);
            const rating = Number(newRating);

            const res = await axios.post(BASE_URL+ "/user/rateToStore",{
                storeId,
                rating
            },{
                withCredentials: true
            })
        } 
        catch (error) {
            console.log(error)
        }
            
    }


    useEffect(()=>{
        fetchData();
    },[]);

    if(!storedData || storedData.length === 0)  return <h2 className="text-2xl font-bold mb-4">Store not available</h2> ;


  return (
    <div className="p-8">
    <h2 className="text-2xl font-bold mb-4">Stores</h2>
    <div className="overflow-x-auto">
      <table className="min-w-full border border-gray-300 text-left">
        <thead className="bg-gray-200">
          <tr>
            <th className="p-3 border">Store Name</th>
            <th className="p-3 border">Address</th>
            <th className="p-3 border">Overall Rating</th>
            <th className="p-3 border">User`s Submitted Rating</th>
            <th className="p-3 border">Submit Rating</th>
          </tr>
        </thead>
        <tbody>
          {storedData?.map((store, index) => (
            <tr key={index} className="hover:bg-gray-100">
              <td className="p-3 border">{store?.name}</td>
              <td className="p-3 border">{store?.address}</td>
              <td className="p-3 border">{store?.ovaerallRating+ " ⭐" || "N/A"}</td>
              <td className="p-3 border">{store?.userSubmitedRating+ " ⭐" || "N/A"}</td>
              <td className="p-3 border"> {store.userSubmitedRating? "Modify Your Rating:" : "Rate this Store:"}
                <select
                  className="w-fit m-2 px-4 py-2 border border-gray-300 rounded-lg"
                  value={rating}
                  onChange={(e) => handalRating(store.id, e.target.value, store?.userSubmitedRating)}
                >
                  <option value="1">1 ⭐</option>
                  <option value="2">2 ⭐</option>
                  <option value="3">3 ⭐</option>
                  <option value="4">4 ⭐</option>
                  <option value="5">5 ⭐</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
  )
}

export default User
