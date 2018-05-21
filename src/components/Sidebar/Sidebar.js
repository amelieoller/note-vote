import React, { Component } from 'react';
import styles from './Sidebar.scss';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faTimes from '@fortawesome/fontawesome-free-solid/faTimes';

class Sidebar extends Component {
	constructor() {
		super();

		this.state = {
			tag: '',
			category: ''
		};
	}

	handleSubmit = e => {
		e.preventDefault();
		const type = e.currentTarget.children[0].name;
		const saveAction = `save${type.charAt(0).toUpperCase() + type.slice(1)}`;

		this.props[saveAction]({ name: this.state[type], uid: this.props.uid });

		this.setState({
			[type]: ''
		});
	};

	handleDelete = e => {
		const type = e.currentTarget.dataset.name;
		const saveAction = `delete${type.charAt(0).toUpperCase() + type.slice(1)}`;

		this.props[saveAction](e.currentTarget.id);
	};

	handleChange = e => {
		this.setState({
			[e.currentTarget.name]: e.currentTarget.value
		});
	};

	render() {
		const { visibilityFilter, handleFilter, categories, tags } = this.props;

		return (
			<aside>
				<div className={styles.sectionContainer}>
					<h3>Filter by Categories:</h3>
					{categories.map(cat => (
						<span
							key={cat[0]}
							className={
								visibilityFilter.categories.includes(cat[0])
									? styles.active
									: null
							}
						>
							<div
								className={[
									styles.grid,
									styles.gridGutters,
									styles.grid1of6
								].join(' ')}
								id="categories"
							>
								<div
									className={styles.gridCell}
									id={cat[0]}
									onClick={handleFilter}
								>
									{cat[1].name}
								</div>
								<div
									className={styles.gridCell}
									onClick={this.handleDelete}
									data-name="category"
									id={cat[0]}
								>
									<FontAwesomeIcon icon={faTimes} />
								</div>
							</div>
						</span>
					))}
					<span
						className={
							visibilityFilter.categories.length === 0 ? styles.active : null
						}
					>
						<div
							className={[
								styles.grid,
								styles.gridGutters,
								styles.grid1of6
							].join(' ')}
							id="categories"
						>
							<div className={styles.gridCell} id="all" onClick={handleFilter}>
								All Categories
							</div>
							<div className={styles.gridCell} />
						</div>
					</span>
					<form onSubmit={this.handleSubmit}>
						<input
							type="text"
							name="category"
							value={this.state.category}
							placeholder="New Category"
							onChange={this.handleChange}
						/>
					</form>
				</div>
				<hr />
				<div className={styles.sectionContainer}>
					<h3>Filter by Tags:</h3>
					{tags.map(tag => (
						<span
							key={tag[0]}
							className={
								visibilityFilter.tags.includes(tag[0]) ? styles.active : null
							}
						>
							<div
								className={[
									styles.grid,
									styles.gridGutters,
									styles.grid1of6
								].join(' ')}
								id="tags"
							>
								<div
									className={styles.gridCell}
									onClick={handleFilter}
									id={tag[0]}
								>
									{tag[1].name}
								</div>
								<div
									className={styles.gridCell}
									onClick={this.handleDelete}
									data-name="tag"
									id={tag[0]}
								>
									<FontAwesomeIcon icon={faTimes} />
								</div>
							</div>
						</span>
					))}

					<span
						className={
							visibilityFilter.tags.length === 0 ? styles.active : null
						}
					>
						<div
							className={[
								styles.grid,
								styles.gridGutters,
								styles.grid1of6
							].join(' ')}
							id="tags"
						>
							<div className={styles.gridCell} id="all" onClick={handleFilter}>
								All Tags
							</div>
							<div className={styles.gridCell} />
						</div>
					</span>

					<form onSubmit={this.handleSubmit}>
						<input
							type="text"
							name="tag"
							value={this.state.tag}
							placeholder="New Tag"
							onChange={this.handleChange}
						/>
					</form>
				</div>
			</aside>
		);
	}
}

export default Sidebar;
