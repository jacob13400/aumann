import React from 'react';
import Head from 'next/head'
import Router from 'next/router';
import styles from '../styles/Home.module.css'
import 'bootstrap/dist/css/bootstrap.min.css';

import Button from '../component/Button';
import InfoModal from '../component/Modals/InfoModal';
import PlayModal from '../component/Modals/PlayModal';
import Credits from '../component/Credits';

import { getQuestionsSync } from '../lib/questions';
// import { getQuestionsAsync } from './api/questionsAsync';

export default function Home() {
  const [infoModalShow, setInfoModalShow] = React.useState(false);
  const [playModalShow, setPlayModalShow] = React.useState(false);
  
  /*

  useEffect(() => {
  });

  */

  return (
    <div className={styles.container}>
      <Head>
        <title>Aumann's Game</title>
        <link rel="icon" href="/icons/logo.png" />
      </Head>

      <main className={styles.main}>
        <div className={styles.top}>
          <div className={styles.padTop}>
          </div>
          <div className={styles.name}>
            Aumann's Game
          </div>
          <div className={styles.logo}>
            <img className={styles.logoContainer} src={"/icons/group.png"} alt={"Group of People"}/>
          </div>
          <div className={styles.padMiddle}>
          </div>
          <div className={styles.text}>
            Aumann’s Agreement Theorem says that rational agents with common knowledge of each others' beliefs cannot agree to disagree.
            This assumes not only perfect rationality, but perfect trust in each other’s rationality, trust in that trust, and so on. 
            This game is about seeing how things play out given the imperfect trust between you and your friends.
          </div>
          <div className={styles.padMiddleTwo}>
          </div>
          <div className={styles.info}>
            <Button type={"info"} text={"How To Play"} action={() => setInfoModalShow(true)}/>
          </div>
          <div className={styles.play}>
            <Button type={"play"} text={"Join / Create Room"} action={() => setPlayModalShow(true)}/>
          </div>
          <div className={styles.padBottom}>
          </div>
        </div>
        <Credits/>
        <InfoModal
          show={infoModalShow}
          onHide={() => setInfoModalShow(false)}
        />
        <PlayModal
          show={playModalShow}
          onHide={() => setPlayModalShow(false)}
        />
      </main>
    </div>
  )
}

export async function getStaticProps() {

  // At this point it does not matter which one you choose,
  // since the function will only be called once.
  // 
  // This async function will be useful if you copu paste the code in that
  // file and put it in an async function and call it in useEffect

  // The Async function will automatically update the values, so live score and chat can be used

  var questions = await getQuestionsSync();

  // var questionsAsync = await getQuestionsAsync();

  console.log(questions);
  // console.log(questionsAsync);
  return {
    props: {questions: questions}, // will be passed to the page component as props
  }
}