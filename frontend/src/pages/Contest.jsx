import React from "react";
import "../components/css/Main.css";
import contest from "../components/images/past-entrants.png";
import Headertop from "../components/Include/Headertop";
import Header from "../components/Include/Header";
import TopFooter from "../components/Include/TopFooter";
import Footer from "../components/Include/Footer";
import axios from "axios";
// import ReactLoader from "react-loader-spinner";
import { toast } from "react-toastify";
import { Form } from "react-bootstrap";

function Contest({ quotes, promo1Data, promo2Data }) {
  const [file, setFile] = React.useState("");
  const [url, setUrl] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [errors, setErrors] = React.useState({
    email: "",
    confirmEmail: "",
  });
  // https://res.cloudinary.com/dk6vwkh9y/image/upload/v1641900757/wowImages/uxm1hmawdavmiakqxgtg.png
  const [contestData, setContestData] = React.useState({
    entry: " ",
    firstName: "",
    lastName: " ",
    email: "",
    subject: "",
    desc: "",
    file: { link: "", type: " " },
  });
  const [updateTitle, setUpdateTitle] = React.useState([]);

  const fetchUpdateTitle = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:5000/update-contest/get"
      );
      data.length && setUpdateTitle(data);
    } catch (error) {
      console.log(error);
    }
  };
  React.useEffect(() => {
    fetchUpdateTitle();
  }, []);

  const handleChange = (e) => {
    setContestData({ ...contestData, [e.target.name]: e.target.value });
  };
  const handleFile = (e) => {
    setFile(e.target.files[0]);
  };

  const handleFileUpload = () => {
    if (file.type === "image/jpeg" || file.type === "image/png") {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "qnxqwax7");
      const options = {
        method: "POST",
        body: formData,
      };

      setLoading(true);
      fetch(`https://api.cloudinary.com/v1_1/dk6vwkh9y/image/upload`, options)
        .then((response) => response.json())
        .then((response) => {
          setUrl(response.url);
          setContestData({
            ...contestData,
            file: { link: response.url, type: file.type },
          });
          setLoading(false);
        });
    } else if (file.type === "video/mp4") {
      const formData = new FormData();
      formData.append("file", file);
      const options = {
        method: "POST",
        body: formData,
      };
      // formData.append('upload_preset', 'qnxqwax7');
      formData.append("upload_preset", "qaidrsgv");
      setLoading(true);
      fetch(`https://api.cloudinary.com/v1_1/dk6vwkh9y/video/upload`, options)
        .then((response) => response.json())
        .then((response) => {
          setUrl(response.url);
          setContestData({
            ...contestData,
            file: { link: response.url, type: file.type },
          });
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      alert("Please select a valid file");
    }
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      if (
        contestData.firstName === "" ||
        contestData.lastName === "" ||
        contestData.email === "" ||
        contestData.subject === "" ||
        contestData.desc === "" ||
        contestData.file.link === ""
      ) {
        return toast.error("Please fill all the fields");
      }

      setLoading(true);
      const res = await axios.post(
        "http://localhost:5000/contest/add",
        contestData
      );
      if (res.status === 201) {
        setContestData({
          entry: " ",
          firstName: "",
          lastName: " ",
          email: "",
          confirmEmail: "",
          subject: "",
          desc: "",
          file: { link: "", type: " " },
        });
        setLoading(false);
        toast.success("Contest Submitted Successfully");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };
  return (
    <div>
      <Headertop />
      <Header quotes={quotes} />
      <div className="row testrow">
        <div className="col-md-6 area5">
          <div className="img_bg">
            <img className="art__img" src={contest} alt="wornderofweird" />
          </div>
        </div>
        <div className="col-md-6 area6">
          <div className="img_bg2">
            <div className={` text_bg `}>
              <h1 className="text-center">{updateTitle[0]?.title}</h1>
              <p className="text-center">
                <strong>{updateTitle[0]?.subtitle}</strong>
              </p>

              <form
                encType="multipart/form-data"
                onSubmit={handleSubmit}
                style={{ postion: "relative" }}
              >
                <div class="row mt-3">
                  <div class="col">
                    <label>Weird Entry Name</label>
                    <input
                      type="text"
                      class="form-control"
                      name="entry"
                      value={contestData.entry}
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
                      value={contestData.firstName}
                      onChange={handleChange}
                    />
                  </div>
                  <div class="col">
                    <label>Last Name</label>
                    <input
                      type="text"
                      class="form-control"
                      name="lastName"
                      value={contestData.lastName}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div class="row mt-3">
                  <div class="col">
                    {/* <label>Your Email</label>
                    <input
                      type="email"
                      class="form-control"
                      name="email"
                      required
                      value={contestData.email}
                      onChange={handleChange}
                      onBlur={() => {
                        validateEmail(contestData.email);
                      }}
                    /> */}
                    <Form.Group>
                      <Form.Label>Email</Form.Label>
                      <Form.Control
                        type="email"
                        name="email"
                        required
                        onChange={(e) => {
                          setContestData({
                            ...contestData,
                            email: e.target.value,
                          });
                        }}
                        isInvalid={!!errors.email}
                        onBlur={() => {
                          setErrors({
                            ...errors,
                            email: "",
                          });
                          const re =
                            /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                          if (!re.test(contestData.email)) {
                            setErrors({
                              ...errors,
                              email: "Please enter a valid email",
                            });
                          }
                        }}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.email}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </div>
                  <div class="col">
                    {/* <label>Confirm Email Address</label>
                    <input
                      type="text"
                      class="form-control"
                      name="confirmEmail"
                      required
                      value={contestData.confirmEmail}
                      onChange={handleChange}
                      onBlur={() => {
                        if (contestData.email !== contestData.confirmEmail) {
                          toast.error("Email does not match");
                        }
                      }}
                    /> */}

                    <Form.Group>
                      <Form.Label>Confirm Email </Form.Label>
                      <Form.Control
                        type="email"
                        name="confirmEmail"
                        required
                        onChange={(e) => {
                          setContestData({
                            ...contestData,
                            confirmEmail: e.target.value,
                          });
                        }}
                        isInvalid={!!errors.confirmEmail}
                        onBlur={() => {
                          setErrors({
                            ...errors,
                            confirmEmail: "",
                          });
                          if (contestData.email !== contestData.confirmEmail) {
                            setErrors({
                              ...errors,
                              confirmEmail: "Email does not match",
                            });
                          }
                        }}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.confirmEmail}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </div>
                </div>
                <div className="mt-3">
                  <label>Weirdness Subject (select one only)</label>
                  <select
                    className="form-control"
                    name="subject"
                    value={contestData.subject}
                    onChange={handleChange}
                  >
                    <option value="">Select Subject</option>
                    <option value="Weird People">Weird People</option>
                    <option value="Weird Things">Weird Things</option>
                    <option value="Weird Places">Weird Place</option>
                    <option value="Weird Event">Weird Event</option>
                  </select>
                </div>
                <div className="mt-3">
                  <p>Entry Details:</p>
                  <p>
                    (Submit your photo, image or video below along with your
                    description.) Write a brief description as to why you think
                    your entry creates awe and wonder, and what is positively
                    weird about it? Feel free to include any other interesting
                    facts about your entry and tell us what makes it true or
                    believable. (Max 500 words)
                  </p>
                </div>
                {loading ? (
                  <div style={{ postion: "absolute" }} className="">
                    {/* <ReactLoader
                      type="Circles"
                      heigth="100"
                      width="100"
                      color="red"
                      arialLabel="loading"
                      className="loader "
                    /> */}
                    <p>Loading...</p>

                    <h5 className="text-center text-bold">Uploading ...</h5>
                  </div>
                ) : (
                  <>
                    <div className="mt-3">
                      <textarea
                        className="form-control"
                        rows="4"
                        value={contestData.desc}
                        onChange={handleChange}
                        name="desc"
                      ></textarea>
                    </div>
                    <div className="mt-3">
                      <label class="form-label">
                        Upload photo, image or video
                      </label>
                      <input
                        type="file"
                        class="form-control"
                        name="file"
                        onChange={handleFile}
                      />
                      <div className="d-flex align-items-center justify-content-center mt-3">
                        {!url && file && (
                          <button
                            className="btn btn-primary mt-2 btn-center"
                            type="button"
                            onClick={handleFileUpload}
                          >
                            Upload
                          </button>
                        )}
                        {url &&
                          (contestData.file.type === "image/jpg" ||
                            contestData.file.type === "image/png") && (
                            <img
                              className="img-fluid"
                              src={url}
                              alt="wornderofweird"
                              height={200}
                              width={200}
                            />
                          )}
                        {url && contestData.file.type === "video/mp4" && (
                          <video
                            className="img-fluid mt-2 "
                            src={url}
                            alt="wornderofweird"
                            height={100}
                            width={200}
                            controls
                            autoPlay
                          />
                        )}
                      </div>
                    </div>
                    <div className="mt-3">
                      <button className="edit-btn py-2 px-4" type="submit">
                        Submit
                      </button>
                    </div>
                  </>
                )}
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

export default Contest;
