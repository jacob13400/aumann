import admin from './clientApp'

export const assignQuestionsRoom = async (query, answers, answersCorrect) => {
  const db = admin.firestore()
  const queryCollection = db.collection('rooms');


  const snapshot = await queryCollection.where('id', '==', Number(query.roomID)).get();
  
  
  var result = null;
  const FieldValue = admin.firestore.FieldValue;
  
  snapshot.forEach((doc) => {
    // console.log('Data received: ', doc.exists);
    result = doc.data();
    
    doc.ref.update({
      updatedAt: FieldValue.serverTimestamp(),
      createdAt: FieldValue.serverTimestamp(),
      questionID: answersCorrect.questionID,
      isBuffer: false,
    })
  });

  return result;
}