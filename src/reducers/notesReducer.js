import { GET_NOTES } from '../actions/actionTypes';

export default function(state = {}, action) {
	switch (action.type) {
		case GET_NOTES:
			return action.notes;
		default:
			return state;
	}
}
