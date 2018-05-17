import {
	NOTES_STATUS,
	USER_STATUS,
	CATEGORIES_STATUS,
	TAGS_STATUS
} from '../actions/actionTypes';

export default function(state = {}, action) {
	switch (action.type) {
		case NOTES_STATUS:
			return { ...state, notes: action.payload };
		case USER_STATUS:
			return { ...state, user: action.payload };
		case CATEGORIES_STATUS:
			return { ...state, categories: action.payload };
		case TAGS_STATUS:
			return { ...state, tags: action.payload };
		default:
			return state;
	}
}
