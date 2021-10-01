import admin from './clientApp'

export const addUserRoom = async (query) => {
  const db = admin.firestore()
  const queryCollection = db.collection('rooms');
  const snapshot = await queryCollection.where('id', '==', Number(query.roomID)).get();
  
  console.log("Query: ", query);
  var tempData = null;
  const FieldValue = admin.firestore.FieldValue;

  var result = false;

  snapshot.forEach((doc) => {
    console.log('Data received: ', doc.exists);
    result = doc.exists;
    tempData = doc.data();

    if (!tempData.isBuffer){
      result = false;
      return;
    }

    var newUser = tempData.users;
    newUser.push({username: query.username}); 
    console.log(newUser)

    doc.ref.update({
      updatedAt: FieldValue.serverTimestamp(),
      users: newUser,
    })
  });

  return result;
}