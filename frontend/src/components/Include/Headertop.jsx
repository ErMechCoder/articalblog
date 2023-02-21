import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../css/Header.css";

function Headertop({ color, setColor }) {
  const [show, setShow] = useState(true);
  const user =
    localStorage.getItem("user") &&
    JSON.parse(localStorage.getItem("user")).dbAdmin;
  const url = window.location.href;

  return (
    <div className="row headertop">
      <div
        className={`header__top d-flex justify-content-between ${
          color ? "" : "pal7"
        }`}
        onMouseEnter={() => setShow(false)}
        onMouseLeave={() => setShow(true)}
      >
        {user ? (
          <Link to="/admin/article" className="link-text">
            Go to admin
          </Link>
        ) : (
          <Link to="/login" className="link-text">
            Login
          </Link>
        )}

        {show ? (
          <p>www.wonderofweird.com</p>
        ) : (
          <p>Yep, your where you thought you were.</p>
        )}
        {/* {url === "https://wow.ekanatechnologies.in/" ? (
          <p>Generate QR Code</p>
        ) : (
          <Link to="/" className="link-text">
            Back to home
          </Link>
        )} */}
        <Link to="/scan-qr-code" className="link-text">
          Scan QR Code
        </Link>
      </div>
    </div>
  );
}

export default Headertop;
