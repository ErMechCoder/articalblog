import React from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../images/logo.png";
import "./Login.css";
import MultiStepForm from "./MultiStepForm";

import { toast } from "react-toastify";

const Login = ({ user, setUser }) => {
  const [loading, setLoading] = React.useState(false);
  const [errors, setError] = React.useState();
  const [userInfo, setUserInfo] = React.useState({ email: "", password: "" });
  const [showForget, setShowForget] = React.useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
  };

  React.useEffect(() => {
    if (user) {
      navigate("/admin/article");
    } else {
      navigate("/login");
    }
  }, [user]);

  // function to make signin request
  const signin = async () => {
    setLoading(true);
    setError(null);
    const response = await fetch(
      "https://uiib.ekanatechnologies.in/user/signin",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: userInfo.email,
          password: userInfo.password,
        }),
      }
    );
    response.status === 200 && toast.success("Login Successful");
    const data = await response.json();

    if (response.status === 200) {
      localStorage.setItem("user", JSON.stringify(data));
      //reload window
      setUser(data);
    } else if (response.status !== 200) {
      setError(data.message);
    }

    setLoading(false);
  };

  return (
    <>
      {showForget ? (
        <MultiStepForm setShowForget={setShowForget} />
      ) : (
        <div className="admin-login-bg">
          <hgroup>
            <Link to="/">
              <img className="login-logo" src={logo} />
            </Link>
          </hgroup>
          <form>
            <div className="group">
              <input
                type="Email"
                required
                name="email"
                value={userInfo.email}
                onChange={handleChange}
                placeholder="Enter your email"
              />
              <span className="highlight"></span>
              <span className="bar"></span>
            </div>
            <div className="group">
              <input
                type="password"
                name="password"
                required
                value={userInfo.password}
                onChange={handleChange}
                placeholder="Password"
              />
              <span className="highlight"></span>
              <span className="bar"></span>
            </div>
            {loading ? (
              <div className="text-center">
                <div class="spinner-border text-info" role="status" />
              </div>
            ) : (
              <button
                type="button"
                className="button buttonBlue"
                onClick={signin}
              >
                Login
                <div className="ripples buttonRipples">
                  <span className="ripplesCircle"></span>
                </div>
              </button>
            )}
            <div className="d-flex align-items-center justify-content-between">
              <button className="link-text" onClick={() => setShowForget(true)}>
                Forgot Password?
              </button>
              <Link to="/register" className="link-text">
                Register yourself
              </Link>
            </div>
            {errors && (
              <div
                class="alert alert-danger alert-dismissible fade show"
                role="alert"
              >
                <strong>{errors} </strong>
                <button
                  type="button"
                  class="btn-close"
                  data-bs-dismiss="alert"
                  aria-label="Close"
                ></button>
              </div>
            )}
          </form>
        </div>
      )}
    </>
  );
};

export default Login;
