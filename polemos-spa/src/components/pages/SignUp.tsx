import { Button, Col, Container, Image, Row } from "react-bootstrap";

export default function SignUp() {

// todo: enable this to actually work

function handleOnSubmit(e: React.FormEvent) {
    e.preventDefault();

    // toggle to Bootstrap "was-validated" class on the form element
    // ensure that there are no errors

    // todo: check if user already exists
    // if so, then return error
    // else, proceed

    // todo: on sucess, we'll redirect Profile, making sure to update the "Sign In" button to userName
    // Profile will have userName and a list of your combatants
    // button to "Add" and "Battle"

}

    return (
        <>
            <Container className="py-3 text-center"> 
                <Image className="d-block mx-auto mb-4" src="/greek_helmet.png" alt="" width="72" height="57" /> 
                <p className="display-6 fw-bold text-body-emphasis">Sign Up for Polemos</p> 
            </Container>
            <form className="needs-validation" noValidate onSubmit={(e) => handleOnSubmit(e)}> 
                <Row className="g-3"> 
                    <Col lg="12"> 
                        <label htmlFor="username" className="form-label">Username</label> 
                        <div className="input-group has-validation"> 
                            <span className="input-group-text">@</span> 
                            <input type="text" className="form-control" id="username" placeholder="" required />
                            <Container className="invalid-feedback">Please enter a username.</Container>
                        </div>
                    </Col>
                    <Col lg="12"> 
                        <label htmlFor="email" className="form-label">Email</label> 
                        <input type="email" className="form-control" id="email" placeholder="" required/> 
                        <Container className="invalid-feedback">Please enter a valid email address.</Container> 
                    </Col>
                    <Col lg="12">
                        <label htmlFor="email" className="form-label">Password</label> 
                        <input type="password" className="form-control" id="password" placeholder="" required/> 
                        <Container className="invalid-feedback">Please enter a password.</Container> 
                    </Col>
                    <Col>
                        <Button className="w-100" type="submit">Sign Up</Button> 
                    </Col>
                </Row>
            </form>
        </>
    );
}
