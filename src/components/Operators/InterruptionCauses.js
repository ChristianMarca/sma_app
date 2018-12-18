import React from 'react';
import {connect} from 'react-redux';
import {interruptionCausesAction,
  interruptionTagsAction,
  interruptionSectorAction,
  interruptionServicesAddAction,
  interruptionServicesRemoveAction,
  interruptionTechnologyAddAction,
  interruptionTechnologyRemoveAction
} from '../../actions';

import { similarity } from "../../services/dataValidation";

import './interruption.css'

const mapStateToProps=state=>{
	return {
    //Código de Interrupción
    interruptionCauses: state.interruptionCausesReducer,
    interruptionSector: state.interruptionAddressReducer.interruptionSector,
    interruptionServices: state.interruptionServicesReducer.interruptionServices
	}
}
const mapDispatchToProps=(dispatch)=>{
	return{
    //Causas de la interrupcion
    onChangeInterruptionCauses: (event)=> dispatch(interruptionCausesAction(event)),
    //Tags de causas
    onChangeInterruptionTags: (event)=> dispatch(interruptionTagsAction(event)),
    //Sector
    onChangeSector: (event)=> dispatch(interruptionSectorAction(event.target.value)),

    onAddService: (service)=>dispatch(interruptionServicesAddAction(service)),
    onRemoveService: (service)=>dispatch(interruptionServicesRemoveAction(service)),
    onAddTechnology: (technology)=>dispatch(interruptionTechnologyAddAction(technology)),
    onRemoveTechonology: (technology)=>dispatch(interruptionTechnologyRemoveAction(technology))
	}
}

var textContainer, textareaSize, input;
var autoSize=()=> {
  textareaSize.innerHTML = input.value + '\n';
};

document.addEventListener('DOMContentLoaded', function() {
  try{
    textContainer = document.querySelector('.textarea-containerCauses');
    textareaSize = textContainer.querySelector('.textarea-size');
    input = textContainer.querySelector('textarea');
    autoSize();
    input.addEventListener('input', autoSize);
  }catch(e){}
});

class InterruptionCauses extends React.Component{
  constructor(){
    super();
    this.selectedCheckboxesServices = new Set();
    this.selectedCheckboxesTechnologies = new Set();
  }
  getMatches=(string, regex, index)=> {
    index || (index = 1); // default to the first capturing group
    var matches = [];
    var match;
    while ((match = regex.exec(string))!==null) {
      matches.push(match[index]);
    }
    return matches;
  }
  regexA=(texto)=>{
    const {onChangeInterruptionCauses,onChangeInterruptionTags}=this.props;
    //const regex = /-b([^-<\\]*(?:\\.[^-<\\]*)*)-/g,reemp = "<b class='tags'>$1</b>",resultado = document.getElementById("resultado");
    const regex = /@([^@<\\]*(?:\\.[^-<\\]*)*)@/g,reemp = "<b class='tags'>$1</b>",resultado = document.getElementById("resultado");
    var matches = this.getMatches(texto.target.value, regex, 1);
    matches.map(match=>{
      return console.log(match,similarity('Fallo en el Sistema Electrico',match||''))
    })    

    onChangeInterruptionCauses(texto.target.value.replace(regex,'$1'));
    onChangeInterruptionTags(matches);
    resultado.innerHTML = texto.target.value.replace(regex,reemp);
  }
  toggleCheckboxServices = label => {
    if (this.selectedCheckboxesServices.has(label.currentTarget.value)) {
      this.selectedCheckboxesServices.delete(label.currentTarget.value);
      this.props.onRemoveService(label.currentTarget.value)
    } else {
      this.selectedCheckboxesServices.add(label.currentTarget.value);
      this.props.onAddService(label.currentTarget.value)
    }
  }
  toggleCheckboxTechnologies = label => {
    if (this.selectedCheckboxesTechnologies.has(label.currentTarget.value)) {
      this.selectedCheckboxesTechnologies.delete(label.currentTarget.value);
      this.props.onRemoveTechonology(label.currentTarget.value)
    } else {
      this.selectedCheckboxesTechnologies.add(label.currentTarget.value);
      this.props.onAddTechnology(label.currentTarget.value)
    }
  }
  render(){
    const {onChangeSector}=this.props;
    return(
      <div className="addressContainer card-body">
        <div className="servicesContainer">
            <h6 className="titleInput">Servicios Afectados</h6> 
            <div className="service">
                <input className="radioButton" id="voz" type="checkbox" name="services" 
                          value={"VOZ"}
                          onChange={this.toggleCheckboxServices} />
                <label className="services" htmlFor="voz">VOZ</label>
                <input className="radioButton" id="sms" type="checkbox" name="services" 
                          value={"SMS"}
                          onChange={this.toggleCheckboxServices} />
                <label className="services" htmlFor="sms">SMS</label>
                <input className="radioButton" id="datos" type="checkbox" name="services" 
                          value={"DATOS"}
                          onChange={this.toggleCheckboxServices} />
                <label className="services" htmlFor="datos">DATOS</label>
            </div>
        </div>

        <div className="servicesContainer">
            <h6 className="titleInput">Tecnologias Afectadas</h6> 
            <div className="service">
                <input className="radioButton" id="gsm" type="checkbox" name="tecnologias" 
                          value={"GSM"}
                          onChange={this.toggleCheckboxTechnologies} />
                <label className="services" htmlFor="gsm">GSM</label>
                <input className="radioButton" id="umts" type="checkbox" name="tecnologias" 
                          value={"UMTS"}
                          onChange={this.toggleCheckboxTechnologies} />
                <label className="services" htmlFor="umts">UMTS</label>
                <input className="radioButton" id="lte" type="checkbox" name="tecnologias" 
                          value={"LTE"}
                          onChange={this.toggleCheckboxTechnologies} />
                <label className="services" htmlFor="lte">LTE</label>
            </div>
        </div>

        <h6 className="titleInput">Lugar Afectado</h6>
        <div className="textarea-container">
          <textarea placeholder="Azuay" id="inputResize" type="text" size="1" onChange={onChangeSector} required></textarea>
          <div className="textarea-size"></div>
        </div>

        <h6 className="titleInput">Causas</h6>
        <div className="searchContainer">
          <div className="textarea-containerCauses">
            <textarea placeholder="Azuay" id="inputCauses"
               type="text" size="1" onChange={this.regexA}  required></textarea>
            <div className="textarea-size"></div>
          </div>
          <p className="textField" id="resultado"></p>
        </div>
      </div>
    )
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(InterruptionCauses);