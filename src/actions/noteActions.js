import {
	GET_NOTES,
	NOTES_STATUS,
	DELETE_NOTE,
	UPDATE_NOTE
} from './actionTypes';
import { noteDb, categoryDb, tagDb } from '../firebase';

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

export function saveNote(note, category, tag) {
	return dispatch => {
		// If no new category is created, save note as it is passed into function
		let noteToSave = note;

		// New Category creation: Category returns an object ({ name: category })
		if (typeof category === 'object' && category !== null) {
			categoryDb.push(category).on('value', snapshot => {
				let categories = [...note.categories, snapshot.key];
				noteToSave = { ...note, categories };
			});
			// Category already exists: Category returns found category key
		} else if (!!category) {
			categoryDb.child(category).on('value', snapshot => {
				let categories = [...new Set([...note.categories, snapshot.key])];
				noteToSave = { ...note, categories };
			});
		}

		if (typeof tag === 'object' && tag !== null) {
			tagDb.push(tag).on('value', snapshot => {
				let tags = [...note.tags, snapshot.key];
				noteToSave = { ...note, tags };
			});
			// tag already exists: tag returns found tag key
		} else if (!!tag) {
			tagDb.child(tag).on('value', snapshot => {
				let tags = [...new Set([...note.tags, snapshot.key])];
				noteToSave = { ...note, tags };
			});
		}

		noteDb.push(noteToSave);
	};
}

export function deleteNote(id) {
	return dispatch => {
		noteDb.child(id).remove();
		// .then(() => {
		dispatch({
			type: DELETE_NOTE,
			payload: id
		});
		// });
	};
}

export function updateNote(id, note) {
	return dispatch => {
		noteDb.child(id).update(note);

		dispatch({
			type: UPDATE_NOTE,
			payload: { id, note }
		});
	};
}
