import React, { useEffect, useState } from "react";
import Layout from "../Components/Layouts/Layout";
import UserMenu from "../Components/Layouts/UserMenu";
import { toast } from "react-hot-toast";
import DatePicker from "react-datepicker";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../Context/auth";

const ParticularTask = () => {
  const [title, setTitle] = useState();
  const [auth, setAuth] = useAuth();
  const [description, setDescription] = useState();
  const [deadline, setDeadline] = useState(null);
  const [date, setDate] = useState();
  const [status, setStatus] = useState();
  const [imp, setImp] = useState();
  const params = useParams();
  const navigate=useNavigate()
  const getTask = async () => {
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API}/task/particularTask`,
        { tid: params.tid }
      );
      const task = res.data.task;
      setTitle(task.title);
      setDescription(task.description);
      setDeadline(new Date(task.deadline));
      setDate((new Date(task.date)).toLocaleDateString());
      setStatus(task.status);
      setImp(task.important);
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };
  const upd=async()=>{
    try {
        const tid=params.tid
        const res=await axios.patch(`${process.env.REACT_APP_API}/task/updateTask`,{tid,title,description,deadline,status,important:imp})
        if(res.status===200)
        toast.success('Task Updated')
    } catch (error) {
        console.log(error);
      toast.error("Something went wrong");
    }
  }
  const del=async()=>{
    try {
        const tid=params.tid
        const res=await axios.delete(`${process.env.REACT_APP_API}/task/deleteTask`,{ data: { tid: tid } })
        if(res.status===200)
        {
            toast.success('Task deleted')
            navigate('/myTasks')
        }
    } catch (error) {
        console.log(error);
        toast.error("Something went wrong"); 
    }
  }
  useEffect(() => {
    getTask();
  }, []);
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
            <h2 style={{ color: "blue" }}>Task Details</h2>
            <div className="m-1 w-75">
              <div className="mb-3">
                <input
                  type="text"
                  value={title}
                  placeholder="Title"
                  className="form-control"
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <textarea
                  type="text"
                  value={description}
                  placeholder="Description"
                  className="form-control"
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <input
                  type="text"
                  value={date}
                  placeholder="Date"
                  className="form-control"
                  disabled
                />
              </div>
              <div className="mb-3">
                <DatePicker
                  selected={deadline}
                  className="form-control"
                  onChange={(date) => setDeadline(date)}
                  dateFormat="dd/MM/yyyy"
                  placeholderText="Deadline"
                />
              </div>
              <div className="mb-3">
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="flexRadioDefault"
                    id="flexRadioDefault1"
                    checked={status === "incomplete"}
                    onChange={() => setStatus("incomplete")}
                  />
                  <label
                    className="form-check-label"
                    htmlFor="flexRadioDefault1"
                  >
                    Incomplete
                  </label>
                </div>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="flexRadioDefault"
                    id="flexRadioDefault1"
                    checked={status === "completed"}
                    onChange={() => setStatus("completed")}
                  />
                  <label
                    className="form-check-label"
                    htmlFor="flexRadioDefault1"
                  >
                    Completed
                  </label>
                </div>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="flexRadioDefault"
                    id="flexRadioDefault2"
                    checked={status === "need review"}
                    onChange={() => setStatus("need review")}
                  />
                  <label
                    className="form-check-label"
                    htmlFor="flexRadioDefault2"
                  >
                    Need Review
                  </label>
                </div>
              </div>
              <div className="mb-3">
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    checked={imp}
                    onChange={(e) => setImp(e.target.checked)}
                    id="flexCheckDefault"
                  />
                  <label className="form-check-label" for="flexCheckDefault">
                    Mark Important
                  </label>
                </div>
              </div>
              <div className="mb-3">
                <button className="btn btn-primary" onClick={()=>upd()}>Update</button>
                <button className="btn btn-danger m-2" onClick={()=>del()}>Delete</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ParticularTask;
