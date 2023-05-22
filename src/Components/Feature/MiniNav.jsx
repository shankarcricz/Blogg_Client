import React from 'react'
import { Button, Navbar } from "react-bootstrap";
import { MDBBtn } from "mdb-react-ui-kit";
import AddIcon from "@mui/icons-material/Add";
import { Link } from 'react-router-dom';

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
      
      <Link to='/'>
      <MDBBtn color={window.location.href.endsWith('following') || window.location.href.includes('search')  ? 'light' : 'dark'} rippleColor="light" href='/'> 
        For you
      </MDBBtn>
      </Link>
      <Link to='/following'>
      <MDBBtn color={window.location.href.endsWith('following') ? 'dark' : 'light'} rippleColor="dark" href="/following">
        Following
      </MDBBtn>
      </Link>
      
    </Navbar>
  </div>
  )
}

export default MiniNav