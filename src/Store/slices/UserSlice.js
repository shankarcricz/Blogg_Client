import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie";
import {toast} from 'react-toastify'
const BE_URL = "https://bloggserver.onrender.com"

const signupToken = async (name, email, password, passwordConfirm, photo) => {
 
  try {
    const formData = new FormData()
    formData.set('name', name)
    formData.set('email', email)
    formData.set('password', password)
    formData.set('passwordConfirm', passwordConfirm)
    formData.set('photo', photo)
    axios.defaults.headers.common['Content-Type'] = 'multipart/form-data'
    const response = await axios.post(BE_URL+"/users/signup", formData);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.error);
  }
};
const loginToken = async (email, password) => {
  try {
    const response = await axios.post(BE_URL+"/users/login", {
      email,
      password,
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.error);
  }
};

export const signup = createAsyncThunk(
  "/users/signup",
  async ({ name, email_s, password_s, passwordConfirm, origImage}, thunkAPI) => {
    try {
      const response = await signupToken(
        name,
        email_s,
        password_s,
        passwordConfirm,
        origImage
      );
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const AddFollow = createAsyncThunk(
  "addFollow",
  async (following_id) => {
    try{
      const response = await axios.post(BE_URL+'/users/addFollower', {following_id})
      return response.data
    } catch (error) {
      return error;
    }
  }
)

export const LoginFn = createAsyncThunk(
  "/users/login",
  async ({ email_l, password_l }, thunkAPI) => {
    try {
      const response = await loginToken(email_l, password_l);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const updatePhoto = createAsyncThunk('uploadImg', 
async (file, {rejectWithValue}) => {
  try {
    const formData = new FormData()
    console.log(file, formData);
    formData.set('photo', file)
    axios.defaults.headers.common['Content-Type'] = 'multipart/form-data'
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + Cookies.get('jwt')
    const resp = await axios.post(BE_URL+'/users/updateMe',formData)
    return resp;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
})


const UserSlice = createSlice({
  name: "user",
  initialState: {
    isLoggedIn: false,
    currentUser: '',
    loading: false,
    error: null,
    token: null,
    follow : false
  },
  
  reducers: {
    addCurrentUser(state, action) {
      state.currentUser = action
      Cookies.set('currentUser', state.currentUser, {expires : Date.now() + 10*60*3600})
    },
    login(state, action) {
      state.isLoggedIn = true;
    },
    logout(state, action) {
      state.isLoggedIn = false;
      Cookies.set('jwt', '')
      sessionStorage.clear();
      window.location.href = '/'
   
    },
  },
  extraReducers: (builder) => {
    builder.addCase(signup.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(signup.fulfilled, (state, action) => {
      state.loading = false;
      state.token = action.payload.token;
      state.isLoggedIn = true;
      Cookies.set("jwt", state.token);
      state.currentUser = action.payload.data
      sessionStorage.setItem('currentUser_name', state.currentUser?.name);
      sessionStorage.setItem('currentUser_photo', state.currentUser?.photo);
      sessionStorage.setItem('user_id', state.currentUser?.id)
      toast('Signed Up!', {
        type: 'success',
        position: 'top-right',
        autoClose: 5000,
      });
    });
    builder.addCase(signup.rejected, (state, action) => {
      state.loading = false;
      state.error = "Check your credentials properly";
      state.isLoggedIn = false;
      toast('Check your creds properly', {
        type: 'warning',
        position: 'top-right',
        autoClose: 5000,
      });
    });

    builder.addCase(LoginFn.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(LoginFn.fulfilled, (state, action) => {
      state.loading = false;
      state.token = action.payload.token;
      state.isLoggedIn = true;
      state.error = ''
      Cookies.set("jwt", state.token);
      state.currentUser = action.payload.data
      sessionStorage.setItem('currentUser_name', state.currentUser?.name);
      sessionStorage.setItem('currentUser_photo', state.currentUser?.photo);
      sessionStorage.setItem('user_id', state.currentUser?.id)
      toast('Logged in!', {
        type: 'success',
        position: 'top-right',
        autoClose: 5000,
      });
    });
    builder.addCase(LoginFn.rejected, (state, action) => {
      state.loading = false;
      state.error = "Invalid login creds!";
      state.isLoggedIn = false;
      toast('Invalid credentials!', {
        type: 'warning',
        position: 'top-right',
        autoClose: 5000,
      });
    });


    builder.addCase(updatePhoto.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(updatePhoto.fulfilled, (state, action) => {
      state.loading = false; //updating the state so that the navbar refreshes to pick the image
      state.error = ''
      sessionStorage.setItem('currentUser_photo', action.payload?.data?.photo);
      toast('updated photo!', {
        type: 'success',
        position: 'top-left',
        autoClose: 5000,
      });
    });
    builder.addCase(updatePhoto.rejected, (state, action) => {
      state.loading = false;
      state.error = "Invalid login creds!";
      toast('something wrong!', {
        type: 'warning',
        position: 'top-left',
        autoClose: 5000,
      });
    });



    builder.addCase(AddFollow.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(AddFollow.fulfilled, (state, action) => {
      state.loading = false; //updating the state so that the navbar refreshes to pick the image
      state.error = ''
      state.follow = true
      toast('Following!', {
        type: 'success',
        position: 'top-left',
        autoClose: 5000,
      });
    });
    builder.addCase(AddFollow.rejected, (state, action) => {
      state.loading = false;
      state.error = "Invalid login creds!";
      toast('something wrong!', {
        type: 'warning',
        position: 'top-left',
        autoClose: 5000,
      });
    });
  },
});

export const user = UserSlice.reducer;
export const { addCurrentUser, login, logout } = UserSlice.actions;
