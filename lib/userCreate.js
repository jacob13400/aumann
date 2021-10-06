import admin from './clientApp'

export const getUser = async (query) => {
  const db = admin.firestore()
  const queryCollection = db.collection('users');
  const snapshotQuery = queryCollection.where('roomID', '==', query.roomID).where('username', '==', query.username);
 
  const snapshot = await snapshotQuery.get();
  
  var found = false;
  const FieldValue = admin.firestore.FieldValue;

  // const updateValue = await snapshotQuery.update({updatedAt: time});
  snapshot.forEach((doc) => {
    // console.log('Data received: ', doc.exists);
    found = doc.exists;
  });
  
  if (found) return found;


  const newUser = await queryCollection.add({
    color: "#000000",
    estimate: "75",
    id: Math.floor(Math.random() * 1000000000),
    lock: false,
    points: 0,
    roomID: Number(query.roomID),
    username: query.username, 
    createdAt: FieldValue.serverTimestamp(),
    updatedAt: FieldValue.serverTimestamp(),
    answerBool: false,
    question: "Loading Question...",
    answer: "Loading Answer...",

  });

  // console.log("Result: ", newUser)
  return false;
}