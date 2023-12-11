import firebase from 'firebase';

const firebaseConfig = {
  apiKey: "AIzaSyASOqOfJTL6netgTzNka31p16s3sbD1Wlc",
  authDomain: "barter-app-71123.firebaseapp.com",
  projectId: "barter-app-71123",
  storageBucket: "barter-app-71123.appspot.com",
  messagingSenderId: "195793571150",
  appId: "1:195793571150:web:fd748486ab11a2ba2ae21f"
};
if(!firebase.apps.length)
firebase.initializeApp(firebaseConfig);

export default firebase.firestore();