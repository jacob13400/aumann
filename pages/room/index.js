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
  const [userList, setUserList] = React.useState([{ id: 0, username: 'jozdien', roomID: 0, points: 0 }, { id: 1, username: 'zeref', roomID: 0, points: 0 },
                                                  { id: 2, username: 'su', roomID: 0, points: 0 }, { id: 3, username: 'whybevicky', roomID: 0, points: 0 }]);

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
        <RoomHead userList={userList} username={username}/>
        <div className={styles.body}>
          <UserList userList={userList} username={username}/>
          <Game/>
          <Chat/>
        </div>
        <div className={styles.padBodyBottom}/>
        <RoomFooter/>
      </main>
    </div>
  )
}

export async function getStaticProps() {

  var users = await getUsers();

  return {
    props: {users: users}, // will be passed to the page component as props
  }
}