import React, { Component } from 'react';
import { connect } from 'react-redux';

class Errors extends Component {
	render() {
		const { errors } = this.props;
		return <div>{errors[errors.length - 1]}</div>;
	}
}

const mapStateToProps = state => {
	return { errors: state.errors };
};

export default connect(mapStateToProps)(Errors);
