"use client";
import React, { useState } from "react";
import axios from "axios";
import { Toaster, toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { BASE_URL } from "@/helper";
// import { v2 as cloudinary } from "cloudinary";

const Page = () => {
  const [authType, setauthType] = useState(false);
  const [name, setName] = useState("");
  const [cred, setCred] = useState("");
  const [password, setPassword] = useState("");
  const [mobile_no, setMobile_no] = useState("");
  const [email, setEmail] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const router=useRouter();
  const config = {
    headers: { "Content-Type": "application/json" },
    credentials: "include",
  };
  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      if (authType) {
        const formData = new FormData();
        formData.append("file", selectedFile);
        formData.append("upload_preset", "gpijkibi");
        formData.append("cloud_name", "dnk6uefrn");
        const res = await axios.post(
          `https://api.cloudinary.com/v1_1/dnk6uefrn/image/upload`,
          formData
        );
        let newurl = res.data.url;
        const userData = {
          name,
          password,
          mobile_no,
          email,
          profile_picture: newurl,
        };
       
        const registerResponse = await axios.post(
          `${BASE_URL}/api/v1/users/register`,
          userData,
          config
        );
        toast.success("Register Successful")
        console.log("User registered:", registerResponse.data);
        
        setSelectedFile(null);
      } else if (!authType) {
        const userData={
          cred,
          password
        };
        const loginResponse = await axios.post(
          `${BASE_URL}/api/v1/users/login`,
          userData,
          config
        );
        toast.success("Login Successful")
        console.log("Login Data:",loginResponse)
      }
      router.push('/')
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <h2 className="text-2xl mb-4">{`${authType?"Register":"Login"}`}</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className={` ${authType?"visible":"hidden"} block text-gray-700 text-sm font-bold mb-2`}>
              Name:
            </label>
            <input
              className={`${authType?"visible":"hidden"} shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
              type="text"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className={` ${authType?"visible":"hidden"} block text-gray-700 text-sm font-bold mb-2`}>
              Email:
            </label>
            <input
            className={`${authType?"visible":"hidden"} shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
              type="text"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className={` ${authType?"visible":"hidden"} block text-gray-700 text-sm font-bold mb-2`}>
              Mobile_No
            </label>
            <input
            className={`${authType?"visible":"hidden"} shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
              type="text"
              name="mobile_no"
              value={mobile_no}
              onChange={(e) => setMobile_no(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className={` ${!authType?"visible":"hidden"} block text-gray-700 text-sm font-bold mb-2`}>
              Cred
            </label>
            <input
            className={`${!authType?"visible":"hidden"} shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
              type="text"
              name="cred"
              value={cred}
              onChange={(e) => setCred(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Password
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              type="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          {/* Repeat similar styling for other form fields */}
          <div className="mb-4">
            <label className={` ${authType?"visible":"hidden"} block text-gray-700 text-sm font-bold mb-2`}>
              Profile Picture:
            </label>
            <input
              className={`${authType?"visible":"hidden"} shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
              type="file"
              name="selectedFile"
              onChange={handleFileChange}
            />
          </div>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            {`${authType?"Register":"Login"}`}
          </button>
          <button
            className="text-blue-300 underline block mt-4 pointer"
            onClick={() => {
              setauthType(!authType)
            }}
          >
             {`${authType?"already have account Login":"dont have account Register"}`}
          </button>
          <Toaster/>
        </form>
      </div>
    </>
  );
};

export default Page;
