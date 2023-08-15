"use client";
import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import { BASE_URL } from "@/helper";
const Profile = () => {
  const [details, setDetails] = useState("")
  const [bio, setBio] = useState("")
  const getData = async () => {
    try {
      const res = await axios.get(
        `${BASE_URL}/api/v1/users/userDetails`,
        { credentials:"include" }
      );
      if(res.data.success===true){
        setDetails(res.data.user);
      }
      const res2=await axios.get(
        `${BASE_URL}/api/v1/users/bios/myBio`,
        { credentials:"include" }
      );
      if(res2.data.success===true){
        setBio(res2.data.user);
      }
    } catch (error) {
      console.log(error)
    }
    
  };
  useEffect(() => {
    getData();
  }, []);
  return(
    <>
     <h1>My Profile</h1>
     

    </>
  )
};

export default Profile;
