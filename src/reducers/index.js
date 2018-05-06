import { combineReducers } from 'redux';
import notes from './notesReducer';
import user from './userReducer';
import loading from './loadingReducer';
import errors from './errorsReducer';
import categories from './categoriesReducer';

const rootReducer = combineReducers({
	notes,
	user,
	loading,
	errors,
	categories
});

export default rootReducer;
