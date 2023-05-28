import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMyBlogs } from "../Store/slices/blogSlices";
import CardBlogs from "./CardBlogs";
import Cookies from "js-cookie";
import BlogLoader from "./utils/BlogLoader";
import MiniNav from "./Feature/MiniNav";

function MyBlogs() {
  const dispatch = useDispatch();
  const { myBlogs, loading } = useSelector((state) => state.blogs);
  useEffect(() => {
    Cookies.get("jwt") && dispatch(getMyBlogs());
  }, []);
  return (
    <>
   
      {loading ? (
        <>
          <div className="row">
            <BlogLoader />
            <BlogLoader />
            <BlogLoader />
            <BlogLoader />
            <BlogLoader />
            <BlogLoader />
            <BlogLoader />
          </div>
        </>
      ) : (
        <>
        <MiniNav />
        <div className="row">

          {!Cookies.get("jwt") && <div>Login Pls!</div>}
          {Cookies.get("jwt") && !myBlogs.length && (
            <div className="card">Write something to see here!</div>
          )}
          {myBlogs.map((blogObj) => {
            return <CardBlogs key={blogObj.id} blog={blogObj} mine="true" />;
          })}
        </div>
        </>
      )}
    </>
  );
}

export default MyBlogs;
