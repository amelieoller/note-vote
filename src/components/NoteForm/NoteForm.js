import React, { Component } from 'react';
import styles from './NoteForm.scss'

const NoteForm = ({handleChange, handleSubmit, state}) => {
	return (
		<div className={styles.container}>
		<h2>Create a New Note:</h2>
			<form onSubmit={handleSubmit}>
				<input className={styles.fullWidth} type="text" name="title" value={state.title} placeholder="Title" onChange={handleChange} />
				<br/>
				<textarea className={styles.fullWidth} type="text" name="body" value={state.body} placeholder="Body" onChange={handleChange} />
				<br/>
				<input type="submit"/>
			</form>
		</div>
	);
};

export default NoteForm;
