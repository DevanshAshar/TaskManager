import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Layout from "../Components/Layouts/Layout";
import { toast } from "react-hot-toast";
import GrpMenu from "../Components/Layouts/GrpMenu";
import { useAuth } from "../Context/auth";
import moment from "moment";
const GrpTasks = () => {
  const [grp, setGrp] = useState({});
  const [tasks, setTasks] = useState([]);
  const [rev, setRev] = useState([]);
  const [other, setOther] = useState([]);
  const params = useParams();
  const [auth, setAuth] = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    localStorage.setItem("auth", JSON.stringify(auth));
  }, [auth]);
  const grpDet = async () => {
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API}/group/grpTasks`,
        { grpId: params.grpId }
      );
      setTasks(res.data.task);
      setRev(res.data.needRevTasks);
      setOther(res.data.otherTasks);
      setGrp(res.data.group);
      console.log(rev);
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };
  useEffect(() => {
    grpDet();
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
  return (
    <Layout>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-2">
            <GrpMenu />
          </div>
          <div className="col-md-9">
            <h2>Group Tasks</h2>
            <div className="flex-wrap" style={{ display: "flex" }}>
              <div className="card" style={{ width: "18rem" }}>
                <div className="card-body">
                  <h3 className="card-title" style={{ textAlign: "center" }}>
                    New Task
                  </h3>
                  <p className="card-text">
                    <div style={{ textAlign: "center", margin: "4px" }}>
                      <button
                        className="btn btn-primary"
                        style={{ width: "16rem" }}
                        onClick={() => {
                          navigate(`/createGrpTask/${params.grpId}`);
                        }}
                      >
                        Create New +
                      </button>
                    </div>
                  </p>
                </div>
              </div>
            </div>
            <h3 className="m-2">My Tasks</h3>
            <div className="flex-wrap" style={{ display: "flex" }}>
              {tasks?.length > 0 ? (
                tasks.map((t) => (
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
                ))
              ) : (
                <p>No tasks for you.</p>
              )}
            </div>
            <h3 className="m-2">Marked By others for you to check</h3>
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
            <h3 className="m-2">Other Tasks</h3>
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
                <p>No Other Tasks</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default GrpTasks;
