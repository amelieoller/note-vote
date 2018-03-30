import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import styles from './Navigation.scss';
import { logout } from '../../actions/userActions';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

class Navigation extends Component {
	render() {
		return (
			<div className={styles.nav}>
				<ul>
					<li className={styles.home}>
						<NavLink exact to="/" activeClassName={styles.active}>
							Home
						</NavLink>
					</li>
					<li className={styles.contact}>
						{this.props.user === null ? (
							<NavLink exact to="/login" activeClassName={styles.active}>
								Login
							</NavLink>
						) : (
							<NavLink
							exact
								to="/login"
								activeClassName={styles.active}
								onClick={() => this.props.logout()}
							>
								Logout
							</NavLink>
						)}
					</li>
				</ul>
			</div>
		);
	}
}

const mapStateToProps = state => {
	return {
		user: state.user
	};
};

// Fix routing issue by adding withRouter or pure: false to connect (https://github.com/ReactTraining/react-router/issues/4638)

// export default connect(mapStateToProps, { logout }, null, { pure: false })(Navigation);
export default withRouter(connect(mapStateToProps, { logout })(Navigation));
