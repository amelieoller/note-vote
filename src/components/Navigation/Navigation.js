import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Navigation.scss';

const Navigation = () => (
	<div className={styles.nav}>
		<ul>
			<li className={styles.home}>
				<Link to="/">Home</Link>
			</li>
			<li className={styles.contact}>
				<Link to="/login" className={styles.active}>
					Login
				</Link>
			</li>
		</ul>
	</div>
);

export default Navigation;