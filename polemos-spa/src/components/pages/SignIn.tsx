import { Container, Row, Col, Button, Image } from "react-bootstrap";
import { Link } from "react-router";

export default function SignIn() {

    // todo: enable this to actually work

    return ( 
        <>
            <Container className="py-3 text-center"> 
                <Image className="d-block mx-auto mb-4" src="/greek_helmet.png" alt="" width="72" height="57" /> 
                <p className="display-6 fw-bold text-body-emphasis">Sign In to Polemos</p> 
            </Container>
            <form className="needs-validation" noValidate onSubmit={(e) => {e.preventDefault()}}> 
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
                        <label htmlFor="email" className="form-label">Password</label> 
                        <input type="password" className="form-control" id="password" placeholder="" required/> 
                        <Container className="invalid-feedback">Please enter a password.</Container> 
                    </Col>
                    <Col>
                        <Button className="w-100" type="submit">Sign In</Button> 
                    </Col>
                </Row>
            </form>
            <hr className="my-4" />
            <Container className="text-center"> 
                <p className="">New here?</p> 
                <Link to="/signup" className="btn btn-danger">Sign Up</Link>
            </Container>
        </>
    );
}
