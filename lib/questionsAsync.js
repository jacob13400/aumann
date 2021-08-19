import admin from './clientApp'

export const getQuestionsAsync = async () => {
  const db = admin.database()
  const questionsDB = db.ref('questions')
  
  questionsDB.on('value', (snapshot) => {
    return snapshot.val();
  });

  return null;
}
