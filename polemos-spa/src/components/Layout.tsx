import NavigationBar from "./NavigationBar";
import { Outlet } from "react-router";
import { Container } from 'react-bootstrap';
import Footer from "./Footer";

export default function Layout()
{
    return (
        <>
            <NavigationBar />
            <Container>
                <Outlet />
            </Container>
            <Footer />
        </>
    );
}
