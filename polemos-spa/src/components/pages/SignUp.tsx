import { gql, type TypedDocumentNode } from "@apollo/client";
import { useMutation } from "@apollo/client/react";
import { useContext, useState } from "react";
import { Alert, Col, Container, Form, Image, Row } from "react-bootstrap";
import { Link, useNavigate } from "react-router";
import { AuthnContext } from "../../contexts/AuthnContext";
import FormInput from "../helpers/FormInput";
import SubmitButton from "../helpers/SubmitButton";

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

    // todo: export types like this because SignIn needs it too
    type User = {
        email: string;
        id: number;
        name: string
    };

    type AddUserMutationVariables = {
        input: {
            email: string;
            password: string;
            username: string;
        }
    }

    type AddUserMutation = {
        addUser: {
            message : string;
            success: boolean;
            user: User;
        }
    }

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

        if (!form.checkValidity()) {
            setIsValidated(true);
            return;
        }

        const formData = new FormData(form);
        const formUsername = formData.get(username) as string;
        const formPassword = formData.get(password) as string;
        const formEmail = formData.get(email) as string;

        addUserMutation({ variables: { input: { email: formEmail, password: formPassword, username: formUsername} } })
            .then((result) => {
                
                if (result.data?.addUser.success) {
                    authnContext.signIn(result.data.addUser.user.id, result.data.addUser.user.name, result.data.addUser.user.email);
                    navigate('/');
                }

                // todo: else, inform the user of the error message from GraphQL
            });
    }

    // todo: why is the error not working?

    return (
        <>
            <Container className="py-3 text-center"> 
                <Image className="d-block mx-auto mb-4" src="/greek_helmet.png" alt="" width="72" height="57" /> 
                <p className="display-6 fw-bold text-body-emphasis">Sign Up for Polemos</p> 
            </Container>
            { error && <Alert variant="danger">  
                <Alert.Heading>Something isn't right!</Alert.Heading>
                <p>Please enter a {username}, {email}, and {password} again</p>
                <p>Need <Link to="/help" className="alert-link">help</Link>?</p>
            </Alert> }
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
