import React from 'react';
import {connect} from 'react-redux';
import axios from 'axios';

import {
  interruptionBSAction,
  interruptionCodeEstAction,
  interruptionProvinceAction,
  interruptionCantonAction,
  interruptionParishAction,
  interruptionLevelSelectedAction,
  addRadioBaseAction
} from '../../actions';
import SuggestionCodeEst from './suggestions/suggestionCodEst';
import SuggestionProvince from './suggestions/suggestionProvincia';
import SuggestionCanton from './suggestions/suggestionCanton';
import SuggestionParish from './suggestions/suggestionParroquia';
import { API_URL } from "../../config";
import './interruption.css'

const mapStateToProps=state=>{
	return {
    //Código de Interrupción
    interruptionCode: state.interruptionAddressReducer.interruptionCode,
    //Código de Estación Base
    interruptionBS: state.interruptionAddressReducer.interruptionBS,
    //Codigo de Estructura
    interruptionCodeEst: state.interruptionAddressReducer.interruptionCodeEst,
    //Provincia
    interruptionProvince: state.interruptionAddressReducer.interruptionProvince,
    //Cantón
    interruptionCanton: state.interruptionAddressReducer.interruptionCanton,
    //Parish
    interruptionParish: state.interruptionAddressReducer.interruptionParish,
    //INterruption Level
    interruptionLevel: state.interruptionAddressReducer.interruptionLevel,
    // interruptionSector: state.interruptionAddressReducer.interruptionSector,
    interruptionCodEstNew: state.reducerSuggestCodeEst.value,

    interruptionTechnologies: state.interruptionTechnologiesReducer.interruptionTechnologies,

    sessionController: state.sessionReducer.dataUser
	}
}
const mapDispatchToProps=(dispatch)=>{
	return{
    //Código de Interrupción
    onChangeInterruptionCode: (event)=> dispatch(interruptionCodeEstAction(event.target.value)),
    //Código de Estación Base
    onChangeBS: (event)=> dispatch(interruptionBSAction(event.target.value)),
    //Codigo de Estructura
    onChangeCodeEst: (event)=>dispatch(interruptionCodeEstAction(event.target.value)),
    //Provincia
    onChangeProvince: (event)=> dispatch(interruptionProvinceAction(event.target.value)),
    //Cantón
    onChangeCanton: (event)=> dispatch(interruptionCantonAction(event.target.value)),
    //Parish
    onChangeParish: (event)=> dispatch(interruptionParishAction(event.target.value)),
    //Sector
    // onChangeSector: (event)=> dispatch(interruptionSectorAction(event.target.value)),
    //INterruption Level
    onChangeInterruptionLevel: (level)=>dispatch(interruptionLevelSelectedAction(level)),
    onReceiveRadioBase: (id,data)=>dispatch(addRadioBaseAction(id,data)),
	}
}

var textContainer, textareaSize, input;
var autoSize=()=> {
  textareaSize.innerHTML = input.value + '\n';
};

document.addEventListener('DOMContentLoaded', function() {
  try{
    textContainer = document.querySelector('.textarea-container');
    textareaSize = textContainer.querySelector('.textarea-size');
    input = textContainer.querySelector('textarea');
    autoSize();
    input.addEventListener('input', autoSize);
  }
  catch(e){}
});

