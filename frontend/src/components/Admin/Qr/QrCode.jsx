import React from "react";
import "../css/Admin.css";
import Header from "../Include/Header";
import Sidebar from "../Include/Sidebar";
import { useEffect, useState } from "react";

export default function Qrocode() {
  const [temp, setTemp] = useState("");
  const [word, setWord] = useState("");
  const [size, setSize] = useState(400);
  const [bgColor, setBgColor] = useState("ffffff");
  const [qrCode, setQrCode] = useState("");

  // Changing the URL only when the user
  // changes the input
  useEffect(() => {
    setQrCode(
      `http://api.qrserver.com/v1/create-qr-code/?data=${word}&size=${size}x${size}&bgcolor=${bgColor}`
    );
  }, [word, size, bgColor]);

  // Updating the input word when user
  // click on the generate button
  function handleClick() {
    setWord(temp);
  }
  return (
    <div>
      <div className="row flex-nowrap">
        <Sidebar />
        <div className="col admin-header">
          <Header />
          <div className="App">
            <h1>QR Code Generator</h1>
            <div className="input-box">
              <div className="gen">
                <input
                  type="text"
                  className="form-control"
                  onChange={(e) => {
                    setTemp(e.target.value);
                  }}
                  placeholder="Enter URL here"
                  min="200"
                />
                <br />
                <button
                  className="button buttonBlue"
                  style={{ fontFamily: "Sans-serif" }}
                  onClick={handleClick}
                >
                  Generate
                </button>
              </div>

              {/* <div className="extra">
                                <h5>Background Color:</h5>
                                <input type="color" onChange={(e) => { setBgColor(e.target.value.substring(1)) }} />
                                <h5>Dimension:</h5>
                                <input type="range" min="200" max="600"
                                    value={size} onChange={(e) => { setSize(e.target.value) }} />
                            </div> */}
            </div>
            <div className="output-box">
              <img src={qrCode} alt="" />
              <a href={qrCode} download="QR Code">
                <button className="btn buttonBlue" type="button">
                  Download
                </button>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
