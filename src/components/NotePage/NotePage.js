import React, { Component } from 'react';
import NoteForm from '../NoteForm/NoteForm';

class NotePage extends Component {
	constructor(props) {
		super(props);

		this.state = {
			title: this.props.title || '',
			body: this.props.body || '',
			tags: [],
			categories: []
		};
	}

	handleNoteChange = e => {
		let items = e.currentTarget.name;

		if (items === 'categories' || items === 'tags') {
			if (!this.state[items].includes(e.currentTarget.id)) {
				this.setState({
					[items]: [...this.state[items], e.currentTarget.id]
				});
			} else {
				this.setState({
					[items]: this.state[items].filter(item => item !== e.currentTarget.id)
				});
			}
		} else {
			this.setState({
				[e.currentTarget.name]: e.currentTarget.value
			});
		}
	};

	handleNoteSubmit = e => {
		e.preventDefault();
		const { title, body, categories, tags } = this.state;
		const { user, saveNote } = this.props;

		if (title) {
			saveNote({
				title: title,
				body: body,
				votes: 0,
				uid: user.uid,
				categories: categories,
				tags: tags
			});

			this.setState({
				title: '',
				body: '',
				categories: [],
				tags: []
			});
		}
	};

	render() {
		const { user, categories, tags, saveNote } = this.props;

		return (
			<NoteForm
				handleNoteChange={this.handleNoteChange}
				handleNoteSubmit={this.handleNoteSubmit}
				state={this.state}
				categories={categories}
				tags={tags}
				user={user}
				saveNote={saveNote}
			/>
		);
	}
}

export default NotePage;
