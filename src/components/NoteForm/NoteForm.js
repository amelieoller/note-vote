import React, { Component } from 'react';

const NoteForm = ({handleChange, handleSubmit, state}) => {
	return (
		<div>
			<form onSubmit={handleSubmit}>
				<input type="text" name="title" value={state.title} placeholder="Title" onChange={handleChange} />
				<br/>
				<textarea type="text" name="body" value={state.body} placeholder="Body" onChange={handleChange} />
				<br/>
				<input type="submit"/>
			</form>
		</div>
	);
};

export default NoteForm;
