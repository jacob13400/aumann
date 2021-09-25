import admin from './clientApp'

export const getQuestionsSync = async () => {
  const db = admin.firestore()
  const snapshot = await db.collection('questions').get();

  var result = null;
  snapshot.forEach((doc) => {
    console.log(doc.id, '=>', doc.data());

    if (doc && doc.exists){
      result = doc.data();
      return result;
    }
  });

  return result;
}
