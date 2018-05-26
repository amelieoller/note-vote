import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { arrayify } from '../../shared/helpers';

// Components
import NoteForm from '../NoteForm/NoteForm';

// Actions
import { updateNote } from '../../actions/noteActions';

class NoteDetail extends Component {
	constructor(props) {
		super(props);

		this.state = {
			title: this.props.note.title || '',
			body: this.props.note.body || '',
			tags: this.props.note.tags || [],
			categories: this.props.note.categories || []
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
		const noteId = this.props.noteId;

		if (title) {
			this.props.updateNote(noteId, {
				title: title,
				body: body,
				categories: categories,
				tags: tags
			});
			this.props.history.push('/');
		}
	};

	render() {
		const { categories, tags } = this.props;

		return (
			<div>
				<Link to="/">
					<button>Back</button>
				</Link>
				<NoteForm
					handleNoteChange={this.handleNoteChange}
					handleNoteSubmit={this.handleNoteSubmit}
					state={this.state}
					categories={categories}
					tags={tags}
				/>
			</div>
		);
	}
}

function mapStateToProps(state, ownProps) {
	return {
		note: state.notes[ownProps.match.params.id],
		noteId: ownProps.match.params.id,
		categories: arrayify(state.categories),
		tags: arrayify(state.tags)
	};
}

export default connect(mapStateToProps, { updateNote })(NoteDetail);
