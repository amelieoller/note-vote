import React, { Component } from 'react';
import styles from './NoteCard.scss';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faCopy from '@fortawesome/fontawesome-free-solid/faCopy';
import faTrashAlt from '@fortawesome/fontawesome-free-solid/faTrashAlt';

// Components
import Vote from '../Vote/Vote';
import Highlighter from '../Highlighter/Highlighter';

// Actions
import { updateNote } from '../../actions/noteActions';

class NoteCard extends Component {
	constructor(props) {
		super(props);

		this.state = {
			value: this.props.note.body,
			copied: false
		};
	}

	renderCategories = () => {
		const { note, categories } = this.props;
		if (note.categories && Object.keys(categories).length !== 0) {
			return note.categories.map(cat => {
				if (categories.hasOwnProperty(cat)) {
					return (
						<span className={styles.category} key={cat}>
							{categories[cat].name}
						</span>
					);
				}
			});
		}
	};

	renderTags = () => {
		const { note, tags } = this.props;
		if (note.tags && Object.keys(tags).length !== 0) {
			return note.tags.map(tag => {
				if (tags.hasOwnProperty(tag)) {
					return (
						<span className={styles.tag} key={tag}>
							{tags[tag].name}
						</span>
					);
				}
			});
		}
	};

	onCopy() {
		let newVote = this.props.note.votes;
		newVote++;
		this.props.updateNote(this.props.id, { votes: newVote });

		this.setState({
			copied: true
		});

		setTimeout(() => {
			this.setState({ copied: false });
		}, 2000);
	}

	render() {
		const { id, note, handleDeleteNote } = this.props;

		return (
			<div className={styles.card}>
				<div className={styles.navContainer}>
					<div className={styles.noteTitle}>
						<Link to={`/${id}`}>
							<h3>{note.title}</h3>
						</Link>
					</div>
					<div>
						<CopyToClipboard
							text={this.state.value}
							onCopy={() => this.onCopy()}
						>
							<button
								title="Copy"
								className={this.state.copied ? styles.red : null}
							>
								<FontAwesomeIcon icon={faCopy} />
							</button>
						</CopyToClipboard>
					</div>

					<Vote note={note} id={id} />
					<div>
						<button
							className={styles.delete}
							title="Delete"
							onClick={() => handleDeleteNote(id)}
						>
							<FontAwesomeIcon icon={faTrashAlt} />
						</button>
					</div>
				</div>
				<div>
					<Highlighter codeString={note.body} />
				</div>
				<div className={styles.categories}>
					Categories:{' '}
					<span>
						{this.renderCategories() ? this.renderCategories() : 'None'}
					</span>
				</div>
				<div className={styles.categories}>
					Tags: <span>{this.renderTags() ? this.renderTags() : 'None'}</span>
				</div>
			</div>
		);
	}
}

export default connect(null, { updateNote })(NoteCard);
