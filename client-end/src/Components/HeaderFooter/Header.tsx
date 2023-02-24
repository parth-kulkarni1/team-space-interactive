import React, {useContext, useEffect, useState} from "react";
import {LinkContainer} from 'react-router-bootstrap'



import {findCookie, logoutUser } from "../AxiosCommands/User/AxiosUserCommands";


import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { User, aUserContext } from "../Types/UserTypes";
import { UserContext } from "../Contexts/UserContext";


function Header(){

    const user = useContext(UserContext)

    async function handleLogout(){

        await logoutUser();

        user.setUser({loggedIn: false, id: 0, cover_background: '', firstName: '', lastName: '', profile_background: '', email: ''})
        
    }

    return(


        <Navbar bg="dark" expand="md" variant = "dark" className="fs-5">

          <Container>
            
       
            <Nav className="me-auto"> {/* This creates to the start of the navbar */}

                <Nav.Link>About</Nav.Link>
                <Nav.Link>Contact</Nav.Link>

            </Nav>



            <Nav className = "ms-auto"> {/* This align more towards the end of the navbar */}


                {user.user?.loggedIn === false &&

                <React.Fragment>

                <LinkContainer to = "/Register">
                    <Nav.Link>Sign Up</Nav.Link>
                </LinkContainer>

                <LinkContainer to = "/Login">
                    <Nav.Link>Log In</Nav.Link>

                </LinkContainer>

                </React.Fragment>


                }


                {user.user?.loggedIn === true &&

                <React.Fragment>

                    
                <LinkContainer to = "/Home">
                    <Nav.Link>Home</Nav.Link>
                </LinkContainer>

                <LinkContainer to = "/Profile">
                    <Nav.Link>Your Profile</Nav.Link>
                </LinkContainer>
                
                <LinkContainer to = "/">
                    <Nav.Link onClick = {handleLogout}>Log Out</Nav.Link>
                </LinkContainer>

                <Nav.Link>Add Tasks</Nav.Link>



                </React.Fragment>


                }

            </Nav>





            </Container>

        

    </Navbar>

    




    )

    }


export default Header;