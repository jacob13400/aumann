import admin from './clientApp'

export const getRoom = async (query) => {
  const db = admin.firestore()
  const queryCollection = db.collection('rooms');
  const snapshot = await queryCollection.where('id', '==', query.roomID).get();
  
  console.log("Query: ", query);
  var result = null;
  snapshot.forEach((doc) => {
    console.log('Data received: ', doc.exists);
    result = doc.data();
    // return result;
  });

  if (result != null) return result;

  const newRoom = await queryCollection.add({
    id: query.roomID,
    questionID: "0",
    users: [{username: query.username}]
  });

  console.log("Result: ", newRoom)
  return result;
}