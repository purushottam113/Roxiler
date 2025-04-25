import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { BASE_URL } from '../utils/constants'

const Admin = () => {
    const [storeCount, setStoreCount] = useState(0);
    const [userCount, setUserCount] = useState(0);
    const [ratingCount, setRatingCount] = useState(0);

    const fetchData = async ()=> {
        try {
            const fetchStoreCount = await axios.get(BASE_URL+ "/storecount",{ withCredentials: true })
            setStoreCount(fetchStoreCount?.data)

            const fetchUserCount = await axios.get(BASE_URL+ "/usercount",{ withCredentials: true })
            setUserCount(fetchUserCount?.data)

            const fetchedRatingCount = await axios.get(BASE_URL+ "/ratingcount",{ withCredentials: true })
            setRatingCount(fetchedRatingCount?.data)

        } catch (error) {
            console.log(error);
        }

    }


    useEffect(()=>{
        fetchData();
    },[])


  return (
    <div className='mt-10'>
      <div className="m-16 flex flex-col justify-center gap-2">
        <div className="">
            <h1>Total numbers of Users: {userCount}</h1>
        </div>
        <div className="">
            <h1>Total numbers of Stores: {storeCount}</h1>
        </div>
        <div className="">
            <h1>Total numbers of Submitted Ratings: {ratingCount}</h1>
        </div>
      </div>
      <div className="flex justify-evenly">
        <button 
        className='border-2 rounded-md p-2 bg-blue-400 hover:bg-blue-600'
        // onClick={}
        >Add New Store
        </button>
        <button 
        className='border-2 rounded-md p-2 bg-blue-400 hover:bg-blue-600'
        // onClick={}
        >Add New User
        </button>
        <button 
        className='border-2 rounded-md p-2 bg-blue-400 hover:bg-blue-600'
        // onClick={}
        >Add New Admin
        </button>
      </div>
    </div>
  )
}

export default Admin
