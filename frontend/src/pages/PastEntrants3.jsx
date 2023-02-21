import React from "react";
import "../components/css/Main.css";
import Headertop from "../components/Include/Headertop";
import Header from "../components/Include/Header";
import TopFooter from "../components/Include/TopFooter";
import Footer from "../components/Include/Footer";
import entrants3 from "../components/images/entrants3.jpg";
import { Link } from "react-router-dom";

function PastEntrants({ quotes, promo1Data, promo2Data }) {
  return (
    <div>
      <Headertop />
      <Header quotes={quotes} />
      <div className="row testrow">
        <div className="col-md-6 area5">
          <div className="img_bg">
            <img className="art__img" src={entrants3} alt="wornderofweird" />
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
              <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quis
                voluptatem, earum repellat cupiditate assumenda, deleniti quia
                nulla eveniet dolores nesciunt sunt debitis necessitatibus, a
                dolore consequatur quod totam aliquid corporis at
                exercitationem! Voluptas aliquam rem mollitia minima reiciendis
                commodi labore temporibus explicabo cupiditate delectus, neque
                impedit blanditiis ad beatae debitis ea maxime nam asperiores
                ducimus magni eum quo? Laudantium ullam harum, dolor
                reprehenderit, adipisci voluptas enim natus sint cupiditate
                officia maiores? In inventore beatae provident, laudantium
                officiis maxime, possimus consectetur quis odit natus sequi quo
                dignissimos ratione hic cum modi? Optio et rem excepturi dicta,
                aperiam suscipit delectus doloremque commodi?
              </p>
              <p>
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quasi
                laborum est impedit iure mollitia delectus cumque. Veritatis
                quas magnam itaque nostrum dolores perspiciatis beatae totam
                odio iusto? Eaque, asperiores. Sint voluptatibus dignissimos
                exercitationem delectus in neque similique nesciunt deserunt?
                Numquam tenetur placeat provident unde quod porro doloribus
                mollitia at eos.
              </p>
              <div className="d-flex ">
                <Link to="/past-entrants2">
                  <button className="edit-btn py-2 px-4">Previous</button>
                </Link>
              </div>
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
