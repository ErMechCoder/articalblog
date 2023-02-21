import React from "react";
import t11 from "../../images/11.jpg";
import t22 from "../../images/22.jpg";
import t33 from "../../images/33.jpg";
import { Button, Modal, Form, Col, InputGroup, Row } from "react-bootstrap";
import { userRequest } from "../../../requestMethods";
import { useState } from "react";
import EditModal2 from "./EditModal2";

const PromoOneComp = () => {
  const [show, setShow] = React.useState(false);
  const [promoData, setPromoData] = useState([]);

  React.useEffect(() => {
    fetch("http://localhost:5000/promotion_2/get")
      .then((res) => res.json())
      .then((data) => {
        setPromoData(data);
      });
  }, []);

  const formateDate = (date) => {
    const newDate = new Date(date);
    const form = newDate.toLocaleDateString();
    const formate = form.split("/");
    if (formate[0].length === 1) {
      formate[0] = "0" + formate[0];
    }
    if (formate[1].length === 1) {
      formate[1] = "0" + formate[1];
    }
    const formateDate = formate[0] + "-" + formate[1] + "-" + formate[2];
    return `${formateDate}`;
  };

  const handleAddClick = () => {
    setShow(true);
  };
  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this item?"
    );
    try {
      if (confirmed) {
        const res = await userRequest.delete(`/promotion_2/delete/${id}`);

        res.status === 200 &&
          setPromoData(promoData.filter((item) => item._id !== id));
      }
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="my-2 mx-2 shadow">
      <div className="py-3 px-3 admin-content-bg d-flex justify-content-between">
        <h4>Promotional Area 2</h4>

        <Button variant="success" className="edit-btn" onClick={handleAddClick}>
          Add <i class="bi bi-file-earmark-plus"></i>
        </Button>
      </div>
      <div>
        <table class="table table-bordered table-hover">
          <thead>
            <tr>
              <th scope="col">S.No</th>
              <th scope="col">Image</th>
              <th scope="col">Link</th>
              <th scope="col">Last Update</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {promoData.map((item, index) => (
              <tr key={item._id}>
                <th scope="row">{index + 1}</th>
                <td>
                  <img
                    className="footer__image"
                    src={item.imageFile}
                    alt="wornderofweird"
                    width={90}
                  />
                </td>
                <td>{item.link}</td>
                <td>{formateDate(item.updatedAt)}</td>
                <td>
                  {/* <button className='btn mx-2 edit-btn' onClick={()=>handleEditClick(item._id)}>Edit</button> */}
                  <button
                    className="btn mx-2 delete-btn"
                    onClick={() => handleDelete(item._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}

            {/* <th scope="row">Text Area</th>
                        <td>Explore over 150 unique t-shirt designs - click here</td>
                        <td>https://weirdisgood.com</td>
                        <td>21-Dec-2021 10:25:46</td>
                        <td><button className='btn mx-2 edit-btn'>Edit</button><button className='btn mx-2 delete-btn'>Delete</button></td> */}
          </tbody>
        </table>
      </div>
      <EditModal2
        show={show}
        setShow={setShow}
        promoData={promoData}
        setPromoData={setPromoData}
      />
    </div>
  );
};

export default PromoOneComp;
