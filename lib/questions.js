import admin from './clientApp'

export const getQuestionsSync = async () => {
  const db = admin.firestore()
  const snapshot = await db.collection('questions').get();

  snapshot.forEach((doc) => {
    console.log(doc.id, '=>', doc.data());

    if (doc && doc.exists)
      return doc.data();
  });
  
  return null;
}
