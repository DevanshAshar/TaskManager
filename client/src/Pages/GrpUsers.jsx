import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Layout from "../Components/Layouts/Layout";
import { toast } from "react-hot-toast";
import GrpMenu from "../Components/Layouts/GrpMenu";
import { useAuth } from "../Context/auth";
const GrpUsers = () => {
  const [grp, setGrp] = useState({});
  const [users, setUsers] = useState([]);
  const params = useParams();
  const [auth, setAuth] = useAuth();
  useEffect(() => {
    localStorage.setItem("auth", JSON.stringify(auth));
  }, [auth]);
  const grpDet = async () => {
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API}/group/particularGrp`,
        { grpId: params.grpId }
      );
      setUsers(res.data.userNames);
      console.log(users);
      setGrp(res.data.group);
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };
  useEffect(() => {
    grpDet();
  }, []);
  return (
    <Layout>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-2">
            <GrpMenu />
          </div>
          <div className="col-md-9">
            <h2>Users</h2>
            
              {users?.map((user) => (
                <div className="card w-75 p-3 m-2">
                <h4 key={user}>{user}</h4>
                </div>
              ))}            
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default GrpUsers;
