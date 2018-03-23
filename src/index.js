import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App/App';
import registerServiceWorker from './registerServiceWorker';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from './reducers';
import thunk from 'redux-thunk';
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom';
import Navigation from './components/Navigation/Navigation';
import Login from './components/Login/Login';
import styles from './index.scss';
import Loading from './components/Loading/Loading';
import Authentication from './components/Authentication/Authentication';

const store = createStore(
	rootReducer,
	composeWithDevTools(applyMiddleware(thunk))
);

ReactDOM.render(
	<Provider store={store}>
		<BrowserRouter>
			<div>
				<Navigation />
				<Loading>
					<Switch>
						<Route path="/login" component={Login} exact={true} />
						<Authentication>
							{/* <Navigation /> */}
							<Route path="/" component={App} exact={true} />
						</Authentication>
					</Switch>
				</Loading>
			</div>
		</BrowserRouter>
	</Provider>,
	document.getElementById('root')
);

registerServiceWorker();
