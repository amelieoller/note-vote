import { GET_NOTES, NOTES_STATUS } from './actionTypes';
import { database } from '../firebase';

export function getNotes() {
	return dispatch => {
		// As soon as function fires set loading to true
		dispatch({
			type: NOTES_STATUS,
			payload: true
		});

		database.on(
			'value',
			snapshot => {
				dispatch({
					type: GET_NOTES,
					notes: snapshot.val()
				});

				// Once notes are received set loading to false
				dispatch({
					type: NOTES_STATUS,
					payload: false
				});
				// Wait until something changes and try again
			},
			() => {
				dispatch({
					type: NOTES_STATUS,
					payload: -1
				});
			}
		);
	};
}

export function saveNote(note) {
	return dispatch => {
		database.push(note);
	};
}

export function deleteNote(id) {
	return dispatch => database.child(id).remove();
}

export function updateNote(id, note) {
	return dispatch => database.child(id).update(note);
}
