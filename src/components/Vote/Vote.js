import React, { Component } from 'react';
import styles from './Vote.scss';
import { connect } from 'react-redux';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faThumbsUp from '@fortawesome/fontawesome-free-solid/faThumbsUp';
import faThumbsDown from '@fortawesome/fontawesome-free-solid/faThumbsDown';

// Actions
import { updateNote } from '../../actions/noteActions';

class Vote extends Component {
	constructor(props) {
		super(props);

		this.state = {
			voteLock: false
		};
	}

	handleClick(e) {
		let newVote = this.props.note.votes;
		e.currentTarget.name === 'plus' ? newVote++ : newVote--;

		this.props.updateNote(this.props.id, { votes: newVote });

		this.setState({
			voteLock: true
		});

		setTimeout(() => {
			this.setState({ voteLock: false });
		}, 2000);
	}

	render() {
		return (
			<div className={styles.container}>
				<div>
					<button
						disabled={this.state.voteLock}
						title="UpVote"
						name="plus"
						onClick={e => this.handleClick(e)}
					>
						<FontAwesomeIcon icon={faThumbsUp} />
					</button>
				</div>
				<span className={styles.vote}>{this.props.note.votes}</span>
				<div>
					<button
						disabled={this.state.voteLock}
						title="DownVote"
						name="minus"
						onClick={e => this.handleClick(e)}
					>
						<FontAwesomeIcon icon={faThumbsDown} />
					</button>
				</div>
			</div>
		);
	}
}

export default connect(null, { updateNote })(Vote);
