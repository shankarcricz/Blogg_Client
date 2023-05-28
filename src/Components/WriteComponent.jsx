import {
  Button,
  ButtonBase,
  Input,
  Select,
  TextField,
  TextareaAutosize,
} from "@mui/material";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { Alert, Form } from "react-bootstrap";
import "./WriteComponent.css";
import { CFormTextarea } from "@coreui/react";
import { MenuItem } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { createBlog } from "../Store/slices/blogSlices";
import WriteLoader from "./utils/WriteLoader";
import {toast} from 'react-toastify'
import Cookies from "js-cookie";
import LoginChecker from "./Feature/LoginChecker";
import JoditEditor from "jodit-react";
import { PhotoCamera, UploadFile } from "@mui/icons-material";

function WriteComponent() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [story, setStory] = useState("");
  const [tag, setTag] = useState([]);
  const [genre, setGenre] = useState("");
  const [Invalid, setInvalid] = useState(false)
  const tArr = [
    "#Adventure",
    "#Inspiration",
    "#Technology",
    "#Fashion",
    "#Foodie",
    "#Fitness",
    "#Photography",
    "#Art",
    "#Nature",
    "#Travel",
    "#Music",
    "#Books",
    "#Health",
    "#Motivation",
    "#Gaming",
    "#Creativity",
    "#Entrepreneurship",
    "#Selfcare",
    "#Pets",
    "#Relationships"
]
const gArr = [
  "Action",
  "Adventure",
  "Comedy",
  "Drama",
  "Fantasy",
  "Horror",
  "Mystery",
  "Romance",
  "Sci-Fi",
  "Thriller",
  "Crime",
  "Animation",
  "Family",
  "Historical",
  "Musical",
  "Documentary",
  "Sports",
  "War",
  "Western",
  "Biography"
]


  

  const dispatch = useDispatch();
  const editor = useRef(null);
  const [content, setContent] = useState('')
  const { loading, submitted } = useSelector((state) => state.blogs);
  if(loading) {
    document.querySelector('.loader').classList.remove('d-none')
    document.querySelector('.form').style.display = 'none'
  } else if (submitted && !loading) {
    document.querySelector('.loader').classList.add('d-none')
    document.querySelector('.form').style.display = 'block'
    toast('Published!', {
      type: 'success',
      position: 'top-left',
      autoClose: 5000,
    });
    window.location.href = '/'
  }



  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    setSelectedImage(URL.createObjectURL(file));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    let a = document.getElementById("file").files[0];
    if(!a?.type.startsWith("image")){
      setInvalid(true)
      return;
    } else {
      setInvalid(false)
    }
    if(title && description && a && content && tag && genre){
      dispatch(
        createBlog({
          title,
          description,
          photo: a,
          story:content,
          tag,
          genre,
        }))
        setInvalid(false)
    } else {
      setInvalid(true)
    }
  };
  return (
    <>
    { 
      (<div className="loader d-flex w-100 justify-content-center d-none" style={{textAlign:'center', height:'70vh'}}>
        <WriteLoader />
        Publishing the post...
      </div>)
    }
      {
        !Cookies.get('jwt') ? <LoginChecker/>  :
        <div className="mt-2 mb-4 form">
        <Form onSubmit={handleSubmit}>
          <div className="row mb-4">
            <Input
              label="title"
              placeholder="title"
              className="title"
              fullWidth
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            ></Input>
          </div>
          <TextField
            className="description"
            fullWidth
            id="standard-multiline-static"
            label="Description"
            multiline
            rows={2}
            placeholder="Description"
            variant="standard"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <div className="mt-3 m">
            <button type="button" className="btn btn-dark"
            onClick={() => {
              document.getElementById('file').click()
            }}
            >
              <UploadFile /> A photo pls!
            </button>
            <input style={{display:'none'}} id="file" type="file" onChange={handleImageUpload} />
            {selectedImage && (
              <img className="image" src={selectedImage} alt="Uploaded" />
            )}
            {/* <textarea
              onChange={(e) => setStory(e.target.value)}
              className="mt-3 text-area"
              placeholder="Enter text here"
            ></textarea> */}

            <JoditEditor
            className="mt-2 mb-2 jodit"
              ref={editor}
              value={content}
              onChange={newContent => setContent(newContent)}
            />
          </div>
          <div className="row">
            <div className="col">
              <TextField
                id="tag"
                select
                label="Tag"
                defaultValue="MERN"
                helperText="Please select a tag"
                variant="filled"
                value={tag}
                onChange={(e) => setTag([e.target.value])}
              >
                {tArr.map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </TextField>
            </div>
            <div className="col">
              <TextField
                id="genre"
                select
                label="Genre"
                defaultValue="Tech"
                helperText="Please select a genre"
                variant="filled"
                value={genre}
                onChange={(e) => setGenre(e.target.value)}
              >
                {gArr.map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </TextField>
            </div>
          </div>

          <div className="row mt-3">
            <button style={{background: 'teal'}} onClick={handleSubmit} className="btn btn-primary">
              Publish
            </button>
          </div>
          {Invalid && (
            <Alert className="mt-3" style={{color:'red'}}>Please enter everything or don't repeat the same!</Alert>
          )}
        </Form>
      </div>}
    </>
  );
}

export default WriteComponent;
