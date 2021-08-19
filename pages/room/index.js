import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import styles from './styles.module.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import RoomHead from '../../component/RoomHead';
import UserList from '../../component/UserList';
import Game from '../../component/Game';
import Chat from '../../component/Chat';
import RoomFooter from '../../component/RoomFooter';
import { getUsers } from '../api/users';
import { getRoom } from '../api/room';


export default function Room(props) {
  const username = props.player;
  const roomID = props.roomID;

  const [userList, setUserList] = React.useState([{ id: 0, username: 'jozdien', roomID: 0, points: 0, estimate: "75", lock: false, color: "#0FFFFF" },
                                                  { id: 1, username: 'zeref', roomID: 0, points: 0, estimate: "50", lock: true, color: "#F0C9A8" }]);
  const [room, setRoom] = useState(0);
  const [interval, setInterval] = useState(2000);
  
  const [minutes, setMinutes] = useState(5);
  const [seconds, setSeconds] = useState(0);

  const getUsersList = async () => {
    var users = await getUsers(props.roomID)

    setTimeout(function(){setUserList(users); setInterval(10000); console.log('User', users);}, interval);
  };

  const getRoomDetails = async () => {
    var room = await getRoom(props.roomID)
    
    setTimeout(function(){setRoom(room);console.log('Room', room);}, interval);
  };

  //Props has the value for the room ID
  console.log("Value: ", userList)  

  // TODO: Get starting time from server before countdown so that local times are synchronized

  // Function for countdown timer
  useEffect(()=>{
    getUsersList();
    getRoomDetails();

    // Place flag here to check for the first time data is retrieved
    // Put a buffer page while flag is flase. Use same page for after 
    // entering data in main page too

  });

  // Hacky solution, but passing state variables to components triggers infinite re-render errors.  This bypasses that.
  const minutesProp = minutes;
  const secondsProp = seconds;
  
  return (
    <div className={styles.container}>
      <Head>
        <title>Room - Aumann's Game</title>
        <link rel="icon" href="../icons/logo.png" />
      </Head>

      <main className={styles.main}>
        <RoomHead userList={userList} username={username} roomID={roomID} minutes={minutesProp} seconds={secondsProp}/>
        <div className={styles.body}>
          <UserList userList={userList} username={username}/>
          <Game userList={userList} username={username} roomID={roomID} minutes={minutesProp} seconds={secondsProp}/>
          <Chat/>
        </div>
        <div className={styles.padBodyBottom}/>
        <RoomFooter minutes={minutesProp} seconds={secondsProp}/>
      </main>
    </div>
  )
}

Room.getInitialProps = async (ctx) => {
  return ctx.query;
}