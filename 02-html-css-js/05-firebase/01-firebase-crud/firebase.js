

  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-app.js";
  // TODO: Add SDKs for Firebase products that you want to use
  import {getFirestore,
    collection,
    addDoc,
    getDocs,
    deleteDoc,
    onSnapshot,
    doc,
    getDoc,
    updateDoc
 } from "https://www.gstatic.com/firebasejs/9.6.10/firebase-firestore.js"
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyClRh92rJ9e2eq1A4yqUbgmexHpcJjMWMI",
    authDomain: "fir-web-base.firebaseapp.com",
    projectId: "fir-web-base",
    storageBucket: "fir-web-base.appspot.com",
    messagingSenderId: "287740988907",
    appId: "1:287740988907:web:fbefacb5e05eb25c8e1dae"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);

// *conexion a la base de datos
  const db= getFirestore()


//* enviar los datos a firestore
 export const saveTask= (title,description) => 
    // console.log(title,description);
    addDoc( collection(db, 'tasks'),{title, description})

//* mostar los datos desde firestore
export const getTasks = () => getDocs(collection(db,'tasks'))


//* listar en tiempo real
export const onGetTasks = (callback) => onSnapshot(collection(db,'tasks'),callback) 

// export {
//     onSnapshot,
//     collection,
//     db
// }


//* eliminar
export const deleteTask = id =>  deleteDoc(doc(db,'tasks',id))

//*  editar datos en el input
export const getTask = id =>  getDoc(doc(db,'tasks',id))

//* actiualizar
export const updateTask = (id,newFields) => updateDoc(doc(db,'tasks',id), newFields)