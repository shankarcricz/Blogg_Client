import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getMyBlogs } from "../Store/slices/blogSlices";
import CardBlogs from "./CardBlogs";
import Cookies from "js-cookie";
import BlogLoader from "./utils/BlogLoader";
import MiniNav from "./Feature/MiniNav";
import { useRef } from "react";

function MyBlogs() {
  const dispatch = useDispatch();
  const { myBlogs, loading } = useSelector((state) => state.blogs);
  useEffect(() => {
    Cookies.get("jwt") && dispatch(getMyBlogs());
  }, []);
  const parentRef = useRef(null);
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          entry.target.classList.toggle("show", entry.isIntersecting);
        });
      },
      {
        threshold: 0.5,
      }
    );

    let cards = parentRef?.current?.children;

    if (!cards) return;
    Array.from(cards)?.forEach((card) => {
      observer.observe(card);
    });
    return () => {
      observer.disconnect();
    };
  }, [parentRef.current]);

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
          <div className="row" ref={parentRef} style={{overflowX:'hidden'}}>
            {!Cookies.get("jwt") && <div>Login Pls!</div>}
            {Cookies.get("jwt") && !myBlogs.length && (
              <div className="card">Write something to see here!</div>
            )}
            {myBlogs.map((blogObj) => {
              return (
                <div className="blogg">
                  <CardBlogs key={blogObj.id} blog={blogObj} mine="true" />
                </div>
              );
            })}
          </div>
        </>
      )}
      
    </>
  );
}

export default MyBlogs;
