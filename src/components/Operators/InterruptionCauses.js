import React from 'react';
import {connect} from 'react-redux';
import {interruptionCausesAction,
  interruptionTagsAction,
  interruptionSectorAction,
  interruptionServicesAddAction,
  interruptionServicesRemoveAction
} from '../../actions';

import './interruption.css'

const mapStateToProps=state=>{
	return {
    //Código de Interrupción
    interruptionCauses: state.interruptionCausesReducer,
    interruptionSector: state.interruptionAddressReducer.interruptionSector,
    interruptionServices: state.interruptionServicesReducer.interruptionServices
    // //Código de Estación Base
    // interruptionTags: state.interruptionAddressCauses.interruptionBS,

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
    onRemoveService: (service)=>dispatch(interruptionServicesRemoveAction(service))
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
    this.selectedCheckboxes = new Set();
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
    onChangeInterruptionCauses(texto.target.value.replace(regex,'$1'));
    onChangeInterruptionTags(matches);
    resultado.innerHTML = texto.target.value.replace(regex,reemp);
  }
  toggleCheckbox = label => {
    // console.log(label.currentTarget.value,'hello---')
    if (this.selectedCheckboxes.has(label.currentTarget.value)) {
      this.selectedCheckboxes.delete(label.currentTarget.value);
      this.props.onRemoveService(label.currentTarget.value)
    } else {
      this.selectedCheckboxes.add(label.currentTarget.value);
      this.props.onAddService(label.currentTarget.value)
    }
  }
  render(){
    const {onChangeSector}=this.props;
    console.log('info',this.props.interruptionServices)
    return(
      <div className="addressContainer card-body">
        <div className="servicesContainer">
            <h6 className="titleInput">Servicios</h6> 
            <div className="service">
                <input className="radioButton" id="conecel" type="checkbox" name="operador" 
                          value={"VOZ"} 
                          // checked={this.state.operator === "CONECEL"} 
                          onChange={this.toggleCheckbox} />
                <label className="services" htmlFor="conecel">VOZ</label>
                <input className="radioButton" id="otecel" type="checkbox" name="operador" 
                          value={"SMS"} 
                          // checked={this.state.operator === "OTECEL"} 
                          onChange={this.toggleCheckbox} />
                <label className="services" htmlFor="otecel">SMS</label>
                <input className="radioButton" id="cnt" type="checkbox" name="operador" 
                          value={"DATOS"} 
                          // checked={this.state.operator === "CNT"} 
                          onChange={this.toggleCheckbox} />
                <label className="services" htmlFor="cnt">DATOS</label>
            </div>
        </div>

        <h6 className="titleInput">Lugar Afectado</h6>
        <div className="textarea-container">
          <textarea placeholder="Azuay" id="inputResize" type="text" size="1" onChange={onChangeSector} required></textarea>
          <div className="textarea-size"></div>
        </div>

        <h6 className="titleInput">Causas</h6>
        {/* <div className="card searchContainer"> */}
        <div className="searchContainer">
          <div className="textarea-containerCauses">
            <textarea placeholder="Azuay" id="inputCauses"
              //  className="card-header" 
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