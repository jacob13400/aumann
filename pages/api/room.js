import admin from '../../lib/clientApp'

export const getRoom = async (query) => {
  const db = admin.firestore()
  const queryCollection = db.collection('users');
  const snapshot = await queryCollection.where('id', '==', query.roomID).get();
  
  console.log("Query: ", query);
  var result = null;
  snapshot.forEach((doc) => {
    console.log('Data received: ', doc.exists);
    result = doc.data();
  });
  
  // const docRef = db.collection('rooms');

  // const result = await docRef.add({
  //   first: 'Ada',
  //   last: 'Lovelace',
  //   born: 1815
  // });

  return result;
}