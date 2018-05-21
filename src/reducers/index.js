import { combineReducers } from 'redux';
import notes from './notesReducer';
import user from './userReducer';
import loading from './loadingReducer';
import errors from './errorsReducer';
import categories from './categoriesReducer';
import tags from './tagsReducer';
import visibilityFilter from './visibilityFilter'

const rootReducer = combineReducers({
	notes,
	user,
	loading,
	errors,
	categories,
	tags,
	visibilityFilter
});

export default rootReducer;
