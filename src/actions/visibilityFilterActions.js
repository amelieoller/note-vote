import { SET_VISIBILITY_FILTER } from './actionTypes';

export function setVisibilityFilter(id, type) {
	return dispatch => {
		dispatch({
			type: SET_VISIBILITY_FILTER,
			payload: { id, type }
		});
	};
}
