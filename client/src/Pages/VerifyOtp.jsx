import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import Layout from "../Components/Layouts/Layout";
import toast from "react-hot-toast";
import { useState } from "react";
const VerifyOtp = () => {
  const [otp, setOtp] = useState();
  const navigate = useNavigate();
  const location = useLocation();
  const subm = async (email, otp) => {
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_API}/user/verifyOtp`,
        { email, otp }
      );
      if (res.status === 200) {
        toast.success("OTP Verified");
        navigate("/newPass", { state: email });
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };
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
              }}
            >
              <h2
                style={{ color: "blue", textAlign: "center" }}
                className="title p-3 "
              >
                Verify OTP
              </h2>
              <div className="my-3">
                <input
                  type="text"
                  className="form-control"
                  id="exampleInputOtp"
                  value={otp}
                  onChange={(e) => {
                    setOtp(e.target.value);
                  }}
                  placeholder="Enter OTP sent on your email"
                />
              </div>
              <button
                onClick={() => subm(location.state, otp)}
                className="btn btn-primary"
              >
                Verify
              </button>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default VerifyOtp;
