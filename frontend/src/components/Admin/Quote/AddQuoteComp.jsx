import React, { useState, useMemo } from "react";
import "../css/Admin.css";
import { userRequest } from "../../../requestMethods";
import { Alert } from "react-bootstrap";
import Papa from "papaparse";
import axios from "axios";
// import ReactLoader from 'react-loader-spinner'
import { Link } from "react-router-dom";
import csvSample from "../../images/quote-format.csv";

const AddQuoteComp = ({ quotes, setQuotes }) => {
  const [quoteData, setQuoteData] = useState([]);
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      quoteData.forEach(async (quote) => {
        setLoading(true);
        const res = await userRequest.post("/quote/add", {
          writer: quote.Author,
          quote: quote.Quote,
        });
        if (res.status === 201) {
          setLoading(false);
          quotes.push(res.data);
          setQuoteData([]);
          setLoading(false);
          setShow(true);
          setQuoteData([]);
        }
      });
    } catch (error) {
      alert(error.message);
      setLoading(false);
    }
  };
  const handleFile = (e) => {
    const file = e.target.files[0];
    if (file.type === "application/vnd.ms-excel" || file.type === "text/csv") {
      Papa.parse(file, {
        header: true,
        complete: (results) => {
          setQuoteData(results.data.slice(0, -1));
        },
      });
    } else {
      alert("Please upload a valid csv file");
    }
  };

  if (show)
    return (
      <div className=" mt-2 mx-3">
        <Alert variant="success" onClose={() => setShow(false)} dismissible>
          <Alert.Heading> Success! Quote added Successfully </Alert.Heading>
          <p>
            Quote has been added in the system. Please click{" "}
            <Alert.Link>
              <Link to="/admin/quote">here </Link>
            </Alert.Link>{" "}
            to see the quotes.
          </p>
        </Alert>
      </div>
    );

  return (
    <div className="my-2 mx-2 shadow">
      <div className="py-3 px-3 admin-content-bg d-flex aign-items-center justify-content-between">
        <h4>Add Quote</h4>
        <a href={csvSample} className="btn d-flex flex-column">
          {" "}
          <i class="fas fa-download">
            {" "}
            <p>Download Sample CSV </p>
          </i>
        </a>
      </div>
      <div className="px-5 py-5">
        {loading ? (
          //   <ReactLoader
          //     type="Oval"
          //     color="#00BFFF"
          //     height={100}
          //     width={100}
          //     className="text-center"
          //   />

          <p>Loading...</p>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <h4 className="mb-3">Select Quote File:</h4>
              <input
                className="form-control"
                id="quote"
                type="file"
                accept=".csv, application/vnd.ms-excel"
                onChange={handleFile}
              />
            </div>
          </form>
        )}

        <table class="table table-bordered mt-5">
          <thead>
            <tr>
              <th scope="col">S.No</th>
              <th scope="col">Quote</th>
              <th scope="col">Author</th>
            </tr>
          </thead>
          <tbody>
            {quoteData.map((quote, index) => (
              <tr key={index}>
                <th scope="row">{index + 1}</th>
                <td>{quote.Quote}</td>
                <td>{quote.Author}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {quoteData.length > 0 ? (
          <div>
            <button
              className="btn mx-2 edit-btn"
              onClick={() => setQuoteData([])}
            >
              Clear
            </button>
            <button className="btn mx-2 edit-btn  " onClick={handleSubmit}>
              {" "}
              Save
            </button>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default AddQuoteComp;
