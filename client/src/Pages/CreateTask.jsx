import React, { useState } from "react";
import Layout from "../Components/Layouts/Layout";
import UserMenu from "../Components/Layouts/UserMenu";
import DatePicker from "react-datepicker";
import axios from "axios";
import toast from "react-hot-toast";
import "react-datepicker/dist/react-datepicker.css";
const CreateTask = () => {
  const [title, setTitle] = useState();
  const [description, setDescription] = useState();
  const [deadline, setDeadline] = useState(null);
  const [status, setStatus] = useState("incomplete");
  const [imp, setImp] = useState(false);
  const subm = async () => {
    try {
      const res = await axios.post(`${process.env.REACT_APP_API}/task/myTask`, {
        title,
        description,
        deadline,
        status,
        important: imp,
      });
      if (res.status === 200) toast.success("Task Created");
    } catch (error) {
      console.log(error.message);
      toast.error("Something went wrong");
    }
  };
  return (
    <Layout>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-2">
            <UserMenu />
          </div>
          <div className="col-md-9">
            <h2 style={{ color: "blue" }}>Create Task</h2>
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
                  <label className="form-check-label" htmlFor="flexRadioDefault1">
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
                  <label className="form-check-label" htmlFor="flexRadioDefault1">
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
                  <label className="form-check-label" htmlFor="flexRadioDefault2">
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

export default CreateTask;
