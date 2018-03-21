import React, { Component } from 'react';
import styles from './App.css';
import NoteCard from '../NoteCard/NoteCard';
import _ from 'lodash';
import NoteForm from '../NoteForm/NoteForm';
import { database } from '../../firebase';

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
		database.on('value', snapshot => {
			this.setState({
				notes: snapshot.val()
			});
		});
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
		database.push(note);
		this.setState({
			title: '',
			body: ''
		});
	}

	renderNotes() {
		return _.map(this.state.notes, (note, key) => {
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

export default App;
