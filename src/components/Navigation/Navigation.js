import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import styles from './Navigation.scss';
import { logout } from '../../actions/userActions';
import { connect } from 'react-redux';

class Navigation extends Component {
	render() {
		return (
			<div className={styles.nav}>
				<ul>
					<li className={styles.home}>
						<Link to="/">Home</Link>
					</li>

					<li className={styles.contact}>
						{this.props.user === null ? (
							<Link to="/login" className={styles.active}>
								Login
							</Link>
						) : (
							<Link
								to="/login"
								className={styles.active}
								onClick={() => this.props.logout()}
							>
								Logout
							</Link>
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

export default connect(mapStateToProps, { logout })(Navigation);
