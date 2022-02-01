import admin from './clientApp'
import { updateTime } from './deleteOldDataUpdateTime';

export const deleteUser = async () => {
const db = admin.firestore()
const queryCollection = db.collection('users');
const timeNow = await updateTime();
const snapshot = await queryCollection.get();
snapshot.forEach((doc) => {
if (timeNow.seconds - doc.data().updatedAt.seconds > (24 * 60 * 60)){
console.log("Data Values to be deleted: ", doc.data())
console.log("Query Time Difference: ", timeNow.seconds -
doc.data().updatedAt.seconds)
doc.ref.delete();
}
});
}