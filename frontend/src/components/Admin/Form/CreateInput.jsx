import React from "react";
import { Card, Row, Col, Container, Form, Button } from "react-bootstrap";
import FormService from "../../../services/FormService";

const CreateInput = ({ setShowForm }) => {
  const [inputs, setInputs] = React.useState({
    label: "",
    type: "",
    isMultiSelect: false,
    required: false,
    hasButton: false,
    placeHolder: "",
    required: false,
    options: [],
  });
  const [numberOfOptions, setNumberOfOptions] = React.useState(0);
  const [options, setOptions] = React.useState([]);
  const formService = new FormService();

  const covertBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        resolve(reader.result);
      };
      reader.onerror = (error) => {
        reject(error);
      };
    });
  };

  const handleSubmit = async () => {
    try {
      const res = await formService.createForm({
        ...inputs,
        options: options,
      });

      res.status === 201 && setShowForm(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container fluid>
      <Row>
        <Col md="9">
          <Card>
            <Card.Header>
              <Card.Title as="h4">Add input Field</Card.Title>
            </Card.Header>
            <Card.Body>
              <Form>
                <Row>
                  <Col className="pr-1" md="6">
                    <Form.Group>
                      <Form.Label>Input Label</Form.Label>
                      <Form.Control
                        value={inputs.label}
                        placeholder="Type here..."
                        type="text"
                        onChange={(e) => {
                          setInputs({
                            ...inputs,
                            label: e.target.value,
                          });
                        }}
                      ></Form.Control>
                    </Form.Group>
                  </Col>
                  <Col className="px-1" md="6">
                    <Form.Group>
                      <Form.Label>Input Type</Form.Label>
                      <Form.Select
                        aria-label="Default select example"
                        onChange={(e) => {
                          setInputs({
                            ...inputs,
                            type: e.target.value,
                          });
                        }}
                      >
                        <option>Open this select menu</option>
                        <option value="select">Select</option>
                        <option value="text">Text</option>
                        <option value="email">Email</option>
                        <option value="password">Password</option>
                        <option value="textarea">Textarea</option>
                        {/* <option value="checkbox">Checkbox</option> */}
                        {/* <option value="radio">Radio</option> */}
                        {/* <option value="file">File</option> */}
                      </Form.Select>
                    </Form.Group>
                  </Col>
                </Row>
                <Row className="my-4">
                  {inputs.type === "select" ? (
                    <Col className="pl-1" md="6">
                      <Form.Group>
                        {/* <label>is Multiple Select?</label> */}
                        <Form.Label>is Multiple Select?</Form.Label>
                        <Form.Select
                          aria-label="Default select example"
                          onChange={(e) => {
                            setInputs({
                              ...inputs,
                              isMultiSelect: e.target.value,
                            });
                          }}
                        >
                          <option>Open this select menu</option>
                          <option value="true">Yes</option>
                          <option value="false">No</option>
                        </Form.Select>
                      </Form.Group>
                    </Col>
                  ) : (
                    <Col className="pr-1" md="6">
                      <Form.Group>
                        <Form.Label>Placeholder Text</Form.Label>
                        <Form.Control
                          value={inputs.placeHolder}
                          placeholder="Type here..."
                          type="text"
                          onChange={(e) => {
                            setInputs({
                              ...inputs,
                              placeHolder: e.target.value,
                            });
                          }}
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                  )}

                  {inputs.type === "select" && (
                    <Col className="pr-1" md="6">
                      <Form.Group>
                        <Form.Label>
                          How many options you want to add?
                        </Form.Label>
                        <Form.Control
                          value={numberOfOptions}
                          placeholder="Pleae enter here..."
                          type="text"
                          onChange={(e) => {
                            setNumberOfOptions(Number(e.target.value));
                          }}
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                  )}

                  <Row className="my-4">
                    <Col className="px-1" md="6">
                      <Form.Group>
                        <Form.Label>Is Required</Form.Label>
                        <Form.Select
                          aria-label="Default select example"
                          onChange={(e) => {
                            setInputs({
                              ...inputs,
                              required: e.target.value,
                            });
                          }}
                        >
                          <option>Open this select menu</option>
                          <option value="true">Yes</option>
                          <option value="false">No</option>
                        </Form.Select>
                      </Form.Group>
                    </Col>

                    <Col className="px-1" md="6">
                      <Form.Group>
                        <Form.Label> Has Peer Button?</Form.Label>
                        <Form.Select
                          onChange={(e) => {
                            setInputs({
                              ...inputs,
                              hasButton: e.target.value,
                            });
                          }}
                        >
                          <option>Open this select menu</option>
                          <option value="true">Yes</option>
                          <option value="false">No</option>
                        </Form.Select>
                      </Form.Group>
                    </Col>
                  </Row>
                </Row>

                {numberOfOptions > 0 && (
                  <p className="text-danger">Add options for Select form</p>
                )}
                {numberOfOptions > 0 &&
                  Array(numberOfOptions)
                    .fill(0)
                    .map((_, index) => (
                      <Row key={index}>
                        <Col md="12 py-2">
                          <Col className="" md="12"></Col>
                          <Row>
                            <Col className="pr-1" md="5">
                              <Form.Group>
                                <Form.Label> Label</Form.Label>
                                <Form.Control
                                  defaultValue=""
                                  placeholder="Type here..."
                                  type="text"
                                  onChange={(e) => {
                                    const input = e.target.value;
                                    const newOptions = [...options];
                                    newOptions[index] = {
                                      ...newOptions[index],
                                      label: input,
                                    };
                                    setOptions(newOptions);
                                  }}
                                ></Form.Control>
                              </Form.Group>
                            </Col>
                            <Col className="px-1" md="4">
                              <Form.Group controlId="formFile">
                                <Form.Label>Upload an Icon</Form.Label>
                                <Form.Control
                                  type="file"
                                  onChange={async (e) => {
                                    const file = e.target.files[0];
                                    const base64file = await covertBase64(file);

                                    const newOptions = [...options];
                                    newOptions[index] = {
                                      ...newOptions[index],
                                      icon: base64file,
                                    };
                                    setOptions(newOptions);
                                  }}
                                />
                              </Form.Group>
                            </Col>
                            <Col
                              md="2"
                              className="d-flex align-items-center justify-content-center"
                            >
                              {options[index] && options[index].icon ? (
                                <div className="d-flex align-items-center justify-content-center">
                                  <img
                                    src={options[index].icon}
                                    alt="icon"
                                    style={{ width: "80px", height: "80px" }}
                                  />
                                </div>
                              ) : (
                                <p className="text-center">No Icon</p>
                              )}
                            </Col>
                          </Row>
                        </Col>
                      </Row>
                    ))}
              </Form>
            </Card.Body>
          </Card>

          <div className="my-3 d-flex align-items-center justify-content-center">
            <div>
              <Button
                className="btn-round"
                color="primary"
                type="submit"
                onClick={handleSubmit}
              >
                Submit
              </Button>
            </div>
            <div className="mx-2">
              <Button
                className="btn-round "
                variant="danger"
                type="submit"
                onClick={() => {
                  setInputs({
                    label: "",
                    type: "",
                    placeHolder: "",
                  });
                  setOptions([]);
                }}
              >
                Reset
              </Button>
            </div>
          </div>
        </Col>
        {/* <Col md="4">
          <Card className="card-user">
            <Card.Header>
              <Card.Title as="h5">
                <i class="fas fa-directions"></i>
                Input Preview
              </Card.Title>
            </Card.Header>
            <Card.Body>
              <Form>
                <Row>
                  <Col className="pr-1" md="12">
                    <Form.Group>
                      <label>{inputs.label}</label>
                      <Form.Control
                        defaultValue="Creative Code Inc."
                        placeholder="Name"
                        type="text"
                      ></Form.Control>
                    </Form.Group>
                  </Col>
                </Row>
              </Form>
            </Card.Body>
            <hr></hr>
            <div className="button-container mr-auto ml-auto">
              <Button
                className="btn-simple btn-icon"
                href="#pablo"
                onClick={(e) => e.preventDefault()}
                variant="link"
              >
                <i className="fab fa-facebook-square"></i>
              </Button>
              <Button
                className="btn-simple btn-icon"
                href="#pablo"
                onClick={(e) => e.preventDefault()}
                variant="link"
              >
                <i className="fab fa-twitter"></i>
              </Button>
              <Button
                className="btn-simple btn-icon"
                href="#pablo"
                onClick={(e) => e.preventDefault()}
                variant="link"
              >
                <i className="fab fa-google-plus-square"></i>
              </Button>
            </div>
          </Card>
        </Col> */}
      </Row>
    </Container>
  );
};

export default CreateInput;
