import { Container } from "react-bootstrap";

export default function About() {

    // todo: a lot of similarities between this page and Help. Refactor.

    return(
        <div className="d-flex align-items-center text-center vh-100">
            <Container>
                <Container className="display-5 fw-bold text-body-emphasis mb-1">What is Polemos?</Container>
                <Container className="lead">'Polemos' is the English transliteration of the Greek word πόλεμος</Container>
                <Container>Meaning 'war,' the creator of this application found it a most appropriate name.</Container> 
                <Container>Not only would the creation process be a struggle but also the end result.</Container>
            </Container>
        </div>
    );
}
