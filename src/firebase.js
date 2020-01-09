import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
import "firebase/storage";

var firebaseConfig = {
	apiKey: "AIzaSyD5oKyIbksdAqnBLKMNrIBlZOscKGJPYj4",
	authDomain: "react-redux-slack-5347a.firebaseapp.com",
	databaseURL: "https://react-redux-slack-5347a.firebaseio.com",
	projectId: "react-redux-slack-5347a",
	storageBucket: "react-redux-slack-5347a.appspot.com",
	messagingSenderId: "410654101732",
	appId: "1:410654101732:web:63f3900c413d9654ec9cf1",
	measurementId: "G-1PNL4WG3VR"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

export default firebase;
