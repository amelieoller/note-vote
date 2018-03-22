import React, { Component } from 'react';
import { connect } from 'react-redux';
import { googleLogin } from '../../actions/userActions';
import { auth } from '../../firebase';
import styles from './Login.scss';

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
		this.handleSignOut = this.handleSignOut.bind(this);
	}

	componentDidMount() {
		auth.onAuthStateChanged(firebaseUser => {
			if (firebaseUser) {
				console.log(firebaseUser);
			} else {
				console.log('not logged in');
			}
		});
	}

	handleChange(e) {
		this.setState({
			[e.target.name]: e.target.value
		});
	}

	handleSignIn(e) {
		e.preventDefault();
		const email = this.state.email;
		const password = this.state.password;
		const promise = auth.signInWithEmailAndPassword(email, password);
		promise.catch(e => console.log(e.message));
	}

	handleSignUp(e) {
		e.preventDefault();
		const email = this.state.email;
		const password = this.state.password;
		const promise = auth.createUserWithEmailAndPassword(email, password);
		promise.catch(e => console.log(e.message));
	}

	handleSignOut(e) {
		auth.signOut();
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
		console.log(this.state);
		return (
			<div className={(styles.wrapper, styles.fadeInDown)}>
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
						{/* <input
							type="submit"
							className={(styles.fadeIn, styles.fourth)}
							value="Sign Out"
							onClick={this.handleSignOut}
						/> */}
					</form>

					<div id={styles.footer}>
						<a href="#">
							Forgot Password?
						</a>
					</div>
				</div>
			</div>
		);
	}
}

export default connect(null, { googleLogin })(Login);
