import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { user } from "./slices/UserSlice";
import { blogs } from "./slices/blogSlices";
import { addComments, comments } from "./slices/commentSlices";

const store = configureStore({
    reducer : {
        user : user,
        blogs : blogs,
        comments : comments
    }
    // },
    // middleware : (getDefaultMiddleware) => {
    //     return getDefaultMiddleware()
    //     .concat()
    // }
})

export {store}
export {login, logout, addCurrentUser} from './slices/UserSlice'
export {addComments} from './slices/commentSlices'