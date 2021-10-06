import admin from '../../lib/clientApp'

export const getRoom = async (roomID) => {
  const db = admin.firestore()
  const queryCollection = db.collection('rooms');
  const snapshot = await queryCollection.where('id', '==', roomID).get();
  
  var result = null;
  snapshot.forEach((doc) => {
    // console.log('Data received: ', doc.data());
    result = doc.data();
  });
  return result;
}