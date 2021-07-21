import React from 'react';
import Modal from 'react-bootstrap/Modal';
import styles from './styles.module.css';

import Button from '../../Button';

export default function UserListModal(props) { 
  return (
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