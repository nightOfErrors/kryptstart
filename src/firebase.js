import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyDLzYI1ZrN3FuDRTCRs0dx9Juc3t3IvV14",
    authDomain: "kryptoback-2395d.firebaseapp.com",
    projectId: "kryptoback-2395d",
    storageBucket: "kryptoback-2395d.appspot.com",
    messagingSenderId: "710848029136",
    appId: "1:710848029136:web:bfe132952c7e4ebabd99d5",
    measurementId: "G-MDV3T6N437"
};

const app = firebase.initializeApp(firebaseConfig);
const db = app.firestore();

export default db;





