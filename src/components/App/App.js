import React, { Component } from 'react';
import styles from './App.scss';
import _map from 'lodash/map';
import { connect } from 'react-redux';
import { createFilter } from 'react-search-input';
import _filter from 'lodash/filter';
import _includes from 'lodash/includes';
import { arrayify } from '../../shared/helpers';

// Components
import NoteCard from '../NoteCard/NoteCard';
import NotePage from '../NotePage/NotePage';
import Navigation from '../Navigation/Navigation';
import Sidebar from '../Sidebar/Sidebar';
import ActiveFilters from '../ActiveFilters/ActiveFilters';

// Actions
import { getNotes, saveNote, deleteNote } from '../../actions/noteActions';
import { setVisibilityFilter } from '../../actions/visibilityFilterActions';
import {
	getCategories,
	deleteCategory,
	saveCategory
} from '../../actions/categoryActions';
import { getTags, deleteTag, saveTag } from '../../actions/tagActions';

const getVisibleNotes = (notes, visibilityFilter) => {
	let filteredNotes;

	if (
		notes &&
		(visibilityFilter.tags.length !== 0 ||
			visibilityFilter.categories.length !== 0)
	) {
		_filter(Object.keys(notes), function(key) {
			return (
				visibilityFilter.categories.every(cat =>
					_includes(notes[key].categories, cat)
				) && visibilityFilter.tags.every(tag => _includes(notes[key].tags, tag))
			);
		}).map(selectedKey => {
			return (filteredNotes = {
				...filteredNotes,
				...{ [selectedKey]: notes[selectedKey] }
			});
		});
	} else {
		filteredNotes = notes;
	}

	return filteredNotes;
};

const KEYS_TO_FILTERS = ['title', 'body'];

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			title: '',
			body: '',
			searchTerm: '',
			formHidden: true
		};
	}

	componentDidMount() {
		this.props.getTags();
		this.props.getNotes();
		this.props.getCategories();
	}

	renderNotes = () => {
		const { categories, user, tags, notes } = this.props;
		let userNotes, archivedNotes, filteredNotes;

		// Filter by user
		for (let key in notes) {
			if (notes.hasOwnProperty(key) && notes[key].uid === user.uid) {
				userNotes = { ...userNotes, [key]: notes[key] };
			}
		}

		// Filter by archived
		if (this.props.visibilityFilter.archived) {
			for (let key in userNotes) {
				if (userNotes.hasOwnProperty(key) && userNotes[key].archived) {
					archivedNotes = { ...archivedNotes, [key]: userNotes[key] };
				}
			}
		} else {
			for (let key in userNotes) {
				if (userNotes.hasOwnProperty(key) && !userNotes[key].archived) {
					archivedNotes = { ...archivedNotes, [key]: userNotes[key] };
				}
			}
		}

		// Filter by search term
		if (this.state.searchTerm) {
			filteredNotes = this.sortProperties(archivedNotes).filter(
				createFilter(this.state.searchTerm, KEYS_TO_FILTERS)
			);
		} else {
			filteredNotes = this.sortProperties(archivedNotes);
		}

		return _map(filteredNotes, (note, id) => {
			return (
				<NoteCard
					key={note[0]}
					id={note[0]}
					note={note[1]}
					user={user}
					categories={categories}
					tags={tags}
					deleteNote={this.props.deleteNote}
				/>
			);
		});
	};

	searchUpdated = term => {
		this.setState({ searchTerm: term });
	};

	handleHideForm = e => {
		e.preventDefault();
		this.setState({
			formHidden: !this.state.formHidden
		});
	};

	sortProperties = obj => {
		return arrayify(obj).sort((a, b) => b[1].votes - a[1].votes);
	};

	render() {
		return (
			<div className={styles.container}>
				<header>
					<div className={styles.logoType}>NoteVote</div>
				</header>
				<Navigation
					searchUpdated={this.searchUpdated}
					handleHideForm={this.handleHideForm}
					formHidden={this.state.formHidden}
				/>
				<Sidebar
					categories={arrayify(this.props.categories)}
					tags={arrayify(this.props.tags)}
					setVisibilityFilter={this.props.setVisibilityFilter}
					visibilityFilter={this.props.visibilityFilter}
					saveTag={this.props.saveTag}
					deleteTag={this.props.deleteTag}
					saveCategory={this.props.saveCategory}
					deleteCategory={this.props.deleteCategory}
					uid={this.props.user.uid}
				/>
				<main>
					<ActiveFilters visibilityFilter={this.props.visibilityFilter} />
					{!this.state.formHidden && (
						<NotePage
							categories={arrayify(this.props.categories)}
							tags={arrayify(this.props.tags)}
							user={this.props.user}
							saveNote={this.props.saveNote}
						/>
					)}
					{this.renderNotes()}
				</main>
				<footer>Note Vote &#183; Copyright © {new Date().getFullYear()}</footer>
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {
		notes: getVisibleNotes(state.notes, state.visibilityFilter),
		user: state.user,
		categories: state.categories,
		tags: state.tags,
		visibilityFilter: state.visibilityFilter
	};
}

export default connect(mapStateToProps, {
	getNotes,
	saveNote,
	deleteNote,
	getCategories,
	deleteCategory,
	getTags,
	deleteTag,
	saveTag,
	saveCategory,
	setVisibilityFilter
})(App);
