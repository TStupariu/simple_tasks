import Firebase from 'firebase'

const firebaseApp = Firebase.initializeApp({
	apiKey: "AIzaSyDlcyLCyEllwRoBlaFTWDW-byObiO1f5vQ",
	authDomain: "simple-tasks-9c598.firebaseapp.com",
	databaseURL: "https://simple-tasks-9c598.firebaseio.com",
	projectId: "simple-tasks-9c598",
	storageBucket: "simple-tasks-9c598.appspot.com",
	messagingSenderId: "515822663722"
});

export const db = firebaseApp.database();
export const auth = firebaseApp.auth();