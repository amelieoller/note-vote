import React from 'react';
import styles from './NoteForm.scss';
import _ from 'lodash';

const NoteForm = ({ handleChange, handleSubmit, state, categories }) => {
	return (
		<div className={styles.formContainer}>
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
				<div className={styles.categoryContainer}>
					{_.map(categories, (category, id) => {
						return (
							<div key={category[0]} className={styles.coloured}>
								<div className={styles.checkbox}>
									<label>
										<input
											type="checkbox"
											name="categories"
											id={category[0]}
											onChange={handleChange}
											checked={state.categories.includes(category[0])}
										/>
										<span className={styles.checkboxMaterial}>
											<span className={styles.check} />
										</span>{' '}
										{category[1].name}
									</label>
								</div>
							</div>
						);
					})}
				</div>
				<br />

				<input type="submit" />
			</form>
		</div>
	);
};

export default NoteForm;
