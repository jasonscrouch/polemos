import { gql, type TypedDocumentNode } from "@apollo/client";
import { useMutation } from "@apollo/client/react";
import { useContext, useState } from "react";
import { Alert, Col, Container, Form, Image, Row } from "react-bootstrap";
import { useNavigate } from "react-router";
import { AuthnContext } from "../../contexts/AuthnContext";
import FormInput from "../helpers/FormInput";
import SubmitButton from "../helpers/SubmitButton";
import type { AddUserMutation, AddUserMutationVariables } from "../../Mutation/Types/AddUser";

export default function SignUp() {

    // todo: check if user already exists
    

    // todo: on success, we'll redirect Profile, making sure to update the "Sign In" button to userName
    // Profile will have userName and a list of your combatants
    // button to "Add" and "Battle"

    const authnContext = useContext(AuthnContext);
    const navigate = useNavigate();
    const [isValidated, setIsValidated] = useState<boolean>(false);

    const username = 'username';
    const password = 'password';
    const email = 'email';

    const ADD_USER: TypedDocumentNode<AddUserMutation, AddUserMutationVariables> = gql`
        mutation AddUser($input: AddUserInput!) {
            addUser(input: $input) {
                message
                success
                user {
                    email
                    id
                    name
                }
            }
        }
    `;

    const [ addUserMutation, { loading, error } ] = useMutation(ADD_USER)

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        const form = e.currentTarget;

        setIsValidated(true);

        if (!form.checkValidity()) {
            return;
        }

        // todo: create formData utility that returns '' if null or undefined
        const formData = new FormData(form);
        const formUsername = formData.get(username)?.toString();
        const formEmail = formData.get(email)?.toString();
        const formPassword = formData.get(password)?.toString();

        if (!formUsername 
            || !formEmail
            || !formPassword) {
            return;
        }

        addUserMutation({ variables: { input: { email: formEmail, password: formPassword, username: formUsername} } })
            .then((result) => {
                
                if (result.data?.addUser.success) {

                    const didSignIn = authnContext.signIn(result.data.addUser.user.id, result.data.addUser.user.name, result.data.addUser.user.email);

                    if (didSignIn) {
                        navigate('/');
                    } else {

                        // todo: create an error page with ability for user to email help
                        navigate('/error');
                    }
                }
            });
    }

    return (
        <>
            <Container className="py-3 text-center"> 
                <Image className="d-block mx-auto mb-4" src="/greek_helmet.png" alt="" width="72" height="57" /> 
                <p className="display-6 fw-bold text-body-emphasis">Sign Up for Polemos</p> 
            </Container>
            <Alert variant="danger" show={error !== undefined}>  
                <Alert.Heading>Something isn't right!</Alert.Heading>
                <p>Sign Up failed with the following error: '{error?.message}'</p>
                <p>
                    Contact <a className="alert-link" href="mailto:help@polemos.com?subject=Error">Help</a> for Support
                </p>
            </Alert>
            <Form className="needs-validation" validated={isValidated} noValidate onSubmit={(e) => handleSubmit(e)}> 
                <Row className="g-3"> 
                    <Col lg="12"> 
                        <FormInput label="Username" name={username} type="text" isRequired={true} invalidMessage="Please enter a username" shouldAutoFocus={true} />
                    </Col>
                    <Col lg="12"> 
                        <FormInput label="Email" name={email} type="email" isRequired={true} invalidMessage="Please enter a valid email" shouldAutoFocus={false} />
                    </Col>
                    <Col lg="12">
                        <FormInput label="Password" name={password} type="password" isRequired={true} invalidMessage="Please enter a password" shouldAutoFocus={false} />
                    </Col>
                    <Col>
                        <SubmitButton text="Sign Up" variant="success" isLoading={loading} />
                    </Col>
                </Row>
            </Form>
        </>
    );
}
