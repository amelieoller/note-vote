import { combineReducers } from 'redux';
import notes from './notesReducer';
import user from './userReducer';
import loading from './loadingReducer';
import errors from './errorsReducer';

const rootReducer = combineReducers({
	notes,
	user,
	loading,
	errors
});

export default rootReducer;
