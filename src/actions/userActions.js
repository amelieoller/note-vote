import { auth, googleProvider } from '../firebase';
import { GET_USER } from './actionTypes';

export function googleLogin() {
	return dispatch => auth.signInWithPopup(googleProvider);
}

export function passwordSignUp(email, password) {
	return dispatch => auth.createUserWithEmailAndPassword(email, password);
}

export function passwordSignIn(email, password) {
	return dispatch => auth.signInWithEmailAndPassword(email, password);
}

export function getUser() {
	return dispatch =>
		auth.onAuthStateChanged(user => {
			dispatch({
				type: GET_USER,
				user: user
			});
		});
}

export function logout() {
	return dispatch => auth.signOut();
}
