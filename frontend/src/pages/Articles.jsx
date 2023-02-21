import React from "react";
import "../components/css/Main.css";
import place from "../components/images/place.png";
import things from "../components/images/things.png";
import people from "../components/images/people.jpg";
import Headertop from "../components/Include/Headertop";
import Header from "../components/Include/Header";
import TopFooter from "../components/Include/TopFooter";
import Footer from "../components/Include/Footer";
import { Link } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";

function Articles({ articles, quotes, promo1Data, promo2Data }) {
  const [contents, setContents] = React.useState(articles);
  const [active, setActive] = React.useState(false);

  React.useEffect(() => {
    setContents(articles);
  }, [articles]);

  const htmlToText = (html) => {
    const div = document.createElement("div");
    div.innerHTML = html;
    return div.textContent || div.innerText || "";
  };
  const handleCatFilter = (activeNum, cat) => {
    setContents(articles.filter((article) => article.category === cat));
    setActive(activeNum);
  };

  return (
    <div>
      <Headertop />
      <Header quotes={quotes} />
      <div className="row testrow">
        <div className="col-md-6 area5  ">
          {/* <div className="img_bg bkbtn flex-column">
            <div
              className={`text-center  ${
                (active === 0 || active === 1 || active === 2) && "d-none"
              }`}
            >
              <div
                onClick={() => handleCatFilter(0, "Weird People")}
                style={{ cursor: "pointer" }}
                className={`${active === 0 && "activeFilter"}`}
              >
                <img
                  className="article-cat1"
                  src={people} 
                  alt="wornderofweird"
                />
                <p>Weird People</p>
              </div>
              <div
                onClick={() => handleCatFilter(1, "Weird Place")}
                style={{ cursor: "pointer" }}
                className={`${active === 1 && "activeFilter"}`}
              >
                <img
                  className="article-cat2"
                  src={place}
                  alt="wornderofweird"
                />
                <p>Weird Places</p>
              </div>
              <div
                onClick={() => handleCatFilter(2, "Weird Things")}
                style={{ cursor: "pointer" }}
                className={`${active === 2 && "activeFilter"}`}
              >
                <img
                  className="article-cat3"
                  src={things}
                  alt="wornderofweird"
                />
                <p className="text-center">Weird Things</p>
              </div>
            </div>
            {active === 0 && (
              <img width="50%" src={people} alt="wornderofweird" />
            )}
            {active === 1 && (
              <img width="50%" src={place} alt="wornderofweird" />
            )}
            {active === 2 && (
              <img width="50%" src={things} alt="wornderofweird" />
            )}
            {(active === 0 || active === 1 || active === 2) && (
              <button
                className="btn bkbtnn edit-btnnn"
                onClick={() => setActive(false)}
              >
                Back
              </button>
            )}
          </div> */}

          <div
            className={`d-flex flex-column align-items-center justify-content-around img_bg `}
            style={{ width: "100%", height: "100%" }}
          >
            <div
              className={`d-flex align-items-center justify-content-center  ${
                (active === 0 || active === 1 || active === 2) && "d-none"
              }`}
              onClick={() => handleCatFilter(0, "Weird People")}
              style={{ cursor: "pointer" }}
            >
              <img src={people} alt="" className="article-cat1 mx-5" />
              <p style={{ textDecoration: "underline" }} className=" my-2">
                {" "}
                Weird People
              </p>
            </div>

            <div
              onClick={() => handleCatFilter(1, "Weird Place")}
              style={{ cursor: "pointer" }}
              className={`d-flex align-items-center justify-content-center  ${
                (active === 0 || active === 1 || active === 2) && "d-none"
              }`}
            >
              <img src={place} alt="" className="article-cat2 mx-5" />
              <p style={{ textDecoration: "underline" }} className=" my-2">
                {" "}
                Weird Places
              </p>
            </div>

            <div
              className={`d-flex align-items-center justify-content-center ${
                (active === 0 || active === 1 || active === 2) && "d-none"
              } `}
              style={{ cursor: "pointer " }}
              onClick={() => handleCatFilter(2, "Weird Things")}
            >
              <img src={things} alt="" className="article-cat2 mx-4" />
              <p style={{ textDecoration: "underline" }} className=" my-2">
                {" "}
                Weird Things
              </p>
            </div>

            <div
              className="d-flex flex-column align-items-center justify-content-between"
              style={{ position: "relative" }}
            >
              {active === 0 && (
                <img width="50%" src={people} alt="wornderofweird" />
              )}
              {active === 1 && (
                <img width="50%" src={place} alt="wornderofweird" />
              )}
              {active === 2 && (
                <img width="50%" src={things} alt="wornderofweird" />
              )}
              {(active === 0 || active === 1 || active === 2) && (
                <div>
                  <button
                    className="btn bkbtnn edit-btnnn "
                    onClick={() => setActive(false)}
                  >
                    Back
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="col-md-6 area6">
          <div className="img_bg2">
            <div className="text_bg">
              {contents.map((article) => (
                <div className="article-list mt-3" key={article._id}>
                  <h2>{article.title}</h2>
                  <div class="d-flex align-items-center justify-content-between my-2 ">
                    {/* <img src={article.imageFile} width={100} height={100} /> */}
                    <div className="post_image " style={{ marginRight: "5px" }}>
                      <LazyLoadImage
                        src={article.imageFile}
                        alt="post_image"
                        height={100}
                        width={100}
                        effect="blur"
                        className="img-fluid "
                      />
                    </div>
                    <div className="mb-1 d-flex flex-column align-items-start justify-content-center mx-2">
                      <p>
                        {htmlToText(
                          article.articleBody.split(" ").slice(0, 18).join(" ")
                        ) + "..."}
                      </p>
                      <Link
                        to={`/article/${article.URL}`}
                        className="navigate-button"
                        style={{ textDecoration: "none" }}
                      >
                        <span className="">Read More </span>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <TopFooter promo1Data={promo1Data} promo2Data={promo2Data} />
      <Footer />
    </div>
  );
}

export default Articles;
