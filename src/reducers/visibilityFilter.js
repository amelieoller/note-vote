import { SET_VISIBILITY_FILTER } from '../actions/actionTypes';

export default function(
	state = { tags: [], categories: [], archived: false },
	action
) {
	switch (action.type) {
		case SET_VISIBILITY_FILTER:
			let type = action.payload.type;
			let targetId = action.payload.id;
			let typeArray = state[type];

			switch (true) {
				case targetId === 'clearFilters':
					return { tags: [], categories: [], archived: false };
				case targetId === 'all':
					return { ...state, ...{ [type]: [] } };
				case targetId === 'archived':
					return { ...state, ...{ archived: !state.archived } };
				case typeArray.includes(targetId):
					return {
						...state,
						...{ [type]: typeArray.filter(i => i !== targetId) }
					};
				default:
					return {
						...state,
						...{ [type]: [...typeArray, targetId] },
						currentFilter: type
					};
			}
		default:
			return state;
	}
}
