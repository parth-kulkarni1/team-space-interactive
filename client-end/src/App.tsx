import React, {useState} from "react";
import { BrowserRouter, Route, Link, Routes} from "react-router-dom";

import 'bootstrap/dist/css/bootstrap.min.css';


/* Contains all relevant imports below */
import Header from "./Components/HeaderFooter/Header";
import WelcomePage from "./Components/LandingPage/WelcomePage";
import Footer from "./Components/HeaderFooter/Footer";

import Registration from "./Components/RegistrationPage/Registration";
import Login from "./Components/RegistrationPage/Login";

/* ------------------------------------ */


function App() {
  return (

    <BrowserRouter>

        <Header />

        <Routes>

          <Route path="/" element = {<WelcomePage />}></Route>
          <Route path="/Register" element = {<Registration />}></Route>
          <Route path="/Login" element = {<Login />}></Route>


        </Routes>

        <Footer />
        
    </BrowserRouter>


    
  );
}

export default App;
