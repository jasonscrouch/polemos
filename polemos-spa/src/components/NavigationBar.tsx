import { useContext, useState } from 'react';
import { Container, Button, Nav, Navbar, Offcanvas } from 'react-bootstrap';
import { NavLink, Link } from 'react-router';
import { StyleContext } from '../contexts/StyleContext';
import { AuthnContext } from '../contexts/AuthnContext';

export default function NavigationBar() {

    // todo: need to get a user signed in to test off canvas

    const styleContext = useContext(StyleContext);
    const themeIcon = `bi bi-${!styleContext.isLight() ? 'sun' : 'moon'}-fill`;
    const themeTitle = `Swtich to ${!styleContext.isLight() ? 'Dark' : 'Light'} Mode`;

    const [showOffCanvas, setShowOffCanvas] = useState(false);

    const authnContext = useContext(AuthnContext);

  return (
    <>
        <Navbar className="bg-body-secondary mb-2">
            <Container>
                <Nav>
                    <NavLink className="navbar-brand" to="/" title="Home">Polemos</NavLink>
                </Nav>
                <Container className='d-flex justify-content-end'>
                    <Button 
                        onClick={() => styleContext.setTheme()} 
                        variant='outline-secondary' 
                        className='rounded-circle me-2'
                        title={themeTitle}
                        >
                            <i className={`${themeIcon} text-body`}></i>
                    </Button>
                    { authnContext.authnUser ? <Button
                        variant='outline-secondary'
                        onClick={() => setShowOffCanvas(true)}
                        title="Me"
                        >
                            {authnContext.authnUser.username}
                        </Button>
                        : <Link className='btn btn-outline-primary' to='/signin' title="Sign In">Sign In</Link>
                    }
                </Container>
            </Container>
        </Navbar>
        <Offcanvas
            show={showOffCanvas}
            onHide={() => setShowOffCanvas(false)}
            placement="end"
            >
            <Offcanvas.Header closeButton>
                <Offcanvas.Title>
                    Polemos
                </Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
                <Link to="/combatants" onClick={() => setShowOffCanvas(false)}>Combatants</Link>
                <Link to="/battle" onClick={() => setShowOffCanvas(false)}>Battle</Link>
                <Link to="/statistics" onClick={() => setShowOffCanvas(false)}>Statistics</Link>
            </Offcanvas.Body>
        </Offcanvas>
    </>
  );
}
