import React, { Component } from 'react';
import styles from './App.scss';
import NoteCard from '../NoteCard/NoteCard';
import _ from 'lodash';
import NoteForm from '../NoteForm/NoteForm';
import Sidebar from '../Sidebar/Sidebar';
import { connect } from 'react-redux';
import {
	getNotes,
	saveNote,
	deleteNote,
	updateNote
} from '../../actions/noteActions';
import { getCategories, deleteCategory } from '../../actions/categoryActions';

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			title: '',
			body: '',
			category: 'Uncategorized',
			categories: [],
			checked: false,
			categoryFilter: 'all'
		};

		// bind
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.renderNotes = this.renderNotes.bind(this);
		this.handleCategoryChange = this.handleCategoryChange.bind(this);
		this.handleCategoryDelete = this.handleCategoryDelete.bind(this);
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
		const { user, saveNote } = this.props;

		if (title) {
			const note = {
				title: title,
				body: body,
				votes: 0,
				uid: user.uid,
				categories: categories
			};

			let categoryId = false;
			for (let key in this.props.categories) {
				if (this.props.categories[key].name === category) {
					categoryId = key;
				}
			}

			if (categoryId) {
				saveNote(note, categoryId);
			} else if (category) {
				saveNote(note, { name: category });
			} else {
				saveNote(note);
			}

			this.setState({
				title: '',
				body: '',
				category: 'Uncategorized',
				categories: []
			});
		}
	}

	handleCategoryChange(e) {
		this.setState({
			categoryFilter: e.target.id
		});
	}

	handleCategoryDelete(e) {
		this.props.deleteCategory(e.target.id);
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

		let filteredNotes = notes;
		if (this.state.categoryFilter === 'all') {
			filteredNotes = this.sortProperties(notes);
		} else {
			filteredNotes = this.sortProperties(notes).filter(note =>
				note[1].categories.includes(this.state.categoryFilter)
			);
		}

		return _.map(filteredNotes, (note, id) => {
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
			<div>
				<div className={styles.wrapper}>
					<Sidebar
						categories={this.sortProperties(this.props.categories)}
						handleClick={this.handleCategoryChange}
						handleDelete={this.handleCategoryDelete}
						selectedCategory={this.state.categoryFilter}
					/>
					<main className={styles.content}>
						<div className={styles.feedGrid}>
							<div className={[styles.cardHalf, styles.wide].join(' ')}>
								<NoteForm
									handleChange={this.handleChange}
									handleSubmit={this.handleSubmit}
									state={this.state}
									categories={this.sortProperties(this.props.categories)}
								/>
							</div>
							{this.renderNotes()}
						</div>
					</main>
				</div>
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
	getCategories,
	deleteCategory,
	updateNote
})(App);
