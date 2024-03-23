

    // Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.11/firebase-app.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth, createUserWithEmailAndPassword,signInWithEmailAndPassword,signOut, signInWithPopup, GoogleAuthProvider, FacebookAuthProvider } from "https://www.gstatic.com/firebasejs/9.6.11/firebase-auth.js";


import { getFirestore, collection, getDocs } from "https://www.gstatic.com/firebasejs/9.6.11/firebase-firestore.js";



// Your web app's Firebase configuration
 const firebaseConfig = {
  apiKey: "AIzaSyB_Loqcfh1FzoMpoUBe-ha2B8TFaHeMLhs",
  authDomain: "fb-auth-cd2e1.firebaseapp.com",
  projectId: "fb-auth-cd2e1",
  storageBucket: "fb-auth-cd2e1.appspot.com",
  messagingSenderId: "172568929463",
  appId: "1:172568929463:web:3a29a0923d13b0c0aad932"
};

// Initialize Firebase
 const app = initializeApp(firebaseConfig);

 //*  FIREBASE AUTH 
 export const auth =getAuth()
 
 export const createUser=createUserWithEmailAndPassword
 export const signinUser=signInWithEmailAndPassword
 export const signout=signOut
 
//*  FIREBASE FIRESTORE
 export const db = getFirestore()

//*  mostrar los datos de firebase
export const getTasks = () => getDocs(collection(db,'posts'))

//* vicular cuenta de google
// export const linkWith =signInWithPopup

//  export const providerAuth = new GoogleAuthProvider()

const providerGoogle = new GoogleAuthProvider()

export const  popupGoogle = () => signInWithPopup(auth,providerGoogle)

//* vincular con Facebook
const providerFacebook= new FacebookAuthProvider()

export const popupFacebook = () =>signInWithPopup(auth,providerFacebook)
