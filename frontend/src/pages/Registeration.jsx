import React from "react";
import { toast } from "react-toastify";
import Header from "../components/Include/Header";
import Footer from "../components/Include/Footer";
import TopFooter from "../components/Include/TopFooter";
import RegistrationForm from "../components/Registration/RegistrationForm";
import { Card } from "react-bootstrap";
import Headertop from "../components/Include/Headertop";
import AuthService from "../services/AuthService";
import FormService from "../services/FormService";
import { Link, useNavigate } from "react-router-dom";

const Registeration = ({ quotes, promo1Data, promo2Data }) => {
  const [forms, setForms] = React.useState([]);
  const formservice = new FormService();
  const [formInput, setFormInput] = React.useState([]);
  const navigate = useNavigate();

  const validateEmail = (email) => {
    const re =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const testResult = re.test(String(email).toLowerCase());
    if (!testResult) {
      toast.error("Invalid Email", { theme: "colored" });
      return false;
    }
    return true;
  };

  const handleRegister = async () => {
    if (formInput.EmailAddress !== formInput.ConfirmEmail) {
      toast.error("Email and Confirm Email does not match", {
        theme: "colored",
      });
      return;
    }
    if (!validateEmail(formInput.EmailAddress)) {
      return;
    }

    if (formInput.Password !== formInput.ConfirmPassword) {
      toast.error("Password and Confirm Password does not match", {
        theme: "colored",
      });
      return;
    }

    try {
      const formInputArray = Object.entries(formInput).map(([key, value]) => ({
        key,
        value,
      }));

      const filteredArray = formInputArray.filter(
        (item) =>
          item.key !== "FirstName" &&
          item.key !== "LastName" &&
          item.key !== "EmailAddress" &&
          item.key !== "Password"
      );

      const response = await AuthService.register({
        email: formInput.EmailAddress,
        password: formInput.Password,
        firstName: formInput.FirstName,
        lastName: formInput.LastName,
        interestProfile: filteredArray,
      });
      if (response.status === 200) {
        toast.info(
          "Confirmation email has been sent to the email address above. To activate your account click on the link",
          {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            theme: "colored",
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          }
        );
        setFormInput({});
        setForms([]);
        // sent the user to login page
        navigate("/login");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getFormData = async () => {
    try {
      const response = await formservice.getForms();

      if (response.status === 200) {
        const dataIndexed = response.data
          .filter((item) => item.status)
          .reduce((acc, curr) => {
            acc[curr.order] = curr;
            return acc;
          }, {});

        const arrData = Object.values(dataIndexed);
        // add another field at index 6 in the arrData if data.length is greater than 5
        if (arrData.length > 6) {
          arrData.splice(6, 0, {
            order: 6,
            name: "Interests",
            type: "text",
            label: "Interests",
            placeholder: "",
            required: false,
            options: [],
            status: true,
          });
        }
        setForms(arrData);

        // setForms([...Object.values(dataIndexed)]);
      }
    } catch (error) {
      console.log(error);
      alert(error.message);
    }
  };

  React.useEffect(() => {
    getFormData();
  }, []);

  return (
    <div className=" container-fluid" style={{ backgroundColor: "#d89394" }}>
      <Headertop />
      <Header quotes={quotes} />
      <div className="container my-5">
        <div className="row d-flex align-items-center justify-content-center">
          <div className="col-md-10  ">
            <Card
              className="shadow-lg"
              text="secondary"
              style={{
                backgroundColor: "#ffe78d",
                border: "1px solid #e3e3e3",
                borderRadius: "10px",
                padding: "20px",
                marginTop: "20px",
              }}
            >
              <Card.Body>
                <div className="d-flex align-items-center justify-content-between mb-2">
                  <Link to="/login" className="edit-btn ">
                    Login
                  </Link>
                  <button className="edit-btn">Unsubscribe</button>
                </div>
                <RegistrationForm
                  formInput={formInput}
                  setFormInput={setFormInput}
                  forms={forms}
                  setForms={setForms}
                />
              </Card.Body>
            </Card>
          </div>
          <div className="d-flex align-items-center justify-content-center my-3">
            {/* // register button */}
            <button
              className="btn btn-danger"
              style={{
                borderRadius: "50px",
                padding: "10px",
                fontSize: "20px",
                fontWeight: "bold",
                width: "200px",
                backgroundColor: "#00008c",
                border: "1px solid #fff",
              }}
              onClick={handleRegister}
            >
              Submit Profile
            </button>

            <Link to="/login">
              <button
                className=" edit-btn mx-2"
                style={{
                  borderRadius: "50px",
                  padding: "10px",
                  fontSize: "20px",
                  fontWeight: "bold",
                  width: "200px",
                  backgroundColor: "teal",
                  border: "1px solid #fff",
                }}
              >
                Login
              </button>
            </Link>
          </div>
        </div>
      </div>
      <Footer />
      <TopFooter promo1Data={promo1Data} promo2Data={promo2Data} />
    </div>
  );
};

export default Registeration;
