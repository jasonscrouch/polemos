import { Container } from "react-bootstrap";
import NavigationBar from "./NavigationBar";
import { Outlet } from "react-router";

export default function Layout()
{
    return (
        <>
            <NavigationBar />
            <Container>
                <Outlet />
            </Container>
        </>
    );
}
