import { Alert, Container, Form, Row, Col, Image } from "react-bootstrap";
import { Link, useNavigate } from "react-router";
import { useContext, useState, type JSX } from "react";
import { AuthnContext } from "../../contexts/AuthnContext";
import { useLazyQuery } from "@apollo/client/react";
import { gql, type TypedDocumentNode } from "@apollo/client";
import FormInput from "../helpers/FormInput";
import SubmitButton from "../helpers/SubmitButton";

export default function SignIn(): JSX.Element {

    const [isValidated, setIsValidated] = useState<boolean>(false);

    const authnContext = useContext(AuthnContext);
    const navigate = useNavigate();

    const username = 'username';
    const password = 'password';

    type GetIsPasswordValidQuery = {
        isPasswordValid: boolean;
    }

    type GetIsPasswordValidVariables = {
        username: string;
        password: string;
    }

    const GET_IS_PASSWORD_VALID: TypedDocumentNode<GetIsPasswordValidQuery, GetIsPasswordValidVariables> = gql`
        query Query($username: String!, $password: String!) {
            isPasswordValid(username: $username, password: $password)
        }
    `;

    const [getIsPasswordValid, { loading, error }] = useLazyQuery(GET_IS_PASSWORD_VALID);

    // todo: export types like this because SignUp needs it too
    type User = {
        email: string;
        id: number;
        name: string
    };  

    type GetUserQuery = {
        user: User;
    }

    type GetUserQueryVariables = {
        username: string;
    }

    const GET_USER: TypedDocumentNode<GetUserQuery, GetUserQueryVariables> = gql`
        query User($username: String!) {
            user(username: $username) {
                email
                id
                name
            }
        }
    `;

    const [ getUser ] = useLazyQuery(GET_USER);

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

        getIsPasswordValid({ variables: { username: formUsername, password: formPassword }})
            .then(result => {
                if (result.data?.isPasswordValid) {

                    getUser({ variables: { username: formUsername } }).then(x => {

                        if (x.data?.user) {
                            const signedIn = authnContext.signIn(x.data.user.id, x.data.user.name, x.data.user.email);
                            
                            if (signedIn) {
                                navigate('/');
                            }
                            
                            // todo: else, handle sign in error
                        }

                        // todo: else, handle the error
                    });
                }
            });
    }

    // todo: why is the error not working?

    return ( 
        <>
            <Container className="py-3 text-center"> 
                <Image className="d-block mx-auto mb-4" src="/greek_helmet.png" alt="" width="72" height="57" /> 
                <p className="display-6 fw-bold text-body-emphasis">Sign In to Polemos</p> 
            </Container>
            { error && <Alert variant="danger">  
                <Alert.Heading>Something isn't right!</Alert.Heading>
                <p>Please enter your {username} and {password} again</p>
                <p>Need <Link to="/help" className="alert-link">help</Link>?</p>
            </Alert> }
            <Form className="needs-validation" validated={isValidated} noValidate onSubmit={(e) => handleSubmit(e)}> 
                <Row className="g-3"> 
                    <Col lg="12"> 
                        <FormInput label="Username" name={username} type="text" isRequired={true} invalidMessage="Please enter a username" shouldAutoFocus={true} />
                    </Col>
                    <Col lg="12">
                        <FormInput label="Password" name={password} type="password" isRequired={true} invalidMessage="Please enter a password" shouldAutoFocus={false} />
                    </Col>
                    <Col>
                        <SubmitButton text="Sign In" variant="primary" isLoading={loading} />
                    </Col>
                </Row>
            </Form>
        </>
    );
}
