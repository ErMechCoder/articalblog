import React from "react";
import "../css/Admin.css";
import logo from "../../images/logo.png";
import { Link } from "react-router-dom";

const Sidebar = () => {
  const [currentOpen, setCurrentOpen] = React.useState(0);
  return (
    <div className="col-auto col-md-3 col-xl-2 px-0 sidebar-bg">
      <div className="flex-column align-items-center min-vh-100">
        <center class="py-2">
          <Link to="/admin/article">
            <img className="admin-logo" src={logo} alt="wornderofweird" />
          </Link>
        </center>
        <ul
          className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start"
          id="menu"
        >
          <li>
            <Link
              to="/admin/article"
              data-bs-toggle="collapse"
              className="nav-link px-0 align-middle"
              onClick={() => {
                if (currentOpen === 0) {
                  setCurrentOpen(1);
                } else {
                  setCurrentOpen(0);
                }
              }}
            >
              <i class="fs-4 bi-file-earmark-post"></i>
              <span className="ms-1 d-none d-sm-inline">Article</span>
              {currentOpen === 1 ? (
                <i class="bi bi-caret-down-fill mx-2"></i>
              ) : (
                <i class="bi bi-caret-up-fill mx-2"></i>
              )}
            </Link>
            <ul
              className={`nav flex-column ${
                currentOpen === 1 ? "" : "collapse"
              }`}
              id="article"
              data-bs-parent="#menu"
            >
              <li className="w-100">
                <Link to="/admin/article" href="#" className="nav-link px-0">
                  {" "}
                  <span className="d-none d-sm-inline">All Article</span>
                </Link>
              </li>
              <li>
                <Link to="/admin/add-article" className="nav-link px-0">
                  {" "}
                  <span className="d-none d-sm-inline">Add Article</span>
                </Link>
              </li>
            </ul>
          </li>
          <li>
            <Link
              to="/admin/quote"
              data-bs-toggle="collapse"
              className="nav-link px-0 align-middle"
            >
              <i className="fs-4 bi-chat-right-quote"></i>
              <span className="ms-1 d-none d-sm-inline">Quote</span>
            </Link>
            <ul
              className="collapse nav flex-column ms-1"
              id="quote"
              data-bs-parent="#menu"
            >
              <li className="w-100">
                <Link to="/admin/quote" className="nav-link px-0">
                  {" "}
                  <span className="d-none d-sm-inline">All Quote</span>
                </Link>
              </li>
              <li>
                <Link to="/admin/add-quote" className="nav-link px-0">
                  {" "}
                  <span className="d-none d-sm-inline">Add Quote</span>
                </Link>
              </li>
            </ul>
          </li>
          <li>
            <Link
              to="/admin/promotional-area-1"
              className="nav-link px-0 align-middle"
            >
              <i class="fs-4 bi-badge-ad-fill"></i>{" "}
              <span className="ms-1 d-none d-sm-inline">
                Promotional Area 1
              </span>{" "}
            </Link>
          </li>
          <li>
            <Link
              to="/admin/promotional-area-2"
              className="nav-link px-0 align-middle"
            >
              <i class="fs-4 bi-badge-ad-fill"></i>{" "}
              <span className="ms-1 d-none d-sm-inline">
                Promotional Area 2
              </span>{" "}
            </Link>
          </li>
          {/* <li>
            <Link to="/admin/contest" className="nav-link px-0 align-middle">
              <i class="fs-4 bi-ui-checks-grid"></i>{" "}
              <span className="ms-1 d-none d-sm-inline">Contests</span>{" "}
            </Link>
          </li> */}
          <li>
            <Link to="/admin/users" className="nav-link px-0 align-middle">
              <i class="fs-4 bi-people"></i>{" "}
              <span className="ms-1 d-none d-sm-inline">Users</span>{" "}
            </Link>
          </li>

          <li>
            <Link to="/admin/forms" className="nav-link px-0 align-middle">
              <i class="bi bi-book"></i>
              <span className="ms-1 d-none d-sm-inline">Form</span>{" "}
            </Link>
          </li>
          <li>
            <Link to="/admin/qr" className="nav-link px-0 align-middle">
              <i class="bi bi-book"></i>
              <span className="ms-1 d-none d-sm-inline">
                Generate Qr Code
              </span>{" "}
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
