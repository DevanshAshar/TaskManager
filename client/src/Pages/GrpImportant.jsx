import React, { useEffect, useState } from "react";
import Layout from "../Components/Layouts/Layout";
import { useAuth } from "../Context/auth";
import { Link, useNavigate, useParams } from "react-router-dom";
import UserMenu from "../Components/Layouts/UserMenu";
import axios from "axios";
import { toast } from "react-hot-toast";
import moment from "moment";
import GrpMenu from "../Components/Layouts/GrpMenu";

const GrpImportant = () => {
  const [auth, setAuth] = useAuth();
  const navigate = useNavigate();
  const [tasks, setTasks] = useState([]);
  const [rev,setRev]=useState([])
  const[other,setOther]=useState([])
  const params=useParams()
  const getTasks = async () => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_API}/group/important/${params.grpId}`
      );
      setTasks(res.data.tasks);
      setRev(res.data.needRev)
      setOther(res.data.otherImp)
    } catch (error) {
      console.log(error.message);
      toast.error("Something went wrong");
    }
  };
  useEffect(() => {
    getTasks();
  }, []);
  function getStatusColor(status) {
    switch (status) {
      case "completed":
        return "green";
      case "incomplete":
        return "red";
      case "need review":
        return "blue";
      default:
        return "black";
    }
  }
  useEffect(() => {
    localStorage.setItem("auth", JSON.stringify(auth));
  }, [auth]);
  return (
    <Layout>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-2">
            <GrpMenu />
          </div>
          <div className="col-md-9">
            <h2>My Important</h2>
            <div className="flex-wrap" style={{ display: "flex" }}>
              {tasks && tasks.length>0 ? (tasks.map((t) => (
                <Link
                  key={t._id}
                  to={`/grptask/${t._id}`}
                  style={{ textDecoration: "none", color: "black" }}
                >
                  <div
                    className={`card m-2 ${
                      t.important ? "border-primary" : ""
                    }`}
                    style={{ width: "18rem" }}
                    key={t._id}
                  >
                    <div className="card-body">
                      <h5 className="card-title">{t.title}</h5>
                      <p className="card-text">
                        {t.description.substring(0, 30)}...
                      </p>
                      <div>
                        Deadline: {moment(t.deadline).format("DD-MM-YYYY")}
                      </div>
                      <div style={{ color: getStatusColor(t.status) }}>
                        Status: {t.status}
                      </div>
                      {t.important ? (
                        <h6 style={{ color: "blue" }}>Marked Imp</h6>
                      ) : null}
                    </div>
                  </div>
                </Link>
              ))):(<p>No Important Tasks Marked</p>)}
            </div>
            <h3 className="m-2">Need Review</h3>
            <div className="flex-wrap" style={{ display: "flex" }}>
              {rev && rev.length > 0 ? (
                rev.map((r) => (
                  <Link
                    key={r._id}
                    to={`/grptask/${r._id}`}
                    style={{ textDecoration: "none", color: "black" }}
                  >
                    <div
                      className={`card m-2 ${
                        r.important ? "border-primary" : ""
                      }`}
                      style={{ width: "18rem" }}
                      key={r._id}
                    >
                      <div className="card-body">
                        <h5 className="card-title">{r.title}</h5>
                        <p className="card-text">
                          {r.description.substring(0, 30)}...
                        </p>
                        <div>
                          Deadline: {moment(r.deadline).format("DD-MM-YYYY")}
                        </div>
                        <div style={{ color: getStatusColor(r.status) }}>
                          Status: {r.status}
                        </div>
                        {r.important ? (
                          <h6 style={{ color: "blue" }}>Marked Imp</h6>
                        ) : null}
                      </div>
                    </div>
                  </Link>
                ))
              ) : (
                <p>Nothing marked for your review</p>
              )}
            </div>
            <h3 className="m-2">Other</h3>
            <div className="flex-wrap" style={{ display: "flex" }}>
              {other && other.length > 0 ? (
                other.map((r) => (
                  <Link
                    key={r._id}
                    to={`/grptask/${r._id}`}
                    style={{ textDecoration: "none", color: "black" }}
                  >
                    <div
                      className={`card m-2 ${
                        r.important ? "border-primary" : ""
                      }`}
                      style={{ width: "18rem" }}
                      key={r._id}
                    >
                      <div className="card-body">
                        <h5 className="card-title">{r.title}</h5>
                        <p className="card-text">
                          {r.description.substring(0, 30)}...
                        </p>
                        <div>
                          Deadline: {moment(r.deadline).format("DD-MM-YYYY")}
                        </div>
                        <div style={{ color: getStatusColor(r.status) }}>
                          Status: {r.status}
                        </div>
                        {r.important ? (
                          <h6 style={{ color: "blue" }}>Marked Imp</h6>
                        ) : null}
                      </div>
                    </div>
                  </Link>
                ))
              ) : (
                <p>Nothing present here</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};
export default GrpImportant;
