import "./App.css";
import NavBar from "./Components/NavBar";
import "bootstrap/dist/js/bootstrap.js";
import "bootstrap/dist/css/bootstrap.min.css";
import "mdb-react-ui-kit/dist/css/mdb.min.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from "react-redux";
import Cookies from "js-cookie";
import { login } from "./Store";
import MainComponent from "./Components/MainComponent";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import BlogComponent from "./Components/BlogComponent";
import WriteComponent from "./Components/WriteComponent";
import "google-fonts-loader";
import FollowingBlogs from "./Components/FollowingBlogs";
import FooterComponent from "./Components/FooterComponent";
import MiniNav from "./Components/Feature/MiniNav";
import SearchBlogs from "./Components/SearchBlogs";




const App = () => {
  
  const disptach = useDispatch();
  Cookies.get("jwt") && disptach(login()); //helps to keep the user logged in on each load by checking jwt
  return (
    <>
      <BrowserRouter>
        <NavBar />
        <div className="container">
          <Routes>
            <Route path="/blog/:id" element={<BlogComponent />}></Route>
            <Route path="/" element={<MainComponent />}></Route>
            <Route path="/following" element={<FollowingBlogs />}></Route>
            <Route path="/write" element={<WriteComponent />}></Route>
            <Route path="/search/:term" element={<SearchBlogs/>}></Route>
          </Routes>
        </div>
        <ToastContainer />
      </BrowserRouter>
      <FooterComponent />
    </>
  );
};

export default App;
