import { Alert, Container, Form, Row, Col, Button, Image } from "react-bootstrap";
import { Link } from "react-router";
import { useState } from "react";
//import { AuthnContext } from "../../contexts/AuthnContext";

export default function SignIn() {

    // todo: enable this to actually work
    //const [isValid, setIsValid] = useState<boolean>(true);
    const [isValidated, setIsValidated] = useState<boolean>(false);

    //const authnContext = useContext(AuthnContext);
    const username = 'username';
    const password = 'password';

    function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        const form = e.currentTarget;
        setIsValidated(true);

        if (!form.checkValidity()) {
            return;
        }

        // todo: make this work

        // const data = new FormData(form);
        // const name = data.get(username);
        // const pass = data.get(password);

        // if this method returns false, then show the alert
        //authnContext.signIn(name, pass);
    }

    return ( 
        <>
            <Alert variant="danger">  
                <Alert.Heading>Something isn't quite right!</Alert.Heading>
                <p>Please enter your {username} and {password} again.</p>
                <p>Need <Link to="/help" className="alert-link">help</Link>?</p>
            </Alert>
            <Container className="py-3 text-center"> 
                <Image className="d-block mx-auto mb-4" src="/greek_helmet.png" alt="" width="72" height="57" /> 
                <p className="display-6 fw-bold text-body-emphasis">Sign In to Polemos</p> 
            </Container>
            <Form className="needs-validation" validated={isValidated} noValidate onSubmit={handleSubmit}> 
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
                        <Button className="w-100" type="submit">Sign In</Button> 
                    </Col>
                </Row>
            </Form>
        </>
    );
}
