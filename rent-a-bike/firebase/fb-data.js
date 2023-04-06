import {
    getDatabase,
    onValue,
    push,
    ref,
    remove,
    set,
} from "firebase/database";

import { firebaseConfig } from "./fb-credentials";
import { initializeApp } from "firebase/app";

export const paths = {
    USER_DATA_PATH: "UserData/",
}

export function initDB() {
    initializeApp(firebaseConfig);
}

export function storeData(item, path) {
    console.log('Writing', item);
    const db = getDatabase();
    const reference = ref(db, path);
    push(reference, item);
}

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
