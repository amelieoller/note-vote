import { combineReducers } from 'redux';
import notes from './notesReducer';
import user from './userReducer';
import loading from './loadingReducer';

const rootReducer = combineReducers({
	notes,
	user,
	loading
});

export default rootReducer;
