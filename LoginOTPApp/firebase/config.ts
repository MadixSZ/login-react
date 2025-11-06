import { initializeApp } from 'firebase/app';
import { getAuth, sendPasswordResetEmail, signInWithEmailAndPassword, createUserWithEmailAndPassword, sendEmailVerification, updateProfile } from 'firebase/auth';
import { getFirestore, collection, addDoc, query, where, getDocs } from 'firebase/firestore';

// SUA CONFIGURAÇÃO DO FIREBASE
const firebaseConfig = {
  apiKey: "AIzaSyD4ynGY-v28qp7wfPyabwY9e-snoCJUu9Q",
  authDomain: "loginotpapp-4ea2d.firebaseapp.com",
  projectId: "loginotpapp-4ea2d",
  storageBucket: "loginotpapp-4ea2d.firebasestorage.app",
  messagingSenderId: "1097545964249",
  appId: "1:1097545964249:web:56adf08a6aa78e04fe7cc8"
};

// Initialize Firebase
console.log('Inicializando Firebase...');
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
console.log('Firebase Auth inicializado');

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);
console.log('Firestore inicializado');

// Funções de autenticação
export { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  sendPasswordResetEmail,
  sendEmailVerification,
  updateProfile
};

// Funções do Firestore
export { collection, addDoc, query, where, getDocs };