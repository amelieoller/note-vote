import * as firebase from 'firebase';

// Initialize Firebase
var config = {
	apiKey: 'AIzaSyDVa43K-ClMCXxJgA45fQBRHJ0z3wcPOCo',
	authDomain: 'note-vote.firebaseapp.com',
	databaseURL: 'https://note-vote.firebaseio.com',
	projectId: 'note-vote',
	storageBucket: 'note-vote.appspot.com',
	messagingSenderId: '507685399136'
};
firebase.initializeApp(config);

export const database = firebase.database().ref('/notes');
export const auth = firebase.auth();
export const googleProvider = new firebase.auth.GoogleAuthProvider();
