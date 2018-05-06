import { GET_NOTES, NOTES_STATUS } from './actionTypes';
import { noteDb, categoryDb } from '../firebase';

export function getNotes() {
	return dispatch => {
		// As soon as function fires set loading to true
		dispatch({
			type: NOTES_STATUS,
			payload: true
		});

		noteDb.on(
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

export function saveNote(note, category, exists) {
	return dispatch => {
		let newNote = note;

		if (category && !exists) {
			categoryDb.push(category).on('value', snapshot => {
				let categories = [...note.categories, snapshot.key];
				newNote = { ...note, categories };
			});
		} else if (exists) {
			categoryDb.child(category).on('value', snapshot => {
				let categories = [...new Set([...note.categories, snapshot.key])];
				newNote = { ...note, categories };
			});
		}

		noteDb.push(newNote);
	};
}

export function deleteNote(id) {
	return dispatch => noteDb.child(id).remove();
}

export function updateNote(id, note) {
	return dispatch => noteDb.child(id).update(note);
}
