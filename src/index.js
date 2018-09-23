//Dependencias
import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware, combineReducers} from 'redux';
import {createLogger} from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
//Configuraciiones
import { 
	interruptionTypeReducer,
	interruptionAddressReducer,
	interruptionDateReducer,
	} from './reducers';

//Css styles
import "tachyons"
import './index.css';

//Components
import App from './App';
import registerServiceWorker from './registerServiceWorker';

// ReactDOM.render(<App />, document.getElementById('root'));
// registerServiceWorker();

const looger = createLogger();
const rootReducers=combineReducers({interruptionTypeReducer,interruptionAddressReducer,interruptionDateReducer})

const store = createStore(rootReducers, applyMiddleware(thunkMiddleware,looger))
//const store = createStore(clickButtonReducer, applyMiddleware(thunkMiddleware,looger))

ReactDOM.render(
	<Provider store={store}>
		<App />
	</Provider>, document.getElementById('root'));
registerServiceWorker();
