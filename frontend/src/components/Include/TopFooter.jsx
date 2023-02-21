import React from "react";
import { useState } from "react";
import "../css/Footer.css";
// import tshirt from '../images/tshirt.png'
// import t11 from '../images/11.jpg'
// import t22 from '../images/22.jpg'
// import t33 from '../images/33.jpg'
import qr from "../images/qr-code.jpg";

function TopFooter({ promo1Data, promo2Data, color, setColor }) {
  const [rotate, setRotate] = useState(true);

  return (
    <div className="row top__footer">
      <div className="col-md-6 footer__top">
        <div className={`footer__left ${color ? "" : "pal4"} `}>
          {promo1Data?.map((item, index) => (
            <a href={item.link} target="_blank" key={item._id} rel="noreferrer">
              <img
                className="footer__image"
                src={item.link}
                alt="wornderofweird"
              />
            </a>
          ))}

          <div className="footer-text-left">
            <p>Special Limited Edition T-shirt</p>
          </div>
        </div>
      </div>
      <div className="col-md-6 footer__right">
        <div className={`footer-right-first ${color ? "" : "pal5"} `}>
          <div className="row">
            <div className="col-sm-12 col-md-8 footer__right__img">
              {promo2Data &&
                promo2Data?.map((item, index) => (
                  <a
                    href={item.link}
                    target="_blank"
                    key={item._id}
                    rel="noreferrer"
                  >
                    <img
                      className="footer__image"
                      src={item.imageFile}
                      alt="wornderofweird"
                    />
                  </a>
                ))}

              {/* <img className='footer__image' src={t22} alt='wornderofweird'/>
                  <img className='footer__image' src={t33} alt='wornderofweird'/> */}
              <div className="footer-text-right">
                <p>Explore over 150 unique t-shirt designs - click here</p>
              </div>
            </div>
            <div className="col-sm-12 col-md-4 qr-code">
              <div class="wrapper">
                <div
                  class="container"
                  onMouseEnter={() => setRotate(false)}
                  onMouseLeave={() => setRotate(true)}
                  onClick={() => {
                    window.open("https://weirdisgood.co/", "_blank");
                  }}
                >
                  <div class={`image-cube  ${rotate && "img-ani"}`}>
                    <div class="front">
                      <img
                        className="footer__image"
                        src={qr}
                        alt="wornderofweird"
                      />
                    </div>
                    <div class="right">
                      <img
                        className="footer__image"
                        src={qr}
                        alt="wornderofweird"
                      />
                    </div>
                    <div class="back">
                      <img
                        className="footer__image"
                        src={qr}
                        alt="wornderofweird"
                      />
                    </div>
                    <div class="left">
                      <img
                        className="footer__image"
                        src={qr}
                        alt="wornderofweird"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TopFooter;
