import admin from './clientApp'

export const updateUserPoints = async (query) => {
  const db = admin.firestore()
  const queryCollection = db.collection('users');
  const snapshotQuery = queryCollection.where('roomID', '==', query.roomID).where('username', '==', query.username);
 
  const snapshot = await snapshotQuery.get();
  
  var result = false;
  const FieldValue = admin.firestore.FieldValue;

  var points = 100 * Math.log2(4*query.estimate/100);
  
  if (query.answerBool == false) points = 100 * Math.log2(4*(1-query.estimate)/300);

  snapshot.forEach((doc) => {
    console.log('Data received: ', doc.exists);
    
    if (doc.data().roomID == query.roomID) result = true;

    doc.ref.update({
      updatedAt: FieldValue.serverTimestamp(),
      points: points,
    })
  });
  
  return result;
}