import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { shallow, mount, render } from 'enzyme';

describe('App Component', () => {
	test('renders without crashing', () => {
		const wrapper = shallow(<App>Note Vote</App>);
		expect(wrapper).toMatchSnapshot();
	});

});
