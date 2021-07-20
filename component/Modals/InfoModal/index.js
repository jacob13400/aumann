import Modal from 'react-bootstrap/Modal';
import styles from './styles.module.css';

import Button from '../../Button';

export default function InfoModal(props) { 
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
          Rules
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4>Game Play</h4>
        <br/>
        <p className={styles.modalText}>
          1.  Each round of play, you’ll be given one multiple-choice trivia question.  The number of players equal the number of possible answers.
          <br/><br/>
          2.  A player sees only one possible answer that is given to them.  They then declare a probability estimate for their answer being the correct one, from 0 to 1.
          <br/><br/>
          3.  Players can see others' estimates, and declare as many updates as they want accordingly - 
          if someone else gives a high probability to their answer, you might want to lower your answer if you trust them.  
          Players might want to adjust toward summing to 1, but not if they don't trust each other's rationale enough!
          <br/><br/>
          4.  Once everyone's locked in, the correct answer is revealed and players get scores based on their final probabilities and whether their answer was right.
          <br/><br/>
          For example, if there are four players (and thus four answers), and you give 0.25 as your estimate, you get 0 points 
          regardless of whether yours is correct, because 1/4 is the default probability of one answer from four being correct without any more information.
        </p>
        <br/>
        <h4>Scoring Rule</h4>
        <br/>
        <p className={styles.modalText}>
          Given four players and a final probability p,
          <br/><br/>
          &emsp;If a player is holding the correct answer:
          &emsp;&emsp;100 * log<sub>2</sub>(4p)
          <br/><br/>
          &emsp;If a player is holding an incorrect answer:
          &emsp;&ensp;100 * log<sub>2</sub>((4/3) * (1-p))
        </p>
        <br/>
        <h4>Example Round</h4>
        <br/>
        <p className={styles.modalText}>
          There are four players - Abram, Jacob, Jose, and Scott.  The question is "Which movie won the Academy Award for Best Picture in 1985?"
          <br/><br/>
          The players each get the following answers:
          <br/>
          Abram - “Rain Man”
          <br/>
          Jacob - “Amadeus”
          <br/>
          Jose - “The Godfather Part II”
          <br/>
          Scott - “Terms of Endearment”
          <br/><br/>
          Abram is completely uncertain whether his slip of paper holds the correct answer, and announces a probability of 25%. 
          Scott joins Abram at 25%. Jacob reports a 90% probability, and Jose 33%. 
          <br/><br/>
          Abram thinks Jacob probably has the correct answer and Jose might if not David, so revises down to 5%. 
          Scott thinks Jacob may have the right answer but is probably overconfident and revises down to 10%, ignoring Jose because he’s never sure what Jose is up to anyway. 
          Jose revises up to 95% to see if he can get a reaction. 
          Jacob drops his probability to 50% in response to this. 
          <br/><br/>
          Jose backs down to 5% because really he’s fairly sure he doesn’t have the answer. 
          Jacob throws his hands in the air and goes back up, but only to 85% because Jose made the possibility of being wrong more vivid. 
          Abram and Scott stick with their answers.
          <br/><br/>
          Thus, Abram's final probability is 0.05, Jacob's 0.85, Jose's 0.05, and Scott's 0.10.  It is revealed that the correct answer is Amadeus.
          <br/><br/>
          Jacob, the holder of this answer, gets a score of 177 for this round. Abram gets 34, Jose gets 34, and Scott gets 26. 
          Jacob curses his uncertainty (and maybe Jose); he almost had 185 points. Abram wipes the sweat off his brow, feeling in hindsight that he stuck his neck out saying .05 and got lucky. 
          If his answer had turned out to be the correct one after all, he would have lost 232 points.
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button type={"modal"} text={"OK"} action={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  )
}