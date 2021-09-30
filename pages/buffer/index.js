import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import {useRouter} from 'next/router';
import styles from './styles.module.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { getRoom } from '../../lib/roomGet';
import { updateRoom } from '../../lib/roomUpdate';

export default function Buffer(props) {

  const Router = useRouter();
  const [admin, setAdmin] = useState(false);
  const [onEnter, setOnEnter] = useState(true);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(10);
  const [secondsPad, setSecondsPad] = useState("");


  const onEnterUpdate = async () => {
    var query = {roomID: props.roomID}
    var room = await getRoom(query);

    if (room.bufferTime == 10 || room.bufferTime == "10"){
      setAdmin(true);
    }

    setSeconds(room.bufferTime)

    if (!room.isBuffer)
      Router.push({pathname: "/room", query: {roomID: props.roomID, username: props.username}});

    console.log("Update Room on Enter: ", room);
  }

  const onUpdate = async (isBuffer) => {
    var query = {roomID: props.roomID, bufferTime: seconds, isBuffer: isBuffer}
    console.log("Update Room: ", query);
    var room = await updateRoom(query);

  }

  useEffect(() => {

    if (seconds == "00"){
      clearTimeout(timer);
      onUpdate(false);
      Router.push({pathname: "/room", query: {roomID: props.roomID, username: props.username}});
    }

    if (onEnter){
      setOnEnter(false);
      onEnterUpdate();
    }

    const timer = setTimeout(() => {
      setSeconds(seconds - 1);
      if(seconds == 10){
        setSecondsPad("0");
      }
      
      if (admin){
        onUpdate(true);
      }
    }, 1000);
  });

  return (
    <div className={styles.container}>
      <Head>
        <title>Waiting Room</title>
        <link rel="icon" href="../icons/logo.png" />
      </Head>

      <main className={styles.main}>
        <div className={styles.body}>
          <div className={styles.title}>
            Waiting Room
          </div>
          <div className={styles.timer}>
            {minutes} : {secondsPad}{seconds}
          </div>
          <div className={styles.bottom}>
            <div className={styles.subtitle}>
              Players can join until the timer runs out.
            </div>
            <div className={styles.roomID}>
              Room ID: {props.roomID}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

Buffer.getInitialProps = async (ctx) => {
  return ctx.query;
}