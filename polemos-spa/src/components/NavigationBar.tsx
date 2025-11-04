import { useContext, useState } from 'react';
import { Container, Button, Nav, Navbar, Offcanvas } from 'react-bootstrap';
import { NavLink, Link } from 'react-router';
import { StyleContext } from '../contexts/StyleContext';
import { AuthnContext } from '../contexts/AuthnContext';

export default function NavigationBar() {

    const styleContext = useContext(StyleContext);
    const themeIcon = `bi bi-${!styleContext.isDark() ? 'moon' : 'sun'}-fill`;
    const themeTitle = `Swtich to ${!styleContext.isDark() ? 'Light' : 'Dark'} Mode`;

    const [showOffCanvas, setShowOffCanvas] = useState(false);

    const authnContext = useContext(AuthnContext);

    function handleSignOut() {
        const signedOut = authnContext.signOut();

        if (signedOut) {
            setShowOffCanvas(false);
        }
    }

  return (
    <>
        <Navbar className="bg-body-secondary mb-2">
            <Container>
                <Nav>
                    <NavLink className="navbar-brand fw-bold text-body-emphasis" to="/" title="Home">Polemos</NavLink>
                </Nav>
                <Container className='d-flex justify-content-end'>
                    <Button 
                        onClick={() => styleContext.setTheme()} 
                        variant='outline-secondary' 
                        className='rounded-circle me-2 border-0'
                        title={themeTitle}
                        >
                            <i className={`${themeIcon} text-body`}></i>
                    </Button>
                    { authnContext.authnUser ? <Button
                        variant='outline-secondary'
                        onClick={() => setShowOffCanvas(true)}
                        title="Me"
                        >
                            <i className="bi bi-person-circle text-body"></i>
                        </Button>
                        : <>
                            <Link className='btn btn-outline-success me-2' to='/signup' title="Sign Up">Sign Up</Link>
                            <Link className='btn btn-primary' to='/signin' title="Sign In">Sign In</Link>
                        </>
                    }
                </Container>
            </Container>
        </Navbar>
        <Offcanvas
            show={showOffCanvas}
            onHide={() => setShowOffCanvas(false)}
            placement="end"
            >
            <Offcanvas.Header closeButton></Offcanvas.Header>
            <Offcanvas.Body>
                <div className="fw-bold text-body-emphasis mb-1">Me</div> 
                <div>username: <span className='fw-bold'>{authnContext.authnUser?.username}</span></div>
                <div>email: <span className='fw-bold'>{authnContext.authnUser?.email}</span></div>
                <hr />
                <div className="fw-bold text-body-emphasis mb-1">Pages</div> 
                <NavLink to="/combatants" className="nav-link" onClick={() => setShowOffCanvas(false)}>Combatants</NavLink>
                <NavLink to="/battle" className="nav-link" onClick={() => setShowOffCanvas(false)}>Battle</NavLink>
                <NavLink to="/statistics" className="nav-link" onClick={() => setShowOffCanvas(false)}>Statistics</NavLink>
                <hr />
                <Button variant='secondary' onClick={() => handleSignOut()} >Sign Out</Button>
            </Offcanvas.Body>
        </Offcanvas>
    </>
  );
}
