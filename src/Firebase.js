import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyBlONCtH_EkuAC60ungDuLUQAZHxNTxDrI",
    authDomain: "teacherly-db.firebaseapp.com",
    projectId: "teacherly-db",
    storageBucket: "teacherly-db.appspot.com",
    messagingSenderId: "452385698096",
    appId: "1:452385698096:web:048358d1514c701e0618f5"
};

const firebaseApp = firebase.initializeApp(firebaseConfig)
const db = firebaseApp.firestore();
export default db;