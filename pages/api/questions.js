import admin from '../../lib/clientApp'

export const getQuestionsSync = async () => {
  const db = admin.database()
  const questionsDB = db.ref('questions')
  
  questionsDB.get().then((snapshot) => {
    if (snapshot.exists()) {
      console.log(snapshot.val());
      return snapshot.val();
    } else {
      console.log("No data available");
    }
  }).catch((error) => {
    console.error(error);
  });

  return null;
}
