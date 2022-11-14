import {LinkContainer} from 'react-router-bootstrap'

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';




function Header(){

    return(

        <Navbar bg="dark" expand="md" variant = "dark" className="fs-5">
          <Container>
            
            <LinkContainer to = "/">
                <Navbar.Brand>
                        <img
                        alt=""
                        src="/images/"
                        width="30"
                        height="30"
                        className="d-inline-block align-top"
                        />{' '}
                        Team Space Interactive
                </Navbar.Brand>

           </LinkContainer>

       
            <Nav className="me-auto"> {/* This creates to the start of the navbar */}

                <Nav.Link>About</Nav.Link>
                <Nav.Link>Contact</Nav.Link>

            </Nav>

            <Nav className = "ms-auto"> {/* This align more towards the end of the navbar */}

                <LinkContainer to = "/Register">
                    <Nav.Link>Sign Up</Nav.Link>
                </LinkContainer>

                <LinkContainer to = "/Login">
                    <Nav.Link>Log In</Nav.Link>

                </LinkContainer>

            </Nav>

      </Container>
    </Navbar>


    )

    }


export default Header;