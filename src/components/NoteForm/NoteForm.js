import React, { Component } from 'react';

const NoteForm = () => {
	return (
		<div>
			<form>
				<input type="text" placeholder="Title" />
				<br/>
				<textarea type="text" placeholder="Body" />
				<br/>
				<input type="submit"/>
			</form>
		</div>
	);
};

export default NoteForm;
