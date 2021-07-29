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


export default function Room() {
  const username = "jozdien";
  const [userList, setUserList] = React.useState([{ id: 0, username: 'jozdien', roomID: 0, points: 0, estimate: "75", lock: false, color: "#0FFFFF" },
                                                  { id: 1, username: 'zeref', roomID: 0, points: 0, estimate: "50", lock: true, color: "#F0C9A8" }]);
  const [minutes, setMinutes] = useState(5);
  const [seconds, setSeconds] = useState(0);

  // TODO: Get starting time from server before countdown so that local times are synchronized

  // Function for countdown timer
  useEffect(()=>{
    let myInterval = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      }
      if (seconds === 0) {
        if (minutes === 0) {
          clearInterval(myInterval);
        } 
        else {
          setMinutes(minutes - 1);
          setSeconds(59);
        }
      } 
    }, 1000)
      return ()=> {
          clearInterval(myInterval);
        };
  });

  // Hacky solution, but passing state variables to components triggers infinite re-render errors.  This bypasses that.
  const minutesProp = minutes;
  const secondsProp = seconds;


  // const getUserList = async () => {

  //   const room = localStorage.getItem("roomID");
  //   try{
  //       const res = await fetch("http://localhost:3000/api/user", {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json",
  //           Accept: "application/json",
  //         },
  //         body: JSON.stringify({room}),
  //       })
  //       const data = await res.json();
        
  //       setTimeout(function(){ 
  //         console.log("Timeout for function refresh!");
  //         setUserList(data.result); 
  //         console.log(userList);
  //       }, 500);
        
  //       }
  //       catch (error) {
  //         console.log(error)
  //       }
  //   }

  
  // useEffect(() => {
  //     getUserList();
  //   })
  

  return (
    <div className={styles.container}>
      <Head>
        <title>Room - Aumann's Game</title>
        <link rel="icon" href="../icons/logo.png" />
      </Head>

      <main className={styles.main}>
        <RoomHead userList={userList} username={username} minutes={minutesProp} seconds={secondsProp}/>
        <div className={styles.body}>
          <UserList userList={userList} username={username}/>
          <Game userList={userList} username={username} minutes={minutesProp} seconds={secondsProp}/>
          <Chat/>
        </div>
        <div className={styles.padBodyBottom}/>
        <RoomFooter minutes={minutesProp} seconds={secondsProp}/>
      </main>
    </div>
  )
}


export async function getStaticProps(roomID) {

  var users = await getUsers('');
  // console.log("Check", users);

  return {
    props: {users: users}, // will be passed to the page component as props
  }
}