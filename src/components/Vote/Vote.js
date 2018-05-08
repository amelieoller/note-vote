import React, { Component } from 'react';
import styles from './Vote.scss';
import { connect } from 'react-redux';
import { updateNote } from '../../actions/noteActions';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faCopy from '@fortawesome/fontawesome-free-solid/faCopy';
import faThumbsUp from '@fortawesome/fontawesome-free-solid/faThumbsUp';
import faThumbsDown from '@fortawesome/fontawesome-free-solid/faThumbsDown';

class Vote extends Component {
	constructor(props) {
		super(props);

		this.state = {
			votes: this.props.note.votes
		};
	}

	handleClick(e) {
		let newVote = this.state.votes;
		e.currentTarget.name === 'plus' ? newVote++ : newVote--;

		this.props.updateNote(this.props.id, { votes: newVote });

		this.setState({
			votes: newVote
		});
	}

	render() {
		return (
			<div className={styles.center}>
				<button title="UpVote" name="plus" onClick={e => this.handleClick(e)}>
					<FontAwesomeIcon icon={faThumbsUp} />
				</button>
				<span className={styles.vote}>{this.state.votes}</span>
				<button
					title="DownVote"
					name="minus"
					onClick={e => this.handleClick(e)}
				>
					<FontAwesomeIcon icon={faThumbsDown} />
				</button>
			</div>
		);
	}
}

export default connect(null, { updateNote })(Vote);
