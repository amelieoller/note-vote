import React, { Component } from 'react';
import styles from './App.scss';
import NoteCard from '../NoteCard/NoteCard';
import _ from 'lodash';
import NoteForm from '../NoteForm/NoteForm';
import { database } from '../../firebase';
import { connect } from 'react-redux';
import { getNotes, saveNote, deleteNote } from '../../actions/noteActions';

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			title: '',
			body: ''
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
		this.setState({
			[e.target.name]: e.target.value
		});
	}

	handleSubmit(e) {
		e.preventDefault();
		const note = {
			title: this.state.title,
			body: this.state.body,
			votes: 0,
			uid: this.props.user.uid
		};
		this.props.saveNote(note);
		this.setState({
			title: '',
			body: ''
		});
	}

	renderNotes() {
		return _.map(this.props.notes, (note, id) => {
			return (
				<NoteCard
					key={id}
					id={id}
					note={note}
					deleteNote={this.props.deleteNote}
					user={this.props.user}
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
				/>
				{this.renderNotes()}
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {
		notes: state.notes,
		user: state.user
	};
}

export default connect(mapStateToProps, { getNotes, saveNote, deleteNote })(
	App
);
