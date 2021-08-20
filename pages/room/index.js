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
  const [room, setRoom] = useState({"questionID": "0","updatedAt": {"seconds": 1629388503,"nanoseconds": 722000000},"users": [{"username": "verd"}],
                                    "createdAt": {"seconds": 1629355142,"nanoseconds": 838000000},"id": "werds"});
  const [elapsedTime, setElapsedTime] = useState(0);

  const getUsersList = async () => {
    var users = await getUsers(props.roomID)

    setTimeout(function(){setUserList(users); console.log('User', users);}, 3000);
  };

  const getRoomDetails = async () => {
    var room = await getRoom(props.roomID);
    
    setTimeout(function(){
      setRoom(room);
      console.log('Room', room);
    }, 3000);
  };
  
  // Function for countdown timer
  useEffect(()=>{
    getUsersList();
    getRoomDetails();

    const intervalTemp = room.createdAt.seconds*1000+(room.createdAt.nanoseconds*(10**-6));

    const currentTime = new Date();
    const createdTime = new Date(intervalTemp);
    console.log("Current time: ", currentTime);
    console.log("Created time: ", createdTime);

    var elapsedTimeSeconds = Math.abs(currentTime - createdTime) / 1000;
    console.log("elapsedTimeSeconds: ", elapsedTimeSeconds);

    let myInterval = setInterval(() => {
      elapsedTimeSeconds = elapsedTimeSeconds + 1
      setElapsedTime(elapsedTimeSeconds);
    }, 1000)
      return ()=> {
          clearInterval(myInterval);
        };
    
    // Place flag here to check for the first time data is retrieved
    // Put a buffer page while flag is flase. Use same page for after 
    // entering data in main page too
    
    
  }, []);
  
  //Props has the value for the room ID
  console.log("Value: ", userList);
  
  // Hacky solution, but passing state variables to components triggers infinite re-render errors.  This bypasses that.
  const minutesProp = (45 - Math.floor(elapsedTime / 60)) >= 0 ? (45 - Math.floor(elapsedTime / 60)) : 0;
  const secondsProp = (45 - Math.floor(elapsedTime / 60)) >= 0 ? Math.floor(60 - elapsedTime % 60) : 0;
  
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