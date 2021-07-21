import admin from '../../lib/clientApp'

export const getUsers = async () => {
  const db = admin.database()
  const questionsDB = db.ref('users')
  
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