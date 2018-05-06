import { GET_CATEGORIES, CATEGORIES_STATUS } from './actionTypes';
import { categoryDb } from '../firebase';

export function getCategories() {
	return dispatch => {
		// As soon as function fires set loading to true
		dispatch({
			type: CATEGORIES_STATUS,
			payload: true
		});

		categoryDb.on(
			'value',
			snapshot => {
				dispatch({
					type: GET_CATEGORIES,
					categories: snapshot.val()
				});

				// Once categories are received set loading to false
				dispatch({
					type: CATEGORIES_STATUS,
					payload: false
				});
				// Wait until something changes and try again
			},
			() => {
				dispatch({
					type: CATEGORIES_STATUS,
					payload: -1
				});
			}
		);
	};
}

export function saveCategory(category) {
	return dispatch => {
		return categoryDb.push(category);
	};
}

export function deleteCategory(id) {
	return dispatch => categoryDb.child(id).remove();
}

export function updateCategory(id, category) {
	return dispatch => categoryDb.child(id).update(category);
}
