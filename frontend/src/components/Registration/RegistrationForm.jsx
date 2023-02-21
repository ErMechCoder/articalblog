import React from "react";
import { Form, FloatingLabel, Row, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import Select from "react-select";
import Preview from "./Preview";

const RegistrationForm = ({ formInput, setFormInput, forms, setForms }) => {
  // const [show, setShow] = React.useState(true);
  const [showPreview, setShowPreview] = React.useState(false);
  const [showWhyThisTopic, setShowWhyThisTopic] = React.useState(false);
  const [showFormSelect, setShowFormSelect] = React.useState([]);
  const [errors, setErrors] = React.useState({
    EmailAddress: "",
    ConfirmEmail: "",
  });

  const handleChange = (e) => {
    setFormInput({
      ...formInput,
      [e.target.name]: e.target.value,
    });
  };

  const indicatorSeparatorStyle = {
    alignSelf: "stretch",
    backgroundColor: "#fff",
    marginBottom: 8,
    marginTop: 8,
    width: 1,
  };

  const IndicatorSeparator = ({ innerProps }) => {
    return <span style={indicatorSeparatorStyle} {...innerProps} />;
  };

  React.useEffect(() => {
    forms.length > 1 &&
      forms.map((data) => {
        if (data.options.length > 0) {
          data.options.push({
            label: "Add other (specify)",
            icon: "https://cdn-icons-png.flaticon.com/128/2921/2921226.png",
          });
        }
      });
  }, [forms]);

  /// create dynamic array of objects in state based on forms data  to map the form input
  React.useEffect(() => {
    setFormInput(
      forms.reduce((acc, item) => {
        acc[item?.label?.replace(/\s/g, "")] = "";
        return acc;
      }, {})
    );
    setShowFormSelect(
      forms
        .filter((item) => item.type === "checkbox")
        .reduce((acc, item) => {
          acc[item.label.replace(/\s/g, "")] = false;
          return acc;
        }, {})
    );
  }, [forms]);

  return (
    <div>
      <Preview showPreview={showPreview} setShowPreview={setShowPreview} />
      <div className="d-flex align-items-center justify-content-center">
        <p
          className="text-center text-white py-2 px-5 "
          style={{
            width: "80%",
            borderRadius: "7px",
            fontFamily: "Roboto, sans-serif",
            backgroundColor: "#70a3d2",
            border: "2px solid whitesmoke",
            color: "whitesmoke",
            cursor: "pointer",
            boxShadow: "0px 0px 10px #00008c",
          }}
        >
          Wonder of Weird Site Registration
        </p>
      </div>

      {/* Dynamic for Testing from backend */}
      {
        <Row className="g-4">
          {forms.map((form, index) => {
            if (index === 6) {
              return (
                <div
                  className="d-flex align-items-center justify-content-center my-4"
                  key={index}
                >
                  <p
                    className="text-center text-white py-2 px-5  "
                    style={{
                      width: "80%",
                      borderRadius: "7px",
                      fontFamily: "Roboto, sans-serif",
                      backgroundColor: "#70a3d2",
                      border: "1px solid whitesmoke",
                      color: "whitesmoke",
                      cursor: "pointer",
                      boxShadow: "0px 0px 10px #00008c",
                    }}
                  >
                    Wonder of Weird Interest Profile
                  </p>
                </div>
              );
            }
            if (form.type === "time") {
              return (
                <Col md={6} key={index}>
                  <Row>
                    <Col md={12}>
                      <p
                        className="  text-black text-bold"
                        style={{ marginBottom: "2px" }}
                      >
                        {form.label}
                      </p>
                    </Col>
                    <Col md={12}>
                      <FloatingLabel
                        controlId="floatingInputGrid"
                        label={form.placeHolder}
                      >
                        <Form.Control
                          type={form.type}
                          // placeholder={form.placeholder}
                          name={form.label.replace(/\s/g, "")}
                          onChange={handleChange}
                        />
                      </FloatingLabel>
                    </Col>
                    {form.hasButton && (
                      <Col md={12} className="py-1">
                        <button
                          className="btn btn-info btn-sm btn-clipboard"
                          style={{
                            backgroundColor: "skyblue",
                          }}
                        >
                          See How I Compare to Peers
                        </button>
                      </Col>
                    )}
                  </Row>
                </Col>
              );
            }

            if (
              form.type === "email" ||
              form.type === "password" ||
              form.type === "text"
            ) {
              return (
                <Col md={4} key={index}>
                  <Row>
                    <Col md={12}>
                      <p
                        className="  text-black text-bold"
                        style={{ marginBottom: "2px" }}
                      >
                        {form.label}
                      </p>
                    </Col>
                    <Col md={12}>
                      <FloatingLabel
                        controlId="floatingInputGrid"
                        label={form.placeHolder}
                      >
                        <Form.Control
                          type={form.type}
                          name={form.label.replace(/\s/g, "")}
                          onChange={handleChange}
                          isInvalid={errors[form.label.replace(/\s/g, "")]}
                          onBlur={() => {
                            if (form.type === "text" && form.required) {
                              if (
                                formInput[form.label.replace(/\s/g, "")] === ""
                              ) {
                                setErrors({
                                  ...errors,
                                  [form.label.replace(/\s/g, "")]:
                                    "This field is required",
                                });
                              }
                            }

                            if (
                              form.label.replace(/\s/g, "") === "EmailAddress"
                            ) {
                              const re =
                                /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                              if (!re.test(formInput.EmailAddress)) {
                                setErrors({
                                  ...errors,
                                  EmailAddress: "Invalid Email Address",
                                });
                              }
                            }

                            if (form.label.replace(/\s/g, "") === "Password") {
                              if (formInput.Password.length < 6) {
                                setErrors({
                                  ...errors,
                                  Password:
                                    "Password must be at least 8 characters",
                                });
                              }
                            }
                            if (
                              form.label.replace(/\s/g, "") ===
                              "ConfirmPassword"
                            ) {
                              if (
                                formInput.Password !== formInput.ConfirmPassword
                              ) {
                                setErrors({
                                  ...errors,
                                  ConfirmPassword: "Password does not match",
                                });
                              }
                            }

                            if (
                              form.label.replace(/\s/g, "") === "ConfirmEmail"
                            ) {
                              if (
                                formInput.EmailAddress !==
                                formInput.ConfirmEmail
                              ) {
                                setErrors({
                                  ...errors,
                                  ConfirmEmail: "Email does not match",
                                });
                              }
                            }
                          }}
                        />
                        <Form.Control.Feedback type="invalid" tooltip>
                          {errors[form.label.replace(/\s/g, "")]}
                        </Form.Control.Feedback>
                      </FloatingLabel>
                      {form.required && (
                        <small className="text-danger">* Required</small>
                      )}
                    </Col>
                    {form.hasButton && (
                      <Col md={12} className="py-1">
                        <button
                          className="btn btn-info btn-sm btn-clipboard"
                          style={{
                            backgroundColor: "skyblue",
                          }}
                        >
                          See How I Compare to Peers
                        </button>
                      </Col>
                    )}
                  </Row>
                </Col>
              );
            } else if (form.type === "select")
              return (
                <Col md={4}>
                  <Row>
                    <Col md={12}>
                      <p
                        className="  text-black text-bold"
                        style={{ marginBottom: "2px" }}
                      >
                        {form.label}
                      </p>
                    </Col>
                    <Col md={12}>
                      {showFormSelect[form.label.replace(/\s/g, "")] ? (
                        <FloatingLabel
                          controlId="floatingTextarea2"
                          label="Please specify here... "
                        >
                          <Form.Control
                            as="textarea"
                            style={{ height: "100px" }}
                            onChange={(e) => {
                              const value = e.target.value;
                              setFormInput({
                                ...formInput,
                                [form.label.replace(/\s/g, "")]:
                                  value[value.length - 1] === ","
                                    ? value.slice(0, value.length - 1)
                                    : value,
                              });
                            }}
                          />
                        </FloatingLabel>
                      ) : (
                        <Select
                          isMulti={form.isMultiSelect}
                          components={{ IndicatorSeparator }}
                          placeholder={
                            form.isMultiSelect
                              ? "(Select one or more)"
                              : "Select one"
                          }
                          options={form.options.map((option) => {
                            return {
                              label: option.label,
                              value: option.label,
                              icon: option.icon,
                            };
                          })}
                          getOptionLabel={(e) => (
                            <div
                              style={{ display: "flex", alignItems: "center" }}
                            >
                              {e.icon && (
                                <img
                                  src={e.icon}
                                  alt="icon"
                                  style={{
                                    width: "30px",
                                    height: "30px",
                                    marginRight: "10px",
                                    objectFit: "cover",
                                  }}
                                />
                              )}
                              <span style={{ marginLeft: 5 }}>{e.label}</span>
                            </div>
                          )}
                          onChange={(arrayOfValues) => {
                            if (form.isMultiSelect) {
                              const values = arrayOfValues.map(
                                (value) => value.value
                              );
                              if (values.includes("Add other (specify)")) {
                                setShowFormSelect({
                                  ...showFormSelect,
                                  [form.label.replace(/\s/g, "")]: true,
                                });
                              } else {
                                setFormInput({
                                  ...formInput,
                                  [form.label.replace(/\s/g, "")]: values,
                                });
                              }
                            } else {
                              if (
                                arrayOfValues.value === "Add other (specify)"
                              ) {
                                setShowFormSelect({
                                  ...showFormSelect,
                                  [form.label.replace(/\s/g, "")]: true,
                                });
                              } else {
                                setFormInput({
                                  ...formInput,
                                  [form.label.replace(/\s/g, "")]:
                                    arrayOfValues.value,
                                });
                              }
                            }
                          }}
                          isSearchable={true}
                          isClearable={true}
                          styles={{
                            control: (provided) => ({
                              ...provided,
                              border: "none",
                              boxShadow: "none",
                              // height: "55px",
                              padding: "10px",
                              "&:hover": {
                                border: "none",
                                boxShadow: "none",
                              },
                            }),
                            menu: (provided) => ({
                              ...provided,
                              border: "none",
                              boxShadow: "none",
                              backgroundColor: "#dc3545",
                              color: "black",
                              "&:hover": {
                                border: "none",
                                boxShadow: "none",
                              },
                            }),
                            menuList: (provided) => ({
                              ...provided,
                              border: "none",
                              boxShadow: "none",
                              "&:hover": {
                                border: "none",
                                boxShadow: "none",
                              },
                            }),
                          }}
                        />
                      )}
                    </Col>
                    {form.hasButton && (
                      <Col md={12} className="py-1">
                        <button
                          className="btn btn-info btn-sm btn-clipboard"
                          style={{
                            backgroundColor: "skyblue",
                          }}
                        >
                          See How I Compare to Peers
                        </button>
                      </Col>
                    )}
                  </Row>
                </Col>
              );

            if (form.type === "textarea")
              return (
                <Col md={4}>
                  <Row>
                    <Col md={12}>
                      <p
                        className="  text-black text-bold"
                        style={{ marginBottom: "2px" }}
                      >
                        {form.label}
                      </p>
                    </Col>
                    <Col md={12}>
                      <Form.Control
                        as="textarea"
                        placeholder={form.placeHolder}
                        rows="3"
                        name={form.label}
                        onChange={handleChange}
                      />
                    </Col>
                  </Row>
                </Col>
              );
          })}
        </Row>
      }

      {/* custom options */}

      {formInput.HaveWeirdTopics === "Yes" && (
        <Row className="g-4 my-2">
          {formInput.haveWeirdTopics === "Yes" && (
            <Col md={6}>
              <FloatingLabel
                controlId="floatingInputGrid"
                label="What is the topic name?"
              >
                <Form.Control
                  type="text"
                  placeholder="name@example.com"
                  name="topicName"
                  value={formInput.topicName}
                  onChange={(e) => {
                    setFormInput({ ...formInput, topicName: e.target.value });
                  }}
                />
              </FloatingLabel>
            </Col>
          )}
          {showWhyThisTopic ? (
            <Col md={6}>
              <FloatingLabel
                controlId="floatingTextarea2"
                label="Why This topic? please specify here..."
              >
                <Form.Control
                  as="textarea"
                  placeholder="Leave a comment here"
                  style={{ height: "100px" }}
                />
              </FloatingLabel>
            </Col>
          ) : (
            <Col md={6}>
              <Select
                closeMenuOnSelect={true}
                getOptionLabel={(e) => (
                  <div style={{ display: "flex", alignItems: "center" }}>
                    {e.icon && (
                      <img
                        src={e.icon}
                        alt={e.label}
                        style={{
                          width: "30px",
                          height: "30px",
                          marginRight: "10px",
                          objectFit: "cover",
                          borderRadius: "50%",
                        }}
                      />
                    )}
                    <span style={{ marginLeft: 5 }}>{e.label}</span>
                  </div>
                )}
                components={{ IndicatorSeparator }}
                options={[
                  { label: "Relate to Topic", value: "Relate to Topic" },
                  { label: "Facination", value: "Facination" },
                  { label: "Obsessive About It", value: "Obsessive About It" },
                  {
                    label: "Want to Understand It Better",
                    value: "Want to Understand It Better",
                  },
                  {
                    label: "Topic Importance",
                    value: "Topic Importance",
                  },
                  {
                    label: "Lack of Coverage Elsewhere",
                    value: "Lack of Coverage Elsewhere",
                  },
                  {
                    label: "Prefer Not to Answer",
                    value: "Prefer Not to Answer",
                  },
                  {
                    label: "Add other (specify)",
                    value: "Add",
                    icon: "https://image.shutterstock.com/image-vector/add-icon-260nw-571594759.jpg",
                  },
                ]}
                onChange={(value) => {
                  if (value.value === "Add") {
                    setShowWhyThisTopic(true);
                  } else {
                    setFormInput({
                      ...formInput,
                      whyThisTopic: value.value,
                    });
                  }
                }}
                placeholder="Why This topic?"
                styles={{
                  control: (provided) => ({
                    ...provided,
                    border: "none",
                    boxShadow: "none",

                    // height: "55px",
                    padding: "10px",
                    "&:hover": {
                      border: "none",
                      boxShadow: "none",
                    },
                  }),
                  menu: (provided) => ({
                    ...provided,
                    border: "none",
                    boxShadow: "none",
                    backgroundColor: "#dc3545",
                    color: "black",

                    "&:hover": {
                      border: "none",
                      boxShadow: "none",
                    },
                  }),
                  menuList: (provided) => ({
                    ...provided,
                    border: "none",
                    boxShadow: "none",
                    "&:hover": {
                      border: "none",
                      boxShadow: "none",
                    },
                  }),
                }}
              />
            </Col>
          )}
        </Row>
      )}
      {/* terms and conditions */}
      <Row className="g-4 my-2 d-flex  align-items-center justify-content-center">
        <Col md={12} className="text-center">
          <Link to="/terms">
            <Button variant="link">
              <i className="fa fa-info-circle" aria-hidden="true"></i> Terms
            </Button>
          </Link>

          <Link to="/conditions">
            <Button variant="link">
              <i className="fa fa-info-circle" aria-hidden="true"></i>{" "}
              Conditions
            </Button>
          </Link>
        </Col>
        <Col
          md={12}
          className="d-flex  justify-content-center align-items-center"
        >
          <Form.Check
            type="checkbox"
            label="I agree to the terms and conditions"
            required
            // checked={formInput.agreeToTerms}
            onChange={(e) =>
              setFormInput({
                ...formInput,
                agreeToTerms: e.target.checked,
              })
            }
          />
        </Col>
      </Row>
    </div>
  );
};

export default RegistrationForm;
