'use client'
import React, { useState } from 'react'
import axios from 'axios'
import Link from 'next/link'
import {toast} from 'react-hot-toast'
import { useRouter } from 'next/navigation'
export default function ProfilePage() {
    const router = useRouter()
    const [data, setData] = useState("nothing");

    const getUserDetails = async () => {
        const res = await axios.post("/api/users/me")
        console.log(res.data.data._id);
        setData(res.data.data._id)
    }
    const logout = async () => {
        try {
            await axios.get('/api/users/logout')
            toast.success("logout success")
            router.push("/login")
        } catch (error: any) {
            console.log(error.message);
            toast.error(error.message)
        }
    }

  return (
    <div className='flex flex-col items-center justify-center min-h-screen py-2'>
      <h1>Profile page</h1>
      <hr />
      <h2>{data === "nothing" ? "Nothing" : <Link href={`/profile/${data}`}>Test{data}</Link>}</h2>
      <hr />
      <button 
      className='p-2 border border-gray-300 bg-blue-700 hover:bg-blue-700 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-white'
      onClick={logout}>logout</button>

      <button 
      className='p-2 border border-gray-300 bg-green-700 hover:bg-green-700 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-white'
      onClick={getUserDetails}>Get User Details</button>
    </div>
  )
}


