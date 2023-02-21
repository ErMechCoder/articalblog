import React from "react";
import { toast } from "react-toastify";
import "./multiStepForm.css";

const MultiStepForm = ({ setShowForget }) => {
  const [currentStep, setCurrentStep] = React.useState(1);
  const [formInputs, setFormInputs] = React.useState({
    email: "",
    phone: "",
  });

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

  const validatePhone = (phone) => {
    const re = /^[0-9]{10}$/;
    const testResult = re.test(String(phone));
    if (!testResult) {
      toast.error("Invalid Phone Number", { theme: "colored" });
      return false;
    }
    return true;
  };

  const handleChange = (e) => {
    setFormInputs({ ...formInputs, [e.target.name]: e.target.value });
  };

  return (
    <div
      className="form__container d-flex align-items-center justify-content-center"
      style={{ width: "100vw", height: "100vh" }}
    >
      <div class="row">
        <div class="col-md-12 col-md-offset-3">
          <form id="msform">
            <ul id="progressbar">
              <li class={`${currentStep === 1 && " active"}`}>
                Account Infomation
              </li>
              <li class={`${currentStep === 2 && " active"}`}>
                OTP Information
              </li>
              <li class={`${currentStep === 3 && " active"}`}>
                Reset Password
              </li>
            </ul>
            <fieldset style={{ display: currentStep === 1 ? "block" : "none" }}>
              <h2 class="fs-title">Personal Details</h2>
              <h3 class="fs-subtitle">Please Enter your Registered Email Id</h3>
              <input
                type="email"
                required
                placeholder="Email Address"
                name="email"
                onChange={handleChange}
              />
              <input
                type="text"
                placeholder="Enter your phone number"
                name="phone"
                onChange={handleChange}
              />
              {/* <input type="text" name="phone" placeholder="Phone" /> */}
              <button
                type="button"
                className="next action-button"
                onClick={() => {
                  if (
                    validateEmail(formInputs.email) &&
                    validatePhone(formInputs.phone)
                  ) {
                    setCurrentStep(currentStep + 1);
                  }
                }}
              >
                Send OTP
              </button>
            </fieldset>

            <div style={{ display: currentStep === 2 ? "block" : "none" }}>
              <div className="success-body d-flex align-items-center justify-content-center">
                <div className="success-card">
                  <div
                    style={{
                      borderRadius: "200px",
                      height: "200px",
                      width: "200px",
                      background: "#F8FAF5",
                      margin: "0 auto",
                    }}
                  >
                    <i class="suceess-checkmark">✓</i>
                  </div>
                  <h5 className="success-heading">Link Sent Success</h5>
                  <p className="success-paragraph">
                    Please check your Message <br /> Box for reset password
                    link.
                  </p>
                </div>
                {/* <p>You will be redirected in:</p>
                <h1 className="countdown">{2}</h1> */}
              </div>
              {/* <input type="text" name="email" placeholder="Email" />
              <input type="password" name="pass" placeholder="Password" />
              <input
                type="password"
                name="cpass"
                placeholder="Confirm Password"
              /> */}
              {/* <button
                type="button"
                class="previous action-button-previous"
                onClick={() => setCurrentStep(1)}
              >
                Previous
              </button> */}
              <button
                type="button"
                class="submit action-button"
                onClick={() => {
                  if (
                    validateEmail(formInputs.email) &&
                    validatePhone(formInputs.phone)
                  ) {
                    setCurrentStep(currentStep + 1);
                  }
                }}
              >
                ok
              </button>
            </div>

            <fieldset style={{ display: currentStep === 3 ? "block" : "none" }}>
              <h2 class="fs-title">Reset Password</h2>
              <h3 class="fs-subtitle">Please Enter your new password</h3>

              <input
                type="text"
                placeholder="Enter your OTP , you received on your Phone."
              />
              <input
                type="password"
                name="mobile"
                placeholder="Enter your new password"
              />
              <input type="password" placeholder="Confirm your new password" />
              <button
                class="previous action-button-previous"
                type="button"
                onClick={() => {
                  setCurrentStep(currentStep - 1);
                }}
              >
                Previous
              </button>
              <button
                class="next action-button"
                type="button"
                onClick={() => {
                  if (
                    formInputs.mobile !== formInputs.confirmMobile ||
                    formInputs.mobile === ""
                  ) {
                    toast.error("Mobile Number does not match", {
                      theme: "colored",
                    });
                    return;
                  }
                  setTimeout(() => {
                    setCurrentStep(currentStep + 1);
                  }, 2000);
                }}
              >
                Submit
              </button>
            </fieldset>
          </form>
          <div class="dme_link">
            <p>
              <a href="/login">Back to Login</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MultiStepForm;
