import React, { useState } from "react";
import Layout from "../Components/Layouts/Layout";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
const Signup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  console.log(process.env.REACT_APP_API);
  return (
    <Layout>
      <div>
        <h1 className="text-center p-2" style={{ color: "blue" }}>
          Welcome to Task Manager
        </h1>
        <div className="d-flex flex-wrap align-items-center">
          <img
            src="https://img.freepik.com/free-vector/man-holding-clock-time-management-concept_23-2148823171.jpg?w=740&t=st=1688724009~exp=1688724609~hmac=95784cc648b2eeffe9291e0430880dbcb5611639e018da36ea9c3becf4d23d9f"
            style={{ height: "70vh", width: "auto", marginRight: "20px" }}
          />
          <img
            src="https://img.freepik.com/free-vector/organizing-projects-concept-illustration_114360-542.jpg?w=740&t=st=1688724452~exp=1688725052~hmac=5412997e3152a8762a59a6ecdec858cc2314459f6856ee0b69f1623aba5e8af7"
            style={{ height: "80vh", width: "auto" }}
          />
          <div className="form-container">
            <form
              onSubmit={async (e) => {
                e.preventDefault();
                try {
                  const res = await axios.post(
                    `${process.env.REACT_APP_API}/user/newUser`,
                    { username, email, password }
                  );
                  console.log(res);
                  if (res.status === 200) {
                    toast.success("Registered Successfully");
                    navigate("/");
                  }
                } catch (error) {
                  console.log(error);
                  toast.error("Something went wrong");
                }
              }}
            >
              <h2
                style={{ color: "blue", textAlign: "center" }}
                className="title p-3 "
              >
                Signup
              </h2>
              <div className="mb-3">
                <label for="exampleFormControlInput1" className="form-label">
                  Username
                </label>
                <input
                  type="username"
                  className="form-control"
                  id="exampleFormControlInput1"
                  value={username}
                  onChange={(e) => {
                    setUsername(e.target.value);
                  }}
                  placeholder="Enter username"
                />
              </div>
              <div className="mb-3">
                <label for="exampleFormControlInput1" className="form-label">
                  Email
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="exampleFormControlInput1"
                  placeholder="Enter Email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                />
              </div>
              <div className="mb-3">
                <label for="exampleFormControlTextarea1" className="form-label">
                  Password
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="exampleFormControlTextarea1"
                  rows="3"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                  placeholder="Enter Password"
                />
              </div>
              <button
                className="btn btn-primary d-flex"
                style={{ alignItems: "center", justifyContent: "center" }}
              >
                Signup
              </button>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Signup;
