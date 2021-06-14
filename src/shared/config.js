import * as firebase from 'firebase';
import '@firebase/auth';
import '@firebase/firestore';

//THIS IS VERY IMPORTANT AS FIREBASE WILL NOT WORK IF MISSING
// can be found in console -> project overview settings -> project settings
var firebaseConfig = {
    apiKey: "AIzaSyD6xjVsrRLI3_P40ANl5tHsyzEV_Y2Acns",
    authDomain: "code-exp-e3eb3.firebaseapp.com",
    projectId: "code-exp-e3eb3",
    storageBucket: "code-exp-e3eb3.appspot.com",
    messagingSenderId: "838192194774",
    appId: "1:838192194774:web:d50bc36f0a3c72cdd21577"
  };

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}else{
    firebase.app()
}

export const db = firebase.firestore(); //exports an instance of the firestore API object
export const storage = firebase.storage(); //exports an instance of the storage API object
export const rtdb = firebase.database()

export { firebase }; //for general usage