class InterruptionAddress extends React.Component{
  constructor(){
    super();
    this.selectedRadioButtonLevel = new Set();
  }
  onChangeTest=(event)=>{
    const token = window.sessionStorage.getItem('token')||window.localStorage.getItem('token');
    // event.target.value.length>=3 && axios.get(`${API_URL}/radioBases?id=${event.target.value}`)
    event.target.value.length>=3 && axios({
      method: 'GET',
      url: `${API_URL}/radioBases?id=${event.target.value}`,
      headers: {
        'Content-Type': 'application/json',
        'authorization': token
    }
    })
      // .then(resp=>{console.log(resp.data)})
      .catch(error=>console.log({Error:error}))
  }
  toggleRadioButtonLevel = label => {
    if (this.selectedRadioButtonLevel.has(label.currentTarget.value)) {
      this.selectedRadioButtonLevel.delete(label.currentTarget.value);
      this.props.onRemoveService(label.currentTarget.value)
    } else {
      this.selectedRadioButtonLevel.add(label.currentTarget.value);
      this.props.onAddService(label.currentTarget.value)
    }
  }
  onInterruptionLevelChange=(e)=>{
    this.props.onChangeInterruptionLevel(e.currentTarget.value)
  }
  seEjecuta=()=>{
    alert('entra?')
  }
  addCodEstUnique=()=>{
    const {interruptionCodEstNew}=this.props;
    this.props.onReceiveRadioBase(interruptionCodEstNew,{cod_est:interruptionCodEstNew})
  }
  handleAddRadioBase=()=>{
    const token = window.sessionStorage.getItem('token')||window.localStorage.getItem('token');
    if(this.props.interruptionTechnologies.length){
      const { interruptionProvince,interruptionCanton,interruptionParish}=this.props;
      const id_usuario=this.props.sessionController.id_user;
      const nivel_interrupcion=this.props.interruptionLevel;
      const location={provincia:interruptionProvince,canton:interruptionCanton,parroquia: interruptionParish};
      // axios.post(`${API_URL}/radioBases/getRadioBasesForLocation?id_user=${id_usuario}`,{
      //   nivel_interrupcion:nivel_interrupcion,
      //   location:location,
      //   tecnologias_afectadas:this.props.interruptionTechnologies
      // })
      axios({
        method: 'POST',
        url:`${API_URL}/radioBases/getRadioBasesForLocation?id_user=${id_usuario}`,
        data:{
            nivel_interrupcion:nivel_interrupcion,
            location:location,
            tecnologias_afectadas:this.props.interruptionTechnologies
          },
        headers: {
          'Content-Type': 'application/json',
          'authorization': token
      }
      })
      .then(data=>{
        data.data.codigo_estacion.map((estacion=>{
          return this.props.onReceiveRadioBase(estacion.cod_est,estacion)
        }));
      })
      .catch(error=>{console.log({Error:error})})
    }else{
      alert('Seleccion una RB')
    }
  }
  render(){
    var parroquia=[];
    var canton=[];
    var provincia=[];
    if(this.props.interruptionLevel==='PARROQUIA'){
      parroquia=[
        <h6 key='titleProvincia' className="titleInput">Provincia</h6>,
        <SuggestionProvince key='suggestProvincia' isLockField={true} />,
        <h6 key='titleCanton' className="titleInput">Canton</h6>,
        <SuggestionCanton key='suggestCanton' isLockField={true} />,
        <h6 key='titleParroquia' className="titleInput">Parroquia</h6>,
        <SuggestionParish key='suggestParroquia' isLockField={false} />
      ]
    }
    if(this.props.interruptionLevel==='CANTON'){
      parroquia=[
        <h6 key='titleProvincia' className="titleInput">Provincia</h6>,
        <SuggestionProvince key='suggestProvincia' isLockField={true} />,
        <h6 key='suggestCanton' className="titleInput">Canton</h6>,
        <SuggestionCanton key='suggestParroquia' isLockField={false} />
      ]
    }
    if(this.props.interruptionLevel==='PROVINCIA'){
      parroquia=[
        <h6 key='titleProvincia' className="titleInput">Provincia</h6>,
        <SuggestionProvince key='suggestProvincia' isLockField={false} />
      ]
    }
    return(
      <div className="addressContainer card-body">
        <div className="servicesContainer">
          <div class="cardChild">
            <header>
              <div class="subTitleCard">
                Codigo de Estación
              </div>
              </header>
            <div class="cardContent">
              <h6 className="titleInput">Codigo de Estacion</h6>
              <div className="ContainerCodEst">
                <SuggestionCodeEst />
                <button type="button" className="buttonSubmitAddForCodEst" onClick={this.addCodEstUnique} >
                  &#x271A;
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="servicesContainer">
          <div class="cardChild">
            <header>
              <div class="subTitleCard">
                Localizacion
                {/* <button onClick={this.handleAddRadioBase} className="subTitleCard buttonSubmitAddForCodEst"> */}
                {/* &#x271A; */}
                {/* </button> */}
              </div>
              </header>
            <div class="cardContent">
              <div className="ContainerAddButton">
                  <h6 className="titleInput">Nivel de Afeccion</h6>
                  <button onClick={this.handleAddRadioBase} className="buttonSubmitAddForCodEst addButton">
                  &#x271A;
                  </button> 
              </div>
                <div className="interruptionLevelContainer">
                    <input className="radioButton" id="provincia" type="radio" name="interruptionLevel" 
                              value={"PROVINCIA"} 
                              checked={this.props.interruptionLevel === "PROVINCIA"} 
                              onChange={this.onInterruptionLevelChange} />
                    <label className="interruptionLevel" htmlFor="provincia">Provincia</label>
                    <input className="radioButton" id="canton" type="radio" name="interruptionLevel" 
                              value={"CANTON"} 
                              checked={this.props.interruptionLevel === "CANTON"} 
                              onChange={this.onInterruptionLevelChange} />
                    <label className="interruptionLevel" htmlFor="canton">Canton</label>
                    <input className="radioButton" id="parroquia" type="radio" name="interruptionLevel" 
                              value={"PARROQUIA"} 
                              checked={this.props.interruptionLevel === "PARROQUIA"} 
                              onChange={this.onInterruptionLevelChange} />
                    <label className="interruptionLevel" htmlFor="parroquia">Parroquia</label>
                </div>
                  {/* <span>
                    Agregar Radio Bases &emsp;
                  </span>
                  <button onClick={this.handleAddRadioBase} className="buttonSubmitAddForCodEst addButton">
                &#x271A;
                </button> */}
              {provincia}
              {canton}
              {parroquia}
              </div>
            </div>
          </div>
      </div>
    )
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(InterruptionAddress);