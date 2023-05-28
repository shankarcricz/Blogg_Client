import React from "react";
import { Button, Navbar } from "react-bootstrap";
import { MDBBtn } from "mdb-react-ui-kit";
import AddIcon from "@mui/icons-material/Add";
import { Link } from "react-router-dom";
import Dashboard from "./Dashboard";

function MiniNav() {
  return (
    <div className="row">
      <Navbar id="navbar" className="">
        <Link to="/write">
          <Navbar.Brand style={{ cursor: "pointer" }}>
            {" "}
            <AddIcon />{" "}
          </Navbar.Brand>
        </Link>

        <Link to="/">
          <MDBBtn
            color={
              window.location.href.endsWith("following") ||
              window.location.href.includes("search") || 
              window.location.href.includes("myBlogs")
                ? "light"
                : "dark"
            }
            rippleColor="light"
            href="/"
          >
            For you
          </MDBBtn>
        </Link>
        <Link to="/following">
          <MDBBtn
            color={
              window.location.href.endsWith("following") ? "dark" : "light"
            }
            rippleColor="dark"
          >
            Following
          </MDBBtn>
        </Link>
        <Link to="/myBlogs">
          <MDBBtn
            color={
              window.location.href.endsWith("myBlogs") ? "dark" : "light"
            }
            rippleColor="dark"
          >
            My Posts
          </MDBBtn>
        </Link>
        
      </Navbar>
    </div>
  );
}

export default MiniNav;
