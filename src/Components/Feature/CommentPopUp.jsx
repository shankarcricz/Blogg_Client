import { CommentRounded, PostAdd, SendRounded } from "@mui/icons-material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addComment, addComments, fetchComments } from "../../Store/slices/commentSlices";
import Comment from "./Comment";
import CommentLoader from "../utils/CommentLoader";

const CommentPopUp = React.memo(({ blog_id }) => {
  const dispatch = useDispatch();
  let { comments, loading } = useSelector((state) => state.comments);
  comments = comments.comments
  const [Input, setInput] = useState('')
  useEffect(() => {
    return () => {
        dispatch(addComments([]))
    }
  }, [])
  const handleCommentAdd = () => {
    if(!Input) return;
    dispatch(addComment({
      comment: Input,
      user: sessionStorage.getItem('user_id'),
      blog: blog_id
    }))
    setInput('')
  }
  return (
    <>
      <button
      onClick={() => dispatch(fetchComments(blog_id))}
        className="btn btn-primary"
        type="button"
        data-bs-toggle="offcanvas"
        data-bs-target="#offcanvasRight"
        aria-controls="offcanvasRight"
      >
        <CommentRounded/>{comments?.length}
      </button>

      <div
        className="offcanvas offcanvas-end"
        tabindex="-1"
        id="offcanvasRight"
        aria-labelledby="offcanvasRightLabel"
      >
        <div className="offcanvas-header">
          <button className="btn" id="offcanvasRightLabel" style={{color: 'white', background:'teal', borderRadius:'50px'}}>Comments!</button>
          <button
            type="button"
            className="btn-close text-reset"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
        </div>
        <div className="offcanvas-body">
          <input
          style={{borderRadius: '50px'}}
          onChange={(e) => setInput(e.target.value)} value={Input} className="mb-2 p-2" type="text" placeholder="comment here!"></input>
          <SendRounded
          style={{cursor: "pointer"}}
          onClick={handleCommentAdd}
          />
            {comments?.length !==0 && (
                loading ? (
                <>
                <CommentLoader/>
                <CommentLoader/>
                </>
                ) : (
                <div className="row">
                    {
                        comments?.map(comment => {
                            return <Comment comment={comment} />
                        })
                    }
                </div>)
            )}
            {
                comments?.length == 0 && (
                    <div>No comments yet!. We will let you to comment soon!</div>
                )
            }
        </div>
      </div>
    </>
  );
})

export default CommentPopUp;
