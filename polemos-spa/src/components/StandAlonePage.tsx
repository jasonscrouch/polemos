import { Container } from "react-bootstrap";
import { Link } from "react-router";

interface Props {
    text: string,
    icon: string
}

export default function StandAlonePage({text, icon}: Props ) {

    return(
        <div className="d-flex align-items-center vh-100">
            <Container className="bg-body rounded-5 text-center p-2 w-25">
            <Container className={`${icon} fs-1`} />
            <Container className="fs-2">{text}</Container>
            <Link to='/' className="btn btn-primary" title="Home"><i className="bi bi-house me-1"></i>Home</Link>
            </Container>
        </div>
    );
}
