import admin from './clientApp'

export const assignQuestions = async (query, answers, answersCorrect) => {
  const db = admin.firestore()
  const queryCollection1 = db.collection('rooms');
  const queryCollection2 = db.collection('users');


  const snapshot = await queryCollection1.where('id', '==', Number(query.roomID)).get();
  
  
  console.log("Query: ", answersCorrect);
  var result = null;
  const FieldValue = admin.firestore.FieldValue;
  
  snapshot.forEach((doc) => {
    console.log('Data received: ', doc.exists);
    result = doc.data();
    
    doc.ref.update({
      updatedAt: FieldValue.serverTimestamp(),
      questionID: answersCorrect.questionID,
      isBuffer: false,
    })
  });
  
  var answersIterate = Object.keys(answers);
  var iter = 0;
  const snapshot2 = await queryCollection2.where('id', '==', Number(query.roomID)).get();

  snapshot2.forEach((doc) => {
    console.log('Data received: ', doc.exists);
    result = doc.data();

    var correctAnswer = false;
    if (Number(answersIterate[iter]) == answersCorrect["CorrectIndex"]){
      console.log("Correct Answer: ", answersIterate[iter], result);
      correctAnswer = true;
    }
    
    doc.ref.update({
      updatedAt: FieldValue.serverTimestamp(),
      question: answersCorrect.question,
      answer: answers[answersIterate[iter]],
      correctAnswer: correctAnswer,
    })

    iter++;
  });

  return result;
}