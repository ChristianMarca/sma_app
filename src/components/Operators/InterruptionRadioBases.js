import React from 'react';
import {connect} from 'react-redux';
import axios from 'axios';

import {
  // interruptionCodeAction,
  interruptionBSAction,
  interruptionCodeEstAction,
  interruptionProvinceAction,
  interruptionCantonAction,
  interruptionParishAction,
  interruptionLevelSelectedAction,
  addRadioBaseAction
  // interruptionSectorAction,
} from '../../actions';
// import SuggestField from './SuggestFields';
// import SuggestionID from './SuggestionID';
import './interruption.css'
// import SuggestionEST from './SuggestionEST';
import SuggestionCodeEst from './suggestions/suggestionCodEst';
import SuggestionProvince from './suggestions/suggestionProvincia';
import SuggestionCanton from './suggestions/suggestionCanton';
import SuggestionParish from './suggestions/suggestionParroquia';
import { API_URL } from "../../config";

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
    interruptionCodEstNew: state.reducerSuggestCodeEst.value
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
    console.log(event.target.value.length)
    // event.target.value.length>=3 && axios.get(`http://localhost:3000/radioBases?id=${event.target.value}`)
    event.target.value.length>=3 && axios.get(`${API_URL}/radioBases?id=${event.target.value}`)
      .then(resp=>{console.log(resp.data)})
      .catch(console.log)
  }
  toggleRadioButtonLevel = label => {
    // console.log(label.currentTarget.value,'hello---')
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
  render(){
    const {onChangeProvince,onChangeCanton,onChangeParish}=this.props;
    const {interruptionProvince, interruptionCanton,interruptionParish} = this.props;
    // const parroquia=<h6 className="titleInput">Paroquia</h6>
    // {/* <input placeholder="Parroquia" className="inputField" type="text" value={interruptionParish} onChange={onChangeParish}  required></input> */}
    // <SuggestionParish />
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
        {/* <SuggestField /> */}
        <h6 className="titleInput">Codigo de Estacion</h6>
        {/* <SuggestionID  /> */}
        <div className="ContainerCodEst">
          <SuggestionCodeEst />
          <button type="button" className="buttonSubmitAddForCodEst" onClick={this.addCodEstUnique} >
            {/* <i className="fas fa-plus-square"></i> */}
            &#x271A;
          </button>
        </div>
        {/* <input placeholder="1A23" className="inputField" type="text" onChange={onChangeInterruptionCode} required></input>
        <input placeholder="Test" className="inputField" type="text" onChange={this.onChangeTest} required></input> */}
        {/* <h6 className="titleInput">Radio Base</h6> */}
        {/* <SuggestionEST /> */}
        {/* <input placeholder="Nodo Principal" className="inputField" type="text" onChange={onChangeBS} required></input> */}
        <div className="servicesContainer">
            <h6 className="titleInput">Nivel de Afeccion</h6> 
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
        </div>
        {/* <h6 className="titleInput">Provincia</h6> */}
        {/* <input placeholder="Azuay" className="inputField" type="text" value={interruptionProvince} onChange={onChangeProvince} required></input> */}
        {/* <SuggestionProvince /> */}
        {/* <h6 className="titleInput">Cantón</h6> */}
        {/* <input placeholder="Cantón" className="inputField" type="text" value={interruptionCanton} onChange={onChangeCanton}  required></input> */}
        {/* <SuggestionCanton /> */}
        {provincia}
        {canton}
        {parroquia}
        {/* <h6 className="titleInput">Lugar Afectado</h6> */}
        {/* <input placeholder="Azuay" className="inputField" id="inputResize" type="text" size="1" onChange={onChangeSector} required></input> */}
        {/* <div className="textarea-container">
          <textarea placeholder="Azuay" id="inputResize" type="text" size="1" onChange={onChangeSector} required></textarea>
          <div className="textarea-size"></div>
        </div> */}
      </div>
    )
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(InterruptionAddress);