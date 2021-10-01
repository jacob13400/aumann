import admin from './clientApp'

export const updateRoom = async (query) => {
  const db = admin.firestore()
  const queryCollection = db.collection('rooms');
  const snapshot = await queryCollection.where('id', '==', Number(query.roomID)).get();
  
  console.log("Query: ", query);
  var result = null;
  const FieldValue = admin.firestore.FieldValue;

  snapshot.forEach((doc) => {
    console.log('Data received: ', doc.exists);
    result = doc.data();

    doc.ref.update({
      updatedAt: FieldValue.serverTimestamp(),
      isBuffer: query.isBuffer,
      bufferTime: query.bufferTime,
    })
  });

  return result;
}