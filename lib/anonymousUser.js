import admin from './clientApp'

export const getUserRandom = async () => {

  admin.auth().onAuthStateChanged((user) => {
    if (user) {
      console.log("User Details: ", user);
    } else {
      admin.auth().signInAnonymously();
    }
  });

}

export const checkUser = async () => {

  var returnValue = false;
  admin.auth().onAuthStateChanged((user) => {
    if (user) {
      returnValue = true;
    } else {
      // admin.auth().signInAnonymously();
    }
  });

  console.log("Resturn Value", admin.auth().currentUser.displayName);
  return returnValue;

}