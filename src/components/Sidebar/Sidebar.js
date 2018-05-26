import React, { Component } from 'react';
import styles from './Sidebar.scss';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faTimes from '@fortawesome/fontawesome-free-solid/faTimes';
import { capitalize } from '../../shared/helpers';

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
		const saveAction = `save${capitalize(type)}`;

		this.props[saveAction]({ name: this.state[type], uid: this.props.uid });

		this.setState({
			[type]: ''
		});
	};

	handleDelete = e => {
		const type = e.currentTarget.dataset.name;
		const deleteAction = `delete${capitalize(type)}`;
		var result = window.confirm('Are you sure?');
		result && this.props[deleteAction](e.currentTarget.id);
	};

	handleChange = e => {
		this.setState({
			[e.currentTarget.name]: e.currentTarget.value
		});
	};

	handleFilter = e => {
		this.props.setVisibilityFilter(
			e.currentTarget.id,
			e.currentTarget.parentNode.id
		);
	};

	render() {
		const { visibilityFilter, categories, tags } = this.props;

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
									onClick={this.handleFilter}
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
							<div
								className={styles.gridCell}
								id="all"
								onClick={this.handleFilter}
							>
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
									onClick={this.handleFilter}
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
							<div
								className={styles.gridCell}
								id="all"
								onClick={this.handleFilter}
							>
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
				<hr />
				<span className={visibilityFilter.archived ? styles.active : null}>
					<div
						className={styles.gridCell}
						id="archived"
						onClick={this.handleFilter}
					>
						Archived Notes
					</div>
				</span>
			</aside>
		);
	}
}

export default Sidebar;
