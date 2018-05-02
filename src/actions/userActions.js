import { auth, googleProvider } from '../firebase';
import { GET_USER, USER_STATUS, ADD_ERROR } from './actionTypes';

export function googleLogin() {
	return dispatch => auth.signInWithPopup(googleProvider);
}

export function passwordSignUp(email, password) {
	return dispatch => {
		auth.createUserWithEmailAndPassword(email, password).catch(error => {
			dispatch({ type: ADD_ERROR, error: error.message });
		});
	};
}

export function passwordSignIn(email, password) {
	return dispatch =>
		auth.signInWithEmailAndPassword(email, password).catch(function(error) {
			dispatch({ type: ADD_ERROR, error: error.message });
		});
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
