// import firebase from "firebase"
// import "firebase/fires"

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import {getStorage} from 'firebase/storage';
import 'firebase/storage'; 

const firebaseConfig = {
    apiKey: "AIzaSyDGUG2cCYIdhncvdSBVc83kjLr5SpRPji0",
    authDomain: "giveawaygoods-82c60.firebaseapp.com",
    projectId: "giveawaygoods-82c60",
    storageBucket: "giveawaygoods-82c60.appspot.com",
    messagingSenderId: "808677604587",
    appId: "1:808677604587:web:e7e22270fc028644ff52ae"
  };


const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
export const auth = getAuth(app);
export const db = getFirestore();

