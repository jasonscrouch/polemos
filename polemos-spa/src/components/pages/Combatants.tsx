import { useContext, useState, type JSX } from "react";
import { AuthnContext } from "../../contexts/AuthnContext";
import { Alert, Col, Form, Row } from "react-bootstrap";
import FormInput from "../helpers/FormInput";
import SubmitButton from "../helpers/SubmitButton";
import type { AddCombatantMutation, AddCombatantMutationVariables } from "../../types/Mutation/AddCombatant";
import { gql, type TypedDocumentNode } from "@apollo/client";
import { useMutation } from "@apollo/client/react";

// todo: use this to test an authn user
// localStorage.setItem('authnUser', JSON.stringify({ id: 1, username: "jason", email: "jasonscrouch@gmail.com" }));

export default function Combatants(): JSX.Element {

    const authnContext = useContext(AuthnContext);
    const [isValidated, setIsValidated] = useState<boolean>(false);
    const name = "Name";

    const ADD_COMBATANT: TypedDocumentNode<AddCombatantMutation, AddCombatantMutationVariables> = gql`
        mutation AddCombatant($input: AddCombatantInput!) {
            addCombatant(input: $input) {
                message
                success
                combatant {
                    id
                    name
                }
            }
        }
    `;
        
    const [ addCombatantMutation, { loading, error } ] = useMutation(ADD_COMBATANT)

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        const form = e.currentTarget;

        setIsValidated(true);

        if (!form.checkValidity()) {
            return;
        }

        // todo: create formData utility that returns '' if null or undefined
        const formData = new FormData(form);
        const formName = formData.get(name)?.toString();

        if (!formName) {
            return;
        }

        addCombatantMutation({ variables: { input: { name: formName} } })
            .then((result) => {
                
                if (result.data?.addCombatant.success) {
                    // todo: add combatant to list of combatants
                    console.log(result.data.addCombatant.combatant.name);
                }
            });
    }

    //todo: create this page
    // way to create a combatant
    // name
    // auto-create the other elements
    // auto add image (perhaps based on str or dex)
    // show list of created combatants
    // support localStorage creation for users who are not signed in


    //todo: these alerts are styled the same. Create an alert wrapper for this.
    return <>
        <Alert variant="info" show={authnContext.authnUser === undefined} className="d-flex flex-column text-center">
            <Alert.Heading>You're not signed in!</Alert.Heading>
            <p>We'll keep your data locally.</p>
            <p>But we can't guarantee that you won't lose it.</p>
        </Alert>
        <Alert variant="danger" show={error !== undefined} className="d-flex flex-column text-center">  
            <Alert.Heading>Something isn't right!</Alert.Heading>
            <p>Creating the combatant failed with the following error: '{error?.message}'</p>
            <p>
                Contact <a className="alert-link" href="mailto:help@polemos.com?subject=Error">Help</a> for Support
            </p>
        </Alert>
        <Form className="needs-validation" validated={isValidated} noValidate onSubmit={(e) => handleSubmit(e)}> 
            <Row className="g-3"> 
                <Col lg="12"> 
                    <FormInput label="Name" name="Name" type="text" isRequired={true} invalidMessage="Please enter a username" shouldAutoFocus={true} />
                </Col>
                <Col>
                    <SubmitButton text="Create" variant="primary" isLoading={loading} />
                </Col>
            </Row>
        </Form>
    </>;
}