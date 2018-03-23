import { auth, googleProvider } from '../firebase';
import { GET_USER, USER_STATUS } from './actionTypes';

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
	return dispatch => {
		// As soon as function fires set loading to true
		dispatch({
			type: USER_STATUS,
			payload: true
		});

		auth.onAuthStateChanged(user => {
			dispatch({
				type: GET_USER,
				user: user
			});

			// Set loading status to false
			dispatch({
				type: USER_STATUS,
				payload: false
			});
		});
	};
}

export function logout() {
	return dispatch => auth.signOut();
}
