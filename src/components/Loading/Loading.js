import React, { Component } from 'react';
import { connect } from 'react-redux';
// Get access to history object property with withRouter
import { withRouter } from 'react-router-dom';
import { getUser } from '../../actions/userActions';
import { getNotes } from '../../actions/noteActions';

class Loading extends Component {
	componentWillMount() {
		const { userLoading, notesLoading } = this.props;

		// If we haven't tried to load the user, load user
		if (userLoading === undefined) {
			this.props.getUser();
		}

		// If we haven't tried to load notes, load notes
		if (notesLoading === undefined) {
			this.props.getUser();
		}
	}

	componentWillReceiveProps(nextProps) {
		// Wait for the user to get authenticated and then load the notes
		if (nextProps.notesLoading === -1 && nextProps.user !== null) {
			this.props.getNotes();
		}
	}

	render() {
		const { userLoading, notesLoading, children } = this.props;
		// Throughout the lifetime of our app user and notes loading status will keep toggling between true and false. When anything other than that toggling state such as true or false is in the state, it means that the loading operation is settled and note active. At that time show the enclosing components (children). For everything else inbetween that state, show loading.
		if ((!userLoading && !notesLoading) || this.props.user === null) {
			return <div>{children}</div>;
		} else {
			return <div>Loading...</div>;
		}
	}
}

function mapStateToProps(state) {
	return {
		user: state.user,
		userLoading: state.loading.user,
		notesLoading: state.loading.notes
	};
}

export default withRouter(
	connect(mapStateToProps, { getUser, getNotes })(Loading)
);
