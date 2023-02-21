import React, { useState, useEffect } from "react";
import { Modal, Form, Col, Row, InputGroup, Button } from "react-bootstrap";
import { userRequest } from "../../../requestMethods.js";
import { useDropzone } from "react-dropzone";
import Papa from "papaparse";
import sampleTxt from "../../images/sample_links.txt";
// import ReactSpinner from 'react-loader-spinner'

const baseStyle = {
  flex: 1,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: "40px",
  borderWidth: 2,
  borderRadius: 2,
  borderColor: "#c2d227",
  borderStyle: "dashed",
  backgroundColor: "#fafafa",
  color: "#bdbdbd",
  outline: "none",
  transition: "border .24s ease-in-out",
};

const EditModal2 = ({ show, setShow, promoData, setPromoData }) => {
  const [files, setFiles] = useState([]);
  const [txtFile, setTxtFile] = useState();
  const [baseImg, setBaseImg] = useState([]);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const { isFocused } = useDropzone({
    accept: "image/* ",
    onDrop: (acceptedFiles) => {
      setFiles(acceptedFiles);
    },
  });

  const convertBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        resolve(fileReader.result);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };

  const style = React.useMemo(
    () => ({
      ...baseStyle,
    }),
    [isFocused]
  );

  const thumbs = data.map((data, i) => (
    <div className="d-flex flex-wrap" key={i}>
      <div className="d-flex flex-column">
        <img src={data.img} width={"100px"} height={" 100px"} />
        <p>{data?.link?.toString().slice(0, 30)}...</p>
      </div>
    </div>
  ));

  useEffect(() => {
    // sort the by the name
    setFiles(files.sort((a, b) => a.name.localeCompare(b.name)));

    files.forEach((file) =>
      convertBase64(file).then((data) => {
        setBaseImg((prev) => [...prev, data]);
      })
    );
  }, [files]);

  useEffect(() => {
    const merged = baseImg.map((x, i) => ({ img: x, link: txtFile[i] }));
    setData(merged);
  }, [txtFile]);

  const imageDrop = (e) => {
    e.preventDefault();
    const files = e.dataTransfer.files[0];
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      if (file.type !== "image/png" && file.type !== "image/jpeg") {
        alert("Please upload only images");
        return;
      }

      setFiles((prev) => [...prev, file]);
    }
    // setFiles([...files])
  };

  const fileDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file.type !== "text/plain") {
      alert("file must be text file");
      return;
    }
    Papa.parse(file, {
      complete: function (results) {
        setTxtFile(results.data);
      },
    });
  };

  const handleReset = () => {
    setFiles([]);
    setTxtFile([]);
    setBaseImg([]);
    setData([]);
  };

  const handleSubmit = async () => {
    try {
      if (data.length === 0) {
        alert("Please upload images and links");
        return;
      }
      setLoading(true);
      data.length > 0 &&
        data.forEach(async (x, i) => {
          const res = await userRequest.post("/promotion_2/add", {
            imageFile: x.img,
            link: x.link.toString(),
          });
          if (res.status === 201) {
            console.log(res.data);
            setPromoData((prev) => [...prev, res.data]);
            setFiles([]);
            setTxtFile([]);
            setBaseImg([]);
            setData([]);
          }
        });
      setLoading(false);
      alert("Promotion added successfully");
      setShow(false);
    } catch (error) {
      alert(error.message);
      setLoading(false);
    }
  };

  return (
    <div>
      <Modal
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        show={show}
      >
        <Modal.Header closeButton onClick={() => setShow(false)}>
          <Modal.Title id="contained-modal-title-vcenter">
            <h4>Add Promotional area 2</h4>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="d-flex flex-column align-items-center justify-center">
          <a
            href={sampleTxt}
            download="sample_links.txt"
            target="_blank"
            className="btn btn-secondary mb-2"
          >
            {" "}
            Download sample .txt
          </a>
          <Row className="mb-3">
            <div className="container">
              <div style={baseStyle} onDrop={imageDrop}>
                <p className="text-success">Drag and drop Image files here</p>
              </div>
            </div>

            <div className="container mt-3">
              <div style={baseStyle} onDrop={fileDrop}>
                <p className="text-success">
                  Drag and drop Link file here{" "}
                  <strong>File must be in .txt format</strong>
                </p>
              </div>
            </div>
            <aside className="d-flex align-items-center justify-between mx-2 my-2 flex-wrap">
              {thumbs}
            </aside>
          </Row>
          <Row className="mb-3 d-flex align-items-center justify-content-center "></Row>
          {loading ? (
            <div className="d-flex justify-content-center">
              {/* <ReactSpinner
                type="ThreeDots"
                color="#00BFFF"
                height={100}
                width={100}
              /> */}
              <p>Loading....</p>
            </div>
          ) : (
            <div className="d-flex align-items-center justify-content-center">
              <Button
                type="submit"
                variant="success"
                className="col-6 mt-3"
                onClick={handleSubmit}
              >
                Submit{" "}
              </Button>
              <Button
                type="submit"
                variant="warning"
                className="col-6 mt-3 mx-2"
                onClick={handleReset}
              >
                reset{" "}
              </Button>
            </div>
          )}
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default EditModal2;
