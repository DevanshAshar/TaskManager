import React, { useEffect, useState } from "react";
import Layout from "../Components/Layouts/Layout";
import UserMenu from "../Components/Layouts/UserMenu";
import axios from "axios";
import { useAuth } from "../Context/auth";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import moment from "moment";

const Dashboard = () => {
  const [auth, setAuth] = useAuth();
  const navigate = useNavigate();
  const [tasks, setTasks] = useState([]);
  const [revTasks, setRevTasks] = useState([]);
  const getTasks = async () => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_API}/task/upcomingTasks`
      );
      setTasks(res.data.task);
      setRevTasks(res.data.needUrRev);
    } catch (error) {
      console.log(error.message);
      toast.error("Something went wrong");
    }
  };
  useEffect(() => {
    getTasks();
  }, []);
  useEffect(() => {
    localStorage.setItem("auth", JSON.stringify(auth));
  }, [auth]);
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
            <UserMenu />
          </div>
          <div className="col-md-9">
            <h2>Upcoming Tasks</h2>
            <div className="flex-wrap" style={{ display: "flex" }}>
              {tasks?.length > 0 ? (
                tasks.map((t) => (
                  <Link
                    key={t._id}
                    to={t.grpId ? `/grptask/${t._id}` : `/task/${t._id}`}
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
                <p>No upcoming tasks.</p>
              )}
            </div>
            <h3>Review needed from others</h3>
            <div className="flex-wrap" style={{ display: "flex" }}>
            {revTasks?.length > 0 ? (
                revTasks.map((t) => (
                  <Link
                    key={t._id}
                    to={t.grpId ? `/grptask/${t._id}` : `/task/${t._id}`}
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
                <p>No Tasks for review</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
