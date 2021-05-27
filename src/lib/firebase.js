import firebase from "firebase/app";
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyAz9-UDlb1KF0HVBbSQKJocGtg5LY12rPo",
    authDomain: "vinyl-imprint.firebaseapp.com",
    projectId: "vinyl-imprint",
    storageBucket: "vinyl-imprint.appspot.com",
    messagingSenderId: "498850998645",
    appId: "1:498850998645:web:ba32a0f763bccb85d10b3c",
    measurementId: "G-BMBHTX7ZML"
};

if(!firebase.apps.length){
    firebase.initializeApp(firebaseConfig);
}

export const auth = firebase.auth();
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

export const firestore = firebase.firestore();
export const storage = firebase.storage();