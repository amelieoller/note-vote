import React from 'react';
import styles from './Sidebar.scss';

const Sidebar = ({
	categories,
	handleClick,
	handleDelete,
	selectedCategory
}) => (
	<aside className={styles.sidebar}>
		{categories.map(cat => (
			<span
				key={cat[0]}
				className={selectedCategory === cat[0] ? styles.active : null}
			>
				<div
					className={[styles.grid, styles.gridGutters, styles.grid1of6].join(
						' '
					)}
				>
					<div className={styles.gridCell} id={cat[0]} onClick={handleClick}>
						{cat[1].name}
					</div>
					<div className={styles.gridCell} onClick={handleDelete} id={cat[0]}>
						x
					</div>
				</div>
			</span>
		))}
		<span className={selectedCategory === 'all' ? styles.active : null}>
			<div
				className={[styles.grid, styles.gridGutters, styles.grid1of6].join(' ')}
			>
				<div className={styles.gridCell} id="all" onClick={handleClick}>
					Show All
				</div>
				<div className={styles.gridCell} />
			</div>
		</span>
	</aside>
);

export default Sidebar;
