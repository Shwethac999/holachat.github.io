import firebase from "firebase";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA73spX2kqHaegcnym_ODJAXnlhStjKzn0",
  authDomain: "shwetha-c26ef.firebaseapp.com",
  databaseURL: "https://shwetha-c26ef.firebaseio.com",
  projectId: "shwetha-c26ef",
  storageBucket: "shwetha-c26ef.appspot.com",
  messagingSenderId: "905496681460",
  appId: "1:905496681460:web:4d3ccbf1f16dee0e20b7a1",
  measurementId: "G-Q2LZJ807VB"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();

const auth = firebase.auth();

const provider = new firebase.auth.GoogleAuthProvider();

const session = firebase.auth.Auth.Persistence.SESSION;

export { auth, provider, session };
export default db;
