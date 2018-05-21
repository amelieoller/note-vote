import { GET_TAGS, TAGS_STATUS } from './actionTypes';
import { tagDb } from '../firebase';

export function getTags() {
	return dispatch => {
		// As soon as function fires set loading to true
		dispatch({
			type: TAGS_STATUS,
			payload: true
		});

		tagDb.on(
			'value',
			snapshot => {
				dispatch({
					type: GET_TAGS,
					tags: snapshot.val()
				});

				// Once tags are received set loading to false
				dispatch({
					type: TAGS_STATUS,
					payload: false
				});
				// Wait until something changes and try again
			},
			() => {
				dispatch({
					type: TAGS_STATUS,
					payload: -1
				});
			}
		);
	};
}

export function saveTag(tag) {
	return dispatch => tagDb.push(tag);
}

export function deleteTag(id) {
	return dispatch => tagDb.child(id).remove();
}

export function updateTag(id, tag) {
	return dispatch => tagDb.child(id).update(tag);
}
