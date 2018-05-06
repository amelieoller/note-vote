import React from 'react';
import styles from './NoteForm.scss';
import _ from 'lodash';

const NoteForm = ({ handleChange, handleSubmit, state, categories }) => {
	return (
		<div className={styles.container}>
			<h2>Create a New Note:</h2>
			<form onSubmit={handleSubmit}>
				<input
					className={styles.fullWidth}
					type="text"
					name="title"
					value={state.title}
					placeholder="Title"
					onChange={handleChange}
				/>
				<br />
				<textarea
					className={styles.fullWidth}
					type="text"
					name="body"
					value={state.body}
					placeholder="Body"
					onChange={handleChange}
				/>
				<br />
				<input
					className={styles.fullWidth}
					type="text"
					name="category"
					value={state.category}
					placeholder="Category"
					onChange={handleChange}
				/>
				<h3>Categories</h3>

				{_.map(categories, (category, id) => {
					return (
						<div key={category[0]}>
							<input type="checkbox" name="categories" id={category[0]} onChange={handleChange} checked={state.categories.includes(category[0])}/>
							<label  htmlFor={category[0]}>{category[1].name} </label>
						</div>
					);
				})}

				<br />
				<input type="submit" />
			</form>
		</div>
	);
};

export default NoteForm;
