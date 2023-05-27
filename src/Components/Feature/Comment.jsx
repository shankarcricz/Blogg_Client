import React from "react";

import { Avatar } from "@mui/material";
import { FavoriteOutlined, Reply, ThumbUpOffAlt, ThumbsUpDown } from "@mui/icons-material";

export default function Comment({comment}) {
  return (
    <div className="card mb-3">
        <div className="card-header">
        <Avatar src={comment?.user?.photo}/>
            <div className="row">
                <span className="col">{comment?.user?.name}</span>
                <span className="col">{new Date(comment?.createdAt).getFullYear() + ' - ' + new Date(comment?.createdAt).getMonth() + ' - ' + new Date(comment?.createdAt).getDate()}</span>            
            </div>
            <Reply />
        </div>
        <div className="card-body">
        {comment?.comment}
        </div>
        <div className="card-footer">
        <ThumbUpOffAlt/>
        </div>
    </div>
  );
}