import React, { Component } from 'react';
import { connect } from 'react-redux';
import { googleLogin } from '../../actions/userActions';
import { auth } from '../../firebase';

class Login extends Component {
	constructor(props) {
		super(props);

		this.state = {
			email: '',
			password: ''
		};

		this.handleChange = this.handleChange.bind(this);
		this.handleSignIn = this.handleSignIn.bind(this);
		this.handleSignUp = this.handleSignUp.bind(this);
		this.handleSignOut = this.handleSignOut.bind(this);
	}

	componentDidMount() {
		const btnLogout = document.getElementById('btnLogout');
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

	render() {
		return (
			<div>
				<div>
					<label htmlFor="email">Email</label>
					<input
						type="text"
						id="email"
						name="email"
						onChange={this.handleChange}
					/>
					<label htmlFor="password">Password</label>
					<input
						type="password"
						id="password"
						name="password"
						onChange={this.handleChange}
					/>
					<button type="submit" onClick={this.handleSignIn}>
						Log In
					</button>
					<button type="submit" onClick={this.handleSignUp}>
						Sign Up
					</button>
					<button type="submit" onClick={this.handleSignOut}>
						Log Out
					</button>
				</div>
				<h1>Login Page</h1>
				<button onClick={this.props.googleLogin}>Login with Google</button>
			</div>
		);
	}
}

export default connect(null, { googleLogin })(Login);
