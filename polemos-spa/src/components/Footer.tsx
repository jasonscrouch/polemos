import { Navbar, Container, Nav } from "react-bootstrap";
import { NavLink } from "react-router";

export default function Footer() {

    return(
            <Navbar className="bg-body-secondary mt-2">
                <Container>
                    <Nav>
                        <NavLink to="/about" className="nav-link">About</NavLink>
                        <NavLink to="/help" className="nav-link">Help</NavLink>
                    </Nav>
                </Container>
            </Navbar>
    );
}
