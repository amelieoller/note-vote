import React, { Component } from 'react';
import styles from './Navigation.scss';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

// Actions
import { logout } from '../../actions/userActions';

class Navigation extends Component {
	render() {
		return (
				<nav className={styles.navigation}>
					<ul className={styles.categories}>
						{this.props.user === null ? (
							<li className={styles.categoryItem}>
								<NavLink exact to="/login" activeClassName={styles.active}>
									Login
								</NavLink>
							</li>
						) : (
							<span>
								<li className={styles.categoryItem}>
									<NavLink exact to="/" activeClassName={styles.active}>
										Home
									</NavLink>
								</li>
								<li className={styles.categoryItem}>
									<NavLink
										exact
										to="/login"
										activeClassName={styles.active}
										onClick={() => this.props.logout()}
									>
										Logout
									</NavLink>
								</li>
							</span>
						)}
					</ul>
				</nav>
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
