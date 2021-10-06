import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import styles from './styles.module.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import RoomHead from '../../component/RoomHead';
import UserList from '../../component/UserList';
import Game from '../../component/Game';
import Chat from '../../component/Chat';
import RoomFooter from '../../component/RoomFooter';
import { convertData } from '../../lib/encryptDecrypt';
import { getUsers } from '../api/users';
import { getRoom } from '../../lib/roomGet';

var flag = false;
var finalCheck = 5;


export default function Room(props) {
  const [roomID, setRoomID] = useState(props.droom2021);
  const [username, setUsername] = useState(props.duser2021);

  const [userList, setUserList] = useState([{ id: 0, username: 'jozdien', roomID: 0, points: 0, estimate: "75", lock: false, 
                                              color: "#0FFFFF", question: "What is the air-speed velocity of an unladen swallow?"}]);
  
  const [room, setRoom] = useState({"questionID": "0","updatedAt": {"seconds": 1629388503,"nanoseconds": 722000000},"users": [{"username": "verd"}],
                                    "createdAt": {"seconds": 1629355142,"nanoseconds": 838000000},"id": "werds"});
  
  const [interval, setInterval] = useState(new Date());
  
  const [timer, setTimer] = useState({"minutes": 5, "seconds": 0});


  const getUsersList = async () => {
    var users = await getUsers(roomID)

    // console.log("Users list update: ", users)
    setUserList(users); 
  };

  const getRoomDetails = async () => {
    var query = {flag: false, message: props.droom2021};
    var roomIDCoverted = await convertData(query);

    query = {flag: false, message: props.duser2021};
    var usernameConverted = await convertData(query);
    
    setRoomID(roomIDCoverted);
    setUsername(usernameConverted);
    
    query = {roomID: Number(roomIDCoverted)};
    var room = await getRoom(query)
    // console.log("Data that is needed:", room)
    const intervalTemp = room.createdAt.seconds*1000+(room.createdAt.nanoseconds*(10**-6));
    

    setRoom(room);
    setInterval(intervalTemp);
    // console.log('Room', room);
  };

  const timeLeft = () => {
    var startTime = new Date(interval);
    var currTime = new Date();

    var seconds = 300 - (currTime - startTime) / 1000;

    if(Math.floor(seconds) <= 0){
      return {"minutes": 0, "seconds": 0};
    }
    else{
      return {"minutes": Math.floor(seconds / 60), "seconds": Math.floor(seconds % 60)};
    }
  };
  
  // Function for countdown timer
  // NOTE: Whatever state variables need to be updated constantly (such as userList), move OUTSIDE the flag check block.
  // I just put it inside so that the console doesn't get flooded during development.
  useEffect(() => {
    
    if(!flag){
      getUsersList();
      getRoomDetails();
      flag = true;
    }
    
    const timerSet = setTimeout(() => {
      setTimer(timeLeft());
    }, 1000);

    if (timer.seconds % 5 == 0 && timer.minutes > 0){
      getUsersList();
    }
    else if (timer.minutes <= 0 && timer.seconds > 10){
      getUsersList();
    }else if (timer.minutes <= 0 && timer.seconds <= 0 && finalCheck > 0){
      
      // console.log("Final Check: ", finalCheck)

      finalCheck--;
      getUsersList();
    }
  });
  
  return (
    <div className={styles.container}>
      <Head>
        <title>Room - Aumann's Game</title>
        <link rel="icon" href="../icons/logo.png" />
      </Head>

      <main className={styles.main}>
        <RoomHead userList={userList} username={username} roomID={roomID} minutes={timer.minutes} seconds={timer.seconds}/>
        <div className={styles.body}>
          <UserList userList={userList} username={username}/>
          <Game userList={userList} username={username} roomID={roomID} minutes={timer.minutes} seconds={timer.seconds}/>
        </div>
        <div className={styles.padBodyBottom}/>
        <RoomFooter minutes={timer.minutes} seconds={timer.seconds}/>
      </main>
    </div>
  )
}

Room.getInitialProps = async (ctx) => {
  return ctx.query;
}