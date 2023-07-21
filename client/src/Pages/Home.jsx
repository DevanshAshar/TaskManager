import React, { useEffect, useState } from "react";
import Layout from "../Components/Layouts/Layout";
import { useAuth } from "../Context/auth";
import { Link } from "react-router-dom";
import { toast } from "react-hot-toast";
import axios from "axios";
const Home = () => {
  const [auth, setAuth] = useAuth();
  const [count,setCount]=useState();
  const [revcount,setRevcount]=useState();
  const getCount=async()=>{
    try {
      const res=await axios.get(`${process.env.REACT_APP_API}/task/getCount`)
      setCount(res.data.ct)
      setRevcount(res.data.revCt)
    } catch (error) {
      console.log(error)
      toast.error('Something went wrong')
    }
  }
  useEffect(()=>{
    getCount()
  },[])
  useEffect(() => {
    localStorage.setItem("auth", JSON.stringify(auth));
  }, [auth]);
  return (
    <Layout>
      <div>
        <h1 className="text-center p-2" style={{ color: "blue" }}>
          Welcome to Task Manager
        </h1>
        <div className="d-flex flex-wrap align-items-center">
          <img
            src="https://img.freepik.com/free-vector/man-holding-clock-time-management-concept_23-2148823171.jpg?w=740&t=st=1688724009~exp=1688724609~hmac=95784cc648b2eeffe9291e0430880dbcb5611639e018da36ea9c3becf4d23d9f"
            style={{ height: "70vh", width: "auto", marginRight: "20px" }}
          />
          <img
            src="https://img.freepik.com/free-vector/organizing-projects-concept-illustration_114360-542.jpg?w=740&t=st=1688724452~exp=1688725052~hmac=5412997e3152a8762a59a6ecdec858cc2314459f6856ee0b69f1623aba5e8af7"
            style={{ height: "80vh", width: "auto" }}
          />
          <div>
            <div className="card" style={{ width: "18rem" }}>
              <div className="card-body">
                <h2 className="card-title" style={{ color: "blue" }}>
                  Hey {auth && auth?.user?.username}!!
                </h2>
                <h5 style={{ color: "blue" }}>{count>0?(`You Have ${count} Upcoming Tasks Pending`):null}</h5>
                <h5 style={{ color: "blue" }}>{revcount>0?(`You Have ${revcount} Upcoming Tasks Pending for Review`):null}</h5>
                <h5 style={{ color: "blue" }}>{count===0 && revcount===0?(`Yayy!! You have no tasks pending`):null}</h5>
                <Link to="/dashboard" class="card-link">
                  Tasks
                </Link>
                <Link to="/createTask" class="card-link">
                  Add Task
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Home;
