import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Layout from "../Components/Layouts/Layout";
import { toast } from "react-hot-toast";
import GrpMenu from "../Components/Layouts/GrpMenu";
import { useAuth } from "../Context/auth";

const GrpDetails = () => {
  const [grp, setGrp] = useState({});
  const [incomplete,setIncomplete]=useState()
  const [needrev,setNeedrev]=useState()
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
      setGrp(res.data.group)
      setIncomplete(res.data.incompleteTasksCount)
      setNeedrev(res.data.needRevTasksCount)
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };
  const handleCopy = () => {
    navigator.clipboard.writeText(`${process.env.REACT_APP_FE}/joinGrp/${params.grpId}`)
      .then(() => {
        toast.success('Invite Link Copied')
      })
      .catch((error) => {
        console.error('Error copying to clipboard:', error);
      });
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
            <h2>Group Info</h2>
            <div className="card w-75 p-3">
              <h3>{grp.name}</h3>
              <h4>Incomplete Tasks:{incomplete}</h4>
              <h4>Review Left :{needrev}</h4>
              {/* <h4>Invite Code:{grp._id}</h4> */}
              <button className="btn btn-primary" onClick={handleCopy}>Copy Invite Link To Clipboard</button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default GrpDetails;
