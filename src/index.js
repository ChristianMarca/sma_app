//#########################################################################################
//#########################################################################################
//#########################################################################################
//___Módulo index___
//            Autor: Christian Marca
//            Fecha de Creación: 18/01/2019
//            Fecha de Ultima Modificación:-----
//            Descripción: Renderiza la pagina y crea el store para manejo de estado medinate Redux
//            metodos:
//						rootReducer
//#########################################################################################
//#########################################################################################
//#########################################################################################
//index

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import { createLogger } from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import { BrowserRouter as Router } from 'react-router-dom';
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
	requestInterruptionDataReducer,
	structureToUpdateReducer
} from './reducers';

//Css styles
import 'tachyons';
import './index.css';

import AppRoutes from './routes';
import registerServiceWorker from './registerServiceWorker';

const looger = createLogger();
const appReducers = combineReducers({
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
	requestAddressReducer,
	reducerSuggestProvincia,
	reducerSuggestCanton,
	reducerSuggestParish,
	interruptionViewReducer,
	requestInterruptionDataReducer,
	structureToUpdateReducer
});

const rootReducer = (state, action) => {
	if (action.type === 'SESSION_LOGOUT') {
		state = undefined;
	}

	return appReducers(state, action);
};

const composeEnhancers =
	(window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;
// const store = createStore(rootReducer, applyMiddleware(thunkMiddleware, looger));
const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunkMiddleware, looger)));

// export default function Routes() {
//   const history = createHistory({
//     basename: process.env.PUBLIC_URL,
//   });

// const store = createStore(rootReducer, applyMiddleware(thunkMiddleware))
export default store;

ReactDOM.render(
	<Provider store={store}>
		<Router basename={process.env.PUBLIC_URL}>
			<AppRoutes />
		</Router>
	</Provider>,
	document.getElementById('root')
);
registerServiceWorker();
