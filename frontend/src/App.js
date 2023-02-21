 // UNSAFE_RouteContext,
import {
  Routes,
  Route,
  BrowserRouter,
  Navigate,
  Link,

} from "react-router-dom";
import React, { useState, useEffect, useContext } from "react";
import { ToastContainer } from "react-toastify";

import Home from "./pages/Home";
import SingleArticle from "./pages/Singlearticle";
import Articles from "./pages/Articles";
import PastEntrants from "./pages/PastEntrants";
import PastEntrants2 from "./pages/PastEntrants2";
import PastEntrants3 from "./pages/PastEntrants3";
import Qrcode from "./pages/Qrocode";

import Contest from "./pages/Contest";
import CommonCauses from "./pages/CommonCausesStatements";
import WorkingTogether from "./pages/WorkingTogetherStatement";
import Disclaimer from "./pages/Disclaimer";
import Origination from "./pages/Origination";
import Mission from "./pages/Mission";
import Emailform from "./pages/EmailForm";
import Businesspartnership from "./pages/BusinessPartnership";
import ContentRights from "./pages/ContentRights";
import TermOfUse from "./pages/TermsOfUse";
import CookiePolicy from "./pages/CookiePolicy";

import Article from "./components/Admin/Article/Article";
import AddArticle from "./components/Admin/Article/Addarticle";
import PromoOne from "./components/Admin/PromoBox/PromoOne";
import PromoTwo from "./components/Admin/PromoBox/PromoTwo";
import Login from "./components/Admin/Auth/Login";
import Quote from "./components/Admin/Quote/Quote";
import QrCode from "./components/Admin/Qr/QrCode";
import AddQuote from "./components/Admin/Quote/AddQuote";
import { BASE_URL } from "./requestMethods";
import axios from "axios";
import UpdateContast from "./components/Admin/UpdateContast";
import ContestGuideline from "./components/ContestGuideline";
import AllUsers from "./components/Admin/AllUsers";
import PreviewArticle from "./components/PreviewArticle";
import { wowContext } from "./context/Context";
import ArticleService from "./services/ArticleService";
import QuoteService from "./services/QuoteService";
import ShowImage from "./pages/ShowImage";
import Registeration from "./pages/Registeration";
import Form from "./components/Admin/Form/Form";
import Users from "./components/Admin/Users/Users";
import ComingSoon from "./comingsoon/ComingSoon";

