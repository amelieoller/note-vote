import React, { Component } from 'react';
import styles from './App.css';
import NoteCard from '../NoteCard/NoteCard';
import _ from 'lodash';

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			title: '',
			body: '',
			notes: [
				{
					title: 'First Note Title',
					body: 'First Note Body'
				},
				{
					title: 'Second Note Title',
					body: 'Second Note Body'
				}
			]
		};
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
				{this.renderNotes()}
			</div>
		);
	}
}

export default App;
