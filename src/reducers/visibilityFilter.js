import { SET_VISIBILITY_FILTER } from '../actions/actionTypes';
import _pickBy from 'lodash/pickBy';

export default function(
	state = { tags: [], categories: [], archived: false },
	action
) {
	switch (action.type) {
		case SET_VISIBILITY_FILTER:
			let type = action.payload.type;
			let targetId = action.payload.id;
			let typeArray = state[type];

			if (targetId === 'all') {
				return { ...state, ...{ [type]: [] } };
			} else if (targetId === 'archived') {
				return { ...state, ...{ archived: !state.archived } };
			} else {
				if (typeArray.includes(targetId)) {
					let index = typeArray.indexOf(targetId);
					let newTypeArray = [
						...typeArray.slice(0, index),
						...typeArray.slice(index + 1)
					];
					return { ...state, ...{ [type]: newTypeArray } };
				} else {
					return {
						...state,
						...{ [type]: [...typeArray, targetId] },
						currentFilter: type
					};
				}
			}
		default:
			return state;
	}
}
