import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

class Authenticating extends Component {
	componentDidUpdate() {
		// Make sure the loading is done, then if there is no user push them to login page
		const { userLoading, user } = this.props;
		if (userLoading === false && !user) {
			this.props.history.push('/login');
		}
	}

	render() {
		const { user, userLoading, children } = this.props;
		return userLoading === false && user ? <div>{children}</div> : null;
	}
}

function mapStateToProps(state) {
	return {
		user: state.user,
		userLoading: state.loading.user
	};
}

export default withRouter(connect(mapStateToProps)(Authenticating));
