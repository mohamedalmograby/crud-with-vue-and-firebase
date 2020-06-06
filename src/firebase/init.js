import firebase from "firebase" 
import firestore from "firebase/firestore"

var firebaseConfig = {
    apiKey: "AIzaSyDzWSKYbmJFkckZzBn1nQpQp6YQAzI7erw",
    authDomain: "udemy-vue-firebase-crud.firebaseapp.com",
    databaseURL: "https://udemy-vue-firebase-crud.firebaseio.com",
    projectId: "udemy-vue-firebase-crud",
    storageBucket: "udemy-vue-firebase-crud.appspot.com",
    messagingSenderId: "330286188891",
    appId: "1:330286188891:web:be442424f69aac4ca6727e",
    measurementId: "G-4PCB6R1D3C"
  };
  // Initialize Firebase
  const firebaseApp = firebase.initializeApp(firebaseConfig);
  //firebaseApp.firestore().settings({timestampsInSnapshots:true})

  export default firebaseApp.firestore()