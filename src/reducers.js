import {
  INTERRUPTION_TYPE,
  INTERRUPTION_CODE,
  INTERRUPTION_BS,
  INTERRUPTION_PROVINCE,
  INTERRUPTION_CANTON,
  INTERRUPTION_PARISH,
  INTERRUPTION_SECTOR,
  INTERRUPTION_START,
  INTERRUPTION_END,
  INTERRUPTION_TIME,
  INTERRUPTION_CAUSES,
  INTERRUPTION_TAGS
} from './constants';
import moment from 'moment';
// Elección del tipo de interrupción
const initialStateType={
  interruptionType: "Scheduled"
};

export const interruptionTypeReducer =(state=initialStateType, action={})=>{
  switch(action.type){
    case INTERRUPTION_TYPE:
      return Object.assign({},state,{interruptionType: action.payload})
    default:
      return state;
  }
};

//Código de Estación Base
const initialStateBS={
  interruptionCode: "",
  interruptionBS: "",
  interruptionProvince: "",
  interruptionCanton: "",
  interruptionParish: "",
  interruptionSector: ""
};

export const interruptionAddressReducer =(state=initialStateBS, action={})=>{
  switch(action.type){
    case INTERRUPTION_CODE:
      return Object.assign({},state,{interruptionCode: action.payload})
    case INTERRUPTION_BS:
      return Object.assign({},state,{interruptionBS: action.payload})
    case INTERRUPTION_PROVINCE:
      return Object.assign({},state,{interruptionProvince: action.payload})
    case INTERRUPTION_CANTON:
      return Object.assign({},state,{interruptionCanton: action.payload})
    case INTERRUPTION_PARISH:
      return Object.assign({},state,{interruptionParish: action.payload})
    case INTERRUPTION_SECTOR:
      return Object.assign({},state,{interruptionSector: action.payload})
    default:
      return state;
  }
};

//Inicio de Interrupció
const initialStateDate={
  interruptionStart: moment().toDate(),
  interruptionEnd: moment().toDate(),
  interruptionTime:"",
};

export const interruptionDateReducer =(state=initialStateDate, action={})=>{
  switch(action.type){
    case INTERRUPTION_START:
      return Object.assign({},state,{interruptionStart: action.payload})
    case INTERRUPTION_END:
      return Object.assign({},state,{interruptionEnd: action.payload})
    case INTERRUPTION_TIME:
      return Object.assign({},state,{interruptionTime: action.payload})
    default:
      return state;
  }
};

const initialStateCauses={
  interruptionCauses: "",
  interruptionTags:[],
};

export const interruptionCausesReducer =(state=initialStateCauses, action={})=>{
  switch(action.type){
    case INTERRUPTION_CAUSES:
      return Object.assign({},state,{interruptionCauses: action.payload})
    case INTERRUPTION_TAGS:
      return Object.assign({},state,{interruptionTags: action.payload})
    default:
      return state;
  }
};