import { GET_TAGS } from '../actions/actionTypes';

export default function(state = {}, action) {
	switch (action.type) {
		case GET_TAGS:
			return action.tags;
		default:
			return state;
	}
}
