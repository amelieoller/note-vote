import React, { Component } from 'react';
import styles from './Navigation.scss';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import SearchInput from 'react-search-input';

// Actions
import { logout } from '../../actions/userActions';

class Navigation extends Component {
	render() {
		return (
			<nav className={styles.navigation}>
				{this.props.user !== null && (
					<ul>
						<li>
							<NavLink exact to="/" activeClassName={styles.active}>
								Home
							</NavLink>
						</li>
						<li>
							<NavLink
								exact
								to="/login"
								activeClassName={styles.active}
								onClick={() => this.props.logout()}
							>
								Logout
							</NavLink>
						</li>
						<li>
							<a
								className={styles.hideForm}
								onClick={this.props.handleHideForm}
							>
								{this.props.formHidden ? (
									<div>
										<span className={styles.addNoteButton}>+</span>
										<span className={styles.addNoteText}>Add Note</span>
									</div>
								) : (
									<div>
										<span className={styles.addNoteButton}>-</span>
										<span className={styles.addNoteText}>Hide Form</span>
									</div>
								)}
							</a>
						</li>
					</ul>
				)}

				<SearchInput
					className={styles.searchInput}
					onChange={this.props.searchUpdated}
				/>
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
