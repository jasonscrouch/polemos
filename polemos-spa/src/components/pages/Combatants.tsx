import { useContext, useState, type JSX } from "react";
import { AuthnContext } from "../../contexts/AuthnContext";
import { Alert, Col, Form, Row } from "react-bootstrap";
import FormInput from "../helpers/FormInput";
import SubmitButton from "../helpers/SubmitButton";

export default function Combatants(): JSX.Element {

    const authnContext = useContext(AuthnContext);
    const [isValidated, setIsValidated] = useState<boolean>(false);
    const name = "Name";

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        const form = e.currentTarget;

        setIsValidated(true);

        if (!form.checkValidity()) {
            return;
        }

        // todo: create formData utility that returns '' if null or undefined
        const formData = new FormData(form);
        const formUsername = formData.get(name)?.toString();

        if (!formUsername) {
            return;
        }

        //todo: complete this func
    }

    //todo: create this page
    // way to create a combatant
    // name
    // auto-create the other elements
    // auto add image (perhaps based on str or dex)
    // show list of created combatants
    // support localStorage creation for users who are not signed in

    return <>
        <Alert variant="info" show={authnContext.authnUser === undefined}>
            <Alert.Heading>You're not signed in!</Alert.Heading>
            <p>We'll keep you data locally.</p>
            <p>But we can't guarantee that you won't lose it.</p>
        </Alert>
        <Form className="needs-validation" validated={isValidated} noValidate onSubmit={(e) => handleSubmit(e)}> 
            <Row className="g-3"> 
                <Col lg="12"> 
                    <FormInput label="Name" name="Name" type="text" isRequired={true} invalidMessage="Please enter a username" shouldAutoFocus={true} />
                </Col>
                <Col>
                    <SubmitButton text="Create" variant="primary" isLoading={true} />
                </Col>
            </Row>
        </Form>
    </>;
}