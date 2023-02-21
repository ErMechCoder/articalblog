import React from "react";
import logo from "../components/images/logo.png";

const ComingSoon = () => {
  var body = document.body;

  body.classList.add("body_class");

  const myStyle = {
    margin: "100px",
    padding: "50px",
  };
  return (
    <div
      className="come_soon d-flex align-item-center justify-content-center"
      style={myStyle}
    >
      <div className="container-come ">
        <img src={logo} width="100%" />
        <br />
        <h1 className="text-center" style={{ margin: "30px", padding: "15px" }}>
          {" "}
          Coming Soon
        </h1>
      </div>
    </div>
  );
};
export default ComingSoon;
