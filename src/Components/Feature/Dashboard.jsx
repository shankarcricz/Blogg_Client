import { CommentRounded, DashboardCustomize, PostAdd, SendRounded } from "@mui/icons-material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addComment, addComments, fetchComments } from "../../Store/slices/commentSlices";
import Comment from "./Comment";
import CommentLoader from "../utils/CommentLoader";
import { getMyBlogs } from "../../Store/slices/blogSlices";
import RightMenu from "./RightMenu";

const Dashboard = () => {
  const dispatch = useDispatch();
  return (
    <>
      <button
        className="btn btn-primary"
        type="button"
        data-bs-toggle="offcanvas"
        data-bs-target="#offcanvasRight"
        aria-controls="offcanvasRight"
      >
        Dashboard <DashboardCustomize/>
      </button>

      <div
        className="offcanvas offcanvas-end"
        tabindex="-1"
        id="offcanvasRight"
        aria-labelledby="offcanvasRightLabel"
      >
        <div className="offcanvas-header">
          <button className="btn" id="offcanvasRightLabel" style={{color: 'white', background:'teal', borderRadius:'50px'}}>Dashboard</button>
          <button
            type="button"
            className="btn-close text-reset"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
        </div>
       <div className="offcanvas-body">
            <RightMenu/>
       </div>
      </div>
    </>
  );
}

export default Dashboard;
