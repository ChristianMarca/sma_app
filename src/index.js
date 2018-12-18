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
	interruptionCausesReducer,
	reducerSuggestID,
	reducerSuggestEST,
	requestIDReducer,
	sessionReducer,
	radioBasesAddReducer,
	radioBasesIDAddReducer,
	interruptionServicesReducer,
	interruptionTechnologiesReducer,
	reducerSuggestCodeEst,
	reducerSuggestProvincia,
	requestAddressReducer,
	reducerSuggestCanton,
	reducerSuggestParish,
	interruptionViewReducer,
	requestInterruptionDataReducer
	} from './reducers';

//Css styles
import "tachyons"
import './index.css';

import AppRoutes from './routes'
import registerServiceWorker from './registerServiceWorker';

const looger = createLogger();
const appReducers=combineReducers(
	{interruptionTypeReducer,
		interruptionAddressReducer,
		interruptionDateReducer,
		interruptionCausesReducer,
		reducerSuggestID,
		reducerSuggestEST,
		requestIDReducer,
		sessionReducer,
		radioBasesAddReducer,
		radioBasesIDAddReducer,
		interruptionServicesReducer,
		interruptionTechnologiesReducer,
		reducerSuggestCodeEst,
		requestAddressReducer,
		reducerSuggestProvincia,
		reducerSuggestCanton,
		reducerSuggestParish,
		interruptionViewReducer
		,requestInterruptionDataReducer
	})

const rootReducer = (state, action) => {

	if (action.type === 'SESSION_LOGOUT') {
		state = undefined
	}

	return appReducers(state, action)
}

const store = createStore(rootReducer, applyMiddleware(thunkMiddleware,looger))
// const store = createStore(rootReducer, applyMiddleware(thunkMiddleware))
export default store;

ReactDOM.render(
	<Provider store={store}>
		<Router>
			<AppRoutes />
		</Router>
	</Provider>, document.getElementById('root'));
registerServiceWorker();
