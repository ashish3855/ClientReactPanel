import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import { createStore, combineReducers, compose } from "redux";
import { reactReduxFirebase, firebaseReducer } from "react-redux-firebase";
import { createFirestoreInstance } from "redux-firestore";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
import "firebase/storage"; // <- needed if using storage
import "firebase/firestore"; // <- needed if using firestore
// import "firebase/functions"; // <- needed if using httpsCallable
import { reduxFirestore, firestoreReducer } from "redux-firestore"; // <- needed if using firestore

const firebaseConfig = {
  apiKey: "AIzaSyCQ4XUaO_H7ZVvFkkruLh0u7vHNQuLRBw8",
  authDomain: "reactclientpanel-68219.firebaseapp.com",
  databaseURL: "https://reactclientpanel-68219.firebaseio.com",
  projectId: "reactclientpanel-68219",
  storageBucket: "reactclientpanel-68219.appspot.com",
  messagingSenderId: "1025497509253",
  appId: "1:1025497509253:web:8b0972dfaa119b29"
};
// react-redux-firebase config
const rrfConfig = {
  userProfile: "clients",
  useFirestoreForProfile: true // Firestore for Profile instead of Realtime DB
};

// Initialize firebase instance
firebase.initializeApp(firebaseConfig);

// Initialize other services on firebase instance
firebase.firestore(); // <- needed if using firestore
// firebase.functions(); // <- needed if using httpsCallable

// Add reactReduxFirebase enhancer when making store creator
// const createStoreWithFirebase = compose(
//   reactReduxFirebase(firebase, rrfConfig) // firebase instance as first argument
//   // reduxFirestore(firebase) // <- needed if using firestore
// )(createStore);

// Add firebase to reducers
const rootReducer = combineReducers({
  firebase: firebaseReducer,
  firestore: firestoreReducer // <- needed if using firestore
});

// Create store with reducers and initial state
const initialState = {};
const store = createStore(
  rootReducer,
  initialState,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export const rrfProps = {
  firebase,
  config: rrfConfig,
  dispatch: store.dispatch
};

export default store;
