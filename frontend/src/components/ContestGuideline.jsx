import React from "react";
import "./css/Main.css";
import contest from "./images/past-entrants.png";
import Headertop from "./Include/Headertop";
import Header from "./Include/Header";
import TopFooter from "./Include/TopFooter";
import Footer from "./Include/Footer";
import axios from "axios";
import { Link } from "react-router-dom";

function ContestGuideline({ quotes, promo1Data, promo2Data }) {
  const [file, setFile] = React.useState("");
  const [url, setUrl] = React.useState("");
  const [loading, setLoading] = React.useState(false);
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

  const handleChange = (e) => {
    setContestData({ ...contestData, [e.target.name]: e.target.value });
  };
  const handleFile = (e) => {
    setFile(e.target.files[0]);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await axios.post(
        "http://localhost:5000/contest/add",
        contestData
      );
      setContestData({
        entry: " ",
        firstName: "",
        lastName: " ",
        email: "",
        subject: "",
        desc: "",
        file: { link: "", type: " " },
      });
      setLoading(false);
      alert("Submitted Successfully");
    } catch (error) {
      console.log(error);
    }

    // const {data}=await axios.post('https://uiib.ekanatechnologies.in/contest/add',formData)
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

  // const handleFirebaseUpload = (e) => {
  //     e.preventDefault();
  //     const fileName = new Date().getTime() + contestData.file.name;
  //     const storage = getStorage(app);
  //     const storageRef = ref(storage, fileName);
  //     const uploadTask = uploadBytesResumable(storageRef, contestData.file);

  //     uploadTask.on(
  //       "state_changed",
  //       (snapshot) => {
  //         const progress =
  //           (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
  //         console.log("Upload is " + progress + "% done");
  //         switch (snapshot.state) {
  //           case "paused":
  //             console.log("Upload is paused");
  //             break;
  //           case "running":
  //             console.log("Upload is running");
  //             break;
  //           default:
  //         }
  //       },
  //       (error) => {
  //           alert(error.message)
  //       },
  //       () => {

  //         // For instance, get the download URL: https://firebasestorage.googleapis.com/...
  //         getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
  //             console.log(downloadURL)
  //           setUrl(downloadURL);
  //         });
  //       }
  //     );
  //   };

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
              <div>
                <div className="text-center">
                  <h1>Contest Submission Guidelines</h1>
                </div>
                <p>
                  From time-to-time wonderofweird.com conducts contests judged
                  by people declared to demonstrate good weirdness. All
                  discretion is solely our own and based on reaction rather than
                  numerical scoring. We want awe, wonder and fascinating – so
                  ask if Your Weird is Good. Entries should include the
                  following in written, graphical, photo or video form:
                </p>
                <ul>
                  <li>What is weird about it?</li>
                  <li>Why is it weird?</li>
                  <li>How does it create a sense of wonder?</li>
                  <li>Does it create positive laughter?</li>
                  <li>When does/did the weirdness take place?</li>
                  <li>
                    Where is the weirdness seen, heard or otherwise experienced
                    or replicated.? No magic please.
                  </li>
                  <li>
                    Use the form on the next screen to provide your answers.
                    Read and agree to our privacy policy and terms of use.
                    Attach a .pdf version of written or video submission of no
                    more than three minutes or 1500 words.
                  </li>
                </ul>
                <div className="text-center">
                  <Link to="/contest">
                    <button className="edit-btn py-2 px-4">
                      Participate in contest
                    </button>
                  </Link>
                </div>
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

export default ContestGuideline;
