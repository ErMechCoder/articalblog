import React, { useState, useEffect, useRef, useContext } from "react";
import "../css/Header.css";
import logo from "../images/logo1.png";
import img1 from "../images/1.png";
import img2 from "../images/2.png";
import img3 from "../images/3.png";
import close from "../images/close.png";
import bar from "../images/blue2.png";
import { Link } from "react-router-dom";
import { NavLink } from "react-router-dom";
import AutoComplete from "../AutoComplete";
import { wowContext } from "../../context/Context";
import {
  FacebookShareButton,
  TwitterShareButton,
  LinkedinShareButton,
} from "react-share";

function Header({ quotes, color }) {
  const [showbar, setShowBar] = useState(true);
  const ref = useRef();
  const inputRef = useRef();
  const [input, setInput] = useState("");
  const [recommendSearch, setRecommendSearch] = useState([]);
  const {
    articleState: { articles },
  } = useContext(wowContext);

  React.useEffect(() => {
    if (input.length > 1) {
      const result = articles.filter((item) => {
        return item.title.toLowerCase().includes(input.toLowerCase());
      });
      setRecommendSearch(result);
      inputRef.current.focus();
    }
  }, [input]);

  useEffect(() => {
    const checkIfClickedOutside = (e) => {
      if (!showbar && ref.current && !ref.current.contains(e.target)) {
        setShowBar(true);
      }
    };
    document.addEventListener("mousedown", checkIfClickedOutside);
    return () => {
      document.removeEventListener("mousedown", checkIfClickedOutside);
    };
  }, [showbar]);
  const shareUrl = "http://localhost:3000";

  return (
    <div className="row header__below">
      <div className="col-md-6 header__bottom">
        <div className={`header__Yellow ${color ? "" : "pal1"}`}>
          <div className="header-first">
            <nav className="navbar navbar-expand-lg">
              <div
                className="collapse navbar-collapse"
                id="navbarSupportedContent"
              >
                <ul className="navbar-nav">
                  <li className="nav-item dropdown">
                    <ul
                      className={`dropdown-menu ${showbar ? "" : "show"}`}
                      aria-labelledby="navbarDropdown"
                      ref={ref}
                    >
                      <li className="dropdown-item">
                        <NavLink
                          ClassName="first-nav"
                          activeClassName="active"
                          to="/common-causes-statements"
                        >
                          Common Causes Statements
                        </NavLink>
                      </li>
                      <li>
                        <hr className="dropdown-divider" />
                      </li>
                      <li className="dropdown-item">
                        <NavLink
                          ClassName="first-nav"
                          activeClassName="active"
                          to="/working-together-statements"
                        >
                          {" "}
                          Working Together Statement
                        </NavLink>
                      </li>
                    </ul>
                  </li>
                </ul>
              </div>
            </nav>
          </div>
          <Link className="text-center" to="/">
            <img className="header__image" src={logo} alt="wornderofweird" />
          </Link>
          <div onClick={() => setShowBar((prevState) => !prevState)}>
            {showbar ? (
              <img className="closebtn" src={bar} alt="wornderofweird" />
            ) : (
              <img className="closebtn" src={close} alt="wornderofweird" />
            )}
          </div>

          <div className="social-icons">
            <FacebookShareButton url={shareUrl}>
              <i class="fa fa-facebook mx-2" aria-hidden="true"></i>
            </FacebookShareButton>
            <TwitterShareButton url={shareUrl}>
              <i class="fa fa-twitter mx-2" aria-hidden="true"></i>
            </TwitterShareButton>
            <LinkedinShareButton url={shareUrl}>
              <i class="fa fa-linkedin mx-2" aria-hidden="true"></i>
            </LinkedinShareButton>
          </div>
        </div>
      </div>
      <div className="col-12 col-md-3 header__bottom2">
        <div
          className={`header__skyblue d-flex align-items-center ${
            color ? "" : "pal2"
          }`}
        >
          <div
            id="carouselExampleControls"
            className="carousel slide"
            data-bs-ride="carousel"
          >
            <div className="carousel-inner">
              {quotes &&
                quotes.slice(0, 1).map((quote, index) => (
                  <div className="carousel-item active">
                    <p className="text-center d-block w-100">
                      “{quote.quote}.”
                    </p>
                    <p className="text-center">
                      <strong>{quote.writer}</strong>
                    </p>
                  </div>
                ))}
              {quotes &&
                quotes.slice(1, quotes.length).map((quote, index) => (
                  <div className="carousel-item  " key={quote._id}>
                    <p className="text-center d-block w-100">
                      “{quote.quote}.”
                    </p>
                    <p className="text-center">
                      <strong>{quote.writer}</strong>
                    </p>
                  </div>
                ))}
            </div>
            <button
              className="carousel-control-prev"
              type="button"
              data-bs-target="#carouselExampleControls"
              data-bs-slide="prev"
            >
              <span
                className="carousel-control-prev-icon"
                aria-hidden="true"
              ></span>
              <span className="visually-hidden">Previous</span>
            </button>
            <button
              className="carousel-control-next"
              type="button"
              data-bs-target="#carouselExampleControls"
              data-bs-slide="next"
            >
              <span
                className="carousel-control-next-icon"
                aria-hidden="true"
              ></span>
              <span className="visually-hidden">Next</span>
            </button>
          </div>
        </div>
      </div>
      <div className="col-12 col-md-3 header__bottom3">
        <div className={`header__orange ${color ? "" : "pal3"}`}>
          <div className="headerRight__left"></div>
          <div className="headerRight__right">
            <div className="d-flex ">
              <Link to="/articles" className="text-center">
                <img src={img1} width="50%" />
                <p>Article Posting</p>
              </Link>
              <Link to="/past-entrants" className="text-center">
                <img src={img2} width="50%" />
                <p>Past Entrants</p>
              </Link>
              <Link to="/contest-guideline" className="text-center">
                <img src={img3} width="50%" />
                <p>Current Contests</p>
              </Link>
              <div className="d-flex flex-column align-items-center justify-content-center search-field">
                <div
                  class="box"
                  onClick={() => {
                    inputRef.current.focus();
                  }}
                >
                  <form name="search">
                    <input
                      type="text"
                      class="input"
                      name="txt"
                      value={input}
                      ref={inputRef}
                      onChange={(e) => {
                        setInput(inputRef.current.value);
                      }}
                    />
                  </form>
                  <i class="bi bi-search search-icon"></i>
                </div>
                {input && (
                  <AutoComplete
                    recommendSearch={recommendSearch}
                    input={input}
                    setInput={setInput}
                    setRecommendSearch={setRecommendSearch}
                  />
                )}
              </div>
            </div>
          </div>
          {/* <button className="pal-btn" onClick={() => setColor((s) => !s)}>
            color
          </button> */}
        </div>
      </div>
    </div>
  );
}
export default Header;
