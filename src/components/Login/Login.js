import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
	googleLogin,
	passwordSignUp,
	passwordSignIn,
	getUser
} from '../../actions/userActions';
import styles from './Login.scss';
import Errors from '../Errors/Errors'

class Login extends Component {
	constructor(props) {
		super(props);

		this.state = {
			email: '',
			password: '',
			signin: true,
			signup: false
		};

		this.handleChange = this.handleChange.bind(this);
		this.handleSignIn = this.handleSignIn.bind(this);
		this.handleSignUp = this.handleSignUp.bind(this);
	}

	componentDidMount() {
		this.props.getUser();
	}

	// Send user back to home if logged in already
	componentWillMount() {
		if (this.props.user !== null) {
			this.props.history.push('/');
		}
	}

	// Redirect user to home after logging in
	componentWillReceiveProps(nextProps) {
		if (nextProps.user !== null) {
			nextProps.history.push('/');
		}
	}

	handleChange(e) {
		this.setState({
			[e.target.name]: e.target.value
		});
	}

	handleSignIn(e) {
		e.preventDefault();
		this.props.passwordSignIn(this.state.email, this.state.password);
	}

	handleSignUp(e) {
		e.preventDefault();
		this.props.passwordSignUp(this.state.email, this.state.password);
	}

	toggleClass(e) {
		if (!this.state[e.target.name]) {
			this.setState({
				signin: !this.state.signin,
				signup: !this.state.signup
			});
		}
	}

	render() {
		return (
			<div className={(styles.wrapper, styles.fadeInDown)}>
			<Errors />
				<div id={styles.formContent}>
					<div>
						<input
							type="submit"
							className={(styles.fadeIn, styles.fourth, styles.google)}
							onClick={this.props.googleLogin}
							value="Login with Google"
						/>
					</div>

					<div className={styles.tabs}>
						<a
							className={this.state.signin ? styles.active : null}
							name="signin"
							onClick={e => this.toggleClass(e)}
						>
							Sign In
						</a>
						or
						<a
							className={this.state.signup ? styles.active : null}
							name="signup"
							onClick={e => this.toggleClass(e)}
						>
							Sign Up
						</a>
					</div>

					<form>
						<input
							type="text"
							id={styles.login}
							className={(styles.fadeIn, styles.second)}
							name="email"
							placeholder="Email"
							onFocus={e => (e.target.placeholder = '')}
							onBlur={e => (e.target.placeholder = 'Email')}
							onChange={this.handleChange}
						/>
						<input
							type="password"
							id={styles.password}
							className={(styles.fadeIn, styles.third)}
							name="password"
							placeholder="Password"
							onFocus={e => (e.target.placeholder = '')}
							onBlur={e => (e.target.placeholder = 'Password')}
							onChange={this.handleChange}
						/>
						{this.state.signin ? (
							<input
								type="submit"
								className={(styles.fadeIn, styles.fourth)}
								value="Log In"
								onClick={this.handleSignIn}
							/>
						) : null}
						{this.state.signup ? (
							<input
								type="submit"
								className={(styles.fadeIn, styles.fourth)}
								value="Sign Up"
								onClick={this.handleSignUp}
							/>
						) : null}
					</form>

					<div id={styles.footer}>
						<a href="#">Forgot Password?</a>
					</div>
				</div>
			</div>
		);
	}
}

const mapStateToProps = state => {
	return {
		user: state.user
	};
};

export default connect(mapStateToProps, {
	googleLogin,
	passwordSignUp,
	passwordSignIn,
	getUser
})(Login);
