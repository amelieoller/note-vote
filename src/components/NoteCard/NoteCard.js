import React from 'react';
import styles from './NoteCard.scss';
import Vote from '../Vote/Vote';

const NoteCard = ({ id, note, deleteNote }) => {
	return (
		<div className={styles.container}>
			<div className={styles.text}>
				<h3>{note.title}</h3>
				<p>{note.body}</p>
			</div>
			<div className={styles.buttons}>
				<button onClick={() => deleteNote(id)}>Delete</button>
				<Vote note={note} id={id} />
			</div>
		</div>
	);
};

export default NoteCard;
