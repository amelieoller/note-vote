import React, { Component } from 'react';
import styles from './Vote.scss';
import { connect } from 'react-redux';
import { updateNote } from '../../actions/noteActions';

class Vote extends Component {
	constructor(props) {
		super(props);

		this.state = {
			votes: this.props.note.votes
		};
	}

	handleClick(e) {
		let newVote = this.state.votes;
		e.target.name === 'plus' ? newVote++ : newVote--;

		this.props.updateNote(this.props.id, {votes: newVote});

		this.setState({
			votes: newVote
		});
	}

	render() {
		return (
			<div>
				<button
					className={styles.plusMinus}
					name="plus"
					onClick={e => this.handleClick(e)}
				>
					+
				</button>
				{this.state.votes}
				<button
					className={styles.plusMinus}
					name="minus"
					onClick={e => this.handleClick(e)}
				>
					-
				</button>
			</div>
		);
	}
}

export default connect(null, { updateNote })(Vote);
