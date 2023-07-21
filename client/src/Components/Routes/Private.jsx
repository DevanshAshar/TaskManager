import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useAuth } from '../../Context/auth'
import { Outlet } from 'react-router-dom'
import Unauthorized from '../../Pages/Unauthorized'
const Private = () => {
    const [ok,setOk]=useState(false)
    const [auth,setAuth]=useAuth()
    useEffect(()=>{
        const checkAuth=async()=>{
            const res=await axios.get(`${process.env.REACT_APP_API}/user/auth`)
            if(res.status===200)
            setOk(true)
            else
            setOk(false)
        }
        if(auth?.token)
        checkAuth()
    },[auth?.token])
  return ok?<Outlet/>:<Unauthorized/>
}

export default Private