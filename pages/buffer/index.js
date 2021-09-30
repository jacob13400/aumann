import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import {useRouter} from 'next/router';
import styles from './styles.module.css';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Buffer(props) {

  const Router = useRouter();
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(10);

  useEffect(() => {

    if (minutes <= 0 && seconds <= 0){
      Router.push({pathname: "/room", query: {roomID: props.roomID, username: props.username}});
    }

    const timer = setTimeout(() => {
      setSeconds(seconds - 1);
    }, 1000);
  });

  return (
    <div className={styles.container}>
      <Head>
        <title>Loading....</title>
        <link rel="icon" href="../icons/logo.png" />
      </Head>

      <main className={styles.main}>
        <div className={styles.body}>
          <div className={styles.round}>
            This is the waiting room. We will wait until the timer runs out for more players to join
          </div>
        </div>

        <div className={styles.round}>
          {minutes} : {seconds}
        </div>
      </main>
    </div>
  )
}

Buffer.getInitialProps = async (ctx) => {
  return ctx.query;
}