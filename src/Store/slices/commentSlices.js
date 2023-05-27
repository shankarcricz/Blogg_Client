import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
const BE_URL = "http://localhost:3001"

export const fetchComments = createAsyncThunk('comments', async (blog_id) => {
    try{
      axios.defaults.headers.common['Authorization'] = 'Bearer ' + Cookies.get('jwt')
      let response = await axios.post(BE_URL+'/comments/getCommentsByBlogId',{blog_id})
      return response.data
    } catch (error) {
      return error
    }
  })
export const addComment = createAsyncThunk('addComment', async (comment) => {
    try {
        axios.defaults.headers.common['Authorization'] = 'Bearer ' +Cookies.get('jwt')
        let response = await axios.post(BE_URL+'/comments/addComment', comment)
        return response.data
    } catch (error) {
        return error
    }
})


const CommentSlice = createSlice({
    name : 'comment',
    initialState : {
        comments : [],
        loading : false,
        error : null,
        comment: {}
    },
    reducers : {
        addComments(state, action) {
            state.comments = action.payload
        }
    }, extraReducers:(builder) => {
        builder.addCase(fetchComments.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        builder.addCase(fetchComments.fulfilled, (state, action) => {
            state.loading = false;
            state.comments = action.payload?.data;
            state.error = null;
        })
        builder.addCase(fetchComments.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload?.data?.message;
        })


        builder.addCase(addComment.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        builder.addCase(addComment.fulfilled, (state, action) => {
            state.loading = false;
            state.comments = action.payload?.data;
            state.error = null;
            toast('Commented!', {
                type: 'success',
                position: 'top-left',
                autoClose: 5000,
              });
        })
        builder.addCase(addComment.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload?.data?.message;
        })

    }
})
export const comments = CommentSlice.reducer;
export const { addComments } = CommentSlice.actions;