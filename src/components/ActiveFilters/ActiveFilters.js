import React, { Component } from 'react';
import styles from './ActiveFilters.scss';
import { connect } from 'react-redux';
import _filter from 'lodash/filter';
import _includes from 'lodash/includes';

// Actions
import { setVisibilityFilter } from '../../actions/visibilityFilterActions';

class ActiveFilters extends Component {
	getEachTagName = () => {
		const { tags, categories, visibilityFilter } = this.props;
		let tagNames = [];

		if (visibilityFilter.tags.length !== 0) {
			_filter(Object.keys(tags), function(key) {
				return visibilityFilter.tags.includes(key);
			}).map(selectedKey => {
				tagNames = [...tagNames, tags[selectedKey].name];
			});
		}

		return tagNames;
	};

	getEachCategoryName = () => {
		const { categories, visibilityFilter } = this.props;
		let categoryNames = [];

		if (visibilityFilter.categories.length !== 0) {
			_filter(Object.keys(categories), function(key) {
				return visibilityFilter.categories.includes(key);
			}).map(selectedKey => {
				categoryNames = [...categoryNames, categories[selectedKey].name];
			});
		}

		return categoryNames;
	};

	handleClearFilters = () => {
		this.props.setVisibilityFilter('clearFilters', 'clearFilters');
	};

	render() {
		const { archived, categories, tags } = this.props.visibilityFilter;

		return (
			<div className={styles.filterContainer}>
				{archived ? <strong>Archived | </strong> : null}

				{this.getEachCategoryName().length !== 0 && (
					<strong>Filtered Tags: </strong>
				)}
				{this.getEachCategoryName() &&
					this.getEachCategoryName().map(tag => (
						<span key={tag}>{tag} | </span>
					))}

				{this.getEachTagName().length !== 0 && <strong>Filtered Tags: </strong>}
				{this.getEachTagName() &&
					this.getEachTagName().map(tag => <span key={tag}>{tag} | </span>)}
				{(tags.length !== 0 || categories.length !== 0 || archived) && (
					<span className={styles.link} onClick={this.handleClearFilters}>
						Clear all filters
					</span>
				)}
			</div>
		);
	}
}

const mapStateToProps = state => ({
	visibilityfilter: state.visibilityfilter,
	tags: state.tags,
	categories: state.categories
});

export default connect(mapStateToProps, { setVisibilityFilter })(ActiveFilters);
