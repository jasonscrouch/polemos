import { Container } from "react-bootstrap";

export default function About() {

    return(
        <Container className="rounded-2 bg-body-tertiary p-2">
            <Container className="display-5 fw-bold text-body-emphasis mb-1">What is Polemos?</Container>
            <Container className="lead">'Polemos' is the English transliteration of the Greek word πόλεμος, which means 'war.'</Container>
            <Container>The creator of this application found it a most appropriate name when he first endeavored to create it. 
                Not only would the creation process be a struggle, but also the end result. As you use this application to create, battle, and review your statistics, you'll find Greek themes drawn upon throughout.
                We hope that you enjoy their use.
            </Container>
        </Container>
    );
}
