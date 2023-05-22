import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
const BE_URL = "https://bloggserver.onrender.com"

export const createBlog = createAsyncThunk("createBlog", async (form) => {
  try {
    const formData = new FormData();
    formData.set("title", form.title);
    formData.set("description", form.description);
    formData.set("photo", form.photo);
    formData.set("story", form.story);
    formData.set("tags", form.tag);
    formData.set("genres", form.genre);
    axios.defaults.headers.common["Authorization"] =
      "Bearer " + Cookies.get("jwt");
    let response = await axios.post(BE_URL + "/blogs", formData);
    return response.data;
  } catch (error) {
    return "error";
  }
});

export const fetchBlogById = createAsyncThunk("blog", async (id) => {
  try {
    axios.defaults.headers.common["Authorization"] =
      "Bearer " + Cookies.get("jwt");
    let response = await axios.get(BE_URL + "/blogs/" + id);
    return response.data;
  } catch (error) {
    return error.response.data.message;
  }
});
export const updateBlogById = createAsyncThunk("blog/update", async (obj) => {
  try {
    console.log(obj)
    axios.defaults.headers.common["Authorization"] =
      "Bearer " + Cookies.get("jwt");
      let id = obj?.id;
      delete obj.id
    let response = await axios.patch(BE_URL+"/blogs/"+id  , obj );
    return response.data;
  } catch (error) {
    return error.response.data.message;
  }
});


export const fetchBlogs = createAsyncThunk("blogs", async () => {
  try {
    let response = await axios.get(BE_URL+"/blogs");
    return response.data;
  } catch (error) {
    return error;
  }
});
export const fetchFollowPosts = createAsyncThunk(
  "blogs/following",
  async () => {
    try {
      axios.defaults.headers.common["Authorization"] =
        "Bearer " + Cookies.get("jwt");
      let response = await axios.get(BE_URL+"/blogs/following");
      return response.data;
    } catch (error) {
      return error;
    }
  }
);

export const fetchBlogsBySearch = createAsyncThunk("search", async (term) => {
  try {
    let response = await axios.post(BE_URL+"/blogs/searchTerm", {term});
    return response.data;
  } catch (error) {
    return error;
  }
});

const BlogSlice = createSlice({
  name: "blogs",
  initialState: {
    blogPosts: [],
    blogPost: {},
    followPosts: [],
    loading: false,
    followingBlogs: [],
    SearchBlogs: [],
    loadingS : false
  },

  reducers: {
    addBlogs(state, action) {
      state.blogPosts = action.payload.blogs;
    },
    addBlog(state, action) {
      state.blogPost = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchBlogs.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchBlogs.fulfilled, (state, action) => {
      state.loading = false;
      state.error = "";
      state.blogPosts = action.payload.data.blogs;
    });
    builder.addCase(fetchBlogs.rejected, (state, action) => {
      state.loading = false;
      state.error = "Invalid login creds!";
      state.blogPosts = "";
    });

    builder.addCase(fetchFollowPosts.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchFollowPosts.fulfilled, (state, action) => {
      state.loading = false;
      state.error = "";
      state.followPosts = action.payload?.data?.blogs;
    });
    builder.addCase(fetchFollowPosts.rejected, (state, action) => {
      state.loading = false;
      state.error = "Invalid login creds!";
      state.blogPosts = "";
    });

    builder.addCase(fetchBlogsBySearch.pending, (state) => {
      state.loadingS = true;
      state.error = null;
    });
    builder.addCase(fetchBlogsBySearch.fulfilled, (state, action) => {
      state.loadingS = false;
      state.error = "";
      state.SearchBlogs = action.payload?.data?.blogs;
    });
    builder.addCase(fetchBlogsBySearch.rejected, (state, action) => {
      state.loadingS = false;
      state.error = "Invalid login creds!";
      state.blogPosts = "";
    });


    builder.addCase(fetchBlogById.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchBlogById.fulfilled, (state, action) => {
      state.loading = false;
      state.error = "";
      state.blogPost = action.payload?.data?.blog;
    });
    builder.addCase(fetchBlogById.rejected, (state, action) => {
      state.loading = false;
      console.log(action);
      state.error = action.payload;
      state.blogPosts = "";
    });

    



    builder.addCase(createBlog.pending, (state) => {
      state.loading = true;
      state.error = "";
      state.updated = false;
    });
    builder.addCase(createBlog.fulfilled, (state, action) => {
      state.error = "";
      state.updated = true;
      state.loading = false;
    });
    builder.addCase(createBlog.rejected, (state) => {
      state.loading = false;
      state.error = "error";
      state.updated = false;
    });
  },
});

export const blogs = BlogSlice.reducer;
export const { addBlogs, addBlog } = BlogSlice.actions;
