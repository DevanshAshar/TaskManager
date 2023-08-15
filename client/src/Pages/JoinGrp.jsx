import React, { useEffect, useState } from 'react'
import { useAuth } from '../Context/auth';
import { useNavigate, useParams } from 'react-router-dom';
import Layout from "../Components/Layouts/Layout";
import UserMenu from '../Components/Layouts/UserMenu';
import axios from 'axios';
import { toast } from 'react-hot-toast';

const JoinGrp = () => {
    const [grp, setGrp] = useState({});
  const [incomplete,setIncomplete]=useState()
  const [needrev,setNeedrev]=useState()
  const [users, setUsers] = useState([]);
  const params = useParams();
  const navigate=useNavigate()
  const [auth, setAuth] = useAuth();
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
    useEffect(() => {
        localStorage.setItem("auth", JSON.stringify(auth));
      }, [auth]);
      useEffect(() => {
        grpDet();
      }, []);
  return (
    <Layout>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-2">
            <UserMenu />
          </div>
          <div className="col-md-9">
            <h2>Group Info</h2>
            <div className="card w-75 p-3">
              <h3>{grp.name}</h3>
              <h5>{users.length} participants present</h5>
            </div>
            <button className='btn btn-primary m-2' onClick={async()=>{
                try {
                    const res=await axios.post(`${process.env.REACT_APP_API}/group/joinGrp`,{grpid:params.grpId})
                    if(res.status===200)
                    {
                    toast.success('Joined Group')
                    navigate(`/grp/${params.grpId}`)
                    }
                  } catch (error) {
                    console.log(error);
                    toast.error("Something went wrong");
                  }
            }}>JOIN</button>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default JoinGrp