import React from 'react';
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom';

const Navigation = () => (
	<nav>
		<Link to="/">Home</Link>
		<Link to="/login">Login</Link>
	</nav>
);

export default Navigation;
