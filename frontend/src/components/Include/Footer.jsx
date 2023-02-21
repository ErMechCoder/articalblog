import React, { useState, useEffect, useRef } from "react";
import "../css/Footer.css";
import bar from "../images/blue2.png";
import close from "../images/close.png";
import { Link } from "react-router-dom";

function Footer({ color, setColor }) {
  const [showbar1, setShow1] = useState(true);
  const [showbar2, setShow2] = useState(true);
  const [showbar3, setShow3] = useState(true);
  const ref = useRef();
  const handleClose1 = () => {
    setShow1(true);
  };
  useEffect(() => {
    const checkIfClickedOutside = (e) => {
      if (!showbar1 && !ref.current.contains(e.target)) {
        setShow1(true);
      }
    };
    document.addEventListener("mousedown", checkIfClickedOutside);
    return () => {
      document.removeEventListener("mousedown", checkIfClickedOutside);
    };
  }, [showbar1]);

  const ref2 = useRef();
  const handleClose2 = () => {
    setShow2(true);
  };
  useEffect(() => {
    const checkIfClickedOutside = (e) => {
      if (!showbar2 && !ref2.current.contains(e.target)) {
        setShow2(true);
      }
    };
    document.addEventListener("mousedown", checkIfClickedOutside);
    return () => {
      document.removeEventListener("mousedown", checkIfClickedOutside);
    };
  }, [showbar2]);

  const ref3 = useRef();
  const handleClose3 = () => {
    setShow3(true);
  };
  useEffect(() => {
    const checkIfClickedOutside = (e) => {
      if (!showbar3 && !ref3.current.contains(e.target)) {
        setShow3(true);
      }
    };
    document.addEventListener("mousedown", checkIfClickedOutside);
    return () => {
      document.removeEventListener("mousedown", checkIfClickedOutside);
    };
  }, [showbar3]);
  return (
    <div className="footer-bottom">
      <div className={`row footer__container ${color ? "" : "pal7"}`}>
        <div className="col-4 bar-flex">
          <div
            className={`d-${
              showbar1 === false ? "block" : "none"
            } footer-part-one`}
            ref={ref}
          >
            <ul className="footer-dropdown text-center">
              <Link to="/disclaimer">
                <li className="dropdown-item">Disclaimer</li>
              </Link>
              <li>
                <hr className="dropdown-divider" />
              </li>
              <Link to="/origination">
                <li className="dropdown-item">Origination</li>
              </Link>
              <li>
                <hr className="dropdown-divider" />
              </li>
              <Link to="/mission">
                <li className="dropdown-item">Mission</li>
              </Link>
            </ul>
          </div>
          <p>About</p>
          <div onClick={() => setShow1((prevState) => !prevState)}>
            {showbar1 ? (
              <img className="bar-img" src={bar} alt="wornderofweird" />
            ) : (
              <img className="bar-img" src={close} alt="wornderofweird" />
            )}
          </div>
        </div>
        <div className="col-4 bar-flex1">
          <div
            className={`d-${
              showbar2 === false ? "block" : "none"
            } footer-part-two`}
            ref={ref2}
          >
            <ul className="footer-dropdown text-center">
              <Link to="/email-form">
                <li className="dropdown-item">Email Form</li>
              </Link>
              <li>
                <hr className="dropdown-divider" />
              </li>
              <Link to="/business-partnership">
                <li className="dropdown-item">Business Partnership</li>
              </Link>
            </ul>
          </div>
          <p>Contact</p>
          <div onClick={() => setShow2((prevState) => !prevState)}>
            {showbar2 ? (
              <img className="bar-img" src={bar} alt="wornderofweird" />
            ) : (
              <img className="bar-img" src={close} alt="wornderofweird" />
            )}
          </div>
        </div>

        <div className="col-4 bar-flex2">
          <div
            className={`d-${
              showbar3 === false ? "block" : "none"
            } footer-part-three`}
            ref={ref3}
          >
            <ul className="footer-dropdown text-center">
              <Link to="/content-rights">
                <li className="dropdown-item">Content Rights</li>
              </Link>
              <li>
                <hr className="dropdown-divider" />
              </li>
              <Link to="/terms-of-use">
                {" "}
                <li className="dropdown-item">Terms of Use</li>
              </Link>
              <li>
                <hr className="dropdown-divider" />
              </li>
              <Link to="/cookie-policy">
                <li className="dropdown-item">Cookie Policy</li>
              </Link>
            </ul>
          </div>
          <p>Privacy</p>
          <div onClick={() => setShow3((prevState) => !prevState)}>
            {showbar3 ? (
              <img className="bar-img" src={bar} alt="wornderofweird" />
            ) : (
              <img className="bar-img" src={close} alt="wornderofweird" />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
