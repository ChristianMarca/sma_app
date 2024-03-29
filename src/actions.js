//#########################################################################################
//#########################################################################################
//#########################################################################################
//___Módulo actions___
//            Autor: Christian Marca
//            Fecha de Creación: 18/01/2019
//            Fecha de Ultima Modificación:-----
//            Descripción: Contiene las acciones que contienen cargas útiles de información que envían datos desde la aplicación al store, para el manejo del estado de la aplicacion de Redux
//            metodos:
//						interruptionTypeAction
//						interruptionIdBsAction
//						interruptionCodeAction
//						interruptionBSAction
//						interruptionCodeEstAction
//						interruptionLevelSelectedAction
//						interruptionProvinceAction
//						interruptionCantonAction
//						interruptionParishAction
//						interruptionSectorAction
//						interruptionStartAction
//						interruptionEndAction
//						interruptionTimeAction
//						interruptionCausesAction
//						interruptionTagsAction
//						interruptionServicesAddAction
//						interruptionServicesRemoveAction
//						interruptionServicesRemoveAllActions
//						interruptionTechnologyAddAction
//						interruptionTechnologyRemoveAction
//						interruptionTechnologyRemoveAllActions
//						requestIDAction
//						requestAddressAction
//						requestProvinceAction
//						requestCantonAction
//						requestParishAction
//						interruptionSubmitedAction
//						isSignInAction
//						isSignOutAction
//						receiveDataUserAction
//						addRadioBaseAction
//						removeRadioBaseAction
//						removeAllRadioBaseAction
//						addRadioBaseIDAction
//						removeRadioBaseIDAction
//						removeAllRadioBaseIDAction
//						interruptionViewIdAction
//						structureToUpdateAction
//						requestInterruptionFetchAction

//#########################################################################################
//#########################################################################################
//#########################################################################################
// actions

import axios from 'axios';
import {
	INTERRUPTION_TYPE,
	INTERRUPTION_ID_BS,
	INTERRUPTION_CODE,
	INTERRUPTION_BS,
	INTERRUPTION_PROVINCE,
	INTERRUPTION_CANTON,
	INTERRUPTION_PARISH,
	INTERRUPTION_SECTOR,
	INTERRUPTION_SERVICE_ADD,
	INTERRUPTION_SERVICE_REMOVE,
	INTERRUPTION_SERVICE_REMOVE_ALL,
	INTERRUPTION_TECHNOLOGY_ADD,
	INTERRUPTION_TECHNOLOGY_REMOVE,
	INTERRUPTION_TECHNOLOGY_REMOVE_ALL,
	INTERRUPTION_LEVEL_SELECTED,
	INTERRUPTION_START,
	INTERRUPTION_END,
	INTERRUPTION_TIME,
	INTERRUPTION_CAUSES,
	INTERRUPTION_TAGS,
	ID_REQUEST_PENDING,
	ID_REQUEST_SUCCESS,
	ID_REQUEST_FAILED,
	PROVINCE_REQUEST_PENDING,
	PROVINCE_REQUEST_SUCCESS,
	PROVINCE_REQUEST_FAILED,
	CANTON_REQUEST_PENDING,
	CANTON_REQUEST_SUCCESS,
	CANTON_REQUEST_FAILED,
	PARISH_REQUEST_PENDING,
	PARISH_REQUEST_SUCCESS,
	PARISH_REQUEST_FAILED,
	INTERRUPTION_SUBMITED,
	SESSION_INIT,
	SESSION_LOGOUT,
	DATA_USER,
	RADIOBASES_SELECTED,
	RADIOBASES_REMOVE,
	RADIOBASES_REMOVE_ALL,
	RADIOBASES_ID_SELECTED,
	RADIOBASES_ID_REMOVE,
	RADIOBASES_ID_REMOVE_ALL,
	INTERRUPTION_CODE_EST,
	ADDRESS_REQUEST_PENDING,
	ADDRESS_REQUEST_SUCCESS,
	ADDRESS_REQUEST_FAILED,
	INTERRUPTION_SELECTED_VIEW,
	INTERRUPTION_SELECTED_REQUEST_PENDING,
	INTERRUPTION_SELECTED_REQUEST_SUCCESS,
	INTERRUPTION_SELECTED_REQUEST_FAILED,
	STRUCTURE_TO_UPDATE
} from './constants';

import { API_URL } from './config';

// Elección del tipo de interrupción
export const interruptionTypeAction = (type) => {
	return {
		type: INTERRUPTION_TYPE,
		payload: type
	};
};

// ID BS de interrupción
export const interruptionIdBsAction = (id) => ({
	type: INTERRUPTION_ID_BS,
	payload: id
});

// Código de interrupción
export const interruptionCodeAction = (code) => ({
	type: INTERRUPTION_CODE,
	payload: code
});

//Código de Estación Base
export const interruptionBSAction = (bs) => ({
	type: INTERRUPTION_BS,
	payload: bs
});

//Código de Estructura
export const interruptionCodeEstAction = (code_est) => ({
	type: INTERRUPTION_CODE_EST,
	payload: code_est
});

