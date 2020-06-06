import firebase from 'firebase';

const config = {
    apiKey: "AIzaSyA6mZcVr-J6Z4FroFerKSq8rB838asDW1s",
    authDomain: "chatty-ac752.firebaseapp.com",
    databaseURL: "https://chatty-ac752.firebaseio.com"
  };
  
  firebase.initializeApp(config);
  export const auth = firebase.auth;
  export const db = firebase.database();