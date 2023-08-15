import React, { useEffect, useState } from "react";
import Layout from "../Components/Layouts/Layout";
import GrpMenu from "../Components/Layouts/GrpMenu";
import { useLocation, useParams } from "react-router-dom";
import { Checkbox, Radio } from "antd";
import { useAuth } from "../Context/auth";
import axios from "axios";
import { toast } from "react-hot-toast";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
const CreateGrpTask = () => {
  const location = useLocation();
  const [title, setTitle] = useState();
  const [grp, setGrp] = useState({});
  var [users, setUsers] = useState({});
  var [rev,setRev]=useState([])
  const [check, setCheck] = useState([]);
  const [description, setDescription] = useState();
  const [deadline, setDeadline] = useState(null);
  const [status, setStatus] = useState("incomplete");
  const [imp, setImp] = useState(false);
  const [auth, setAuth] = useAuth();
  const params = useParams();
  const grpDet = async () => {
    try {
      console.log(check)
      const res = await axios.post(
        `${process.env.REACT_APP_API}/group/particularGrp`,
        { grpId: params.grpId }
      );
      setUsers(res.data.group.users);
      setGrp(res.data.group);
    } catch (error) {
      console.log(error.message);
      toast.error("Something went wrong");
    }
  };
  const handleFilter = (value, category) => {
    let chk = [...check];
    chk.push(category);
    setCheck(chk);
  };
  const review = (value, category) => {
    let chk = [...rev];
    chk.push(category);
    setRev(chk);
  };
  const subm = async () => {
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API}/group/addGrpTask/${params.grpId}`,
        {
          title,
          description,
          deadline,
          status,
          important: imp,
          userId:check,
          markImp:rev,
          grpId:params.grpId
        }
      );
      if (res.status === 200) toast.success("Task Created");
        console.log(check)
      setCheck([])
      setRev([])
    } catch (error) {
      console.log(error.message);
      toast.error("Something went wrong");
    }
  };
  useEffect(() => {
    grpDet();
  }, []);
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
            <h2 style={{ color: "blue" }}>Create Group Task</h2>
            <div className="m-1 w-75">
              <div>{location.state}</div>
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
              <div>Mark For</div>
              <div className="form-check">
                {users && users.length>0
                  ? users.map((user) => (
                      <Checkbox
                        key={user._id}
                        onChange={(e) => handleFilter(e.target.checked, user._id)}
                      >
                        {user.username}
                      </Checkbox>
                    ))
                  : null}
              </div>

              <div>Review By</div>
              <div className="form-check">
                {users && users.length>0
                  ? users.map((user) => (
                      <Checkbox
                        key={user._id}
                        onChange={(e) => review(e.target.checked, user._id)}
                      >
                        {user.username}
                      </Checkbox>
                    ))
                  : null}
              </div>

              <button className="btn btn-primary" onClick={() => subm()}>
                Create
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CreateGrpTask;
