import admin from '../../lib/clientApp'

export const getUsers = async (roomID) => {
  const db = admin.firestore()
  const queryCollection = db.collection('users');
  const snapshot = await queryCollection.where('roomID', '==', Number(roomID)).get();
  
  var result = [];
  snapshot.forEach((doc) => {
    result.push(doc.data());
  });
  console.log('Data received: ', result);
  return result;
}