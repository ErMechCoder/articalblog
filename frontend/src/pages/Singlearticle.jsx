import React from "react";
import "../components/css/Main.css";
import Headertop from "../components/Include/Headertop";
import Header from "../components/Include/Header";
import TopFooter from "../components/Include/TopFooter";
import Footer from "../components/Include/Footer";
import { Link } from "react-router-dom";
import { wowContext } from "../context/Context";
import Modal from "../components/Modal";
import {
  FacebookShareButton,
  TwitterShareButton,
  InstapaperShareButton,
  LinkedinShareButton,
  PinterestShareButton,
  WhatsappShareButton,
} from "react-share";

function Singlearticle({ quotes, promo1Data, promo2Data }) {
  const [imageToShow, setImageToShow] = React.useState(null);
  const {
    articleState: { articles },
  } = React.useContext(wowContext);
  const [articleData, setArticleData] = React.useState({});
  const [index, setIndex] = React.useState(0);
  const myRef = React.createRef();
  const url = window.location.href;
  const urlArray = url.split("/");
  const URL = urlArray[urlArray.length - 1];

  React.useEffect(() => {
    const article = articles.find((article) => article.URL === URL);
    setArticleData(article);
    setIndex(articles.indexOf(article));
  }, [articles, URL]);

  React.useEffect(() => {
    if (myRef.current) {
      myRef.current.scrollTo(0, 0);
    }
  }, [articleData, myRef, articles]);

  const handleNext = () => {
    if (index < articles.length) {
      setIndex((prevIndex) => prevIndex + 1);
      window.history.pushState(
        null,
        null,
        `/article/${articles[index + 1].URL}`
      );
    } else {
      alert("No more articles!");
    }
  };
  const handlePrev = () => {
    if (index > 0) {
      setIndex(index - 1);
      window.history.pushState(
        null,
        null,
        `/article/${encodeURI(articles[index - 1].URL)}`
      );
    } else {
      alert("No more articles!");
    }
  };
  return (
    <div>
      <Headertop />
      <Header quotes={quotes} />
      <div style={{ width: "100%", height: "100%" }}>
        <Modal imageToShow={imageToShow} setImageToShow={setImageToShow} />
      </div>
      <div className="row testrow">
        <div className="col-md-6 area5">
          <div className="img_bg">
            <img
              className="art__img"
              src={articleData?.imageFile}
              style={{ cursor: "pointer" }}
              alt="wornderofweird"
              onClick={() => {
                setImageToShow(articleData?.imageFile);
              }}
            />
          </div>
        </div>
        <div className="col-md-6 area6">
          <div className="nxtbar">
            {index > 0 && (
              <button onClick={handlePrev} className="nxTbtn">
                <i class="fa fa-caret-left mx-2" aria-hidden="true"></i>
              </button>
            )}
            <i
              class="fa fa-bars"
              aria-hidden="true"
              style={{ fontSize: "33px" }}
            ></i>
            {index < articles.length - 1 && (
              <button onClick={handleNext} className="nxTbtn">
                <i class="fa fa-caret-right mx-2" aria-hidden="true"></i>
              </button>
            )}
          </div>
          <div className="img_bg2" ref={myRef}>
            <div className="text_bg">
              <h1>{articleData?.title}</h1>
              <div
                className="mb-1"
                dangerouslySetInnerHTML={{ __html: articleData?.articleBody }}
              ></div>
              <div className="d-flex justify-content-between">
                {index < articles.length - 1 ? (
                  <button onClick={handleNext} class="edit-btnnn">
                    Next Article
                  </button>
                ) : (
                  <button class="edit-btnnn" onClick={handlePrev}>
                    Previous Article
                  </button>
                )}
                <Link to="/" class="edit-btnnn">
                  Home
                </Link>
              </div>
              <div className="mt-3" style={{ float: "right" }}>
                <FacebookShareButton url={articleData?.imageFile}>
                  <span class="socialshare">
                    <svg
                      style={{ display: "block", borderRadius: "999px" }}
                      focusable="false"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      width="100%"
                      height="100%"
                      viewBox="-5 -5 42 42"
                    >
                      <path
                        d="M17.78 27.5V17.008h3.522l.527-4.09h-4.05v-2.61c0-1.182.33-1.99 2.023-1.99h2.166V4.66c-.375-.05-1.66-.16-3.155-.16-3.123 0-5.26 1.905-5.26 5.405v3.016h-3.53v4.09h3.53V27.5h4.223z"
                        fill="#fff"
                      ></path>
                    </svg>
                  </span>
                </FacebookShareButton>
                <TwitterShareButton url={articleData?.imageFile}>
                  <span class="socialshare1 mx-1">
                    <svg
                      style={{ display: "block", borderRadius: "999px" }}
                      focusable="false"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      width="100%"
                      height="100%"
                      viewBox="-4 -4 39 39"
                    >
                      <path
                        d="M28 8.557a9.913 9.913 0 0 1-2.828.775 4.93 4.93 0 0 0 2.166-2.725 9.738 9.738 0 0 1-3.13 1.194 4.92 4.92 0 0 0-3.593-1.55 4.924 4.924 0 0 0-4.794 6.049c-4.09-.21-7.72-2.17-10.15-5.15a4.942 4.942 0 0 0-.665 2.477c0 1.71.87 3.214 2.19 4.1a4.968 4.968 0 0 1-2.23-.616v.06c0 2.39 1.7 4.38 3.952 4.83-.414.115-.85.174-1.297.174-.318 0-.626-.03-.928-.086a4.935 4.935 0 0 0 4.6 3.42 9.893 9.893 0 0 1-6.114 2.107c-.398 0-.79-.023-1.175-.068a13.953 13.953 0 0 0 7.55 2.213c9.056 0 14.01-7.507 14.01-14.013 0-.213-.005-.426-.015-.637.96-.695 1.795-1.56 2.455-2.55z"
                        fill="#fff"
                      ></path>
                    </svg>
                  </span>
                </TwitterShareButton>

                <LinkedinShareButton
                  title={articleData?.title}
                  url={articleData?.imageFile}
                >
                  <span className="socialshare3 mx-1">
                    <svg
                      style={{ display: "block", borderRadius: "999px" }}
                      focusable="false"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      width="100%"
                      height="100%"
                      viewBox="0 0 32 32"
                    >
                      <path
                        d="M6.227 12.61h4.19v13.48h-4.19V12.61zm2.095-6.7a2.43 2.43 0 0 1 0 4.86c-1.344 0-2.428-1.09-2.428-2.43s1.084-2.43 2.428-2.43m4.72 6.7h4.02v1.84h.058c.56-1.058 1.927-2.176 3.965-2.176 4.238 0 5.02 2.792 5.02 6.42v7.395h-4.183v-6.56c0-1.564-.03-3.574-2.178-3.574-2.18 0-2.514 1.7-2.514 3.46v6.668h-4.187V12.61z"
                        fill="#fff"
                      ></path>
                    </svg>
                  </span>
                </LinkedinShareButton>
                <PinterestShareButton
                  url={articleData?.imageFile}
                  media={articleData?.imageFile}
                >
                  <span class="socialshare4 mx-1">
                    <svg
                      style={{ display: "block", borderRadius: "999px" }}
                      focusable="false"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      width="100%"
                      height="100%"
                      viewBox="-2 -2 35 35"
                    >
                      <path
                        fill="#fff"
                        d="M16.539 4.5c-6.277 0-9.442 4.5-9.442 8.253 0 2.272.86 4.293 2.705 5.046.303.125.574.005.662-.33.061-.231.205-.816.27-1.06.088-.331.053-.447-.191-.736-.532-.627-.873-1.439-.873-2.591 0-3.338 2.498-6.327 6.505-6.327 3.548 0 5.497 2.168 5.497 5.062 0 3.81-1.686 7.025-4.188 7.025-1.382 0-2.416-1.142-2.085-2.545.397-1.674 1.166-3.48 1.166-4.689 0-1.081-.581-1.983-1.782-1.983-1.413 0-2.548 1.462-2.548 3.419 0 1.247.421 2.091.421 2.091l-1.699 7.199c-.505 2.137-.076 4.755-.039 5.019.021.158.223.196.314.077.13-.17 1.813-2.247 2.384-4.324.162-.587.929-3.631.929-3.631.46.876 1.801 1.646 3.227 1.646 4.247 0 7.128-3.871 7.128-9.053.003-3.918-3.317-7.568-8.361-7.568z"
                      ></path>
                    </svg>
                  </span>
                </PinterestShareButton>
                <WhatsappShareButton url={articleData?.imageFile}>
                  <span class="socialshare5 mx-1">
                    <svg
                      style={{ display: "block", borderRadius: "999px" }}
                      focusable="false"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      width="100%"
                      height="100%"
                      viewBox="-6 -5 40 40"
                    >
                      <path
                        class="heateor_sss_svg_stroke heateor_sss_no_fill"
                        stroke="#fff"
                        stroke-width="2"
                        fill="none"
                        d="M 11.579798566743314 24.396926207859085 A 10 10 0 1 0 6.808479557110079 20.73576436351046"
                      ></path>
                      <path
                        d="M 7 19 l -1 6 l 6 -1"
                        class="heateor_sss_no_fill heateor_sss_svg_stroke"
                        stroke="#fff"
                        stroke-width="2"
                        fill="none"
                      ></path>
                      <path
                        d="M 10 10 q -1 8 8 11 c 5 -1 0 -6 -1 -3 q -4 -3 -5 -5 c 4 -2 -1 -5 -1 -4"
                        fill="#fff"
                      ></path>
                    </svg>
                  </span>
                </WhatsappShareButton>
                <a href="https://www.instagram.com/" target="_blank">
                  <span class="socialshare2 mx-1">
                    <svg
                      style={{ display: "block", borderRadius: "999px" }}
                      version="1.1"
                      viewBox="-10 -10 148 148"
                      width="100%"
                      height="100%"
                      //xml:space="preserve"
                      xmlns="http://www.w3.org/2000/svg"
                      //xmlns:xlink="http://www.w3.org/1999/xlink"
                    >
                      <g>
                        <g>
                          <path
                            d="M86,112H42c-14.336,0-26-11.663-26-26V42c0-14.337,11.664-26,26-26h44c14.337,0,26,11.663,26,26v44 C112,100.337,100.337,112,86,112z M42,24c-9.925,0-18,8.074-18,18v44c0,9.925,8.075,18,18,18h44c9.926,0,18-8.075,18-18V42 c0-9.926-8.074-18-18-18H42z"
                            fill="#fff"
                          ></path>
                        </g>
                        <g>
                          <path
                            d="M64,88c-13.234,0-24-10.767-24-24c0-13.234,10.766-24,24-24s24,10.766,24,24C88,77.233,77.234,88,64,88z M64,48c-8.822,0-16,7.178-16,16s7.178,16,16,16c8.822,0,16-7.178,16-16S72.822,48,64,48z"
                            fill="#fff"
                          ></path>
                        </g>
                        <g>
                          <circle
                            cx="89.5"
                            cy="38.5"
                            fill="#fff"
                            r="5.5"
                          ></circle>
                        </g>
                      </g>
                    </svg>
                  </span>
                </a>
              </div>
              <br />
              <br />
            </div>
          </div>
        </div>
      </div>
      <TopFooter promo1Data={promo1Data} promo2Data={promo2Data} />
      <Footer />
    </div>
  );
}

export default Singlearticle;
