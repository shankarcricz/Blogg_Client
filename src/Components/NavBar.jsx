import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import "./NavBar.css";
import CreateIcon from "@mui/icons-material/Create";
import { Avatar, TextField } from "@mui/material";
import { useRef, useState } from "react";
import { CloseButton, Spinner } from "react-bootstrap";
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
import DotLoader from "./utils/DotLoader";
import Dashboard from "./Feature/Dashboard";

function NavBar() {
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
    sessionStorage.getItem("currentUser_photo");

  return (
    <Navbar className="navbar">
      <Container>
        <Link to="/">
        <Navbar.Brand className="brand" style={{fontWeight:'bold', fontFamily:'fantasy'}}>
          <img alt="Logo" src='./SOCIO.png' style={{height:'50px', maxHeight:'60px'}}></img>
          SOCIO</Navbar.Brand>
        </Link>
        
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-center">
          <TextField
            value={term}
            onChange={(e) => setTerm(e.target.value)}
            id="search"
            label="Search"
            variant="outlined"
            onKeyUp={(e) => {
              if(e.key === "Enter") {
                document.getElementById('searchForTerm')?.click();
              }
            }}
         
          />
          {term && <CloseButton onClick={() => setTerm("")} />}
          <Link to={`/search/${term}`}>
          <span id="searchForTerm" style={{cursor: 'pointer'}} 
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
                    <div className="row">
                    <button
                      type="button"
                      className="btn btn-outline"
                      onClick={handleLogout}
                    >
                      Logout
                    </button>
                    </div>
                    
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
                    <div><button
                      type="button"
                      className="btn btn-outline"
                      onClick={handleUpload}
                    >
                      upload
                    </button></div>
                    <Link to="/settings">
                      <button type="button" className="btn btn-outline">
                        Settings
                      </button>
                    </Link>
                  </Popover.Body>
                </Popover>
              }
            >
              
              <Avatar
                className="avatar"
                id= {loading ? 'load-avatar' : ''}
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
