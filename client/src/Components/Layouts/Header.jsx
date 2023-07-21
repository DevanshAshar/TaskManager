import React from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../Context/auth";
import toast from "react-hot-toast";
const Header = () => {
  const [auth, setAuth] = useAuth();
  const logout = () => {
    setAuth({
      ...auth,
      user: null,
      token: "",
    });
    localStorage.removeItem("auth");
    toast.success("Logged out successfully", { duration: 5000 });
  };
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <img
            src="https://static.vecteezy.com/system/resources/previews/005/664/720/original/time-task-management-concept-illustration-flat-design-eps10-modern-graphic-element-for-landing-page-empty-state-ui-infographic-icon-vector.jpg"
            alt="logo"
            style={{ "max-width": "4%", height: "auto" }}
          />
          {!auth.user ? (
            <NavLink className="navbar-brand" to="/">
              Task Manager
            </NavLink>
          ) : (
            <NavLink className="navbar-brand" to="/home">
              Task Manager
            </NavLink>
          )}
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarTogglerDemo02"
            aria-controls="navbarTogglerDemo02"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              {!auth.user ? (
                <>
                  <li className="nav-item">
                    <NavLink className="nav-link" aria-current="page" to="/">
                      Home
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink className="nav-link" to="/signup">
                      Signup
                    </NavLink>
                  </li>
                </>
              ) : (
                <>
                  <li className="nav-item">
                    <NavLink
                      className="nav-link"
                      aria-current="page"
                      to="/home"
                    >
                      Home
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink className="nav-link" to={`/dashboard`}>
                      Dashboard
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink className="nav-link" to="/login" onClick={logout}>
                      Logout
                    </NavLink>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;
