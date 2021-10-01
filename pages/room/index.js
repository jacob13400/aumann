import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import styles from './styles.module.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import RoomHead from '../../component/RoomHead';
import UserList from '../../component/UserList';
import Game from '../../component/Game';
import Chat from '../../component/Chat';
import RoomFooter from '../../component/RoomFooter';
import { getQuestions } from '../../lib/questionsGet';
import { getUsers } from '../api/users';
import { getRoom } from '../api/room';

var flag = false;


export default function Room(props) {
  const username = props.duser2021;
  const roomID = props.droom2021;

  const [userList, setUserList] = useState([{ id: 0, username: 'jozdien', roomID: 0, points: 0, estimate: "75", lock: false, color: "#0FFFFF" },
                                                  { id: 1, username: 'zeref', roomID: 0, points: 0, estimate: "50", lock: true, color: "#F0C9A8" }]);
  const [room, setRoom] = useState({"questionID": "0","updatedAt": {"seconds": 1629388503,"nanoseconds": 722000000},"users": [{"username": "verd"}],
                                    "createdAt": {"seconds": 1629355142,"nanoseconds": 838000000},"id": "werds"});
  const [interval, setInterval] = useState(3000);
  const [questions, setQuestions] = useState([]);
  const [timer, setTimer] = useState({"minutes": 5, "seconds": 0})

  const getQuestionsFunction = async () => {
    var questions = await getQuestions();

    setTimeout(function(){
      setQuestions(questions); 
      console.log("Questions: ", questions);
    }, 0);
  };

  const getUsersList = async () => {
    var users = await getUsers(roomID)

    setTimeout(function(){
      setUserList(users); 
    }, 0);
  };

  const getRoomDetails = async () => {
    var room = await getRoom(props.droom2021)
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


  // Function to get random question and allocate answers randomly.  To be moved from this page.
  // Returns a list containing num_players number of answers, chosen randomly, and 
  const makeQuestion = () => {
    var questionList = questions["questions"];
    var number = Object.keys(questionList).length;
    var num_players = Object.keys(userList).length;
    var num_ans = 4;

    var question_no = Object.keys(questionList)[Math.floor(Math.random() * number) + 1];
    var questionList = questionList[question_no];

    console.log(questionList);

    var answers = {"Correct": questionList["1"]};
    var questionText = questionList["question"];

    // player_indices is an array that goes: [1, 2, ... num_players]
    var player_indices = Array.from(new Array(num_players), (x, i) => i + 1);
    // ans_indices is an array that goes: [2, 3, ... num_ans]
    var ans_indices = Array.from(new Array(num_ans - 1), (x, i) => i + 2);

    answers[player_indices.splice(Math.random() * num_players, 1)] = questionList["1"];

    for (var i = 0; i < num_players - 1; i++) {
      var player_index = player_indices.splice(Math.random() * player_indices.length, 1);
      var ans_index = ans_indices.splice(Math.random() * ans_indices.length, 1);

      answers[player_index.toString()] = questionList[ans_index.toString()];
    };

    console.log("Answers: ", answers);
  };
  
  // Function for countdown timer
  // NOTE: Whatever state variables need to be updated constantly (such as userList), move OUTSIDE the flag check block.
  // I just put it inside so that the console doesn't get flooded during development.
  useEffect(() => {
    if(!flag){
      getQuestionsFunction();
      getRoomDetails();
      flag = true;
    }

    getUsersList();

    const timer = setTimeout(() => {
      setTimer(timeLeft());
    }, 1000);

    return () => clearTimeout(timer);
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