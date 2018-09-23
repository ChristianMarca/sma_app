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