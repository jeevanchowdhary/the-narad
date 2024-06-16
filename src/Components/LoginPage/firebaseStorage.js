import { initializeApp } from "firebase/app";
import { getStorage, ref, uploadBytes,listAll,getDownloadURL,deleteObject   } from 'firebase/storage';


const firebaseConfig = {
    apiKey: "AIzaSyBfvvQ4V3F40JUUXKdbJNObLNQIts5Hf7s",
    authDomain: "the-narad-949de.firebaseapp.com",
    projectId: "the-narad-949de",
    storageBucket: "the-narad-949de.appspot.com",
    messagingSenderId: "174297553821",
    appId: "1:174297553821:web:2d02cb2985d870af8e2d74",
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export { storage, ref, uploadBytes,listAll,getDownloadURL,deleteObject  };
