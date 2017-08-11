import * as firebase from 'firebase';

const config ={
  apiKey:"AIzaSyAVKyvsAGdIxrcMGBWyykKmWgcc0V7To0A",
  authDomain:"bloodhound-ae4b4.firebaseapp.com",
  databaseURL:"https://bloodhound-ae4b4.firebaseio.com/",
  projectID: "bloodhound-ae4b4",
  storageBucket: "bloodhound-ae4b4.appspot.com  ",
  messengingSenseID:"997231378133"
};
firebase.initializeApp(config);

export const firebaseDB = firebase.database();

export default firebase;
