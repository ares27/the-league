 // Your web app's Firebase configuration
 let firebaseConfig = {
    apiKey: "AIzaSyCg31O9fKuoVerzy8PMb_3yUHSJXo3A0oU",
    authDomain: "the-league-66947.firebaseapp.com",
    databaseURL: "https://the-league-66947.firebaseio.com",
    projectId: "the-league-66947",
    storageBucket: "the-league-66947.appspot.com",
    messagingSenderId: "323608936944",
    appId: "1:323608936944:web:6ba38ebe55c6bc423c9d35",
    measurementId: "G-LQ6X0TD5H8"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();

  // Get the Auth service for the default app
  let auth = firebase.auth();
  
  // Get the Auth service for the default app
  let db = firebase.firestore();


  // Get the functions service for the default app
  let functions = firebase.functions();


  // Get a reference to the storage service, which is used to create references in your storage bucket
  const storage = firebase.storage();

  //console.log("storage:", storage);

  // console.log("db:", db);
  // console.log("auth:", auth);