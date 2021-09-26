import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import styles from './styles.module.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import RoomHead from '../../component/RoomHead';
import UserList from '../../component/UserList';
import Game from '../../component/Game';
import Chat from '../../component/Chat';
import RoomFooter from '../../component/RoomFooter';
import { getQuestionsSync } from '../../lib/questions';
import { getUsers } from '../api/users';
import { getRoom } from '../api/room';

var flag = false;


export default function Room(props) {
  const username = props.username;
  const roomID = props.roomID;

  const [userList, setUserList] = useState([{ id: 0, username: 'jozdien', roomID: 0, points: 0, estimate: "75", lock: false, color: "#0FFFFF" },
                                                  { id: 1, username: 'zeref', roomID: 0, points: 0, estimate: "50", lock: true, color: "#F0C9A8" }]);
  const [room, setRoom] = useState({"questionID": "0","updatedAt": {"seconds": 1629388503,"nanoseconds": 722000000},"users": [{"username": "verd"}],
                                    "createdAt": {"seconds": 1629355142,"nanoseconds": 838000000},"id": "werds"});
  const [interval, setInterval] = useState(3000);
  const [timer, setTimer] = useState({"minutes": 5, "seconds": 0})

  const getQuestions = async () => {
    var questions = await getQuestionsSync();

    setTimeout(function(){console.log("Questions: ", questions);}, 0);
  };

  const getUsersList = async () => {
    var users = await getUsers(props.roomID)

    setTimeout(function(){setUserList(users); console.log('User', users);}, 0);
  };

  const getRoomDetails = async () => {
    var room = await getRoom(props.roomID)
    const intervalTemp = room.createdAt.seconds*1000+(room.createdAt.nanoseconds*(10**-6));
    
    setTimeout(function(){
      setRoom(room);
      setInterval(intervalTemp);
      console.log('Room', room);
    }, 0);
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
  useEffect(() => {
    if(!flag){
      getQuestions();
      getUsersList();
      getRoomDetails();
      flag = true;
    }
    
    const timer = setTimeout(() => {
      setTimer(timeLeft());
    }, 1000);
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
          <Chat/>
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