//Level
export const interruptionLevelSelectedAction = (Level) => ({
	type: INTERRUPTION_LEVEL_SELECTED,
	payload: Level
});

//Province
export const interruptionProvinceAction = (province) => ({
	type: INTERRUPTION_PROVINCE,
	payload: province
});

//Cantón
export const interruptionCantonAction = (canton) => ({
	type: INTERRUPTION_CANTON,
	payload: canton
});

//Parroquia
export const interruptionParishAction = (parish) => ({
	type: INTERRUPTION_PARISH,
	payload: parish
});

//Sector
export const interruptionSectorAction = (sector) => ({
	type: INTERRUPTION_SECTOR,
	payload: sector
});

//Inicio
export const interruptionStartAction = (start) => ({
	type: INTERRUPTION_START,
	payload: start
});

//Fin
export const interruptionEndAction = (end) => ({
	type: INTERRUPTION_END,
	payload: end
});

//Tiempo
export const interruptionTimeAction = (time) => ({
	type: INTERRUPTION_TIME,
	payload: time
});

//Causas
export const interruptionCausesAction = (cause) => ({
	type: INTERRUPTION_CAUSES,
	payload: cause
});

//Tags
export const interruptionTagsAction = (tags) => ({
	type: INTERRUPTION_TAGS,
	payload: tags
});

//Services
export const interruptionServicesAddAction = (service) => ({
	type: INTERRUPTION_SERVICE_ADD,
	payload: service
});

export const interruptionServicesRemoveAction = (service) => ({
	type: INTERRUPTION_SERVICE_REMOVE,
	payload: service
});

export const interruptionServicesRemoveAllActions = () => ({
	type: INTERRUPTION_SERVICE_REMOVE_ALL
});

//Technology
export const interruptionTechnologyAddAction = (technology) => ({
	type: INTERRUPTION_TECHNOLOGY_ADD,
	payload: technology
});

export const interruptionTechnologyRemoveAction = (technology) => ({
	type: INTERRUPTION_TECHNOLOGY_REMOVE,
	payload: technology
});

export const interruptionTechnologyRemoveAllActions = () => ({
	type: INTERRUPTION_TECHNOLOGY_REMOVE_ALL
});

export const requestIDAction = (newValue, typeSearch, id_usuario) => (dispatch) => {
	dispatch({ type: ID_REQUEST_PENDING });
	// newValue.length >=3 &&axios.get(`http://192.168.1.102:3000/radioBases/test?${typeSearch}=${newValue}&id_user=${id_usuario}`)
	return new Promise((resolve, reject) => {
		const token = window.sessionStorage.getItem('token') || window.localStorage.getItem('token');
		// newValue.length >=3 &&axios.get(`${API_URL}/radioBases/test?${typeSearch}=${newValue}&id_user=${id_usuario}`)
		newValue.length >= 3 &&
			axios({
				method: 'GET',
				url: `${API_URL}/radioBases/estructuras?${typeSearch}=${newValue}&id_user=${id_usuario}`,
				headers: {
					'Content-Type': 'application/json',
					authorization: token
				}
			})
				.then((data) => {
					resolve(dispatch({ type: ID_REQUEST_SUCCESS, payload: data }));
				})
				.catch((error) => reject(dispatch({ type: ID_REQUEST_FAILED, payload: error })));
	});
};

export const requestAddressAction = (newValue, typeSearch, nivel_interrupcion, tecnologias, id_usuario) => (
	dispatch
) => {
	const token = window.sessionStorage.getItem('token') || window.localStorage.getItem('token');
	dispatch({ type: ADDRESS_REQUEST_PENDING });
	return new Promise((resolve, reject) => {
		// return axios.get(`${API_URL}/radioBases/addressInterruption?${typeSearch}=${newValue}&id_user=${id_usuario}&nivel_interrupcion=${nivel_interrupcion}&tecnologias_afectadas=${tecnologias}`)
		return axios({
			method: 'GET',
			url: `${API_URL}/radioBases/addressInterruption?${typeSearch}=${newValue}&id_user=${id_usuario}&nivel_interrupcion=${nivel_interrupcion}&tecnologias_afectadas=${tecnologias}`,
			headers: {
				'Content-Type': 'application/json',
				authorization: token
			}
		})
			.then((data) => {
				resolve(dispatch({ type: ADDRESS_REQUEST_SUCCESS, payload: data }));
			})
			.catch((error) => reject(dispatch({ type: ADDRESS_REQUEST_FAILED, payload: error })));
	});
};

export const requestProvinceAction = (newValue, typeSearch, id_usuario) => (dispatch) => {
	const token = window.sessionStorage.getItem('token') || window.localStorage.getItem('token');
	dispatch({ type: PROVINCE_REQUEST_PENDING });
	return new Promise((resolve, reject) => {
		// return axios.get(`${API_URL}/radioBases/address?${typeSearch}=${newValue}&id_user=${id_usuario}`)
		return axios({
			method: 'GET',
			url: `${API_URL}/radioBases/addressInterruptionForProvince?${typeSearch}=${newValue}&id_user=${id_usuario}`,
			headers: {
				'Content-Type': 'application/json',
				authorization: token
			}
		})
			.then((data) => {
				resolve(dispatch({ type: PROVINCE_REQUEST_SUCCESS, payload: data }));
			})
			.catch((error) => reject(dispatch({ type: PROVINCE_REQUEST_FAILED, payload: error })));
	});
};

