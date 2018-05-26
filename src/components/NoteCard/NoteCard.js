import React, { Component } from 'react';
import styles from './NoteCard.scss';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faCopy from '@fortawesome/fontawesome-free-solid/faCopy';
import faTrashAlt from '@fortawesome/fontawesome-free-solid/faTrashAlt';
import faArchive from '@fortawesome/fontawesome-free-solid/faArchive';

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

	renderType = (collection, type) => {
		const { note } = this.props;

		if (note[type] && Object.keys(collection).length !== 0) {
			return note[type].map(item => {
				if (collection.hasOwnProperty(item)) {
					return (
						<span className={styles.type} key={item}>
							{collection[item].name}
						</span>
					);
				}
			});
		}
	};

	onCopy() {
		this.props.updateNote(this.props.id, { votes: this.props.note.votes + 1 });

		this.setState({
			copied: true
		});

		setTimeout(() => {
			this.setState({ copied: false });
		}, 2000);
	}

	handleArchiveNote = () => {
		this.props.updateNote(this.props.id, {
			archived: !this.props.note.archived
		});
	};

	handleDeleteNote = id => {
		var result = window.confirm('Are you sure?');
		result && this.props.deleteNote(id);
	};

	render() {
		const { id, note, tags, categories } = this.props;

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

					<button
						title={note.archived ? 'Unarchive' : 'Archive'}
						onClick={() => this.handleArchiveNote(id)}
					>
						<FontAwesomeIcon icon={faArchive} />
					</button>
					{note.archived ? (
						<button
							className={styles.delete}
							title="Delete"
							onClick={() => this.handleDeleteNote(id)}
						>
							<FontAwesomeIcon icon={faTrashAlt} />
						</button>
					) : null}
				</div>
				<div>
					<Highlighter codeString={note.body} />
				</div>
				{this.renderType(categories, 'categories') && (
					<div className={styles.types}>
						<strong>Categories:</strong>{' '}
						<span>{this.renderType(categories, 'categories')}</span>
					</div>
				)}
				{this.renderType(tags, 'tags') &&
					this.renderType(categories, 'categories') && (
						<strong> &#183; </strong>
					)}
				{this.renderType(tags, 'tags') && (
					<div className={styles.types}>
						<strong>Tags:</strong> <span>{this.renderType(tags, 'tags')}</span>
					</div>
				)}
			</div>
		);
	}
}

export default connect(null, { updateNote })(NoteCard);
