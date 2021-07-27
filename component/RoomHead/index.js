import React from 'react';
import styles from './styles.module.css';

import UserListModal from '../../component/Modals/UserListModal';

export default function RoomHead(props) {
  const [userListModalShow, setUserListModalShow] = React.useState(false);
  var seconds = props.seconds.toString()
  var minutes = props.minutes.toString();
  if (seconds.length == 1) {
    seconds = "0" + seconds;
  }
  if (minutes.length == 1) {
    minutes = "0" + minutes;
  }

  return (
    <div className={styles.head}>
      <div className={styles.top}>
        <div className={styles.logo}>
          <a className={styles.logoLink} href="../" target="_blank"></a>
        </div>
        <div className={styles.roundMobile} onClick ={() => setUserListModalShow(true)}>
          Round 1
        </div>
        <div className={styles.timerMobile}>
          {minutes} : {seconds}
        </div>
      </div>
      <div className={styles.padTopRound}>
      </div>
      <div className={styles.round}>
        Round 1
      </div>

      <UserListModal
        show={userListModalShow}
        onHide={() => setUserListModalShow(false)}
        userList={props.userList}
        username={props.username}
      />
    </div>
  )
}