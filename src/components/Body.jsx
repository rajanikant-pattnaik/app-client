"use client"
import React, { useState } from 'react'
import Profile from './Profile'
import Connections from './Connections'

const Body = () => {
  const [feed, setfeed] = useState("profile")
  return (
    <>
      <div className="flex mt-7">
        <div className='w-96 h-screen text-center'>
        <h1><span className='text-xl' onClick={()=>setfeed("profile")}>My Profile</span></h1>
        <h1><span className='text-xl' onClick={()=>setfeed("connections")}>My Connections</span></h1>
        </div>
        <div>
          {
             {
               profile:<Profile/>,
               connections:<Connections/>,
             }[feed]
          }
        </div>
      </div>
    </>
  )
}

export default Body