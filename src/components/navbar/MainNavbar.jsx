import { Container } from "react-bootstrap";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

import { BiMoviePlay } from "react-icons/bi";
import "./MainNavbar.scss";

function MainNavbar() {
    return (
        <>
            <Navbar className="flex-column navbar-section ">
                <Container>
                    <Navbar.Brand href="#home" className="text-left ">
                        <div className="d-flex align-items-center">
                            <div>
                                <BiMoviePlay size={30} />
                            </div>
                            <div className="ml-2">MovieFinder</div>
                        </div>
                    </Navbar.Brand>
                    <Nav>
                        <Nav.Link href="#home">Home</Nav.Link>
                        <Nav.Link href="#features">Features</Nav.Link>
                        <Nav.Link href="#pricing">Pricing</Nav.Link>
                    </Nav>
                </Container>
            </Navbar>
        </>
    );
}

export default MainNavbar;
