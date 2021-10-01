import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import {useRouter} from 'next/router';
import styles from './styles.module.css';

import Button from '../../Button';
import { addUserRoom } from '../../../lib/roomUserAdd';
import { getUser } from '../../../lib/userCreate';

export default function JoinModal(props) { 
  const [formState, setFormState] = React.useState({
    roomID: "",
    username: "",
  });

  const Router = useRouter();

  const onEnter = async () => {
    localStorage.setItem("username", formState.username);
    localStorage.setItem("roomID", formState.roomID);

    console.log("Sent: ", formState);

    const userExists = await getUser(formState);

    if(!userExists){
      var roomExists = await addUserRoom(formState);
      
      if (roomExists){
        Router.push({pathname: "/buffer", query: {roomID: formState.roomID, username: formState.username}});
      }
      else{
        console.log("Room does not Exists");
      }
    }
    else{
      console.log("User Already Exists");
    }
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
          Join a Room
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
              placeholder="Enter display name" 
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