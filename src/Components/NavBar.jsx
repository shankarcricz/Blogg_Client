import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import "./NavBar.css";
import CreateIcon from "@mui/icons-material/Create";
import { Avatar, TextField } from "@mui/material";
import { useRef, useState } from "react";
import { CloseButton } from "react-bootstrap";
import { OverlayTrigger } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { Popover } from "react-bootstrap";

import Login from "./Modals/Login";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../Store";
import { updatePhoto } from "../Store/slices/UserSlice";
import { Link } from "react-router-dom";
import { fetchBlogsBySearch } from "../Store/slices/blogSlices";
import { DarkMode, DarkModeOutlined, LightMode, Send } from "@mui/icons-material";

function NavBar() {
  const BE_URL = "https://bloggserver.onrender.com/"
  const { isLoggedIn, loading } = useSelector((state) => state.user);
  const [term, setTerm] = useState("");
  const [show, setShow] = useState(false);
  const picRef = useRef();
  const dispatch = useDispatch();
  const handleClose = () => {
    setShow((prev) => !prev);
  };
  const handleClick = () => {
    setShow(true);
  };
  const handleLogout = () => {
    dispatch(logout());
  };
  const handleUpload = (e) => {
    picRef.current.click();
  };

  const currentUser_name = sessionStorage.getItem("currentUser_name");
  const currentUser_photo =
    BE_URL + sessionStorage.getItem("currentUser_photo");

  return (
    <Navbar className="navbar">
      <Container>
        <Link to="/">
        <Navbar.Brand className="brand" style={{fontWeight:'bold', fontFamily:'fantasy'}}>SOCIO</Navbar.Brand>
        </Link>
        
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-center">
          <TextField
            value={term}
            onChange={(e) => setTerm(e.target.value)}
            id="search"
            label="Search"
            variant="outlined"
         
          />
          {term && <CloseButton onClick={() => setTerm("")} />}
          <Link to={`/search/${term}`}>
          <span style={{cursor: 'pointer'}} 
          ><Send/></span>
          </Link>


        </Navbar.Collapse>
        <Navbar.Collapse className="justify-content-end">
          <Link to="/write">
          <a className="write">
            <CreateIcon fontSize="10" /> Write
          </a>
          </Link>
     
          
          {!isLoggedIn && (
            <button className="sign-up" onClick={handleClick}>
              Sign Up
            </button>
          )}
          {!isLoggedIn && (
            <button className="sign-in" onClick={handleClick}>
              Sign In
            </button>
          )}
          {isLoggedIn && (
            <OverlayTrigger
              trigger="click"
              key="bottom"
              placement="bottom"
              overlay={
                <Popover
                  id={`popover-positioned-bottom`}
                  className="popover_card"
                >
                  <Popover.Header
                    as="h3"
                    className="popover-header"

                  >
                    {currentUser_name}
                  </Popover.Header>
                  <Popover.Body>
                    <button
                      type="button"
                      className="btn btn-outline"
                      onClick={handleLogout}
                    >
                      Logout
                    </button>
                    <form enctype="multipart/form-data">
                      <input
                        onChange={(e) => {
                          dispatch(updatePhoto(e.target.files[0]));
                        }}
                        ref={picRef}
                        style={{ display: "none" }}
                        type="file"
                        name="photo"
                      ></input>
                    </form>
                    <button
                      type="button"
                      className="btn btn-outline"
                      onClick={handleUpload}
                    >
                      upload
                    </button>
                  </Popover.Body>
                </Popover>
              }
            >
              <Avatar
                className="avatar"
                size="large"
                src={currentUser_photo}
              />
            </OverlayTrigger>
          )}
        </Navbar.Collapse>
      </Container>
      <Login show={show} handleClose={handleClose} />
    </Navbar>
  );
}

export default NavBar;
