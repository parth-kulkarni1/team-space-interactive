import React, {useContext, useEffect, useState} from "react";
import {LinkContainer} from 'react-router-bootstrap'
import { UserContext } from '../UserContext/UserContext';


import { findCookie, logoutUser } from "../../AxiosCommands/AxiosCommands";


import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import {useNavigate } from "react-router-dom";


function Header(){


    type User = {
        email: string, 
        firstName: string, 
        lastName: string, 
        password: string
    }


    type Cookie = {
        loggedIn: boolean, 
        user: User

    }

    const user = useContext(UserContext)

    const navigate = useNavigate();

    const [loggedIn, setLoggedIn] = useState(false);

    const [cookie, setCookie] = useState<Cookie | null>(null);

    useEffect(() =>{

        async function InitaliseCookie(){

        const userData: Cookie = await findCookie(); // find the cookie and see if it's present


        if (userData.loggedIn === false){
            setLoggedIn(false)
        }

        else{
            setLoggedIn(true)
            setCookie(userData)
        }

        }


        InitaliseCookie();


    }, [user])



    async function handleLogout(){

        await logoutUser();

        setCookie(null)
        setLoggedIn(false)

        
    }

    return(


        <Navbar bg="dark" expand="md" variant = "dark" className="fs-5">

          <Container>
            
       
            <Nav className="me-auto"> {/* This creates to the start of the navbar */}

                <Nav.Link>About</Nav.Link>
                <Nav.Link>Contact</Nav.Link>

            </Nav>



            <Nav className = "ms-auto"> {/* This align more towards the end of the navbar */}


                {loggedIn === false &&

                <React.Fragment>

                <LinkContainer to = "/Register">
                    <Nav.Link>Sign Up</Nav.Link>
                </LinkContainer>

                <LinkContainer to = "/Login">
                    <Nav.Link>Log In</Nav.Link>

                </LinkContainer>

                </React.Fragment>


                }


                {loggedIn === true &&

                <React.Fragment>

                <LinkContainer to = "/Profile">
                    <Nav.Link>Your Profile</Nav.Link>
                </LinkContainer>
                
                <LinkContainer to = "/">
                    <Nav.Link onClick = {handleLogout}>Log Out</Nav.Link>
                </LinkContainer>

                <LinkContainer to = "/Login">
                    <Nav.Link>Welcome - {cookie?.user.firstName}</Nav.Link>
                </LinkContainer>

            



                </React.Fragment>


                }

            </Nav>





            </Container>

        

    </Navbar>

    




    )

    }


export default Header;