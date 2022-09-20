// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAB1i1Yzm6oeSI5Ow3wZDTziqTSgS-yhFM",
  authDomain: "podlific-aaec4.firebaseapp.com",
  projectId: "podlific-aaec4",
  storageBucket: "podlific-aaec4.appspot.com",
  messagingSenderId: "48618171238",
  appId: "1:48618171238:web:3ee7b309f1ca7f005036a7",
  measurementId: "G-M0QX5Q2V8Y",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const storage = getStorage(app);
export default storage;
