import Modal from 'react-bootstrap/Modal';
import styles from './styles.module.css';

import Button from '../../Button';

export default function AlertMessageModal(props) { 
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      scrollable="true"
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Alert
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4>{props.message}</h4>
      </Modal.Body>
      <Modal.Footer>
        <Button type={"modal"} text={"OK"} action={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  )
}