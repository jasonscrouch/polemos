import { Container } from "react-bootstrap";

export default function Help() {

    // todo: a lot of similarities between this and About. Refactor.

    return(
        <div className="d-flex align-items-center text-center vh-100">
            <Container>
                <Container className="display-5 fw-bold text-body-emphasis mb-1">Need help?</Container>
                <Container className="lead">We're here to lend a hand</Container>
                <Container>Reach out to us at <a href="mailto:help@polemos.com">help@polemos.com</a></Container>
            </Container>
        </div>
    );
}
