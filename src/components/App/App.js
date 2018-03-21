import React, { Component } from 'react';
import styles from './App.css';
import NoteCard from '../NoteCard/NoteCard';
import _ from 'lodash';
import NoteForm from '../NoteForm/NoteForm';
import { database } from '../../firebase';
import { connect } from 'react-redux';
import { getNotes, saveNote } from '../../actions/noteActions';

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			title: '',
			body: '',
			notes: ''
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
			body: this.state.body
		};
		this.props.saveNote(note);
		this.setState({
			title: '',
			body: ''
		});
	}

	renderNotes() {
		return _.map(this.props.notes, (note, key) => {
			return (
				<NoteCard key={key}>
					<h3>{note.title}</h3>
					<p>{note.body}</p>
				</NoteCard>
			);
		});
	}

	render() {
		return (
			<div className={styles.container}>
				<h1>Note Vote</h1>
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
		notes: state.notes
	};
}

export default connect(mapStateToProps, { getNotes, saveNote })(App);
