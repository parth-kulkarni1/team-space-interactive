import React, {useContext} from "react";
import {LinkContainer} from 'react-router-bootstrap'
import { UserContext } from '../UserContext/UserContext';


import {logoutUser } from "../../AxiosCommands/AxiosCommands";


import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';


function Header(){


    const user = useContext(UserContext)

    console.log(user.user, "bhh")


    async function handleLogout(){

        await logoutUser();

        user.setUser(null)
        
    }

    return(


        <Navbar bg="dark" expand="md" variant = "dark" className="fs-5">

          <Container>
            
       
            <Nav className="me-auto"> {/* This creates to the start of the navbar */}

                <Nav.Link>About</Nav.Link>
                <Nav.Link>Contact</Nav.Link>

            </Nav>



            <Nav className = "ms-auto"> {/* This align more towards the end of the navbar */}


                {user.user?.loggedIn === undefined &&

                <React.Fragment>

                <LinkContainer to = "/Register">
                    <Nav.Link>Sign Up</Nav.Link>
                </LinkContainer>

                <LinkContainer to = "/Login">
                    <Nav.Link>Log In</Nav.Link>

                </LinkContainer>

                </React.Fragment>


                }


                {user?.user?.loggedIn === true &&

                <React.Fragment>

                <LinkContainer to = "/Profile">
                    <Nav.Link>Your Profile</Nav.Link>
                </LinkContainer>
                
                <LinkContainer to = "/">
                    <Nav.Link onClick = {handleLogout}>Log Out</Nav.Link>
                </LinkContainer>

                <LinkContainer to = "/Login">
                    <Nav.Link className="text-muted">Welcome - {user?.user.firstName}</Nav.Link>
                </LinkContainer>

            



                </React.Fragment>


                }

            </Nav>





            </Container>

        

    </Navbar>

    




    )

    }


export default Header;