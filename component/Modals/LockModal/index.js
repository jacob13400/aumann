import React from 'react';
import Modal from 'react-bootstrap/Modal';
import styles from './styles.module.css';

import Button from '../../Button';

export default function LockModal(props) { 
  return (
    <Modal
      {...props}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Point of No Return
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        Are you sure you want to lock your choice?  You won't be able to change it again this round.
      </Modal.Body>
      <Modal.Footer>
        <Button type={"modal"} text={"Yes"} action={props.onHide}></Button>
      </Modal.Footer>
    </Modal>
  );
}