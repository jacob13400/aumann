import React from 'react';
import Form from 'react-bootstrap/Form';
import styles from './styles.module.css';

import Button from '../../component/Button';
import LockModal from '../../component/Modals/LockModal';
import AlertEmptyModal from '../../component/Modals/AlertEmptyModal';
import AlertLimitModal from '../../component/Modals/AlertLimitModal';
import { updateUserEstimate } from '../../lib/userEstimate';
import { updateUserPoints } from '../../lib/userPoints';
import { getScore } from '../../pages/api/calculateScore';


// Function to handle changing of value in the estimate input field - some values aren't allowed, like characters, etc.
const handleChange = (value, def) => {
  if (!value || value.match(/^\d{1,}(\.\d{0,4})?$/)) {
    def(value);
  }
}

// Function to handle locking of the estimate input field
const handleLock = (estimateValue, setLockModalShow, setLock, setAlertEmptyModalShow, setAlertLimitModalShow) => {
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
  }
}


export default function Game(props) {
  // Hook for question
  const [question, setQuestion] = React.useState("In the epic fantasy series Lord of the Rings, what was the birth name of the creature Gollum?");

  // Hook for user's answer
  const [answer, setAnswer] = React.useState("Deagol");

  // Modal show/hide flags
  const [lockModalShow, setLockModalShow] = React.useState(false);
  const [alertEmptyModalShow, setAlertEmptyModalShow] = React.useState(false);
  const [alertLimitModalShow, setAlertLimitModalShow] = React.useState(false);

  // Storing value entered in estimate input field
  const [estimateValue, setEstimateValue] = React.useState("25");

  // Whether estimate input field is accepting input
  const [lock, setLock] = React.useState(false);

  // Whether timer is still running - necessary to prevent infinite triggers of the setLock(true) call below
  const [flag, setFlag] = React.useState(true);


  // If timer has reached zero, lock the input field
  if(props.minutes == 0 && props.seconds == 0 && flag) {
    setLock(true);
    setFlag(false);

    // Calculating the user's score
    updatePoints();
  }

  const updatePoints = async () => {
    const query = {answer: false, estimate: estimateValue};
    const updateReturn = await getScore(query);

    console.log("User Updated: ", updateReturn);
  };

  const updateEstimate = async (estimate) => {
    const query = {username: props.username, roomID: props.roomID, estimate: estimate};
    const updateReturn = await updateUserEstimate(query);

    console.log("User Updated: ", updateReturn);

    const points = await updateUserPoints({points: updateReturn});
    console.log("User Updated - at Server: ", points);
  };


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
                  onChange={(e) => {handleChange(e.target.value, setEstimateValue)}}/>
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
              // If the player is the user, don't display box for them
              player.username != props.username ?
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
              :
                null
            )
          }
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
    </div>
  )
}