import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Layout from '../Components/Layouts/Layout'
import { toast } from 'react-hot-toast'

const GrpDetails = () => {
    const [grp,setGrp]=useState({})
    const[users,setUsers]=useState([])
    const params=useParams()
    const grpDet=async()=>{
        try {
            const res=await axios.post(`${process.env.REACT_APP_API}/group/particularGrp`,{grpId:params.grpId})
            // console.log(res.data.grp)
            console.log(res.data.userNames)
            setUsers(res.data.userNames)
        } catch (error) {
            console.log(error)
            toast.error('Something went wrong')
        }
    }
    useEffect(()=>{grpDet()},[])
  return (
    <Layout>
        <p>{users[0]}</p>
    </Layout>
  )
}

export default GrpDetails