function App() {
  const [quotes, setQuotes] = useState([]);
  const [user, setUser] = React.useState(null);
  const [promo1Data, setPromo1Data] = React.useState(null);
  const [promo2Data, setPromo2Data] = React.useState(null);
  const [color, setColor] = useState(false);
  const {
    articleState: { articles },
    articleDispatch,
  } = useContext(wowContext);
  const [cookie, setCookie] = useState(null);

  const getQuotes = async () => {
    const { data } = await QuoteService.getAllQuotes();
    setQuotes(data);
  };

  const fetchArticles = async () => {
    const res = await ArticleService.getAllArticles();
    if (res.status === 200) {
      const data = res.data.map((article) => {
        return {
          ...article,
          imageFile: article.imageFile.replace(
            "/home/ekanatechnologies/public_html",
            "http://localhost:3000"
          ),
        };
      });
      articleDispatch({ type: "FETCH_ARTICLES", payload: data });
    }
  };

  useEffect(() => {
    document.title = "Wonder Of Weird";

    fetchArticles();
    getQuotes();
    if (document.cookie) {
      setCookie(document.cookie);
    }
  }, []);

  React.useEffect(() => {
    fetch(BASE_URL + "/promotion_1/get")
      .then((res) => res.json())
      .then((data) => {
        setPromo1Data(data);
      });
    fetch(BASE_URL + "/promotion_2/get")
      .then((res) => res.json())
      .then((data) => {
        setPromo2Data(data);
      });
  }, []);

  console.log("homequotes",quotes)
  console.log("homeuser",user)
  console.log("homepromo1Data",promo1Data)
  console.log("homepromo2Data",promo2Data)
  return (
    <div className="container-fluid">
      <BrowserRouter>
        {!cookie && (
          <div className="cookie-consent d-flex justify-content-between">
            {" "}
            <span>
              This site uses cookies to enhance user experience. see &nbsp;
              <Link to="/cookie-policy" className="ml-1 text-decoration-none">
                Cookie policy
              </Link>{" "}
            </span>
            <div className="d-flex align-items-center justify-content-center g-2">
              {" "}
              <button
                className="edit-btn mx-3 allow-button"
                onClick={() => {
                  document.cookie = `user=${Math.random()}`;
                  setCookie(true);
                }}
              >
                Allow
              </button>
              <button
                className="edit-btn deny-button"
                onClick={() => {
                  document.cookie = `user=${Math.random()}`;
                  setCookie(true);
                }}
              >
                Deny
              </button>
            </div>
          </div>
        )}

        <Routes>
          <Route
            path="/*"
            element={
              <Home
                setColor={setColor}
                color={color}
                quotes={quotes}
                promo1Data={promo1Data}
                promo2Data={promo2Data}
              />
            }
          />
          <Route path="/illustration/:title" element={<ShowImage />} />
          <Route
            path="articles"
            element={
              <Articles
                articles={articles}
                quotes={quotes}
                promo1Data={promo1Data}
                promo2Data={promo2Data}
              />
            }
          />
          <Route
            path="past-entrants"
            element={
              <PastEntrants
                quotes={quotes}
                promo1Data={promo1Data}
                promo2Data={promo2Data}
              />
            }
          />
          <Route
            path="past-entrants2"
            element={
              <PastEntrants2
                quotes={quotes}
                promo1Data={promo1Data}
                promo2Data={promo2Data}
              />
            }
          />
          <Route
            path="past-entrants3"
            element={
              <PastEntrants3
                quotes={quotes}
                promo1Data={promo1Data}
                promo2Data={promo2Data}
              />
            }
          />
          <Route
            path="contest"
            element={
              <Contest
                quotes={quotes}
                promo1Data={promo1Data}
                promo2Data={promo2Data}
              />
            }
          />
          <Route
            path="contest-guideline"
            element={
              <ContestGuideline
                quotes={quotes}
                promo1Data={promo1Data}
                promo2Data={promo2Data}
              />
            }
          />
          <Route
            path="/article/:title"
            element={
              <SingleArticle
                quotes={quotes}
                promo1Data={promo1Data}
                promo2Data={promo2Data}
              />
            }
          />
          {/* <Route  path="/article/:title" element={<SingleArticle2 quotes={quotes} articles={articles} promo1Data={promo1Data} promo2Data={promo2Data}/>} /> */}

          <Route
            path="/register"
            element={
              <Registeration
                quotes={quotes}
                promo1Data={promo1Data}
                promo2Data={promo2Data}
              />
            }
          />
          <Route
            path="common-causes-statements"
            element={
              <CommonCauses
                quotes={quotes}
                promo1Data={promo1Data}
                promo2Data={promo2Data}
              />
            }
          />
          <Route
            path="working-together-statements"
            element={
              <WorkingTogether
                quotes={quotes}
                promo1Data={promo1Data}
                promo2Data={promo2Data}
              />
            }
          />
          <Route
            path="disclaimer"
            element={
              <Disclaimer
                quotes={quotes}
                promo1Data={promo1Data}
                promo2Data={promo2Data}
              />
            }
          />
          <Route
            path="origination"
            element={
              <Origination
                quotes={quotes}
                promo1Data={promo1Data}
                promo2Data={promo2Data}
              />
            }
          />
          <Route
            path="mission"
            element={
              <Mission
                quotes={quotes}
                promo1Data={promo1Data}
                promo2Data={promo2Data}
              />
            }
          />
          <Route
            path="email-form"
            element={
              <Emailform
                quotes={quotes}
                promo1Data={promo1Data}
                promo2Data={promo2Data}
              />
            }
          />
          <Route
            path="business-partnership"
            element={
              <Businesspartnership
                quotes={quotes}
                promo1Data={promo1Data}
                promo2Data={promo2Data}
              />
            }
          />
          <Route
            path="content-rights"
            element={
              <ContentRights
                quotes={quotes}
                promo1Data={promo1Data}
                promo2Data={promo2Data}
              />
            }
          />
          <Route
            path="terms-of-use"
            element={
              <TermOfUse
                quotes={quotes}
                promo1Data={promo1Data}
                promo2Data={promo2Data}
              />
            }
          />
          <Route
            path="scan-qr-code"
            element={
              <Qrcode
                quotes={quotes}
                promo1Data={promo1Data}
                promo2Data={promo2Data}
              />
            }
          />
          <Route
            path="cookie-policy"
            element={
              <CookiePolicy
                quotes={quotes}
                promo1Data={promo1Data}
                promo2Data={promo2Data}
              />
            }
          />
          <Route
            path="coming-soon"
            element={
              <ComingSoon
                quotes={quotes}
                promo1Data={promo1Data}
                promo2Data={promo2Data}
              />
            }
          />

          <Route
            path="/login"
            element={<Login user={user} setUser={setUser} />}
          />
          <Route
            path="admin/article"
            element={user ? <Article user={user} /> : <Navigate to="/login" />}
          />
          <Route
            path="admin/quote"
            element={
              user ? (
                <Quote quotes={quotes} setQuotes={setQuotes} />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            path="admin/qr"
            element={
              user ? (
                <QrCode quotes={quotes} setQuotes={setQuotes} />
              ) : (
                <Navigate to="/login" />
              )
            }
          />

          <Route path="/admin/forms" element={<Form />} />

          <Route
            path="/admin/users"
            element={
              <Users
                quotes={quotes}
                promo1Data={promo1Data}
                promo2Data={promo2Data}
              />
            }
          />

          <Route
            path="admin/add-quote"
            element={
              user ? (
                <AddQuote quotes={quotes} setQuotes={setQuotes} />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            path="admin/add-article"
            element={
              user ? <AddArticle user={user} /> : <Navigate to="/login" />
            }
          />
          <Route
            path="admin/update-article/:_id"
            element={
              user ? <AddArticle user={user} /> : <Navigate to="/login" />
            }
          />
          <Route
            path="admin/promotional-area-1"
            element={user ? <PromoOne /> : <Navigate to="/login" />}
          />
          <Route
            path="admin/promotional-area-2"
            element={user ? <PromoTwo /> : <Navigate to="/login" />}
          />
          <Route path="admin/contest" element={<UpdateContast />} />
          <Route path="admin/all-users" element={<AllUsers />} />
          <Route
            path="/preview-article"
            element={
              <PreviewArticle
                quotes={quotes}
                articles={articles}
                promo1Data={promo1Data}
                promo2Data={promo2Data}
              />
            }
          />
        </Routes>
      </BrowserRouter>
      <ToastContainer />
    </div>
  );
}

export default App;
