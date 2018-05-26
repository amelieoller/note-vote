import React from 'react';
import styles from './NoteForm.scss';

// Components
import Checkboxes from '../Checkboxes/Checkboxes';

const NoteForm = ({
	categories,
	tags,
	handleNoteSubmit,
	handleNoteChange,
	state
}) => (
	<form onSubmit={handleNoteSubmit} className={styles.formContainer}>
		<input
			className={styles.fullWidth}
			type="text"
			name="title"
			value={state.title}
			placeholder="Title"
			onChange={handleNoteChange}
		/>
		<textarea
			className={styles.fullWidth}
			type="text"
			name="body"
			value={state.body}
			placeholder="Body"
			onChange={handleNoteChange}
		/>
		<div className={styles.categories}>
			<h3>Categories:</h3>
			<Checkboxes
				type="categories"
				collection={categories}
				handleNoteChange={handleNoteChange}
				state={state}
			/>
		</div>
		<div className={styles.submit}>
			<input type="submit" />
		</div>
		<div className={styles.tags}>
			<h3>Tags:</h3>
			<Checkboxes
				type="tags"
				collection={tags}
				handleNoteChange={handleNoteChange}
				state={state}
			/>
		</div>
	</form>
);

export default NoteForm;
