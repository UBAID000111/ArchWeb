// public/js/firebase-config.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-app.js";
import {
  getFirestore,
  collection,
  getDocs,
  getDoc,
  doc,
  addDoc,
  query,
  where,
  orderBy,
  limit
} from "https://www.gstatic.com/firebasejs/10.6.0/firebase-firestore.js";
import {
  getStorage,
  ref as storageRef,
  uploadBytes,
  getDownloadURL
} from "https://www.gstatic.com/firebasejs/10.6.0/firebase-storage.js";

const firebaseConfig = {
  apiKey: "AIzaSyD7fYaBiVRyQirtjCa6xQAFe0dF2WKKwOk",
  authDomain: "archweb-a346b.firebaseapp.com",
  projectId: "archweb-a346b",
  storageBucket: "archweb-a346b.firebasestorage.app",
  messagingSenderId: "379366395076",
  appId: "1:379366395076:web:fc935d24b1b4f31d21cd91",
  measurementId: "G-53R1BCF437"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);

export {
  db,
  storage,
  collection,
  getDocs,
  getDoc,
  doc,
  addDoc,
  query,
  where,
  orderBy,
  limit,
  storageRef,
  uploadBytes,
  getDownloadURL
};
