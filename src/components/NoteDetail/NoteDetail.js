import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router-dom';

class NoteDetail extends Component {
	render() {
		const { note } = this.props;
		return (
			<div>
				<Link to="/">Back</Link>
				<h1>{note.title}</h1>
				<p>{note.body}</p>
			</div>
		);
	}
}

function mapStateToProps(state, ownProps) {
	return {
		note: state.notes[ownProps.match.params.id],
		uid: state.user.uid
	};
}

export default withRouter(connect(mapStateToProps)(NoteDetail));
