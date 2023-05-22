import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { CardHeader } from "@mui/material";
import { Avatar } from "@mui/material";
import { green } from "@mui/material/colors";
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import  ThumbUpIcon  from '@mui/icons-material/ThumbUp';
import { Link } from "react-router-dom";
import { FavoriteBorderOutlined, FavoriteRounded } from "@mui/icons-material";

export default function CardBlogs({ blog }) {
  const BE_URL = 'https://bloggserver.onrender.com/'
  const month = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  return (
    <Card
    sx={{ maxWidth: "100%" }} className="my-3">
      <div className="row card-header" style={{marginLeft:'-40px'}}>
        <div className="col"> <CardHeader
         className="text-muted "
          avatar={
            <Avatar
              sx={{ width: 38, height: 38 }}
              style={{border : '2px solid grey'}}
              alt={blog.createdUser?.name}
              src={BE_URL+`${blog.createdUser?.photo}`}
            />
          }
          title={blog.createdUser?.name}
          subheader={
            month[new Date(blog.createdAt).getMonth()] + ' - ' +
            new Date(blog.createdAt).getDay() + ' ' + new Date(blog.createdAt).getFullYear()
          }
        ></CardHeader></div>
        <div className="mt-3 col"><Button style={{borderRadius:'50px', color : 'grey'}} variant="outlined" disabled size="small">{blog.genre}</Button></div>
      </div>
      <div className="row">
        <div className="col-8">
          <CardContent>
            <Typography className="fw-bold" gutterBottom variant="h5" component="div">
              {blog.title}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {blog.description}
            </Typography>
          </CardContent>
          <CardActions>  
          {
            blog.tag.map(tag => {
              return (
                <>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-tag" viewBox="0 0 16 16">
                <path d="M6 4.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm-1 0a.5.5 0 1 0-1 0 .5.5 0 0 0 1 0z"/>
                <path d="M2 1h4.586a1 1 0 0 1 .707.293l7 7a1 1 0 0 1 0 1.414l-4.586 4.586a1 1 0 0 1-1.414 0l-7-7A1 1 0 0 1 1 6.586V2a1 1 0 0 1 1-1zm0 5.586 7 7L13.586 9l-7-7H2v4.586z"/>
              </svg>
              <span className="text-muted mx-2">{tag}</span>
              </>)
            })
          }
           <span>
            <FavoriteBorderOutlined/>
            {blog.claps}</span> 
            <Link to={'/blog/' + `${blog?.id}`}>
            <Button className="mx-2" style={{background: 'teal', color: 'white'}} variant="outline">Read</Button>
            </Link>
          </CardActions>
        </div>
        <div className="col-4">
          <CardMedia
            component="img"
            height={100}
            style={{objectFit:'contain', maxHeight:'100px', marginTop:'20px'}}
            alt="blogPhoto"
            image={BE_URL + `${blog.photo}`}
          />
        </div>
      </div>
    </Card>
  );
}
