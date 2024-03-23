//* FIREBASE V8
// import firebase from "firebase/app";

// import "firebase/firestore";
// import "firebase/auth";

// const firebaseConfig = {
//   apiKey: "AIzaSyAOC0nEHNS8nW4H8iDcN9lDDz2bH7gqb20",
//   authDomain: "crud-react-41c09.firebaseapp.com",
//   projectId: "crud-react-41c09",
//   storageBucket: "crud-react-41c09.appspot.com",
//   messagingSenderId: "1082955958589",
//   appId: "1:1082955958589:web:e2615d96e5c593a5a09d54",
// };

// // Initialize Firebase
// firebase.initializeApp(firebaseConfig);

// const db = firebase.firestore();
// const googleAuthProvider = firebase.auth.GoogleAuthProvider();

// export { firebase, bd, GoogleAuthProvider };

//* FIREBASE 9
import firebase from "firebase/compat/app";

import "firebase/compat/firestore";
import "firebase/compat/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAOC0nEHNS8nW4H8iDcN9lDDz2bH7gqb20",
  authDomain: "crud-react-41c09.firebaseapp.com",
  projectId: "crud-react-41c09",
  storageBucket: "crud-react-41c09.appspot.com",
  messagingSenderId: "1082955958589",
  appId: "1:1082955958589:web:e2615d96e5c593a5a09d54",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

export { firebase, db, googleAuthProvider };
