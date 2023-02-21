import React from "react";
import Sidebar from "../Include/Sidebar";
import Header from "../Include/Header";
import FormService from "../../../services/FormService";
import Table from "./FormTable";
import CreateInput from "./CreateInput";
import Base from "./table/Base";

const Form = () => {
  const formService = new FormService();
  const [formData, setFormData] = React.useState([]);
  const [showForm, setShowForm] = React.useState(false);

  React.useEffect(() => {
    formService.getForms().then((res) => {
      // rename the _id to id
      const data = res.data.map((item) => ({
        ...item,
        id: item._id,
      }));

      // index the data by order of the form return the array of objects
      const dataIndexed = data.reduce((acc, curr) => {
        acc[curr.order] = curr;
        return acc;
      }, {});

      setFormData([...Object.values(dataIndexed)]);
    });
  }, [showForm]);

  return (
    <div className="row flex-nowrap">
      <Sidebar />
      <div className="col admin-header">
        <Header />

        <div className="my-2 mx-2 shadow card">
          <div className="py-3 px-3 admin-content-bg d-flex aign-items-center justify-content-between">
            <h4>Registration Form</h4>
            {!showForm ? (
              <button
                className="btn btn-danger"
                onClick={() => {
                  setShowForm(!showForm);
                }}
              >
                Add form input <i class="bi bi-plus-circle"></i>
              </button>
            ) : (
              <button
                className="btn btn-danger"
                onClick={() => {
                  setShowForm(false);
                }}
              >
                Go to Form Table
              </button>
            )}
          </div>
          {showForm ? (
            <CreateInput setShowForm={setShowForm} />
          ) : (
            <Base data={formData} setData={setFormData} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Form;
