import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyA7gNLOJgrKJ_O0tUPN5t02lhZC7EG70fo",
    authDomain: "swipeidea-5dbdf.firebaseapp.com",
    databaseURL: "https://swipeidea-5dbdf.firebaseio.com",
    projectId: "swipeidea-5dbdf",
    storageBucket: "swipeidea-5dbdf.appspot.com",
    messagingSenderId: "1039576845859",
    appId: "1:1039576845859:web:42174d61108e87969eeb96"
  });

  const db = firebaseApp.firestore();
  const auth = firebase.auth();
  const storage = firebase.storage();

  export {db, auth, storage};
