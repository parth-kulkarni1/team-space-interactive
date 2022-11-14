import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import 'bootstrap/dist/css/bootstrap.min.css';




function Header(){

    return(

        <div>

        <Navbar bg = "light">

            <Container>

                <Navbar.Brand href = "#home">Brand Link</Navbar.Brand>

            </Container>


        </Navbar>

        </div>

    )

    }


export default Header;