import React from "react";
import "../components/css/Main.css";
import Common from "../components/images/PositivelyPositive.png";
import Headertop from "../components/Include/Headertop";
import Header from "../components/Include/Header";
import TopFooter from "../components/Include/TopFooter";
import Footer from "../components/Include/Footer";
import axios from "axios";
// import ReactLoader from "react-loader-spinner";

function EmailForm({ quotes, promo1Data, promo2Data }) {
  const [formData, setFormData] = React.useState({
    comment: "",
    email: "",
    confirmEmail: "",
    firstName: "",
    lastName: "",
    company: "",
  });
  const [loading, setLoading] = React.useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (
        !formData.email ||
        !formData.confirmEmail ||
        !formData.firstName ||
        !formData.lastName ||
        !formData.company
      )
        return alert("Please fill out all fields");
      if (formData.email !== formData.confirmEmail)
        return alert("Emails do not match");
      setLoading(true);
      const res = await axios.post(
        "http://localhost:5000/email-form/add",
        formData
      );
      setLoading(false);
      setFormData({
        comment: "",
        email: "",
        confirmEmail: "",
        firstName: "",
        lastName: "",
        company: "",
      });
      alert(res.data.message);
    } catch (error) {
      setLoading(false);
      alert(error.message);
    }
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
              <p>
                Wonder of Weird and Pudding Rock, LLC make no implied or express
                commitment to any action or reply to the query posted by you
                given available resources. If its positive, with wonder, humor
                and perhaps a bit of “awe” please offer your suggestions,
                reaction or ideas.
              </p>
              <p>
                Press submit once done. We usually respond within two business
                days.
              </p>
              <p>Comment (maximum 500 words)</p>
              <form onSubmit={handleSubmit}>
                <textarea
                  className="form-control"
                  rows="3"
                  name="comment"
                  value={formData.comment}
                  onChange={handleChange}
                ></textarea>

                <div class="row mt-3">
                  <div class="col">
                    <label>Your Email</label>
                    <input
                      type="email"
                      class="form-control"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                    />
                  </div>
                  <div class="col">
                    <label>Confirm Email Address</label>
                    <input
                      type="email"
                      class="form-control"
                      name="confirmEmail"
                      value={formData.confirmEmail}
                      onChange={handleChange}
                    />
                  </div>
                </div>
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
                <div class="mt-3 form-check form-check-inline">
                  <input
                    class="form-check-input"
                    type="radio"
                    name="inlineRadioOptions"
                    value="Company"
                    onChange={(e) =>
                      setFormData({ ...formData, company: e.target.value })
                    }
                  />
                  <label class="form-check-label">Company</label>
                </div>
                <div class="form-check form-check-inline">
                  <input
                    class="form-check-input"
                    type="radio"
                    name="inlineRadioOptions"
                    value="Individual"
                    onChange={(e) =>
                      setFormData({ ...formData, company: e.target.value })
                    }
                  />
                  <label class="form-check-label">Individual</label>
                </div>
                <div class="mt-3 form-check">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    id="inlineCheckbox1"
                  />
                  <label class="form-check-label">
                    I hereby confirm that the above information is accurate and
                    I do not represent any competitive entity.
                  </label>
                </div>
                <div className="mt-3">
                  {loading ? (
                    // <ReactLoader  type="Oval" color="red" height={40} radius={10} visible={loading}/>
                    <p>Loading...</p>
                  ) : (
                    <button className="edit-btn py-2 px-4" type="submit">
                      Submit
                    </button>
                  )}
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

export default EmailForm;
