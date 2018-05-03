import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { updateNote } from '../../actions/noteActions';

class NoteDetail extends Component {
	constructor(props) {
		super(props);

		this.state = {
			title: this.props.note.title || '',
			body: this.props.note.body || ''
		};

		this.handleClick = this.handleClick.bind(this);
	}

	handleChange = e => {
		this.setState({
			[e.target.name]: e.target.value
		});
	};

	handleClick = e => {
		e.preventDefault();
		if (this.state.title && this.state.body) {
			this.props.updateNote(this.props.noteId, {
				title: this.state.title,
				body: this.state.body
			});
			this.props.history.push('/');
		}
	};

	render() {
		const { note } = this.props;
		return (
			<div>
				<Link to="/">Back</Link>
				{/* Fix this to get state after refresh */}
				{note && (
					<form>
						<input
							onChange={this.handleChange}
							type="text"
							value={this.state.title}
							name="title"
						/>
						<textarea
							onChange={this.handleChange}
							type="text"
							value={this.state.body}
							name="body"
						/>
						<button onClick={this.handleClick} type="submit">
							Change Note
						</button>
					</form>
				)}
			</div>
		);
	}
}

function mapStateToProps(state, ownProps) {
	return {
		note: state.notes[ownProps.match.params.id],
		noteId: ownProps.match.params.id,
		uid: state.user.uid
	};
}

export default connect(mapStateToProps, { updateNote })(NoteDetail);
