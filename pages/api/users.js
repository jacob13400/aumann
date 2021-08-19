import admin from '../../lib/clientApp'

export const getUsers = async (roomID) => {
  const db = admin.firestore()
  const queryCollection = db.collection('users');
  const snapshot = await queryCollection.where('roomID', '==', roomID).get();
  
  var result = [];
  snapshot.forEach((doc) => {
    console.log('Data received: ', doc.data());
    result.push(doc.data());
  });
  return result;
}