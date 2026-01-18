import { Container } from "react-bootstrap";
import { BrandText } from "../../utilities/css/Text";

export default function Help() {

    // todo: a lot of similarities between this and About. Refactor.

    return(
        <div className="d-flex align-items-center text-center">
            <Container>
                <Container className={BrandText("mb-1")}>Need help?</Container>
                <Container className="lead">We're here to lend a hand</Container>
                <Container>Reach out to us at <a href="mailto:help@polemos.com">help@polemos.com</a></Container>
            </Container>
        </div>
    );
}
