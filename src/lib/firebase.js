import Firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import { seedDatabase } from './seed';
//  Call the seed file only once

const config = {
  apiKey: 'AIzaSyCxcaZCK1xrobZx5OdxAVlL5uDZOAvMYSQ',
  authDomain: 'instagram-clone-77d3c.firebaseapp.com',
  projectId: 'instagram-clone-77d3c',
  storageBucket: 'instagram-clone-77d3c.appspot.com',
  messagingSenderId: '411188630063',
  appId: '1:411188630063:web:96d362838d4f80f8b36cda',
  measurementId: 'G-X8S1NNFT0S',
};

const firebase = Firebase.initializeApp(config);

const { FieldValue } = Firebase.firestore;

export { firebase, FieldValue };
