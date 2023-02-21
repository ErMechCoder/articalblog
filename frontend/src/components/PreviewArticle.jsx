import React from "react";
import "./css/Main.css";
import Headertop from "./Include/Headertop";
import Header from "./Include/Header";
import TopFooter from "./Include/TopFooter";
import Footer from "./Include/Footer";
import { Link } from "react-router-dom";

function PreviewArticle({ quotes, articles, promo1Data, promo2Data }) {
  const File = localStorage.getItem("File") && localStorage.getItem("File");
  const Title = localStorage.getItem("Title") && localStorage.getItem("Title");
  const Editor =
    localStorage.getItem("Editor") && localStorage.getItem("Editor");

  return (
    <div>
      <Headertop />
      <Header quotes={quotes} />
      <div className="row testrow">
        <div className="col-md-6 area5">
          <div className="img_bg">
            <img className="art__img" src={File} alt="wornderofweird" />
          </div>
        </div>
        <div className="col-md-6 area6">
          <div className="img_bg2">
            <div className="text_bg">
              <h1>{Title}</h1>
              <div
                className="mb-1"
                dangerouslySetInnerHTML={{
                  __html: Editor,
                }}
              ></div>
              <div className="d-flex justify-content-between"></div>
            </div>
          </div>
        </div>
      </div>
      <TopFooter promo1Data={promo1Data} promo2Data={promo2Data} />
      <Footer />
    </div>
  );
}

export default PreviewArticle;
