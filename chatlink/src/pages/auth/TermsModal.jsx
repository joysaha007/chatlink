import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const TermsModal = ({ show, handleClose }) => {
  return (
    <Modal show={show} onHide={handleClose} size="lg" >
      <Modal.Header closeButton > 
        <Modal.Title>Terms of Service - ChatLink</Modal.Title>
      </Modal.Header>
      <Modal.Body >
        <h3 className='text-center text-primary'>Welcome to ChatLink!</h3>
        <p className='text-center' style={{fontSize:'12px'}}>
          By using ChatLink, you agree to the following terms and conditions. Please read them carefully before proceeding.
        </p>

        <h6>1. Account Registration</h6>
        <p>
          You must be at least 13 years old to create an account on ChatLink. By registering, you agree to provide accurate and up-to-date information. You are responsible for maintaining the confidentiality of your account credentials.
        </p>

        <h6>2. User Conduct</h6>
        <p>
          You agree to use ChatLink in a manner that is respectful to others. Harassment, hate speech, and illegal activities are prohibited. Content that violates our community guidelines will be removed, and accounts may be suspended or banned.
        </p>

        <h6>3. Privacy and Data Collection</h6>
        <p>
          We respect your privacy. ChatLink collects data to improve user experience, including personal information and activity data. Please refer to our Privacy Policy for more details on how your data is handled.
        </p>

        <h6>4. Termination of Service</h6>
        <p>
          ChatLink reserves the right to suspend or terminate accounts that violate our terms of service. If your account is terminated, you will lose access to your content and any associated data.
        </p>

        <h6>5. Limitation of Liability</h6>
        <p>
          ChatLink is not liable for any damages arising from the use or inability to use the platform. We make no warranties regarding the availability, accuracy, or reliability of the service.
        </p>

      </Modal.Body>
      <Modal.Footer>
        <Button variant="danger" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default TermsModal;
