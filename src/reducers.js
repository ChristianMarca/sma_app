import {
  INTERRUPTION_TYPE,
  INTERRUPTION_ID_BS,
  INTERRUPTION_CODE,
  INTERRUPTION_BS,
  INTERRUPTION_CODE_EST,
  INTERRUPTION_PROVINCE,
  INTERRUPTION_CANTON,
  INTERRUPTION_PARISH,
  INTERRUPTION_SECTOR,
  INTERRUPTION_START,
  INTERRUPTION_END,
  INTERRUPTION_TIME,
  INTERRUPTION_CAUSES,
  INTERRUPTION_TAGS,
  INTERRUPTION_SERVICE_ADD,
  INTERRUPTION_SERVICE_REMOVE,
  INTERRUPTION_SERVICE_REMOVE_ALL,
  INTERRUPTION_TECHNOLOGY_ADD,
  INTERRUPTION_TECHNOLOGY_REMOVE,
  INTERRUPTION_TECHNOLOGY_REMOVE_ALL,
  INTERRUPTION_LEVEL_SELECTED,
  ID_REQUEST_PENDING,
  ID_REQUEST_SUCCESS,
  ID_REQUEST_FAILED,

  ADDRESS_REQUEST_PENDING,
  ADDRESS_REQUEST_SUCCESS,
  ADDRESS_REQUEST_FAILED,

  PROVINCE_REQUEST_PENDING,
  PROVINCE_REQUEST_SUCCESS,
  PROVINCE_REQUEST_FAILED,
  CANTON_REQUEST_PENDING,
  CANTON_REQUEST_SUCCESS,
  CANTON_REQUEST_FAILED,
  UPDATE_INPUT_VALUE_ID,
  CLEAR_SUGGESTIONS_ID,
  MAYBE_UPDATE_SUGGESTIONS_ID,
  LOAD_SUGGESTIONS_BEGIN_ID,
  UPDATE_INPUT_VALUE_EST,
  CLEAR_SUGGESTIONS_EST,
  LOAD_SUGGESTIONS_BEGIN_EST,
  MAYBE_UPDATE_SUGGESTIONS_EST,
  LOAD_SUGGESTIONS_BEGIN_COD_EST,
  UPDATE_INPUT_VALUE_COD_EST,
  CLEAR_SUGGESTIONS_COD_EST,
  MAYBE_UPDATE_SUGGESTIONS_COD_EST,
  SESSION_INIT,
  SESSION_LOGOUT,
  DATA_USER,

  RADIOBASES_SELECTED,
  RADIOBASES_REMOVE,
  RADIOBASES_REMOVE_ALL,

  RADIOBASES_ID_SELECTED,
  RADIOBASES_ID_REMOVE,
  RADIOBASES_ID_REMOVE_ALL,

  UPDATE_INPUT_VALUE_PROVINCE,
  CLEAR_SUGGESTIONS_PROVINCE,
  LOAD_SUGGESTIONS_BEGIN_PROVINCE,
  MAYBE_UPDATE_SUGGESTIONS_PROVINCE,
  UPDATE_INPUT_VALUE_CANTON,
  CLEAR_SUGGESTIONS_CANTON,
  LOAD_SUGGESTIONS_BEGIN_CANTON,
  MAYBE_UPDATE_SUGGESTIONS_CANTON,
  UPDATE_INPUT_VALUE_PARISH,
  CLEAR_SUGGESTIONS_PARISH,
  LOAD_SUGGESTIONS_BEGIN_PARISH,
  MAYBE_UPDATE_SUGGESTIONS_PARISH, 
  PARISH_REQUEST_PENDING,
  PARISH_REQUEST_FAILED,
  PARISH_REQUEST_SUCCESS,

  INTERRUPTION_SELECTED_VIEW,

  INTERRUPTION_SELECTED_REQUEST_PENDING,
  INTERRUPTION_SELECTED_REQUEST_SUCCESS,
  INTERRUPTION_SELECTED_REQUEST_FAILED
} from './constants';
// import moment from 'moment';
import moment from 'moment-timezone';
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
  interruptionCodeEst:"",
  interruptionLevel:'',
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
    case INTERRUPTION_CODE_EST:
      return Object.assign({},state,{interruptionCodeEst: action.payload})
    case INTERRUPTION_LEVEL_SELECTED:
      return Object.assign({},state,{interruptionLevel: action.payload})
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
  interruptionStart: moment().tz("America/Guayaquil").toDate(),
  interruptionEnd: moment().tz("America/Guayaquil").toDate(),
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

