import React from 'react';
import Form from 'react-bootstrap/Form';
import styles from './styles.module.css';

import Button from '../../component/Button';
import LockModal from '../../component/Modals/LockModal';
import AlertEmptyModal from '../../component/Modals/AlertEmptyModal';
import AlertLimitModal from '../../component/Modals/AlertLimitModal';

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

export default function Game(props) {
  const [lockModalShow, setLockModalShow] = React.useState(false);
  const [alertEmptyModalShow, setAlertEmptyModalShow] = React.useState(false);
  const [alertLimitModalShow, setAlertLimitModalShow] = React.useState(false);
  const [estimateValue, setEstimateValue] = React.useState("");
  const [lock, setLock] = React.useState(false);

  return (
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