import firebase from 'firebase/app';
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/storage';


// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyA2ubmpyjezjgzDi5C0sevDj_-d4xkQ7UQ",
    authDomain: "guaranteebox.firebaseapp.com",
    projectId: "guaranteebox",
    storageBucket: "guaranteebox.appspot.com",
    messagingSenderId: "71088564226",
    appId: "1:71088564226:web:352a7a4ceb328592d69f1b"
  };
  
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  const db = firebase.firestore();
  const storage = firebase.storage();

  export { firebase, db, storage };