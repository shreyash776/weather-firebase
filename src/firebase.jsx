
import { initializeApp } from "firebase/app";
// import {getDatabase ,set ,ref} from "firebase/database";
const firebaseConfig = {
    apiKey: "AIzaSyD9hYfXyJ86BEr_faue85y2jfj14KjYqS8",
    authDomain: "weather-firebase-a07d1.firebaseapp.com",
    projectId: "weather-firebase-a07d1",
    storageBucket: "weather-firebase-a07d1.appspot.com",
    messagingSenderId: "476522211981",
    appId:"1:476522211981:web:e4067c769457df571f10c4",
    measurementId: "G-C4NPSYXWM0",
    databaseURL:"https://weather-firebase-a07d1-default-rtdb.firebaseio.com"
  };
 
  const app = initializeApp(firebaseConfig);
  export { app };