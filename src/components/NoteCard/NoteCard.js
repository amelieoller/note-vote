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
				<div className={styles.delete}>
					<button onClick={() => deleteNote(id)}>Delete</button>
				</div>
				<div className={styles.vote}>
					<Vote note={note} id={id} />
				</div>
			</div>
		</div>
	);
};

export default NoteCard;
