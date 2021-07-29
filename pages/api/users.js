import admin from '../../lib/clientApp'

export const getUsers = async (roomID) => {
  const db = admin.firestore()
  const queryCollection = db.collection('users');
  const snapshot = await queryCollection.where('roomID', '==', roomID).get();
  
  snapshot.forEach((doc) => {
    console.log(doc.id, '=>', doc.data());
  });
  // questionsDB.get().then((snapshot) => {
  //   if (snapshot.exists()) {
  //     console.log(snapshot.val());
  //     return snapshot.val();
  //   } else {
  //     console.log("No data available");
  //   }
  // }).catch((error) => {
  //   console.error(error);
  // });

  return null;
}