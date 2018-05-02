import { ADD_ERROR } from '../actions/actionTypes';

export default function(state = [], action) {
	switch (action.type) {
		case ADD_ERROR:
			return [...state, action.error ];
		default:
			return state;
	}
}
