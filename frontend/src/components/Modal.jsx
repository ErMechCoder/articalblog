import React from "react";
import "./css/modal.css";
import logo from "../components/images/logo.png";
import {
  PinterestShareButton,
  FacebookShareButton,
  LinkedinShareButton,
  TwitterShareButton,
} from "react-share";

const Modal = ({ imageToShow, setImageToShow }) => {
  const handleCloseModal = () => {
    setImageToShow(null);
    document.getElementById("myModal").style.display = "none";
  };

  // const printElement = (imageToPrint) => {
  //   const existingLayout = document.body.innerHTML;
  //   document.body.innerHTML = "";
  //   const newDiv = document.createElement("img");
  //   // add the new div to the page
  //   document.body.appendChild(newDiv);
  //   // set the new div's content to the image
  //   newDiv.setAttribute("src", imageToPrint);
  //   // give some styles to the new div
  //   // also set the image to the center of the page

  //   newDiv.style.width = "100%";
  //   newDiv.style.height = "100%";
  //   newDiv.style.position = "absolute";
  //   newDiv.style.marign = "auto";
  //   newDiv.style.top = "0";
  //   newDiv.style.left = "0";
  //   newDiv.style.zIndex = "9999";
  //   newDiv.style.backgroundColor = "white";
  //   newDiv.style.border = "1px solid black";
  //   newDiv.style.padding = "10px";
  //   newDiv.style.boxShadow = "0px 0px 10px black";
  //   newDiv.style.borderRadius = "5px";
  //   newDiv.style.cursor = "pointer";
  //   newDiv.style.display = "block";
  //   newDiv.style.margin = "auto";
  //   newDiv.style.objectFit = "contain";
  //   window.print();
  //   document.body.removeChild(newDiv);
  //   document.body.innerHTML = existingLayout;

  //   window.location.reload();

  //   window.onbeforeprint = function () {
  //     document.getElementById("myModal").style.display = "none";
  //     window.location.reload();
  //   };
  // };

  const printElement = (imageToPrintURL) => {
    const imageWindow = window.open("", "", "width=800,height=600");
    //   // print the image
    imageWindow.document.write(
      `<div style="display:flex; align-items:center;justify-content:center; width:100%;height:95%;border:1px solid black">
        <img src="${imageToPrintURL}" style="width:95%;height:100%;object-fit:contain"/>
        </div>`
    );
    imageWindow.document.close();
    imageWindow.focus();
    imageWindow.print();
    setTimeout(() => {
      imageWindow.close();
    }, 5000);

    // open new tab and isert image and print it
    // const newWindow = window.open(imageToPrintURL, "_blank");
    // newWindow.document.write(
    //   `<div style="display:flex; align-items:center;justify-content:center; width:100%;height:95%;border:1px solid black">
    // <img src="${imageToPrintURL}" style="width:95%;height:100%;object-fit:contain"/>
    // </div>`
    // );
    // newWindow.document.close();
    // newWindow.focus();
    // newWindow.print();
  };

  return (
    <div>
      <div
        id="myModal"
        class="printModal"
        style={{ display: `${imageToShow ? "block" : "none"}` }}
      >
        <span
          class="d-flex align-items-center justify-content-center "
          onClick={handleCloseModal}
          style={{
            position: "absolute",
            left: "5px",
            top: "-15px",
            cursor: "pointer",
          }}
        >
          <i
            class="bi bi-x-square-fill "
            style={{ fontWeight: "bold", fontSize: "50px", color: "black" }}
          ></i>
        </span>
        <div
          className="d-flex align-items-start justify-content-between"
          style={{ width: "100vw" }}
        >
          <img
            class="myModal-content "
            id="toPrint"
            src={imageToShow}
            style={{ objectFit: "contain", height: "80vh", width: "100vw" }}
          />
          <div className="d-flex align-items-center justify-content-cetner flex-column socialIcon ">
            <PinterestShareButton url={imageToShow} media={imageToShow}>
              <span className="icon">
                <i class="fa fa-pinterest my-2"></i>
              </span>
            </PinterestShareButton>
            <FacebookShareButton url={imageToShow}>
              <span className="icon">
                <i class="fa fa-facebook my-2"></i>
              </span>
            </FacebookShareButton>
            <TwitterShareButton url={imageToShow}>
              <span className="icon">
                <i class="fa fa-twitter my-2"></i>
              </span>
            </TwitterShareButton>
            <LinkedinShareButton url={imageToShow}>
              <span className="icon">
                <i class="fa fa-linkedin my-2"></i>
              </span>
            </LinkedinShareButton>

            <span className="icon">
              <i class="fa fa-instagram my-2"></i>
            </span>
          </div>
        </div>

        <div className="caption">
          <img src={logo} alt="logo" style={{ height: "80px" }} />
          <button
            className="btn print-btn"
            id="print-button"
            onClick={() => {
              printElement(imageToShow);
            }}
          >
            {" "}
            Print this Image
          </button>

          <a
            href="https://wow.ekanatechnologies.in/"
            className="print-cr"
            target="_blank"
          >
            {" "}
            ©www.wonderofweird.com
          </a>
        </div>
      </div>
    </div>
  );
};

export default Modal;
