// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB8QJQJQJQJQJQJQJQJQJQJQJQJQJQJQJQ",
  authDomain: "apti-4.firebaseapp.com",
  projectId: "apti-4",
  storageBucket: "apti-4.appspot.com",
  messagingSenderId: "123456789012",
  appId: "1:123456789012:web:abcdef1234567890abcdef"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Initialize Firestore
const db = firebase.firestore();

// Export the database instance
window.db = db; 