import admin from '../../lib/clientApp'

export const getQuestionsSync = async () => {
  const db = admin.firestore()
  const snapshot = await db.collection('questons').get();

  snapshot.forEach((doc) => {
    console.log(doc.id, '=>', doc.data());

    if (doc && doc.exists)
      return doc.data;
  });

  // const docRef = db.collection('questions');

  // await docRef.add({
  //   first: 'Ada',
  //   last: 'Lovelace',
  //   born: 1815
  // });

  return null;
}
