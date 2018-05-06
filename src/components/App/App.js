import React, { Component } from 'react';
import styles from './App.scss';
import NoteCard from '../NoteCard/NoteCard';
import _ from 'lodash';
import NoteForm from '../NoteForm/NoteForm';
import { connect } from 'react-redux';
import {
	getNotes,
	saveNote,
	deleteNote,
	updateNote
} from '../../actions/noteActions';
import {
	getCategories,
	saveCategory,
	deleteCategory
} from '../../actions/categoryActions';

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			title: '',
			body: '',
			category: '',
			categories: [],
			checked: false
		};

		// bind
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.renderNotes = this.renderNotes.bind(this);
	}

	componentDidMount() {
		this.props.getNotes();
	}

	handleChange(e) {
		if (e.target.name === 'categories') {
			if (!this.state.categories.includes(e.target.id)) {
				this.setState({
					categories: [...this.state.categories, e.target.id]
				});
			} else {
				this.setState({
					categories: this.state.categories.filter(cat => cat !== e.target.id)
				});
			}
		} else {
			this.setState({
				[e.target.name]: e.target.value
			});
		}
	}

	handleSubmit(e) {
		e.preventDefault();
		const { title, body, categories, category } = this.state;
		const { user, saveCategory, saveNote, addCategoryToNote } = this.props;

		if (title) {
			const note = {
				title: title,
				body: body,
				votes: 0,
				uid: user.uid,
				categories: categories
			};

			let categoryId = false
			for (let key in this.props.categories) {
				if (this.props.categories[key].name === category) {
					categoryId = key
				}
			}

			if (categoryId) {
				saveNote(note, categoryId)
			} else if (category) {
				saveNote(note, { name: category })
			} else {
				saveNote(note)
			}

			this.setState({
				title: '',
				body: '',
				category: '',
				categories: []
			});
		}
	}

	sortProperties(obj) {
		var sortable = [];
		for (var key in obj)
			if (obj.hasOwnProperty(key)) sortable.push([key, obj[key]]);
		sortable.sort(function(a, b) {
			return b[1].votes - a[1].votes;
		});
		// array in format [ [ key1, val1 ], [ key2, val2 ], ... ]
		return sortable;
	}

	renderNotes() {
		const { notes, deleteNote, categories, user } = this.props;
		return _.map(this.sortProperties(notes), (note, id) => {
			return (
				<NoteCard
					key={note[0]}
					id={note[0]}
					note={note[1]}
					deleteNote={deleteNote}
					user={user}
					categories={categories}
				/>
			);
		});
	}

	render() {
		return (
			<div className={styles.container}>
				<NoteForm
					handleChange={this.handleChange}
					handleSubmit={this.handleSubmit}
					state={this.state}
					categories={this.sortProperties(this.props.categories)}
				/>
				{this.renderNotes()}
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {
		notes: state.notes,
		user: state.user,
		categories: state.categories
	};
}

export default connect(mapStateToProps, {
	getNotes,
	saveNote,
	deleteNote,
	saveCategory,
	getCategories,
	deleteCategory,
	updateNote
})(App);
