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
  });
  
  return result;
}