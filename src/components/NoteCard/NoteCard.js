import React from 'react';
import styles from './NoteCard.css';
import Vote from '../Vote/Vote'

const NoteCard = ({ id, note, deleteNote }) => {
	return (
		<div>
			<h3>{note.title}</h3>
			<p>{note.body}</p>
         <button onClick={() => deleteNote(id)}>Delete</button>
         <Vote note={note} id={id} />
		</div>
	);
};

export default NoteCard;
