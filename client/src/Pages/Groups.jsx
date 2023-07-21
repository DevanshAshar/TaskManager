import React, { useEffect, useState } from "react";
import Layout from "../Components/Layouts/Layout";
import UserMenu from "../Components/Layouts/UserMenu";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import axios from "axios";
import { useAuth } from "../Context/auth";

const Groups = () => {
  const navigate = useNavigate();
  const [auth,setAuth]=useAuth()
  const [name, setName] = useState();
  const [grpId,setGrpId]=useState();
  const [id, setId] = useState();
  const [grps,setGrps]=useState([])
  const create = async () => {
    try {
      const res = await axios.post(`${process.env.REACT_APP_API}/group/createGrp`, {
        name,
      });
      if (res.status === 200) toast.success("Group created");
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };
  const join=async()=>{
    try {
      const res=await axios.post(`${process.env.REACT_APP_API}/group/joinGrp`,{grpId})
      if(res.status===200)
      {
      toast.success('Joined Group')
      navigate(`/grp/${res.data.grps._id}`)
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  }
  const getGrps=async()=>{
    try {
        const res=await axios.get(`${process.env.REACT_APP_API}/group/myGrps`)
        setGrps(res.data.grps)
    } catch (error) {
        console.log(error);
      toast.error("Something went wrong");
    }
  }
  useEffect(() => {
    getGrps();
  }, []);
  useEffect(() => {
    getGrps();
  }, [grps]);
  useEffect(() => {
    localStorage.setItem("auth", JSON.stringify(auth));
  }, [auth]);
  return (
    <Layout>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-2">
            <UserMenu />
          </div>
          <div className="col-md-9">
            <h2>Groups</h2>
            <div className="flex-wrap" style={{ display: "flex" }}>
              <div className="card" style={{ width: "18rem" }}>
                <div className="card-body">
                  <h3 className="card-title" style={{ textAlign: "center" }}>
                    New Group
                  </h3>
                  <p className="card-text">
                    <input
                      className="form-control"
                      type="text"
                      placeholder="Group Name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                    <div style={{ textAlign: "center", margin: "4px" }}>
                      <button
                        className="btn btn-primary"
                        style={{ width: "16rem" }}
                        onClick={() => {
                          create();
                        }}
                      >
                        Create New +
                      </button>
                    </div>
                  </p>
                </div>
              </div>
              <div className="card m-2" style={{ width: "18rem" }}>
                <div className="card-body">
                  <h3 className="card-title" style={{ textAlign: "center" }}>
                    Join Group
                  </h3>
                  <input
                    className="form-control"
                    type="text"
                    placeholder="Group id"
                  />
                  <p className="card-text">
                    <div style={{ textAlign: "center", margin: "4px" }}>
                      <button
                        className="btn btn-primary"
                        style={{ width: "16rem" }}
                        onClick={() => {
                          navigate("/joinGroup");
                        }}
                      >
                        Join
                      </button>
                    </div>
                  </p>
                </div>
              </div>
              {grps && grps?.map((grp)=>(
                    <div key={grp._id} to={`/grp/${grp._id._id}`} style={{ textDecoration: "none", color: "black" }}>
                        <div
                    className={'card m-2'}
                    style={{ width: "18rem" }}
                    key={grp._id}
                  >
                    <div className="card-body">
                      <h5 className="card-title">{grp._id.name}</h5>
                      <p>tasks pending</p>
                      <p>tasks pending for review</p>
                      <button className="btn btn-primary" onClick={()=>{
                        navigate(`/grp/${grp._id._id}`)
                      }}>View</button>
                      <button className="btn btn-primary m-2" style={{backgroundColor:'green'}}>Add TASK</button>
                      </div>                      
                      </div>
                    </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Groups;
