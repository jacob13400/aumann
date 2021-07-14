import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import Form from 'react-bootstrap/Form';
import Button from '../../component/Button';
import Modal from 'react-bootstrap/Modal';
import styles from './styles.module.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const handleChange = (value, def) => {
  if (!value || value.match(/^\d{1,}(\.\d{0,4})?$/)) {
    def(value);
  }
}

const handleLock = (estimateValue, setLockModalShow, setLock, setAlertEmptyModalShow, setAlertLimitModalShow) => {
  setLockModalShow(false);
  if (estimateValue == "")
  {
    setAlertEmptyModalShow(true);
  }
  else if (estimateValue == 0 || estimateValue >= 100)
  {
    setAlertLimitModalShow(true);
  }
  else
  {
    setLock(true);
  }
}

const handleChat = (event, message, setMessage) => {
  event.preventDefault();
  console.log(message);
  setMessage("");
}

function LockModal(props) {
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

function AlertEmptyModal(props) {
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

function AlertLimitModal(props) {
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

function UserListModal(props) {
  return(
    <Modal
      {...props}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Leaderboard
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {
          props.userList.map((player, index) => 
            <div className={styles.playerModal}>
              <div className={styles.playerNoModal}>
                #{index + 1}
              </div>
              <div className={styles.playerDetailsModal}>
                <div className={styles.playerNameModal}>
                  {player.username}
                  {player.username == props.username ? " (You)" : null}
                </div>
                <div className={styles.playerPointsModal}>
                  Points: {player.points}
                </div>
              </div>
            </div>
          )
        }
      </Modal.Body>
    </Modal>
  );
}

export default function Room() {
  const username = "jozdien";
  const [lockModalShow, setLockModalShow] = React.useState(false);
  const [alertEmptyModalShow, setAlertEmptyModalShow] = React.useState(false);
  const [alertLimitModalShow, setAlertLimitModalShow] = React.useState(false);
  const [userListModalShow, setUserListModalShow] = React.useState(false);
  const [estimateValue, setEstimateValue] = React.useState("");
  const [lock, setLock] = React.useState(false);
  const [message, setMessage] = React.useState("");
  const [userList, setUserList] = React.useState([{ id: 0, username: 'jozdien', roomID: 0, points: 0 }, { id: 1, username: 'zeref', roomID: 0, points: 0 },
                                                  { id: 2, username: 'su', roomID: 0, points: 0 }, { id: 3, username: 'whybevicky', roomID: 0, points: 0 }]);
  const [minutes, setMinutes] = React.useState(5);
  const [seconds, setSeconds] = React.useState(0);

  const getUserList = async () => {

    const room = localStorage.getItem("roomID");
    try{
        const res = await fetch("http://localhost:3000/api/user", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({room}),
        })
        const data = await res.json();
        
        setTimeout(function(){ 
          console.log("Timeout for function refresh!");
          setUserList(data.result); 
          console.log(userList);
        }, 500);
        
        }
        catch (error) {
          console.log(error)
        }
    }

  
  useEffect(() => {
      getUserList();
    })
  


  return (
    <div className={styles.container}>
      <Head>
        <title>Room - Aumann's Game</title>
        <link rel="icon" href="../icons/logo.png" />
      </Head>

      <main className={styles.main}>
        <div className={styles.top}>
          <div className={styles.logo}>
            <a className={styles.logoLink} href="../" target="_blank"></a>
          </div>
          <div className={styles.roundMobile} onClick ={() => setUserListModalShow(true)}>
            Round 1
          </div>
          <div className={styles.timerMobile}>
            05:00
          </div>
        </div>
        <div className={styles.padTopRound}>
        </div>
        <div className={styles.round}>
          Round 1
        </div>
        <div className={styles.body}>
          <div className={styles.listContainer}>
            <div className={styles.list}>
              <div className={styles.listTitle}>
                Players
              </div>
              <div className={styles.listPlayers}>
                {
                  userList.map((player, index) => 
                    <div className={styles.player}>
                      <div className={styles.playerNo}>
                        #{index + 1}
                      </div>
                      <div className={styles.playerDetails}>
                        <div className={styles.playerName}>
                          {player.username}
                          {player.username == username ? " (You)" : null}
                        </div>
                        <div className={styles.playerPoints}>
                          Points: {player.points}
                        </div>
                      </div>
                    </div>
                  )
                }
              </div>
            </div>
          </div>
          <div className={styles.centre}>
            <div className={styles.question}>
              <div className={styles.questionText}>
                In the epic fantasy series Lord of the Rings, what was the birth name of the creature Gollum?
              </div>
            </div>
            <div className={styles.answer}>
              <div className={styles.yourAnswer}>
                Your Answer:
              </div>
              <div className={styles.answerText}>
                Deagol
              </div>
            </div>
            <div className={styles.estimate}>
              <div className={styles.yourEstimate}>
                Your Estimate:
              </div>
              <div className={styles.estimateBoxes}>
                <div className={styles.estimateInput}>
                  <Form onSubmit={(event) => {event.preventDefault()}}>
                    <Form.Group controlId="estimate">
                      <Form.Control className={styles.number} type="text" placeholder="33.33" disabled={lock} value={estimateValue} 
                        onChange={(e) => {handleChange(e.target.value, setEstimateValue)}}/>
                    </Form.Group>
                  </Form>
                </div>
                <div className={styles.lockBox}>
                  <Button type={"lock"} text={"Lock"} action={() => setLockModalShow(true)}></Button>
                </div>
              </div>
            </div>
            <div className={styles.others}>
              <div className={styles.othersContainer}>
                <div className={styles.otherBoxInactive}>
                  <div className={styles.otherEstimate}>
                    75%
                  </div>
                  <div className={styles.otherName}>
                    su
                  </div>
                </div>
                <div className={styles.otherBoxInactive}>
                  <div className={styles.otherEstimate}>
                    75%
                  </div>
                  <div className={styles.otherName}>
                    su
                  </div>
                </div>
                <div className={styles.otherBoxInactive}>
                  <div className={styles.otherEstimate}>
                    10%
                  </div>
                  <div className={styles.otherName}>
                    whybevickywhybevicky
                  </div>
                </div>
              </div>
            </div>
          </div>
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
        </div>
        <div className={styles.padBodyBottom}>
        </div>
        <div className={styles.bottom}>
          <div className={styles.timer}>
            05:00
          </div>
        </div>
        <LockModal
          show={lockModalShow}
          onHide={() => handleLock(estimateValue, setLockModalShow, setLock, setAlertEmptyModalShow, setAlertLimitModalShow)}
        />
        <AlertEmptyModal
          show={alertEmptyModalShow}
          onHide={() => setAlertEmptyModalShow(false)}
        />
        <AlertLimitModal
          show={alertLimitModalShow}
          onHide={() => setAlertLimitModalShow(false)}
        />
        <UserListModal
          show={userListModalShow}
          onHide={() => setUserListModalShow(false)}
          userList={userList}
          username={username}
        />
      </main>
    </div>
  )
}