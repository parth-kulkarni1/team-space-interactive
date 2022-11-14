import React, {useState} from "react";
import { BrowserRouter, Route, Link, Routes} from "react-router-dom";

import 'bootstrap/dist/css/bootstrap.min.css';


/* Contains all relevant imports below */
import Header from "./Components/HeaderFooter/Header";
import WelcomePage from "./Components/Registration/WelcomePage";
/* ------------------------------------ */


function App() {
  return (

    <BrowserRouter>

        <Header />

        <Routes>

          <Route path="/" element = {<WelcomePage />}></Route>

        </Routes>


    
    
    
    </BrowserRouter>


    
  );
}

export default App;
