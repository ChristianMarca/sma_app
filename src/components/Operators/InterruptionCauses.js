import React from 'react';
import {connect} from 'react-redux';
import {interruptionCausesAction,interruptionTagsAction} from '../../actions';

import './interruption.css'

const mapStateToProps=state=>{
	return {
    //Código de Interrupción
    interruptionCauses: state.interruptionAddressCauses,
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
  render(){
    return(
      <div className="addressContainer">
        <h6 className="titleInput">Causas</h6>
        <div className="card searchContainer">
          <div className="textarea-containerCauses">
            <textarea placeholder="Azuay" id="inputCauses" className="card-header" type="text" size="1" onChange={this.regexA}  required></textarea>
            <div className="textarea-size"></div>
          </div>
          <p className="textField card-body" id="resultado"></p>
        </div>
      </div>
    )
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(InterruptionCauses);