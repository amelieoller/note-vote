import React, { Component } from 'react';
import styles from './NoteCard.scss';
import Vote from '../Vote/Vote';
import { Link } from 'react-router-dom';
import Highlighter from '../Highlighter/Highlighter';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faCopy from '@fortawesome/fontawesome-free-solid/faCopy';
import faThumbsUp from '@fortawesome/fontawesome-free-solid/faThumbsUp';
import faThumbsDown from '@fortawesome/fontawesome-free-solid/faThumbsDown';
import faTrashAlt from '@fortawesome/fontawesome-free-solid/faTrashAlt';

class NoteCard extends Component {
	constructor(props) {
		super(props);

		this.state = {
			value: this.props.note.body,
			copied: false
		};

		this.renderCategories = this.renderCategories.bind(this);
	}

	renderCategories() {
		const { note, categories } = this.props;
		if (categories && Object.keys(categories).length !== 0) {
			return note.categories.map(cat => {
				if (categories.hasOwnProperty(cat)) {
					return <span key={cat}>{categories[cat].name} | </span>;
				}
			});
		}
	}

	render() {
		const { id, note, deleteNote, user } = this.props;

		return (
			<div className={styles.card}>
				<div className={styles.container}>
					<div className={styles.itemLarge}>
						<Link to={`/${id}`}>
							<h3>{note.title}</h3>
						</Link>
					</div>
					<div className={styles.center}>
						{note.uid === user.uid && (
							<button title="Delete" onClick={() => deleteNote(id)}>
								<FontAwesomeIcon icon={faTrashAlt} />
							</button>
						)}
					</div>
					<Vote note={note} id={id} />
				</div>

				<div className={styles.container}>
					<div className={styles.itemLarge}>
						<Highlighter codeString={note.body} />
					</div>
					<div className={styles.item}>
						<CopyToClipboard
							text={this.state.value}
							onCopy={() => this.setState({ copied: true })}
						>
							<button
								title="Copy"
								className={this.state.copied ? styles.red : null}
							>
								<FontAwesomeIcon icon={faCopy} />
							</button>
						</CopyToClipboard>
					</div>
					<br />
				</div>
				<div className={styles.container}>
					Categories:{' '}
					<div className={styles.itemLarge}> {this.renderCategories()}</div>
				</div>
			</div>
		);
	}
}

export default NoteCard;
