import React from "react";
import { useState } from "react";
import { signup, updatePhoto } from "../../Store/slices/UserSlice";
import Loader from "./Loader";
import { Button, Spinner } from "react-bootstrap";
import { MDBTabsPane, MDBBtn, MDBIcon, MDBCheckbox } from "mdb-react-ui-kit";
import { useDispatch } from "react-redux";
import { useRef } from "react";
import { Image, Verified } from "@mui/icons-material";

const Signup = ({ justifyActive, show, handleClose, loading, error }) => {
  const dispatch = useDispatch();
  const picRef = useRef();
  const [name, setName] = useState("");
  const [email_s, setEmail_s] = useState("");
  const [password_s, setPassword_s] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [spinner, setSpinner] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [origImage, setOriginalImage] = useState(null);
  const handleSignup = () => {
    if (!name || !email_s || !password_s || !passwordConfirm) return;
    setSpinner(true);
    dispatch(
      signup({
        name,
        email_s,
        password_s,
        passwordConfirm,
        origImage
      })
    );
    
    setTimeout(() => {
      setSpinner(false);
    }, 2000);
  };
  const handleFileUpload = (e) => {
    if(e.target.files[0].type.startsWith('image')) {
      setSelectedImage(URL.createObjectURL(e.target.files[0]))
      setOriginalImage(e.target.files[0])
      }
  }

  return (
    <MDBTabsPane show={justifyActive === "tab2"}>
      <div className="text-center mb-3">
        {!selectedImage && (
          <div
            style={{
              border: "2px solid teal",
              height: "100px",
              width: "100px",
              borderRadius: "50%",
              margin: "auto",
            }}
          >
            <Image />
          </div>
        )}
        {selectedImage && (
          <div
            style={{
              border: "0px solid blue",
              height: "100px",
              width: "100px",
              margin: "auto",
              borderRadius: "50%",
            }}
          >
            <img
              style={{
                borderRadius: "inherit",
                height: "inherit",
                width: "inherit",
              }}
              src={selectedImage}
              alt="Upload a pic"
            />
            {selectedImage && <Verified style={{ color: "teal" }} />}
          </div>
        )}

        <button
          onClick={() => {
            picRef.current.click();
          }}
          className="btn mt-3"
        >
          Upload A Pic
        </button>
        <input
          ref={picRef}
          style={{ display: "none" }}
          onChange={handleFileUpload}
          type="file"
          nam="photo"
          id="photo"
        ></input>
        <p>Sign up</p>

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
        type="name"
        className="form2_name mb-4"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      ></input>
      <input
        type="email"
        className="form2_email mb-4"
        placeholder="Email"
        value={email_s}
        onChange={(e) => setEmail_s(e.target.value)}
      ></input>
      <input
        type="password"
        className="form2_password mb-4"
        placeholder="Password"
        value={password_s}
        onChange={(e) => setPassword_s(e.target.value)}
      ></input>
      <input
        type="password"
        className="form2_password_cnfrm mb-4"
        placeholder="Password Confirm"
        value={passwordConfirm}
        onChange={(e) => setPasswordConfirm(e.target.value)}
      ></input>

      <div className="d-flex justify-content-center mb-4">
        <MDBCheckbox
          name="flexCheck"
          id="flexCheckDefault"
          label="I have read and agree to the terms"
        />
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
        <MDBBtn className="mb-4 w-100" onClick={handleSignup}>
          Sign In
        </MDBBtn>
      )}
    </MDBTabsPane>
  );
};

export default Signup;
