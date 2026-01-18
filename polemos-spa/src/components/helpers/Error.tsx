import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { BrandText } from '../../utilities/css/Text';
import { Alert } from 'react-bootstrap';

interface Props {
    show: boolean;
    message: string;
}

//todo: hook up help support to send error report
//todo: add this to every place an error could be

export function Error({ show, message }: Props) {

    const [showModal, setShowModal] = React.useState(show);
    
    const body = `Attention Polemos, \n\n I received the following error message: \n '${message}'. \n\n Thank you for your help, \n\n`;

  return (
    <Modal
        show={showModal}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        onHide={() => setShowModal(false)}
    >
        <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter" className={BrandText()}>
                Something isn't right!
            </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Alert variant='danger' className='d-flex flex-column justify-content-center align-items-center'>
                <Alert.Heading>We failed with the following error:</Alert.Heading>
                <div>'{message}'</div>
            </Alert>
        </Modal.Body>
        <Modal.Footer>
            <a className='btn btn-secondary' title='Email Help for Support' href={`mailto:help@polemos.com?subject=Error&body=${body}`}>Email Help for Support</a>
            <Button title='Send an error report to Help' onClick={() => setShowModal(false)}>Send Error Report</Button>
        </Modal.Footer>
    </Modal>
  );
}
