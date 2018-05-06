import React from 'react';
import styles from './NoteCard.scss';
import Vote from '../Vote/Vote';
import { Link } from 'react-router-dom';

const NoteCard = ({ id, note, deleteNote, user, categories }) => {
	return (
		<div className={styles.container}>
			<div className={styles.text}>
				<Link to={`/${id}`}>
					<h3>{note.title}</h3>
				</Link>
				<p>{note.body}</p>
				<h3>Categories:</h3>
				{note.categories &&
					note.categories.map(cat => {
						for (var key in categories) {
							if (key === cat) {
								var newKey = id+key
								return <li key={newKey}>{categories[key].name}</li>;
							}
						}
					})}
			</div>
			<div className={styles.buttons}>
				{note.uid === user.uid && (
					<button onClick={() => deleteNote(id)}>Delete</button>
				)}
				<Vote note={note} id={id} />
			</div>
		</div>
	);
};

export default NoteCard;
