import { auth, googleProvider } from '../firebase';

export function googleLogin() {
	return dispatch => auth.signInWithPopup(googleProvider);
}
