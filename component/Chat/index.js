import React from 'react';
import Form from 'react-bootstrap/Form';
import styles from './styles.module.css';

const handleChat = (event, message, setMessage) => {
  event.preventDefault();
  console.log(message);
  setMessage("");
}

export default function Chat({type, text, action}) {
  const [message, setMessage] = React.useState("");

  return (
    <div className={styles.chatContainer}>
      <div className={styles.chat}>
        <div className={styles.messages}>
          <div className={styles.message}>
            <div className={styles.messageName}>
              whybevicky:
            </div>
            <div className={styles.messageText}>
              lol you guys suck
            </div>
          </div>
        </div>
        <div className={styles.input}>
          <Form onSubmit={event => {handleChat(event, message, setMessage)}}>
            <Form.Group controlId="roomID">
              <Form.Control type="text" placeholder="" value={message} onChange={val => {setMessage(val.target.value)}}/>
            </Form.Group>
          </Form>
        </div>
      </div>
    </div>
  )
}