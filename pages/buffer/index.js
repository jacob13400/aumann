import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import {useRouter} from 'next/router';
import styles from './styles.module.css';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Buffer(props) {

  const Router = useRouter();
  const [minutes, setMinutes] = useState("00");
  const [seconds, setSeconds] = useState(30);
  const [secondsPad, setSecondsPad] = useState("");

  useEffect(() => {

    if (seconds == "00"){
      clearTimeout(timer);
      Router.push({pathname: "/room", query: {roomID: props.roomID, username: props.username}});
    }

    const timer = setTimeout(() => {
      setSeconds(seconds - 1);
      if(seconds == 10){
        setSecondsPad("0");
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