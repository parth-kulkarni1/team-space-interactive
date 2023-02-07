import React, {useContext, useState} from "react";
import { BrowserRouter, Route, Link, Routes} from "react-router-dom";

/*import all neccessary theme packages */
import 'bootstrap/dist/css/bootstrap.min.css';
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

import PrivateRoutes from "../src/Components/utils/PrivateRoutes";
import { UserContextProvider } from "./Components/Contexts/UserContext";


/* Contains all relevant imports below */
import Header from "./Components/HeaderFooter/Header";
import WelcomePage from "./Components/LandingPage/WelcomePage";
import Footer from "./Components/HeaderFooter/Footer";

import Registration from "./Components/RegistrationPage/Registration";
import Login from "./Components/RegistrationPage/Login";
import Reset from "./Components/RegistrationPage/Reset";

import ProfilePage from "./Components/ProfilePage/ProfilePage";
import ChangePassword from "./Components/ProfilePage/ChangePassword";

import Home from "./Components/Home/Home";
import { PostsContextProvider } from "./Components/Contexts/PostContext";
import PostList from "./Components/Post/Posts";

/* ------------------------------------ */


function App() {

  

  return (

    <BrowserRouter>

     <UserContextProvider>

     <PostsContextProvider>


      <ToastContainer position="top-right" />
  
        <Header />

        <Routes>

          
          <Route path="/" element = {<WelcomePage />}></Route>
          <Route path="/Register" element = {<Registration />}></Route>
          <Route path="/Login" element = {<Login />}></Route>
          <Route path ="/Reset" element = {<Reset />}></Route>

          <Route element = {<PrivateRoutes />} >
            <Route path="/Profile" element = {<ProfilePage />}></Route>
            <Route path="/ChangePassword" element = {<ChangePassword />}></Route>
              <Route path = "/Home" element = {<Home />}></Route>
          
          </Route>
          

        </Routes>

        <Footer />

        </PostsContextProvider>



        </UserContextProvider>

        
    </BrowserRouter>


    
  );
}

export default App;
