import React from 'react';
import Modal from 'react-bootstrap/Modal';
import styles from './styles.module.css';

import Button from '../../Button';

export default function AlertEmptyModal(props) { 
  return (
    <Modal
      {...props}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Invalid Estimate
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        You have to actually enter a value.  That number you saw there was a placeholder.
      </Modal.Body>
      <Modal.Footer>
        <Button type={"modal"} text={"Go Back"} action={props.onHide}></Button>
      </Modal.Footer>
    </Modal>
  );
}