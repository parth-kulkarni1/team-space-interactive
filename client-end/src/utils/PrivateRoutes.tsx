import { Outlet, Navigate } from "react-router-dom";
import {useEffect, useState} from "react"
import { findCookie } from "../AxiosCommands/AxiosCommands";
import { CookieResponse } from "../AxiosCommands/AxiosTypes";

function PrivateRoutes(){

    const [loggedIn,setLoggedIn] = useState({loggedIn: true, firstName: '', lastName: '', email:''})

    useEffect(() => {

        async function cookie(){
            const data = await findCookie();

            setLoggedIn(data)


        }

        cookie();

    }, [])

    
    return(
        loggedIn.loggedIn ? <Outlet /> : <Navigate to = "/Login" />
    )

}


export default PrivateRoutes