const initialStateServices={
  interruptionServices: [],
};

export const interruptionServicesReducer =(state=initialStateServices, action={})=>{
  switch(action.type){
    case INTERRUPTION_SERVICE_ADD:
      // return Object.assign({},state,{interruptionServices: action.payload})
      return {
        interruptionServices: [ ...state.interruptionServices, action.payload]
      }
    case INTERRUPTION_SERVICE_REMOVE:
      // const { [action.interruptionServices]: deletedValue, ...newState_byHash } = state.byHash;
      return { 
         interruptionServices: state.interruptionServices.filter(item => item !== action.payload)      
      };
    case INTERRUPTION_SERVICE_REMOVE_ALL:
      return Object.assign({},state,{interruptionServices: []})
    default:
      return state;
  }
};

const initialStateTechnologies={
  interruptionTechnologies: [],
};

export const interruptionTechnologiesReducer =(state=initialStateTechnologies, action={})=>{
  switch(action.type){
    case INTERRUPTION_TECHNOLOGY_ADD:
      return {
        interruptionTechnologies: [ ...state.interruptionTechnologies, action.payload]
      }
    case INTERRUPTION_TECHNOLOGY_REMOVE:
      return { 
         interruptionTechnologies: state.interruptionTechnologies.filter(item => item !== action.payload)      
      };
    case INTERRUPTION_TECHNOLOGY_REMOVE_ALL:
      return Object.assign({},state,{interruptionTechnologies: []})
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

const initialStateCodeEstSuggest = {
  value: '',
  suggestions: [],
  isLoading: false,
};

export const  reducerSuggestCodeEst=(state = initialStateCodeEstSuggest, action = {})=> {
  switch (action.type) {
    case UPDATE_INPUT_VALUE_COD_EST:
      return {
        ...state,
        value: action.value
      };

    case CLEAR_SUGGESTIONS_COD_EST:
      return {
        ...state,
        suggestions: []
      };

    case LOAD_SUGGESTIONS_BEGIN_COD_EST:
      return {
        ...state,
        isLoading: true
      };

    case MAYBE_UPDATE_SUGGESTIONS_COD_EST:
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
};

//Provincia
const initialStateProvinciaSuggest = {
  value: '',
  suggestions: [],
  isLoading: false,
};

export const  reducerSuggestProvincia=(state = initialStateProvinciaSuggest, action = {})=> {
  switch (action.type) {
    case UPDATE_INPUT_VALUE_PROVINCE:
      return {
        ...state,
        value: action.value
      };

    case CLEAR_SUGGESTIONS_PROVINCE:
      return {
        ...state,
        suggestions: []
      };

    case LOAD_SUGGESTIONS_BEGIN_PROVINCE:
      return {
        ...state,
        isLoading: true
      };

    case MAYBE_UPDATE_SUGGESTIONS_PROVINCE:
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

//Canton
const initialStateCantonSuggest = {
  value: '',
  suggestions: [],
  isLoading: false,
};

export const  reducerSuggestCanton=(state = initialStateCantonSuggest, action = {})=> {
  switch (action.type) {
    case UPDATE_INPUT_VALUE_CANTON:
      return {
        ...state,
        value: action.value
      };

    case CLEAR_SUGGESTIONS_CANTON:
      return {
        ...state,
        suggestions: []
      };

    case LOAD_SUGGESTIONS_BEGIN_CANTON:
      return {
        ...state,
        isLoading: true
      };

    case MAYBE_UPDATE_SUGGESTIONS_CANTON:
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

//Parroquia
const initialStateParishSuggest = {
  value: '',
  suggestions: [],
  isLoading: false,
};

export const  reducerSuggestParish=(state = initialStateParishSuggest, action = {})=> {
  switch (action.type) {
    case UPDATE_INPUT_VALUE_PARISH:
      return {
        ...state,
        value: action.value
      };

    case CLEAR_SUGGESTIONS_PARISH:
      return {
        ...state,
        suggestions: []
      };

    case LOAD_SUGGESTIONS_BEGIN_PARISH:
      return {
        ...state,
        isLoading: true
      };

    case MAYBE_UPDATE_SUGGESTIONS_PARISH:
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

//Address
const initialStateAddress={
  isPendingID: false,
  ID: {data:[]},
  errorID:''
}

export const requestAddressReducer=(state=initialStateAddress, action={})=>{
  switch(action.type){
    case ADDRESS_REQUEST_PENDING:
     return Object.assign({},state,{isPendingID: true})
    case ADDRESS_REQUEST_SUCCESS:
      return Object.assign({},state,{ID: action.payload, isPendingID: false})
    case ADDRESS_REQUEST_FAILED:
      return Object.assign({},state,{errorID: action.payload, isPendingID: false})
    default:
      return state
  }
}

//Provincia
const initialStateProvince={
  isPendingID: false,
  ID: {data:[]},
  errorID:''
}

export const requestProvinceReducer=(state=initialStateProvince, action={})=>{
  switch(action.type){
    case PROVINCE_REQUEST_PENDING:
     return Object.assign({},state,{isPendingID: true})
    case PROVINCE_REQUEST_SUCCESS:
      return Object.assign({},state,{ID: action.payload, isPendingID: false})
    case PROVINCE_REQUEST_FAILED:
      return Object.assign({},state,{errorID: action.payload, isPendingID: false})
    default:
      return state
  }
}

//Canton
const initialStateCanton={
  isPendingID: false,
  ID: {data:[]},
  errorID:''
}

export const requestCantonReducer=(state=initialStateCanton, action={})=>{
  switch(action.type){
    case CANTON_REQUEST_PENDING:
     return Object.assign({},state,{isPendingID: true})
    case CANTON_REQUEST_SUCCESS:
      return Object.assign({},state,{ID: action.payload, isPendingID: false})
    case CANTON_REQUEST_FAILED:
      return Object.assign({},state,{errorID: action.payload, isPendingID: false})
    default:
      return state
  }
}

//Canton
const initialStateParish={
  isPendingID: false,
  ID: {data:[]},
  errorID:''
}

export const requestParishReducer=(state=initialStateParish, action={})=>{
  switch(action.type){
    case PARISH_REQUEST_PENDING:
     return Object.assign({},state,{isPendingID: true})
    case PARISH_REQUEST_SUCCESS:
      return Object.assign({},state,{ID: action.payload, isPendingID: false})
    case PARISH_REQUEST_FAILED:
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

// Radio Bases Selected
const initialStateRadioBases={
  radioBasesAdd: {}
};

export const radioBasesAddReducer =(state=initialStateRadioBases, action={})=>{
  switch(action.type){
    case RADIOBASES_SELECTED:
      {
        return {
          radioBasesAdd: {
            ...state.radioBasesAdd,
            [action.id]: action.payload
          }
        }
      }
    case RADIOBASES_REMOVE:
      {
        const { [action.id]: deletedValue, ...newState_byHash } = state.radioBasesAdd;
        return { 
          radioBasesAdd: newState_byHash
        };
      }
    case RADIOBASES_REMOVE_ALL:
      {
        return { 
          radioBasesAdd: {}
        };
      }
    default:
      return state;
  }
};

// Radio Bases for ID Selected
const initialStateRadioBasesID={
  radioBasesAdd: {}
};

export const radioBasesIDAddReducer =(state=initialStateRadioBasesID, action={})=>{
  switch(action.type){
    case RADIOBASES_ID_SELECTED:
      {
        return {
          radioBasesAdd: {
            ...state.radioBasesAdd,
            [action.id]: action.payload
          }
        }
      }
    case RADIOBASES_ID_REMOVE:
      {
        // console.log(state.radioBasesAdd,'probando')
        const { [action.id]: deletedValue, ...newState_byHash } = state.radioBasesAdd;
        return { 
          radioBasesAdd: newState_byHash
        };
      }
    case RADIOBASES_ID_REMOVE_ALL:
      {
        return { 
          radioBasesAdd: {}
        };
      }
    default:
      return state;
  }
};

// Elección Interruption View
const initialStateInterruptionView={
  interruptionView: undefined
};

export const interruptionViewReducer =(state=initialStateInterruptionView, action={})=>{
  switch(action.type){
    case INTERRUPTION_SELECTED_VIEW:
      return Object.assign({},state,{interruptionView: action.payload})
    default:
      return state;
  }
};

//Fetch Interruption
const initialStateInterruptionData={
  isPendingID: false,
  ID: {data:[]},
  errorID:''
}

export const requestInterruptionDataReducer=(state=initialStateInterruptionData, action={})=>{
  switch(action.type){
    case INTERRUPTION_SELECTED_REQUEST_PENDING:
     return Object.assign({},state,{isPendingID: true})
    case INTERRUPTION_SELECTED_REQUEST_SUCCESS:
      return Object.assign({},state,{ID: action.payload, isPendingID: false})
    case INTERRUPTION_SELECTED_REQUEST_FAILED:
      return Object.assign({},state,{errorID: action.payload, isPendingID: false})
    default:
      return state
  }
}