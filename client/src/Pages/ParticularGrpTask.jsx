import React, { useEffect, useState } from "react";
import Layout from "../Components/Layouts/Layout";
import UserMenu from "../Components/Layouts/UserMenu";
import { toast } from "react-hot-toast";
import { Checkbox, Radio } from "antd";
import DatePicker from "react-datepicker";
import axios from "axios";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../Context/auth";
import GrpMenu from "../Components/Layouts/GrpMenu";

const ParticularGrpTask = () => {
  const [title, setTitle] = useState();
  const [auth, setAuth] = useAuth();
  const [description, setDescription] = useState();
  const [deadline, setDeadline] = useState(null);
  const [users, setUsers] = useState([]);
  const [date, setDate] = useState();
  const [status, setStatus] = useState();
  const [imp, setImp] = useState();
  const [check, setCheck] = useState([]);
  const [grp, setGrp] = useState();
  const [rev, setRev] = useState([]);
  const params = useParams();
  const navigate = useNavigate();
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
      setDate(new Date(task.date).toLocaleDateString());
      setCheck(task.userId);
      setRev(task.markImp);
      setGrp(task.grpId);
      setStatus(task.status);
      setImp(task.important);
      if (task.grpId) {
        const resp = await axios.post(
          `${process.env.REACT_APP_API}/group/particularGrp`,
          { grpId: task.grpId }
        );
        setUsers(resp.data.group.users);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };
  const handleFilter = (value, category) => {
    if (check.includes(category)) {
        setCheck(check.filter(id => id !== category)); 
      } else {
        setCheck([...check, category]); 
      }
      console.log(check)
  };
  const review = (value, category) => {
    if (rev.includes(category)) {
      setRev(rev.filter(id => id !== category)); 
    } else {
      setRev([...rev, category]); 
    }
  };
  const upd = async () => {
    try {
      const tid = params.tid;
      const res = await axios.patch(
        `${process.env.REACT_APP_API}/task/updateTask`,
        { tid, title, description, deadline, status, important: imp,userId:check,markImp:rev }
      );
      if (res.status === 200) toast.success("Task Updated");
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };
  const del = async () => {
    try {
      const tid = params.tid;
      const res = await axios.delete(
        `${process.env.REACT_APP_API}/task/deleteTask`,
        { data: { tid: tid } }
      );
      if (res.status === 200) {
        toast.success("Task deleted");
        navigate(`/grpTasks/${grp}`);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };
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
            <>
              <div className="text-center">
                <div className="list-group">
                  <h4>Group Dashboard</h4>
                  <NavLink
                    to={`/grpTasks/${grp}`}
                    className="list-group-item list-group-item-action"
                  >
                    Tasks
                  </NavLink>
                  <NavLink
                    to={`/grpUsers/${grp}`}
                    className="list-group-item list-group-item-action"
                  >
                    Users
                  </NavLink>
                  <NavLink
                    to="/important"
                    className="list-group-item list-group-item-action"
                  >
                    Important
                  </NavLink>
                  <NavLink
                    to="/history"
                    className="list-group-item list-group-item-action"
                  >
                    History
                  </NavLink>
                </div>
              </div>
            </>
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
              {users && users.length > 0 ? (
                <div>
                  <div>Mark For</div>
                  <div className="form-check">
                    {users && users.length > 0
                      ? users.map((user) => (
                          <Checkbox
                            key={user._id}
                            onChange={(e) =>
                              handleFilter(e.target.checked, user._id)
                            }
                            checked={check.includes(user._id)}
                          >
                            {user.username}
                          </Checkbox>
                        ))
                      : null}
                  </div>
                </div>
              ) : null}

              
                <div>
                  <div>Review By</div>
                  <div className="form-check">
                    {users && users.length > 0
                      ? users.map((user) => (
                          <Checkbox
                            key={user._id}
                            onChange={(e) => review(e.target.checked, user._id)}
                            checked={rev.includes(user._id)}
                          >
                            {user.username}
                          </Checkbox>
                        ))
                      : null}
                  </div>
                </div>             

              <div className="mb-3">
                <button className="btn btn-primary" onClick={() => upd()}>
                  Update
                </button>
                <button className="btn btn-danger m-2" onClick={() => del()}>
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ParticularGrpTask;
