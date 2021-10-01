import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import {useRouter} from 'next/router';
import styles from './styles.module.css';

import Button from '../../Button';
import { getRoom } from '../../../lib/roomCreate';
import { getUser } from '../../../lib/userCreate';

export default function CreateModal(props) { 
  const [formState, setFormState] = React.useState({
    username: "",
  });

  const Router = useRouter();

  const onEnter = async () => {
    localStorage.setItem("username", formState.username);

    console.log("Sent: ", formState);

    const userExists = await getUser(formState);

    var room = null;
    if(!userExists){
      roomID = await getRoom(formState);
      localStorage.setItem("roomID", formState.roomID);
      console.log("Room Switch: ", room)
      
      Router.push({pathname: "/buffer", query: {roomID: roomID, username: formState.username}});
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
          Create a Room
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
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