import React, { Component } from 'react';
import styles from './App.scss';
import _map from 'lodash/map';
import { connect } from 'react-redux';
import { createFilter } from 'react-search-input';

// Components
import NoteCard from '../NoteCard/NoteCard';
import NotePage from '../NotePage/NotePage';
import Navigation from '../Navigation/Navigation';
import Sidebar from '../Sidebar/Sidebar';

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
	let filteredNotes = {};
	let filterCategoriesArray = visibilityFilter.categories;
	let filterTagsArray = visibilityFilter.tags;

	if (filterTagsArray.length !== 0 || filterCategoriesArray.length !== 0) {
		Object.keys(notes)
			.filter(key => {
				return (
					notes[key].tags &&
					filterTagsArray.every(tag => notes[key].tags.includes(tag)) &&
					notes[key].categories &&
					filterCategoriesArray.every(cat =>
						notes[key].categories.includes(cat)
					)
				);
			})
			.map(selectedKey => {
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
			categories: [],
			tags: [],
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

	handleFilter = e => {
		let type = e.currentTarget.parentNode.id;
		let targetId = e.currentTarget.id;
		let typeArray = this.state[type];
		let filterArray = this.props.visibilityFilter[type];

		switch (true) {
			case targetId === 'all':
				this.setState({
					[type]: []
				});
				break;
			case targetId === 'archived':
				break;
			case filterArray.includes(targetId) && typeArray.includes(targetId):
				let index = typeArray.indexOf(targetId);
				this.setState({
					[type]: [...typeArray.slice(0, index), ...typeArray.slice(index + 1)]
				});
				break;
			case !filterArray.includes(targetId) && !typeArray.includes(targetId):
				this.setState({
					[type]: [...this.state[type], targetId]
				});
				break;
			default:
				break;
		}

		this.props.setVisibilityFilter(targetId, type);
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
		let sortable = [];
		for (let key in obj)
			if (obj.hasOwnProperty(key) && obj[key].uid === this.props.user.uid)
				sortable.push([key, obj[key]]);
		sortable.sort(function(a, b) {
			return b[1].votes - a[1].votes;
		});
		return sortable;
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
					categories={this.sortProperties(this.props.categories)}
					tags={this.sortProperties(this.props.tags)}
					handleFilter={this.handleFilter}
					visibilityFilter={this.props.visibilityFilter}
					saveTag={this.props.saveTag}
					deleteTag={this.props.deleteTag}
					saveCategory={this.props.saveCategory}
					deleteCategory={this.props.deleteCategory}
					uid={this.props.user.uid}
				/>
				<main>
					{!this.state.formHidden && (
						<NotePage
							categories={this.sortProperties(this.props.categories)}
							tags={this.sortProperties(this.props.tags)}
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
