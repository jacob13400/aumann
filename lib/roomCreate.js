import admin from './clientApp'

export const getRoom = async () => {
  const db = admin.firestore()
  const queryCollection = db.collection('rooms');

  const checkFlag = false;
  var roomID = 0;
  const FieldValue = admin.firestore.FieldValue;
  do {
    roomID = Math.floor(Math.random() * 1000000000);
    const snapshot = await queryCollection.where('id', '==', roomID).get();
  
    snapshot.forEach((doc) => {
      console.log('Data received: ', doc.exists);

      checkFlag = doc.exists;
    });
  }while(checkFlag)

  const newRoom = await queryCollection.add({
    id: roomID,
    questionID: "0",
    isBuffer: true,
    bufferTime: 15,
    users: [{username: query.username}],
    createdAt: FieldValue.serverTimestamp(),
    updatedAt: FieldValue.serverTimestamp(),
    round: 1,
    admin: query.username,
  });

  return roomID; 
}