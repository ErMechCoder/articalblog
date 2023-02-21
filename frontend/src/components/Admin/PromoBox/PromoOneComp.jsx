import React from "react";
import tshirt from "../../images/tshirt.png";
import { Button } from "react-bootstrap";
import { userRequest } from "../../../requestMethods";
import data from "./data.json";
import EditModal from "./EditModal";

const PromoOneComp = () => {
  const [show, setShow] = React.useState(false);
  const [promoData, setPromoData] = React.useState([]);
  const [updating, setUpdating] = React.useState(false);
  const [updateId, setUpdateId] = React.useState(null);

  // load the data from the server
  React.useEffect(() => {
    userRequest.get("/promotion_1/get").then((res) => {
      setPromoData(res.data);
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

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this item?"
    );
    if (confirmed) {
      await userRequest.delete(`/promotion_1/delete/${id}`).then((res) => {
        setPromoData(promoData.filter((item) => item._id !== id));
      });
    } else {
      return;
    }
  };

  return (
    <div className="my-2 mx-2 shadow">
      <div className="py-3 px-3 admin-content-bg d-flex justify-content-between">
        <h4>Promotional Area 1</h4>

        <Button
          variant="success"
          className="edit-btn"
          onClick={() => setShow(true)}
        >
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
            {promoData.length !== 0 ? (
              promoData.map((item, index) => (
                <tr key={item._id}>
                  <th scope="row">{index + 1}</th>
                  <td>
                    <img
                      className="footer__image"
                      src={item.imageFile}
                      alt="wornderofweird"
                    />
                  </td>
                  <td>{item.link}</td>
                  <td>{formateDate(item.updatedAt)}</td>
                  <td>
                    {/* <button className='btn mx-2 edit-btn' onClick={()=>handleEdit(item._id)}>Edit</button> */}
                    <button
                      className="btn mx-2 delete-btn"
                      onClick={() => handleDelete(item._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              // loading
              <tr>
                <td colSpan="5">Loading...</td>
              </tr>
            )}

            {/* <tr >
                        <th scope="row">4</th>
                        <td>{data.title}</td>
                        <td ><a href={data.link} target={'_blank'}>{data.link}</a> </td>
                        <td>{formateDate(data.updatedAt)}</td>
                        <td>
                        <button className='btn mx-2 delete-btn'>Delete</button></td>
                        </tr> */}
          </tbody>
        </table>
      </div>
      <EditModal
        show={show}
        setShow={setShow}
        promoData={promoData}
        setPromoData={setPromoData}
      />
    </div>
  );
};

export default PromoOneComp;
