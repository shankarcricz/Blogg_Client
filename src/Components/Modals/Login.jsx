import { useState } from "react";
import Modal from "react-bootstrap/Modal";
import ReactDOM from "react-dom";
import React from "react";
import { Spinner, Button } from "react-bootstrap";
import {
  MDBContainer,
  MDBTabs,
  MDBTabsItem,
  MDBTabsLink,
  MDBTabsContent,
  MDBTabsPane,
  MDBBtn,
  MDBIcon,
  MDBInput,
  MDBCheckbox,
} from "mdb-react-ui-kit";
import { useDispatch, useSelector } from "react-redux";
import { Dispatch } from "react";
import  { LoginFn } from "../../Store/slices/UserSlice";
import Signup from "./Signup";
import Loader from "./Loader";

function Login({ show, handleClose }) {
  const { isLoggedIn, loading, error } = useSelector((state) => state.user);

  const dispatch = useDispatch();
  const [justifyActive, setJustifyActive] = useState("tab1");
  const [email_l, setEmail_l] = useState("");
  const [password_l, setPassword_l] = useState("");
  const [spinner, setSpinner] = useState(false);

  if (!show) return null;
  const handleJustifyClick = (value) => {
    if (value === justifyActive) {
      return;
    }

    setJustifyActive(value);
  };

  const handleSignin = () => {
    if(!email_l || !password_l) return
    setSpinner(true);
    dispatch(
      LoginFn({
        email_l,
        password_l,
      })
    );
    setTimeout(() => {
      setSpinner(false);
    }, 2000);

  };

  return ReactDOM.createPortal(
    <>   
        <Modal
          show={show}
          onHide={handleClose}
          backdrop="static"
          keyboard={false}
        >
          <Modal.Header closeButton style={{ background: "teal" }}>
            <Modal.Title className="text-light">Welcome!</Modal.Title>
          </Modal.Header>
          {
            isLoggedIn ? 
            (<Modal.Body>
              <h5 className="text-success text-center">Yay! logged in successfully</h5>
            </Modal.Body>) :
            ( <Modal.Body>
              <MDBContainer className="d-flex flex-column w-100">
                <MDBTabs
                  pills
                  justify
                  className="mb-3 d-flex flex-row justify-content-between"
                >
                  <MDBTabsItem>
                    <MDBTabsLink
                      onClick={() => handleJustifyClick("tab1")}
                      active={justifyActive === "tab1"}
                    >
                      Login
                    </MDBTabsLink>
                  </MDBTabsItem>
                  <MDBTabsItem>
                    <MDBTabsLink
                      onClick={() => handleJustifyClick("tab2")}
                      active={justifyActive === "tab2"}
                    >
                      Register
                    </MDBTabsLink>
                  </MDBTabsItem>
                </MDBTabs>
  
                <MDBTabsContent>
                  <MDBTabsPane show={justifyActive === "tab1"}>
                    <div className="text-center mb-3">
                      <p>Sign in with:</p>
  
                      <div
                        className="d-flex justify-content-between mx-auto"
                        style={{ width: "40%" }}
                      >
                        <MDBBtn
                          tag="a"
                          color="none"
                          className="m-1"
                          style={{ color: "#1266f1" }}
                        >
                          <MDBIcon fab icon="facebook-f" size="sm" />
                        </MDBBtn>
  
                        <MDBBtn
                          tag="a"
                          color="none"
                          className="m-1"
                          style={{ color: "#1266f1" }}
                        >
                          <MDBIcon fab icon="twitter" size="sm" />
                        </MDBBtn>
  
                        <MDBBtn
                          tag="a"
                          color="none"
                          className="m-1"
                          style={{ color: "#1266f1" }}
                        >
                          <MDBIcon fab icon="google" size="sm" />
                        </MDBBtn>
  
                        <MDBBtn
                          tag="a"
                          color="none"
                          className="m-1"
                          style={{ color: "#1266f1" }}
                        >
                          <MDBIcon fab icon="github" size="sm" />
                        </MDBBtn>
                      </div>
  
                      <p className="text-center mt-3">or:</p>
                    </div>
                    <input
                      type="email"
                      className="form1_email"
                      placeholder="Email"
                      value={email_l}
                      onChange={(e) => setEmail_l(e.target.value)}
                    ></input>
                    <input
                      type="password"
                      className="form1_password mt-4 mb-5"
                      placeholder="Password"
                      value={password_l}
                      onChange={(e) => setPassword_l(e.target.value)}
                    ></input>
                    <div className="d-flex justify-content-between mx-4 mb-4">
                      <MDBCheckbox
                        name="flexCheck"
                        value=""
                        id="flexCheckDefault"
                        label="Remember me"
                      />
                      <a href="!#">Forgot password?</a>
                    </div>
                    {spinner ? (
                      <Button variant="primary" disabled className="mb-4 w-100">
                        <Spinner
                          as="span"
                          animation="border"
                          size="sm"
                          role="status"
                          aria-hidden="true"
                        />
                        Loading...
                      </Button>
                    ) : (
                      <MDBBtn className="mb-4 w-100" onClick={handleSignin}>
                        Sign In
                      </MDBBtn>
                    )}
                    
                    <p className="text-center">
                      Not a member?{" "}
                      <a href="#!" onClick={() => handleJustifyClick("tab2")}>
                        Register
                      </a>
                    </p>
                  </MDBTabsPane>
                  <Signup
                    justifyActive={justifyActive}
                    show={show}
                    handleClose={handleClose}
                    loading={loading}
                    spinner={spinner}
                    setSpinner={setSpinner}
                    error={error}
                  />
                </MDBTabsContent>
              </MDBContainer>
            </Modal.Body>)
          }
        </Modal>
    </>,
    document.getElementById("modal-root")
  );
}

export default Login;
