import { Container } from "react-bootstrap";

export default function About() {

    return(
        <>
            <Container className="display-5 fw-bold text-body-emphasis mb-1">What is Polemos?</Container>
            <Container className="lead">'Polemos' is the English transliteration of the Greek word πόλεμος</Container>
            <Container>Meaning 'war,' the creator of this application found it a most appropriate name. 
                Not only would the creation process be a struggle but also the end result. 
                As the name suggests, this application is built to help you create, battle, and review your combatant's statistics.
                I hope that you enjoy using it as much as I enjoyed making it.</Container>
        </>
    );
}
