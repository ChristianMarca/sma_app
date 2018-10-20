import {
  INTERRUPTION_TYPE,
  INTERRUPTION_ID_BS,
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
  INTERRUPTION_TAGS,
  ID_REQUEST_PENDING,
  ID_REQUEST_SUCCESS,
  ID_REQUEST_FAILED,
  UPDATE_INPUT_VALUE_ID,
  CLEAR_SUGGESTIONS_ID,
  MAYBE_UPDATE_SUGGESTIONS_ID,
  LOAD_SUGGESTIONS_BEGIN_ID,
  UPDATE_INPUT_VALUE_EST,
  CLEAR_SUGGESTIONS_EST,
  LOAD_SUGGESTIONS_BEGIN_EST,
  MAYBE_UPDATE_SUGGESTIONS_EST,
  SESSION_INIT,
  SESSION_LOGOUT,
  DATA_USER,
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
  interruptionIdBs: "",
  interruptionCode: "",
  interruptionBS: "",
  interruptionProvince: "",
  interruptionCanton: "",
  interruptionParish: "",
  interruptionSector: ""
};

export const interruptionAddressReducer =(state=initialStateBS, action={})=>{
  switch(action.type){
    case INTERRUPTION_ID_BS:
      return Object.assign({},state,{interruptionIdBs: action.payload})
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

const initialStateIDSuggest = {
  value: '',
  suggestions: [],
  isLoading: false,
};

export const  reducerSuggestID=(state = initialStateIDSuggest, action = {})=> {
  switch (action.type) {
    case UPDATE_INPUT_VALUE_ID:
      return {
        ...state,
        value: action.value
      };

    case CLEAR_SUGGESTIONS_ID:
      return {
        ...state,
        suggestions: []
      };

    case LOAD_SUGGESTIONS_BEGIN_ID:
      return {
        ...state,
        isLoading: true
      };

    case MAYBE_UPDATE_SUGGESTIONS_ID:
      // Ignore suggestions if input value changed
      if (action.value !== state.value) {
        return {
          ...state,
          isLoading: false
        };
      }

      return {
        ...state,
        suggestions: action.suggestions,
        isLoading: false
      };

    default:
      return state;
  }
}

const initialStateESTSuggest = {
  value: '',
  suggestions: [],
  isLoading: false,
};

export const  reducerSuggestEST=(state = initialStateESTSuggest, action = {})=> {
  switch (action.type) {
    case UPDATE_INPUT_VALUE_EST:
      return {
        ...state,
        value: action.value
      };

    case CLEAR_SUGGESTIONS_EST:
      return {
        ...state,
        suggestions: []
      };

    case LOAD_SUGGESTIONS_BEGIN_EST:
      return {
        ...state,
        isLoading: true
      };

    case MAYBE_UPDATE_SUGGESTIONS_EST:
      // Ignore suggestions if input value changed
      if (action.value !== state.value) {
        return {
          ...state,
          isLoading: false
        };
      }

      return {
        ...state,
        suggestions: action.suggestions,
        isLoading: false
      };

    default:
      return state;
  }
}

//ID
const initialStateID={
  isPendingID: false,
  ID: {data:[]},
  errorID:''
}

export const requestIDReducer=(state=initialStateID, action={})=>{
  switch(action.type){
    case ID_REQUEST_PENDING:
     return Object.assign({},state,{isPendingID: true})
    case ID_REQUEST_SUCCESS:
      return Object.assign({},state,{ID: action.payload, isPendingID: false})
    case ID_REQUEST_FAILED:
      return Object.assign({},state,{errorID: action.payload, isPendingID: false})
    default:
      return state
  }
}

//Sesion Managment
// Elección del tipo de interrupción
const initialStateSession={
  isSessionInit: false,
  dataUser:{}
};

export const sessionReducer =(state=initialStateSession, action={})=>{
  switch(action.type){
    case SESSION_INIT:
      return Object.assign({},state,{isSessionInit: action.payload})
    case SESSION_LOGOUT:
      return Object.assign({},state,{isSessionInit: action.payload})
    case DATA_USER:
      return Object.assign({},state,{dataUser: action.payload})
    default:
      return state;
  }
};