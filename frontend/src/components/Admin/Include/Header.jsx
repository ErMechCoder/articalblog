import React from "react";
import "../css/Admin.css";
import { Link } from "react-router-dom";
import userimg from "../../images/user.png";

const Adminheader = ({ user, setUser }) => {
  const loggedUser = JSON.parse(localStorage.getItem("user"));

  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
    // reload the browser
    window.location.href = "/login";
  };

  return (
    <nav className="navbar navbar-expand-lg admin-head-bg">
      <div className="container-fluid">
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link to="/" className="nav-link">
                Visit Website
              </Link>
            </li>
          </ul>
          {loggedUser && (
            <div className="dropdown">
              <Link
                to="#"
                className="d-flex align-items-center text-decoration-none dropdown-toggle"
                id="dropdownUser1"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <img
                  src={userimg}
                  alt="hugenerd"
                  width="30"
                  height="30"
                  className="rounded-circle"
                />
                <span className="d-none d-sm-inline mx-1">
                  {loggedUser.dbAdmin.username}
                </span>
              </Link>
              <ul class="dropdown-menu user-pro text-small shadow">
                <li>
                  <Link className="dropdown-item" to="#" onClick={logout}>
                    Sign out
                  </Link>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Adminheader;
