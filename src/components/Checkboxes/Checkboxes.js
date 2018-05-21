import React from 'react';
import styles from './Checkboxes.scss';
import _map from 'lodash/map';

const Checkboxes = ({ type, collection, handleNoteChange, state }) => (
	<div>
		{_map(collection, (item, id) => {
			return (
				<div key={item[0]} className={styles.coloured}>
					<div className={styles.checkbox}>
						<label>
							<input
								type="checkbox"
								name={type}
								id={item[0]}
								onChange={handleNoteChange}
								checked={state[type].includes(item[0])}
							/>
							<span className={styles.checkboxMaterial}>
								<span className={styles.check} />
							</span>{' '}
							{item[1].name}
						</label>
					</div>
				</div>
			);
		})}
	</div>
);

export default Checkboxes;