export const requestCantonAction = (newValue, typeSearch, id_usuario) => (dispatch) => {
	const token = window.sessionStorage.getItem('token') || window.localStorage.getItem('token');
	dispatch({ type: CANTON_REQUEST_PENDING });
	return new Promise((resolve, reject) => {
		// return axios.get(`${API_URL}/radioBases/address1?${typeSearch}=${newValue}&id_user=${id_usuario}`)
		return axios({
			method: 'GET',
			url: `${API_URL}/radioBases/addressInterruptionForCanton?${typeSearch}=${newValue}&id_user=${id_usuario}`,
			headers: {
				'Content-Type': 'application/json',
				authorization: token
			}
		})
			.then((data) => {
				resolve(dispatch({ type: CANTON_REQUEST_SUCCESS, payload: data }));
			})
			.catch((error) => reject(dispatch({ type: CANTON_REQUEST_FAILED, payload: error })));
	});
};

export const requestParishAction = (newValue, typeSearch, id_usuario) => (dispatch) => {
	const token = window.sessionStorage.getItem('token') || window.localStorage.getItem('token');
	dispatch({ type: PARISH_REQUEST_PENDING });
	return new Promise((resolve, reject) => {
		// return axios.get(`${API_URL}/radioBases/address2?${typeSearch}=${newValue}&id_user=${id_usuario}`)
		return axios({
			method: 'GET',
			url: `${API_URL}/radioBases/addressInterruptionForParish?${typeSearch}=${newValue}&id_user=${id_usuario}`,
			headers: {
				'Content-Type': 'application/json',
				authorization: token
			}
		})
			.then((data) => {
				resolve(dispatch({ type: PARISH_REQUEST_SUCCESS, payload: data }));
			})
			.catch((error) => reject(dispatch({ type: PARISH_REQUEST_FAILED, payload: error })));
	});
};

export const interruptionSubmitedAction = () => ({
	type: INTERRUPTION_SUBMITED
});

//Session Managment
//signin
export const isSignInAction = (isSignin) => ({
	type: SESSION_INIT,
	payload: isSignin
});
//singout
export const isSignOutAction = (tags) => ({
	type: SESSION_LOGOUT,
	payload: tags
}); //Tags
export const receiveDataUserAction = (dataUser) => ({
	type: DATA_USER,
	payload: dataUser
});

//Agregar Radio Bases
export const addRadioBaseAction = (id, radioBase) => ({
	type: RADIOBASES_SELECTED,
	id,
	payload: radioBase
});
//remove
export const removeRadioBaseAction = (radioBase) => ({
	type: RADIOBASES_REMOVE,
	id: radioBase
});

//Remove All
export const removeAllRadioBaseAction = () => ({
	type: RADIOBASES_REMOVE_ALL
});

//Agregar Radio Bases for ID
export const addRadioBaseIDAction = (id, radioBase) => ({
	type: RADIOBASES_ID_SELECTED,
	id,
	payload: radioBase
});
//remove
export const removeRadioBaseIDAction = (radioBase) => ({
	type: RADIOBASES_ID_REMOVE,
	id: radioBase
});

//Remove All
export const removeAllRadioBaseIDAction = () => ({
	type: RADIOBASES_ID_REMOVE_ALL
});

// ID View interrupción
export const interruptionViewIdAction = (id) => ({
	type: INTERRUPTION_SELECTED_VIEW,
	payload: id
});

// Estacion a actualizar
export const structureToUpdateAction = (data) => ({
	type: STRUCTURE_TO_UPDATE,
	payload: data
});

//Fetch Interruption
export const requestInterruptionFetchAction = (id_interruption, id_usuario) => (dispatch) => {
	const token = window.sessionStorage.getItem('token') || window.localStorage.getItem('token');
	dispatch({ type: INTERRUPTION_SELECTED_REQUEST_PENDING });
	// newValue.length >=3 &&axios.get(`http://192.168.1.102:3000/radioBases/test?${typeSearch}=${newValue}&id_user=${id_usuario}`)
	return new Promise((resolve, reject) => {
		// axios.get(`${API_URL}/radioBases/interruptionSelected?id_interruption=${id_interruption}&id_user=${id_usuario}`)
		axios({
			method: 'GET',
			url: `${API_URL}/interrupcion/interruptionSelected?id_interruption=${id_interruption}&id_user=${id_usuario}`,
			headers: {
				'Content-Type': 'application/json',
				authorization: token
			}
		})
			.then((data) => {
				resolve(dispatch({ type: INTERRUPTION_SELECTED_REQUEST_SUCCESS, payload: data }));
			})
			.catch((error) => reject(dispatch({ type: INTERRUPTION_SELECTED_REQUEST_FAILED, payload: error })));
	});
};
