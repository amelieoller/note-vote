import { GET_NOTES, UPDATE_NOTE } from '../actions/actionTypes';

export default function(state = {}, action) {
	switch (action.type) {
		case GET_NOTES:
			return action.notes;
		case UPDATE_NOTE:
			let id = action.payload.id;
			let votes = action.payload.note.votes;
			var newNote = { ...state[id], votes: votes };
			return { ...state, [id]: newNote };
		default:
			return state;
	}
}
