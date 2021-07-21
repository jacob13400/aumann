import React from 'react';
import styles from './styles.module.css';

import UserListModal from '../../component/Modals/UserListModal';

export default function RoomHead(props) {
  const [userListModalShow, setUserListModalShow] = React.useState(false);

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
          05:00
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