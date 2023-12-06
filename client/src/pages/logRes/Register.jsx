import React, { useState } from 'react'
import Header from '../../components/Header'
import Footer from '../../components/Footer'
import { useDispatch, useSelector } from 'react-redux';
import {register} from '../../store/apiCalls'

function Register() {
  const [name,setName]=useState("");
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");
  console.log(name)
  const dispatch=useDispatch();
  const {isFetching,error} = useSelector((state)=>state.auth)
  const handleClick=(e)=>{
    e.preventDefault();
    register(dispatch,{name,email,password}).then(() => {
      window.location.href = '/login';
    });
  }
  return (
    <>
    <div className='bg-koyuyesil'>
    <Header/>
    <div className="row flex items-center justify-center">
      <div className="col-6 mt-12 mb-8 border-koyumavis border-1 bg-mavis h-96 w-2/4 flex flex-col items-center justify-center shadow-2xl">
          <h1 className='font-bold text-white text-3xl mb-4' >Create Account</h1>
          <input type="text" onChange={(e)=>setName(e.target.value)} className="block mt-3 w-96 p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Name"></input>
          <input type="email" onChange={(e)=>setEmail(e.target.value)} className="block mt-3 w-96 p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Email"></input>
          <input type="password" onChange={(e)=>setPassword(e.target.value)} className="block mt-3 w-96 p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Password"></input>
          <button type="button" onClick={handleClick} className="text-white mt-4 bg-koyumavis hover:bg-koyumavis focus:outline-none focus:ring-4 focus:koyumavis font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-koyumavis dark:hover:bg-koyumavis dark:focus:koyumavis dark:bg-koyumavis">Kayit Ol</button>
      </div>
    </div>
    <Footer/>
    </div>
    </>
  )
}

export default Register