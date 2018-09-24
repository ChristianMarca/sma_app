//Dependencias
import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware, combineReducers} from 'redux';
import {createLogger} from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import {BrowserRouter as Router} from 'react-router-dom';
//Configuraciiones
import { 
	interruptionTypeReducer,
	interruptionAddressReducer,
	interruptionDateReducer,
	interruptionCausesReducer
	} from './reducers';

//Css styles
import "tachyons"
import './index.css';

//Components
// import App from './App';
//Routes
import AppRoutes from './routes'
import registerServiceWorker from './registerServiceWorker';

// ReactDOM.render(<App />, document.getElementById('root'));
// registerServiceWorker();

// const looger = createLogger();
const rootReducers=combineReducers(
	{interruptionTypeReducer,
		interruptionAddressReducer,
		interruptionDateReducer,
		interruptionCausesReducer
	})

// const store = createStore(rootReducers, applyMiddleware(thunkMiddleware,looger))
const store = createStore(rootReducers, applyMiddleware(thunkMiddleware))
//const store = createStore(clickButtonReducer, applyMiddleware(thunkMiddleware,looger))

ReactDOM.render(
	<Provider store={store}>
		{/* <App /> */}
		<Router>
			<AppRoutes />
		</Router>
	</Provider>, document.getElementById('root'));
registerServiceWorker();
