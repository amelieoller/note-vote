import { GET_NOTES } from './actionTypes';
import { database } from '../firebase';

export function getNotes() {
	return dispatch => {
		database.on('value', snapshot => {
			dispatch({
				type: GET_NOTES,
				notes: snapshot.val()
			});
		});
	};
}

export function saveNote(note) {
   return dispatch => {
      database.push(note)
   }
}

export function deleteNote(id) {
	return dispatch => database.child(id).remove()
}

export function updateNote(id, note) {
	return dispatch => database.child(id).update(note)
}