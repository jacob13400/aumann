import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import {useRouter} from 'next/router';
import styles from './styles.module.css';

import Button from '../../Button';
import { getRoom } from '../../../lib/roomCreate';
import { getUser } from '../../../lib/userCreate';
import { convertData } from '../../../lib/encryptDecrypt';

export default function CreateModal(props) { 
  const [formState, setFormState] = React.useState({
    username: "",
  });

  const Router = useRouter();

  const onEnter = async () => {
    
    console.log("Sent: ", formState);
    
    const roomID = await getRoom(formState);
    var query = {username: formState.username, roomID: roomID};
    const userExists = await getUser(query);
    
    localStorage.setItem("username", formState.username);
    localStorage.setItem("roomID", formState.roomID);
    console.log("Room Switch: ", roomID)
    
    if (userExists){
      console.log('User Exists');
    }else{
      var query = {flag: true, message: roomID.toString()};
      var roomIDCoverted = convertData(query);

      var query = {flag: true, message: formState.username};
      var usernameCoverted = convertData(query);

      Router.push({pathname: "/buffer", query:{droom2021: roomIDCoverted, duser2021: usernameCoverted}});
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