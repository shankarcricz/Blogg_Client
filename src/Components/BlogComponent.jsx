import { Avatar, Breadcrumbs, ButtonBase } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addBlog, fetchBlogById, updateBlogById } from "../Store/slices/blogSlices";
import { useParams } from "react-router";
import {
  ColorLens,
  CommentRounded,
  FavoriteBorderOutlined,
  FavoriteBorderRounded,
  FavoriteRounded,
  HeartBroken,
  Label,
  RemoveRedEyeOutlined,
  RemoveRedEyeRounded,
  Star,
} from "@mui/icons-material";
import { Button } from "react-bootstrap";
import CommentPopUp from "./Feature/CommentPopUp";
import DotLoader from "./utils/DotLoader";
import Dup from "./utils/Dup";
import { AddFollow } from "../Store/slices/UserSlice";
import MiniNav from "./Feature/MiniNav";
import Cookies from "js-cookie";
import LoginChecker from "./Feature/LoginChecker";


function BlogComponent() {
  const BE_URL = "https://bloggserver.onrender.com/"
  const dispatch = useDispatch();
  const { blogPost, loading, error } = useSelector((state) => state.blogs);
  const [follow, setFollow] = useState(false);
  const blog = blogPost;
  const params = useParams();
  let isLiked = blog?.likers?.includes(sessionStorage.getItem("user_id"))
  const [liked, setLiked] = useState(isLiked)
 

  useEffect(() => {
    dispatch(fetchBlogById(params.id));
    return () => {
      dispatch(addBlog({}));
    };
  }, []);
  const handleFollowClick = () => {
    if(follow) return;
    dispatch(AddFollow(blog?.createdUser?.id));
    setFollow(true);
  };
  let updateData = {}
  const handleClick = () => {
    if(liked || isLiked) return; 
    updateData = {id : blog?.id ,claps : blog?.claps, type: 'liked'}
    dispatch(updateBlogById(updateData))
    document.querySelector('.likes').innerHTML = parseInt(document.querySelector('.likes').innerHTML || 0) + 1  
    setLiked(true)
   
}


  return (
    <>
    
      
    
      {!blogPost ? (
        !Cookies.get('jwt') && <LoginChecker/>
      ) : loading ? (
        <>
          <DotLoader />
          <Dup />
        </>
      ) : ( Cookies.get('jwt') &&
        <article className="mt-3" style={{ marginBottom: "60px" }}>
          <div className="row">
            <Breadcrumbs separator={<Label/>} aria-label="breadcrumb">
              <Avatar
                sizes="large"
                src={BE_URL+ blog?.createdUser?.photo}
              ></Avatar>
              <span>{blog?.createdUser?.name || "unknown"}</span>
              <span>{new Date(blog?.createdAt).getFullYear()}</span>
              {blog?.createdUser?.followers?.includes(
                sessionStorage.getItem("user_id")
              ) && (
                <button
                  type="button"
                  className="btn btn-outline"
                  style={{ background: "teal", color: "white" }}
                >
                  Following
                </button>
              )}

              {!blog?.createdUser?.followers?.includes(
                sessionStorage.getItem("user_id")
              ) &&
                follow && (
                  <button
                    type="button"
                    className="btn btn-outline"
                    style={{ background: "teal", color: "white" }}
                  >
                    Following
                  </button>
                )}
              {!blog?.createdUser?.followers?.includes(
                sessionStorage.getItem("user_id")
              ) &&
                !follow && (
                  <button
                    onClick={handleFollowClick}
                    type="button"
                    className="btn btn-outline"
                  >
                    Follow
                  </button>
                )}
            </Breadcrumbs>
          </div>
          <div className="row mt-4">
            <h2 style={{fontFamily:'fantasy'}} >{blog?.title}</h2>
          </div>
          <hr />
          <div className="row mt-3">
            <h3 style={{fontStyle:'italic'}}>{blog?.description}</h3>
          </div>
          <div className="row mt-3">
            <img
              style={{objectFit: 'scale-down',aspectRatio: 2/1}}
              src={BE_URL + `${blog?.photo}`}
              alt="img"
            ></img>
          </div>
          <div className="row mt-3">
            <h4>{blog?.story}</h4>
          </div>
          <hr></hr>
          <div className="row">
    <Button disabled variant="outline" className="col-2">
      {" "}
      <RemoveRedEyeRounded /> {blog?.views || 0}
    </Button>
    <div className="col-3">
      <CommentPopUp blog_id={blog?.id} />
    </div>
    <div className="col" style={{ textAlign: "end" }}>
      {" "}
      <span onClick={handleClick}>
        {
          isLiked ? <FavoriteRounded style={{ cursor: "pointer" }}/> :
          liked ? <FavoriteRounded style={{ cursor: "pointer" }}/> : <FavoriteBorderOutlined 
          style={{ cursor: "pointer" }} />
        }
     
          <span className="likes">{blog?.claps}</span>
      </span>
      
    </div>
  </div>
   
        </article>
      )}
    </>
  );
}

export default BlogComponent;
