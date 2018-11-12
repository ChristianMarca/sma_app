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
  INTERRUPTION_START,
  INTERRUPTION_END,
  INTERRUPTION_TIME,
  INTERRUPTION_CAUSES,
  INTERRUPTION_TAGS,
  ID_REQUEST_PENDING,
  ID_REQUEST_SUCCESS,
  ID_REQUEST_FAILED,
  INTERRUPTION_SUBMITED,
  SESSION_INIT,
  SESSION_LOGOUT,
  DATA_USER,
  RADIOBASES_SELECTED,
  RADIOBASES_REMOVE,
  RADIOBASES_REMOVE_ALL
} from './constants';

// Elección del tipo de interrupción
export const interruptionTypeAction=(type)=>{
  // document.getElementById("buttonTypeR").style.background=type=='Random'?'rgba(255,255,255,0.5)':'#2E2E2E';
  // document.getElementById("buttonTypeR").style.color=type=='Random'?'#2E2E2E':'rgba(255,255,255,0.5)';;
  // document.getElementById("buttonTypeS").style.background=type=='Random'?'#2E2E2E':'rgba(255,255,255,0.5)';
  // document.getElementById("buttonTypeS").style.color=type=='Random'?'rgba(255,255,255,0.5)':'#2E2E2E';
  // var now  = "04/09/2013 15:00:00";
  // var then = "02/09/2013 14:20:30";

  // var ms = moment(now,"DD/MM/YYYY HH:mm:ss").diff(moment(then,"DD/MM/YYYY HH:mm:ss"));
  // var d = moment.duration(ms);
  // var s = moment(d).format("hh:mm:ss");
  // console.log(s)
  // var now  = "04/09/2013 15:00:30";
  // var then = "02/09/2013 14:20:31";

  // var ms = moment(now,"DD/MM/YYYY HH:mm:ss").diff(moment(then,"DD/MM/YYYY HH:mm:ss"));
  // var d = moment.duration(ms);
  // var s = Math.floor(d.asHours()) + moment.utc(ms).format(":mm:ss");
  // console.log(s)
  return {
    type: INTERRUPTION_TYPE,
    payload: type
  }
};

// ID BS de interrupción
export const interruptionIdBsAction=(id)=>({
  type: INTERRUPTION_ID_BS,
  payload: id
});

// Código de interrupción
export const interruptionCodeAction=(code)=>({
  type: INTERRUPTION_CODE,
  payload: code
});

//Código de Estación Base
export const interruptionBSAction=(bs)=>({
  type: INTERRUPTION_BS,
  payload: bs
});

//Province
export const interruptionProvinceAction=(province)=>({
  type: INTERRUPTION_PROVINCE,
  payload: province
});

//Cantón
export const interruptionCantonAction=(canton)=>({
  type: INTERRUPTION_CANTON,
  payload: canton
});

//Parroquia
export const interruptionParishAction=(parish)=>({
  type: INTERRUPTION_PARISH,
  payload: parish
});

//Sector
export const interruptionSectorAction=(sector)=>({
  type: INTERRUPTION_SECTOR,
  payload: sector
});

//Inicio
export const interruptionStartAction=(start)=>({
  type: INTERRUPTION_START,
  payload: start
});

//Fin
export const interruptionEndAction=(end)=>({
  type: INTERRUPTION_END,
  payload: end
});

//Tiempo
export const interruptionTimeAction=(time)=>({
  type: INTERRUPTION_TIME,
  payload: time
});

//Causas
export const interruptionCausesAction=(cause)=>({
  type: INTERRUPTION_CAUSES,
  payload: cause
});

//Tags
export const interruptionTagsAction=(tags)=>({
  type: INTERRUPTION_TAGS,
  payload: tags
});

//Services
export const interruptionServicesAddAction=(service)=>({
  type: INTERRUPTION_SERVICE_ADD,
  payload: service
});

export const interruptionServicesRemoveAction=(service)=>({
  type: INTERRUPTION_SERVICE_REMOVE,
  payload: service
});

export const interruptionServicesRemoveAllActions=()=>({
  type: INTERRUPTION_SERVICE_REMOVE_ALL
});

//Technology
export const interruptionTechnologyAddAction=(technology)=>({
  type: INTERRUPTION_TECHNOLOGY_ADD,
  payload: technology
});

export const interruptionTechnologyRemoveAction=(technology)=>({
  type: INTERRUPTION_TECHNOLOGY_REMOVE,
  payload: technology
});

export const interruptionTechnologyRemoveAllActions=()=>({
  type: INTERRUPTION_TECHNOLOGY_REMOVE_ALL
});

export const requestIDAction =(newValue,typeSearch,id_usuario)=>(dispatch)=>{
  dispatch({type: ID_REQUEST_PENDING});
  newValue.length >=3 &&axios.get(`http://192.168.1.102:3000/radioBases/test?${typeSearch}=${newValue}&id_user=${id_usuario}`)
    .then(data=>dispatch({type: ID_REQUEST_SUCCESS, payload: data}))
    .catch(error=>dispatch({type: ID_REQUEST_FAILED, payload: error}))
}

export const interruptionSubmitedAction=()=>({
  type: INTERRUPTION_SUBMITED,
});


//Session Managment
//signin
export const isSignInAction=(isSignin)=>({
  type: SESSION_INIT,
  payload: isSignin
});
//singout
export const isSignOutAction=(tags)=>({
  type: SESSION_LOGOUT,
  payload: tags
});//Tags
export const receiveDataUserAction=(dataUser)=>({
  type: DATA_USER,
  payload: dataUser
});

//Agregar Radio Bases
export const addRadioBaseAction=(id,radioBase)=>({
  type: RADIOBASES_SELECTED,
  id,
  payload: radioBase
});
//remove
export const removeRadioBaseAction=(radioBase)=>({
  type: RADIOBASES_REMOVE,
  id: radioBase
});

//Remove All
export const removeAllRadioBaseAction=()=>({
  type: RADIOBASES_REMOVE_ALL,
});