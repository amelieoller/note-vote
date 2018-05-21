import React from 'react';
import styles from './index.scss';
import registerServiceWorker from './registerServiceWorker';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import ReactDOM from 'react-dom';
import thunk from 'redux-thunk';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import rootReducer from './reducers';

// Components
import App from './components/App/App';
import Login from './components/Login/Login';
import Loading from './components/Loading/Loading';
import Authentication from './components/Authentication/Authentication';
import NoteDetail from './components/NoteDetail/NoteDetail';

const store = createStore(
	rootReducer,
	composeWithDevTools(applyMiddleware(thunk))
);

ReactDOM.render(
	<Provider store={store}>
		<BrowserRouter>
			<div>
				<Loading>
					<Switch>
						<Route path="/login" component={Login} exact={true} />
						<Authentication>
							<Route path="/:id" component={NoteDetail} exact={true} />
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
