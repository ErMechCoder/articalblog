import {initializeApp} from 'firebase/app';
import 'firebase/messaging';
import { getMessaging, getToken, onMessage } from "firebase/messaging";

// const config = {
//     apiKey: "AIzaSyDKMue4CjlYfWI7KHC5gOacPZkKLw21__w",
//     authDomain: "react-push-e2ef8.firebaseapp.com",
//     projectId: "react-push-e2ef8",
//     storageBucket: "react-push-e2ef8.appspot.com",
//     messagingSenderId: "711485945166",
//     appId: "1:711485945166:web:199b1d1804c189f39a1a1f",
//     measurementId: "G-6302152CLB"
// };

const config = {
  apiKey: "AIzaSyCEYegxAFFE3y5aHzaOLwiXW6qRY52_S4c",
  authDomain: "wowauth.firebaseapp.com",
  projectId: "wowauth",
  storageBucket: "wowauth.appspot.com",
  messagingSenderId: "1094312396696",
  appId: "1:1094312396696:web:3f9371c8044c65ccf64ded",
  measurementId: "G-ZR3ZSE939P"
};


// firebase.initializeApp(config);
const firebaseApp = initializeApp(config);
const messaging = getMessaging(firebaseApp);


// next block of code goes here

export const  fetchToken = async() => {
  return getToken(messaging, {vapidKey: 'BCllQPNUY3Y3_qydbkuxdK1n5LuowsnLZXL9RzfpedeJxLI54Ak5DJnIFjb4iNp6AK36zioq_ypfRtYBMfjiYv8'}).then((currentToken) => {
    if (currentToken) {
      console.log('current token for client: ', currentToken);
      
    } else {
      console.log('No registration token available. Request permission to generate one.');
    
    }
  }).catch((err) => {
    console.log('An error occurred while retrieving token. ', err);
    // catch error while creating client token
  });
}


export const onMessageListener = () =>
  new Promise((resolve) => {
    onMessage(messaging, (payload) => {
      resolve(payload);
    });
});