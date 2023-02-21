import React from "react";
import "../components/css/Main.css";
import Common from "../components/images/PositivelyPositive.png";
import Headertop from "../components/Include/Headertop";
import Header from "../components/Include/Header";
import TopFooter from "../components/Include/TopFooter";
import Footer from "../components/Include/Footer";

function BusinessPartnership({ quotes, promo1Data, promo2Data }) {
  const [formData, setFormData] = React.useState({
    firstName: "",
    lastName: "",
    position: "",
    company: "",
    companyType: "",
    interest: "",
    timeZone: "",
    phone: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Thank you for your interest. We will get back to you soon.");
    console.log(formData);
    setFormData({
      firstName: "",
      lastName: "",
      position: "",
      company: "",
      companyType: "",
      interest: "",
      timeZone: "",
      phone: "",
    });
  };

  return (
    <div>
      <Headertop />
      <Header quotes={quotes} />
      <div className="row testrow">
        <div className="col-md-6 area5">
          <div className="img_bg">
            <img className="art__img" src={Common} alt="wornderofweird" />
          </div>
        </div>
        <div className="col-md-6 area6">
          <div className="img_bg2">
            <div className="text_bg">
              <h1>Starting a Partnership Conversation</h1>
              <p>
                Pudding Rock LLC desires constructive partnerships that create
                positive win-win outcomes. We do not sell our list of provide
                guest contact information, or, participate in any external party
                demand generation activities. Our content drives interest in our
                other brands and websites. Wonder of Weird does from time to
                time, allow the duplication of its content for partners and
                wishes to link with other providers who market or sell content
                that aligns with our principals of decency, respect, and
                positive intent. Wonder of Weird accepts content offered by
                other partners for in-kind joint activities. We do not pay for
                content, nor charge for the use of ours. We barter content for
                content that is positive, entertaining, fun, and informative.
                For your partnership interest, please complete the form below.
                We will respond via email or phone within five business days.
              </p>
              <form onSubmit={handleSubmit}>
                <div class="row mt-3">
                  <div class="col">
                    <label>First Name</label>
                    <input
                      type="text"
                      class="form-control"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                    />
                  </div>
                  <div class="col">
                    <label>Last Name</label>
                    <input
                      type="text"
                      class="form-control"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div class="row mt-3">
                  <div class="col">
                    <label>Position or Responsibility</label>
                    <input
                      type="text"
                      class="form-control"
                      name="position"
                      value={formData.position}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div class="row mt-3">
                  <div class="col">
                    <label>Company or Organization</label>
                    <input
                      type="text"
                      class="form-control"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div class="row mt-3">
                  <div class="col">
                    <label>Type of Organization</label>
                    <input
                      type="text"
                      class="form-control"
                      name="companyType"
                      value={formData.companyType}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div class="row mt-3">
                  <div class="col">
                    <label>
                      State Your Interest (Please Limit initial contact details
                      to three sentences)
                    </label>
                    <textarea
                      className="form-control"
                      name="interest"
                      id=""
                      rows="3"
                      value={formData.interest}
                      onChange={handleChange}
                    ></textarea>
                  </div>
                </div>
                <div class="row mt-3">
                  <div class="col">
                    <label>Time Zone</label>
                    <input
                      type="text"
                      class="form-control"
                      name="timeZone"
                      value={formData.timeZone}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div class="row mt-3">
                  <div class="col">
                    <label>Phone Number</label>
                    <input
                      type="text"
                      name="phone"
                      class="form-control"
                      value={formData.phone}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="mt-3">
                  <button className="edit-btn py-2 px-4" type="submit">
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <TopFooter promo1Data={promo1Data} promo2Data={promo2Data} />
      <Footer />
    </div>
  );
}

export default BusinessPartnership;
