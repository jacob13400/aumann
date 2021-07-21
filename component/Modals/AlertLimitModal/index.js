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
        Estimates of 0 or 100 and above crash logarithmic systems.  Don't be mean to the logarithmic systems.
      </Modal.Body>
      <Modal.Footer>
        <Button type={"modal"} text={"Go Back"} action={props.onHide}></Button>
      </Modal.Footer>
    </Modal>
  );
}