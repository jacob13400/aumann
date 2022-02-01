import admin from './clientApp'

export const updateTime = async () => {
const db = admin.firestore()
const queryCollection = db.collection('time');
const snapshot = await queryCollection.get();
const FieldValue = admin.firestore.FieldValue;
snapshot.forEach((doc) => {
doc.ref.delete()
});

const timerSet = setTimeout(() => {
console.log("Wait for time to update");
}, 1000);
const res = await queryCollection.add({time: FieldValue.serverTimestamp()});

const snapshotFinal = await queryCollection.get();
var result = null;
snapshotFinal.forEach((doc) => {
result = doc.data().time;
console.log("Time Date: ", doc.data())
});

return result;
}
