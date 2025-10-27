import NavigationBar from "./NavigationBar";
import { Outlet } from "react-router";
import { Container, Button, Nav, Navbar, Offcanvas } from 'react-bootstrap';
import { NavLink } from 'react-router';

export default function Layout()
{
    // todo: move the bottom navbar to Footer.tsx

    return (
        <>
            <NavigationBar />
            <Container>
                <Outlet />
            </Container>
            <Navbar className="bg-body-secondary mt-2">
                <Container>
                    <Nav>
                        <NavLink to="/about" className="nav-link">About</NavLink>
                        <NavLink to="/help" className="nav-link">Help</NavLink>
                    </Nav>
                </Container>
            </Navbar>
        </>
    );
}
