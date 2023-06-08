import React, { useEffect, useRef } from "react";
import CardBlogs from "./CardBlogs";
import { useDispatch, useSelector } from "react-redux";
import { fetchBlogs, getMyBlogs } from "../Store/slices/blogSlices";
import BlogLoader from "./utils/BlogLoader";
import { Button, Navbar } from "react-bootstrap";
import { MDBBtn } from "mdb-react-ui-kit";
import AddIcon from '@mui/icons-material/Add';
import { ArrowCircleUp } from "@mui/icons-material";
import MiniNav from "./Feature/MiniNav";
import { Table } from "@mui/material";
import RightMenu from './Feature/RightMenu';
import Dashboard from "./Feature/Dashboard";




function MainComponent() {
  const dispatch = useDispatch();
  const { blogPosts, error, loading } = useSelector((state) => state?.blogs);
  useEffect(() => {
       dispatch(fetchBlogs());
  }, []);

  window.document.addEventListener('scroll', () => {
    let a = document.querySelector('#navbar')
    if(window.pageYOffset > 75) {
      a?.classList.add('fixed')
    } else {
      a?.classList.remove('fixed')
    }
    
  })
  const parentRef = useRef(null);
 useEffect(() => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      entry.target.classList.toggle('show', entry.isIntersecting);
     
    })
  }, {
    threshold:0.6,
  });

  let cards = parentRef?.current?.children;

  if(!cards) return;
  Array.from(cards)?.forEach(card => {
    
    observer.observe(card);
  })
  return () => {
    observer.disconnect();
  }

 }, [parentRef.current])
  


  return (
    <>
      <main className="main">
        <section className="row">
          {loading ? (
            <>
              <BlogLoader />
              <BlogLoader />
              <BlogLoader />
              <BlogLoader />
              <BlogLoader />
              <BlogLoader />
              <BlogLoader />
            </>
          ) : (
            <>
            <section className="blogs">
              <MiniNav/>
              <div className="row" ref={parentRef}>
                {blogPosts.map((blogObj) => {
                  return (
                    <div className="blogg">
                  <CardBlogs  key={blogObj.id} blog={blogObj} />
                  </div> 
                )})}
              </div>
              
            </section>
            {/* <section className="col-lg-4">
                <RightMenu/>
            </section> */}
            </>
            
          )}
        </section>
        <div onClick={() => {
          window.scrollTo({
            top: 0, 
            behavior: 'smooth'
          });
        }}>
        <ArrowCircleUp className="" id="scrollTop" style={{
          height : '80px',
          color : 'teal',
          position : 'fixed',
          bottom : 0,
          right : 0,
          width : '40px',
          cursor : 'pointer'
        }} />
        </div>
      </main>
    </>
  );
}

export default MainComponent;
