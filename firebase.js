import * as firebase from 'firebase';

import "firebase/auth";
import "firebase/firestore";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAsRwWvktjBXv2cKRph9Wva3EGGRPjl140",
    authDomain: "fir-signal-clone.firebaseapp.com",
    projectId: "fir-signal-clone",
    storageBucket: "fir-signal-clone.appspot.com",
    messagingSenderId: "693477833631",
    appId: "1:693477833631:web:9efac68f0fe5f2b96b9baa",
    measurementId: "G-0W84M1F4WN"
};

let app;

if ( firebase.apps.length === 0 ) {
    app = firebase.initializeApp(firebaseConfig);
} else {
    app = firebase.app();
}

const db = app.firestore();
const auth = app.auth();

export{auth, db};