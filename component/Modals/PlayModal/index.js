import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import styles from './styles.module.css';

import Button from '../../Button';
import { getRoom } from '../../../pages/api/room';

export default function PlayModal(props) { 
  const [formState, setFormState] = React.useState({
    roomID: "",
    username: "",
  });


  const onEnter = async () => {
    localStorage.setItem("username", formState.username);
    localStorage.setItem("roomID", formState.roomID);

    console.log("Sent: ", formState)
    var room = await getRoom(formState);

    // fetch("http://localhost:3000/api/room", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //     Accept: "application/json",
    //   },
    //   body: JSON.stringify(formState),
    // })
    //   .then((res) => res.json())
    //   .then((res) => {
    //     Router.push({pathname: "/room", roomID: formState.roomID});
    //   })
    //   .catch(console.log);

  }

  return (
    <Modal
      {...props}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Enter Room ID
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="roomID">
            <Form.Label>Room ID</Form.Label>
            <Form.Control 
              type="text" 
              placeholder="eg: AEF123" 
              onChange={(e) => 
                setFormState({ ...formState, roomID: e.target.value})
              }
              value={formState.roomID}
            />
          </Form.Group>
          <Form.Group controlId="username">
            <Form.Label>Username</Form.Label>
            <Form.Control 
              type="text" 
              placeholder="Enter your name" 
              onChange={(e) => 
                setFormState({ ...formState, username: e.target.value})
              }
              value={formState.username}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button type={"modal"} text={"Enter"} action={onEnter}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}