import React, { useContext } from "react";
import { Link } from "react-router-dom";
import "../components/css/Innerpage.css";
import Headertop from "../components/Include/Headertop";
import Header from "../components/Include/Header";
import TopFooter from "../components/Include/TopFooter";
import Footer from "../components/Include/Footer";
// import ReactLoader from "react-loader-spinner";
import Slider from "react-slick";
import { wowContext } from "../context/Context";
import { LazyLoadImage } from "react-lazy-load-image-component";

function Home({ quotes, promo1Data, promo2Data, color, setColor }) {
  const [loading, setLoading] = React.useState(true);
  const {
    articleState: { articles },
  } = useContext(wowContext);

  console.log("homearticles",articles)
  const htmlToText = (html) => {
    const div = document.createElement("div");
    div.innerHTML = html;
    return div.textContent || div.innerText || "";
  };
  const settings = {
    pauseOnHover: true,
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    speed: 2000,
    autoplaySpeed: 2000,
    swipeToSlide: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  return (
    <>
      <Headertop color={color} setColor={setColor} />
      <Header quotes={quotes} color={color} setColor={setColor} />

      <div className="row  multicaro">
        <div className="innercaro text-center">
          {articles.length === 0 ? (
            // <ReactLoader type="Puff" color="#c2d227" height={450} width={100} />
            <p>Loading...</p>
          ) : (
            <Slider {...settings}>
              {articles &&
                articles.slice(0, 7).map((article, index) => (
                  <div className="px-2 py-3 d-flex aign-items-center justify-content-center">
                    <Link
                      to={`/article/${article.URL}`}
                      style={{
                        textDecoration: "none",
                        color: "black",
                      }}
                    >
                      <div
                        className=" slide-design "
                        style={{
                          maxHeight: "420px",
                          minHeight: "420px",
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <LazyLoadImage
                          className="card-img-top my-1"
                          alt={article.title}
                          height={190}
                          src={article.imageFile}
                          width={220}
                          style={{ objectFit: "contain" }}
                        />
                        <div className="card-body">
                          <h4 className="card-title">
                            {article.title.slice(0, 40)}...
                          </h4>
                          <p className="card-text">
                            {htmlToText(article.articleBody).slice(0, 90)}
                            ...
                          </p>
                        </div>
                        <div className="mb-2">
                          <Link to={`/article/${article.URL}`}>
                            <span className="btn btn-primary">Read More</span>
                          </Link>
                        </div>
                      </div>
                    </Link>
                  </div>
                ))}
            </Slider>
          )}
        </div>
      </div>
      <TopFooter
        promo1Data={promo1Data}
        promo2Data={promo2Data}
        color={color}
        setColor={setColor}
      />
      <Footer color={color} setColor={setColor} />
    </>
  );
}

export default Home;
