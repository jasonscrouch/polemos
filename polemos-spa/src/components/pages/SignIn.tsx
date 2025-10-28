import { Alert, Container, Form, Row, Col, Button, Image, Spinner } from "react-bootstrap";
import { Link, useNavigate } from "react-router";
import { useContext, useState } from "react";
import { AuthnContext } from "../../contexts/AuthnContext";
import { useLazyQuery } from "@apollo/client/react";
import { gql, type TypedDocumentNode } from "@apollo/client";

export default function SignIn() {

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
                        <label htmlFor="username" className="form-label">Username</label> 
                        <div className="input-group has-validation"> 
                            <span className="input-group-text">@</span> 
                            <input type="text" className="form-control" id={username} name={username} required />
                            <Container className="invalid-feedback">Please enter a {username}</Container>
                        </div>
                    </Col>
                    <Col lg="12">
                        <label htmlFor="email" className="form-label">Password</label> 
                        <input type="password" className="form-control" id={password} name={password} required/> 
                        <Container className="invalid-feedback">Please enter a {password}</Container> 
                    </Col>
                    <Col>
                        <Button className="w-100" type="submit">{loading && <Spinner size="sm" className="me-2"/>}Sign In</Button> 
                    </Col>
                </Row>
            </Form>
        </>
    );
}
