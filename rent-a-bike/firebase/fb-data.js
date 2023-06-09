import {
  getDatabase,
  onValue,
  push,
  ref,
} from "firebase/database";
import { initializeApp } from "firebase/app";
import { getAuth, updateProfile } from "firebase/auth";
import { getStorage, ref as fbStorageRef, uploadBytes, getDownloadURL, uploadBytesResumable, } from 'firebase/storage';

import { firebaseConfig } from "./fb-credentials";
import { getFirestore, collection, doc, addDoc, setDoc, getDocs, query, where, onSnapshot } from "firebase/firestore";



const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);

const dbRef = collection(db, "listings");
const rentRef = collection(db, "rentals");
const profileRef = collection(db, "profiles");
export default app;

export const storage = getStorage();


export const paths = {
  USER_DATA_PATH: "UserData/",
}

export function initDB() {
  initializeApp(firebaseConfig);
}


// export function storeData(item, path) {
//     console.log('Writing', item);
//     const db = getDatabase();
//     const reference = ref(db, path);
//     push(reference, item);
// }

export function setupDataListener(updateFunc, path) {
  const db = getDatabase();
  const reference = ref(db,path)
  onValue(reference, (snapshot) => {
      if (snapshot?.val()) {
        const fbObject = snapshot.val();
        const newArr = [];
        Object.keys(fbObject).map((key, index) => {
          newArr.push({ ...fbObject[key], id: key });
        });
        updateFunc(newArr);
      } else {
        updateFunc([]);
      }
    });
}



// Define a function to store data in Firestore
export function storeData(data) {
addDoc(dbRef, data)
.then(docRef => {
    console.log("Document has been added successfully");
})
.catch(error => {
    console.log(error);
})
}

// export async function fetchData ()  {
//   const dbRef = collection(db, "listings");
//   const snapshot = await getDocs(dbRef);
//   const list =  snapshot.docs.map(doc => doc.data());
//   return list;
// }

export async function fetchUserData (userId)  {
const dbRef = collection(db, "listings");
const q =  query(dbRef, where("userId", "==", userId));
const querySnapshot = await getDocs(q);
const list = querySnapshot.docs.map(doc => doc.data());
return list;
}

export async function fetchData(callback) {
const dbRef = collection(db, "listings");
const unsub = onSnapshot(dbRef, (snapshot) => {
  const list = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  callback(list);
});
return unsub;
}

export function confirmRentings(data) {
addDoc(rentRef, data)
.then(docRef => {
  console.log("Rental is successfully added");
})
.catch(error => {
  console.log(error)
})
}

export async function fetchUserRentals (userId)  {
console.log('userId')
console.log(userId)
const dbRef = collection(db, "rentals");
const q =  query(dbRef, where("customerId", "==", userId));
const querySnapshot = await getDocs(q);
const list = querySnapshot.docs.map(doc => doc.data());
return list;
}

export async function setProfile (data) {
await setDoc(doc(db, "profiles", `${data.uid}`), data, { merge: true })
.then(docRef => {
    console.log(`Document has been added successfully to ${collection}!`);
    console.log(data);
})
.catch(error => {
    console.log(error);
})
// await addDoc(collection(db, "profiles"), data)
// .then(() => {
//   console.log(`${data.name} added!`)
// })
}

export async function getProfile (uid) {
  const q = query(profileRef, where("uid", "==", uid));
  const querySnapshot = await getDocs(q);
  const data = querySnapshot.docs.map(doc => doc.data());
  return Promise.resolve(data);
}


export async function uploadImage (uri, fileName) {
  var response = 'https://www.cityworks.com/wp-content/uploads/2022/05/placeholder-3.png';
  let result = await fetch(uri);
  let blob = await result.blob();
  
  const storageRef = fbStorageRef(storage, fileName);
  
  await uploadBytesResumable(storageRef, blob)
  url = await getDownloadURL(storageRef)
    .then((url) => {
        console.log('Uploaded image: ', url);

        return Promise.resolve(url);
    })
}
