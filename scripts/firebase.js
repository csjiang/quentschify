import firebase from 'firebase';

const fb = firebase.initializeApp({
  databaseURL: 'https://quench-e57cf.firebaseio.com/'
});

export default fb.database();
