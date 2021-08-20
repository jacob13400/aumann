import admin from './clientApp'

export const getRoom = async (query) => {
  const db = admin.firestore()
  const queryCollection = db.collection('rooms');
  const snapshot = await queryCollection.where('id', '==', query.roomID).get();
  
  console.log("Query: ", query);
  var result = null;
  const FieldValue = admin.firestore.FieldValue;

  snapshot.forEach((doc) => {
    console.log('Data received: ', doc.exists);
    result = doc.data();
    // return result;
    var newUser = result.users;
    newUser.push({username: query.username}); 
    console.log(newUser)

    doc.ref.update({
      updatedAt: FieldValue.serverTimestamp(),
      users: newUser,
    })
  });

  if (result != null) return result;

  const newRoom = await queryCollection.add({
    id: query.roomID,
    questionID: "0",
    users: [{username: query.username}],
    createdAt: FieldValue.serverTimestamp(),
    updatedAt: FieldValue.serverTimestamp(),
    round: 1,
  });

  console.log("Result: ", newRoom)
  return result;
}