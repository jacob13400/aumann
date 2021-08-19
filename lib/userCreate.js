import admin from './clientApp'

export const getUser = async (query) => {
  const db = admin.firestore()
  const queryCollection = db.collection('users');
  const snapshotQuery = queryCollection.where('roomID', '==', query.roomID).where('username', '==', query.username);
 
  const snapshot = await snapshotQuery.get();
  
  var result = false;
  const FieldValue = admin.firestore.FieldValue;

  // const updateValue = await snapshotQuery.update({updatedAt: time});
  snapshot.forEach((doc) => {
    console.log('Data received: ', doc.exists);
    result = true;
  });
  
  if (result) return result;


  const newUser = await queryCollection.add({
    color: "#000000",
    estimate: "75",
    id: Math.floor(Math.random() * 1000000000),
    lock: false,
    points: 0,
    roomID: query.roomID,
    username: query.username, 
    createdAt: FieldValue.serverTimestamp(),
    updatedAt: FieldValue.serverTimestamp()

  });

  console.log("Result: ", newUser)
  return result;
}