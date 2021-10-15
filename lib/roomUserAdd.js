import admin from './clientApp'

export const addUserRoom = async (query) => {
  const db = admin.firestore()
  const queryCollection = db.collection('rooms');
  const snapshot = await queryCollection.where('id', '==', Number(query.roomID)).get();
  
  // console.log("Query: ", query);
  var tempData = null;
  const FieldValue = admin.firestore.FieldValue;

  var result = false;

  snapshot.forEach((doc) => {
    // console.log('Data received: ', doc.exists);
    result = doc.exists;
    tempData = doc.data();

    var newUser = tempData.users;

    if (!tempData.isBuffer || newUser.length >= 4){
      result = false;
      return;
    }

    for (var iter = 0; iter < newUser.legth; iter++){
      if (newUser[iter].username == query.username){
        result = true;
        return;
      }
    }

    console.log("Room User Addition: ", newUser, newUser.length)
    if (newUser.length < 4){
      newUser.push({username: query.username}); 
        
      doc.ref.update({
        updatedAt: FieldValue.serverTimestamp(),
        users: newUser,
      })
    }  
  });

  return result;
}