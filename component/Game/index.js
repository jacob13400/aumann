import React, { useEffect, useState } from 'react';
import Form from 'react-bootstrap/Form';
import styles from './styles.module.css';

import Button from '../../component/Button';
import LockModal from '../../component/Modals/LockModal';
import AlertEmptyModal from '../../component/Modals/AlertEmptyModal';
import AlertLimitModal from '../../component/Modals/AlertLimitModal';
import { updateUserEstimate } from '../../lib/userEstimate';
import { updateUserPoints } from '../../lib/userPoints';
// import { getScore } from '../../pages/api/calculateScore';


// Function to handle changing of value in the estimate input field - some values aren't allowed, like characters, etc.
const handleChange = async (value, def, props) => {
  if (!value || value.match(/^\d{1,}(\.\d{0,4})?$/)) {
    def(value);
  }
  if (value > 0 && value < 100){   
    const query = {username: props.username, roomID: Number(props.roomID), estimate: value};
    console.log("User Updated on change: ", query);
    const points = await updateUserEstimate(query);
  }
}

// Function to handle locking of the estimate input field
const handleLock = async (estimateValue, setLockModalShow, setLock, setAlertEmptyModalShow, setAlertLimitModalShow, props) => {
  setLockModalShow(false);
  // If the estimate field was empty
  if (estimateValue == "")
  {
    setAlertEmptyModalShow(true);
  }
  // If estimate was 0 or greater than 100
  else if (estimateValue == 0 || estimateValue >= 100)
  {
    setAlertLimitModalShow(true);
  }
  else
  {
    setLock(true);
    const query = {username: props.username, roomID: Number(props.roomID), estimate: estimateValue};
    // console.log("User Updated: ", query);
    const points = await updateUserEstimate(query);

  }
}

// Function to handle closing of the lock modal without confirmation
const handleLockClose = async (setLockModalShow) => {
  setLockModalShow(false);
}

var questionFlag = false;


export default function Game(props) {
  // Hook for question
  const [question, setQuestion] = React.useState("What is the air-speed velocity of an unladen swallow?");

  // Hook for user's answer
  const [answer, setAnswer] = React.useState("42");
  const [answerBool, setAnswerBool] = React.useState(false);

  // Modal show/hide flags
  const [lockModalShow, setLockModalShow] = React.useState(false);
  const [alertEmptyModalShow, setAlertEmptyModalShow] = React.useState(false);
  const [alertLimitModalShow, setAlertLimitModalShow] = React.useState(false);

  // Storing value entered in estimate input field
  const [estimateValue, setEstimateValue] = React.useState("75");

  // Whether estimate input field is accepting input
  const [lock, setLock] = React.useState(false);

  // Whether timer is still running - necessary to prevent infinite triggers of the setLock(true) call below
  const [flag, setFlag] = React.useState(true);

  const updatePoints = async () => {
    const query = {username: props.username, roomID: Number(props.roomID), estimate: Number(estimateValue), answerBool: answerBool};
    const points = await updateUserPoints(query);
    // console.log("User Updated - at Server: ", points);
  };

  // If timer has reached zero, lock the input field
  if(props.minutes == 0 && props.seconds == 0 && flag) {
    setLock(true);
    setFlag(false);

    // Calculating the user's score
    updatePoints();
  }

  const updateEstimate = async (estimate) => {
    const query = {username: props.username, roomID: Number(props.roomID), estimate: estimate};
    const points = await updateUserEstimate(query);

    // console.log("User Updated: ", points);
  };

  useEffect(() => {
    if(!questionFlag){
      if(props.userList[0]){
        if(props.userList[0].question != "What is the air-speed velocity of an unladen swallow?"){
          setQuestion(props.userList[0].question.replaceAll("&quot;", "\""));

          props.userList.map((player, index) => {
            if(player.username == props.username){
              setAnswer(player.answer);
              setAnswerBool(player.answerBool);
              setEstimateValue(player.estimate)
            }
          })

          questionFlag = true;
        }
      }
    }
  });


  return (
    <div className={styles.centre}>
      <div className={styles.question}>
        <div className={styles.questionText}>
          {question}
        </div>
      </div>
      <div className={styles.answer}>
        <div className={styles.yourAnswer}>
          Your Answer:
        </div>
        <div className={styles.answerText}>
          {answer}
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
                  onChange={(e) => {handleChange(e.target.value, setEstimateValue, props)}}/>
              </Form.Group>
            </Form>
          </div>
          <div className={styles.lockBox}>
            <Button type={"lock"} text={"Lock"} action={() => {updateEstimate(estimateValue); setLockModalShow(true);}}></Button>
          </div>
        </div>
      </div>
      <div className={styles.others}>
        <div className={styles.othersContainer}>
          {
            props.userList.map((player, index) => 
              // If player has locked in their choice, change colour of box border
              player.lock ?
                <div className={styles.otherBoxActive}>
                  <div className={styles.otherEstimate}>
                    {player.estimate}%
                  </div>
                  <div className={styles.otherName}>
                    {player.username}
                  </div>
                </div>
              :
                <div className={styles.otherBoxInactive}>
                  <div className={styles.otherEstimate}>
                    {player.estimate}%
                  </div>
                  <div className={styles.otherName}>
                    {player.username}
                  </div>
                </div>
            )
          }
        </div>
      </div>

      <LockModal
        show={lockModalShow}
        onConfirm={() => handleLock(estimateValue, setLockModalShow, setLock, setAlertEmptyModalShow, setAlertLimitModalShow, props)}
        onHide={() => handleLockClose(setLockModalShow)}
      />
      <AlertEmptyModal
        show={alertEmptyModalShow}
        onHide={() => setAlertEmptyModalShow(false)}
      />
      <AlertLimitModal
        show={alertLimitModalShow}
        onHide={() => setAlertLimitModalShow(false)}
      />
    </div>
  )
}