import React from "react";
import "../components/css/Main.css";
import Headertop from "../components/Include/Headertop";
import Header from "../components/Include/Header";
import TopFooter from "../components/Include/TopFooter";
import Footer from "../components/Include/Footer";
import entrants from "../components/images/past-entrants.png";
import { Link } from "react-router-dom";

function PastEntrants({ quotes, promo1Data, promo2Data }) {
  return (
    <div>
      <Headertop />
      <Header quotes={quotes} />
      <div className="row testrow">
        <div className="col-md-6 area5">
          <div className="img_bg">
            <img className="art__img" src={entrants} alt="wornderofweird" />
          </div>
        </div>
        <div className="col-md-6 area6">
          <div className="img_bg2">
            <div className="text_bg">
              {/* <img
                className="entrants-img"
                src={entrants}
                alt="wornderofweird"
              /> */}
              <div>
                <p>
                  Wonder of Weird brings out the artist in all of us to delve
                  into our talent for the use of colors and shadows to color
                  specific black and white illustrations and submit an entry
                  into a current contest. As our Wall of Wonder grows come here
                  to see past entrants that are most noteworthy and judged as
                  winners of a coloring contest. For information on the Wonder
                  of Weird coloring book to draw more and more,{" "}
                  <Link to="#">Click Here</Link>
                  <p className="my-3"> I B Weird (Your Host)</p>
                </p>
              </div>

              {/* <div className="d-flex flex-row-reverse">
                <Link to="/past-entrants2">
                  <button className="edit-btn py-2 px-4">Next</button>
                </Link>
              </div> */}
            </div>
          </div>
        </div>
      </div>
      <TopFooter promo1Data={promo1Data} promo2Data={promo2Data} />
      <Footer />
    </div>
  );
}

export default PastEntrants;
