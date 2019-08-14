import * as firebase from "firebase/app";
import "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyCQ4XUaO_H7ZVvFkkruLh0u7vHNQuLRBw8",
  authDomain: "reactclientpanel-68219.firebaseapp.com",
  databaseURL: "https://reactclientpanel-68219.firebaseio.com",
  projectId: "reactclientpanel-68219",
  storageBucket: "reactclientpanel-68219.appspot.com",
  messagingSenderId: "1025497509253",
  appId: "1:1025497509253:web:8b0972dfaa119b29"
};

export const fb = firebase.initializeApp(firebaseConfig);
