import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { firestore } from 'firebase';

const firebase = require('firebase');
require('firebase/firestore');

const firebaseConfig = {
    apiKey: "AIzaSyA3r2s9SA1Rq6RkdzOGuvh48kx1tZhmM3A",
    authDomain: "mininote-a9762.firebaseapp.com",
    databaseURL: "https://mininote-a9762.firebaseio.com",
    projectId: "mininote-a9762",
    storageBucket: "mininote-a9762.appspot.com",
    messagingSenderId: "648199614982",
    appId: "1:648199614982:web:33de53ef36a07f4c098987",
    measurementId: "G-GQDBL67WGK"
  };

  firebase.initializeApp(firebaseConfig);

ReactDOM.render(<App />, document.getElementById('mini-note'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
