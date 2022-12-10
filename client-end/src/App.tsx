import React, {useState} from "react";
import { BrowserRouter, Route, Link, Routes} from "react-router-dom";

import 'bootstrap/dist/css/bootstrap.min.css';

import { UserContextProvider } from "./Components/UserContext/UserContext";

/* Contains all relevant imports below */
import Header from "./Components/HeaderFooter/Header";
import WelcomePage from "./Components/LandingPage/WelcomePage";
import Footer from "./Components/HeaderFooter/Footer";

import Registration from "./Components/RegistrationPage/Registration";
import Login from "./Components/RegistrationPage/Login";
import Reset from "./Components/RegistrationPage/Reset";

import ProfilePage from "./Components/ProfilePage/ProfilePage";

/* ------------------------------------ */


function App() {

  return (

    <BrowserRouter>

       <UserContextProvider>
        
        <Header />

        <Routes>

          <Route path="/" element = {<WelcomePage />}></Route>
          <Route path="/Register" element = {<Registration />}></Route>
          <Route path="/Login" element = {<Login />}></Route>
          <Route path ="/Reset" element = {<Reset />}></Route>
          <Route path="/Profile" element = {<ProfilePage />}></Route>


        </Routes>

        <Footer />

        </UserContextProvider>
        
    </BrowserRouter>


    
  );
}

export default App;
