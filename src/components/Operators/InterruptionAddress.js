import React from 'react';
import {connect} from 'react-redux';
import axios from 'axios';

import {interruptionCodeAction,
  interruptionBSAction,
  interruptionProvinceAction,
  interruptionCantonAction,
  interruptionParishAction,
} from '../../actions';
import SuggestionID from './suggestions/SuggestionID';
import './interruption.css'
import SuggestionEST from './suggestions/SuggestionEST';
import { API_URL } from "../../config";

const mapStateToProps=state=>{
	return {
    //Código de Interrupción
    interruptionCode: state.interruptionAddressReducer.interruptionCode,
    //Código de Estación Base
    interruptionBS: state.interruptionAddressReducer.interruptionBS,
    //Provincia
    interruptionProvince: state.interruptionAddressReducer.interruptionProvince,
    //Cantón
    interruptionCanton: state.interruptionAddressReducer.interruptionCanton,
    //Parish
    interruptionParish: state.interruptionAddressReducer.interruptionParish
	}
}
const mapDispatchToProps=(dispatch)=>{
	return{
    //Código de Interrupción
    onChangeInterruptionCode: (event)=> dispatch(interruptionCodeAction(event.target.value)),
    //Código de Estación Base
    onChangeBS: (event)=> dispatch(interruptionBSAction(event.target.value)),
    //Provincia
    onChangeProvince: (event)=> dispatch(interruptionProvinceAction(event.target.value)),
    //Cantón
    onChangeCanton: (event)=> dispatch(interruptionCantonAction(event.target.value)),
    //Parish
    onChangeParish: (event)=> dispatch(interruptionParishAction(event.target.value)),
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
  onChangeTest=(event)=>{
    event.target.value.length>=3 && axios.get(`${API_URL}/radioBases?id=${event.target.value}`)
      // .then(resp=>{console.log(resp.data)})
      .catch(error=>console.log({Error:error}))
  }
  render(){
    const {onChangeProvince,onChangeCanton,onChangeParish}=this.props;
    const {interruptionProvince, interruptionCanton,interruptionParish} = this.props;
    return(
      <div className="addressContainer card-body">
        <h6 className="titleInput">Código</h6>
        <SuggestionID  />
        <h6 className="titleInput">Radio Base</h6>
        <SuggestionEST />
        <h6 className="titleInput">Provincia</h6>
        <input placeholder="Azuay" className="inputField" type="text" value={interruptionProvince} onChange={onChangeProvince} required></input>
        <h6 className="titleInput">Cantón</h6>
        <input placeholder="Cantón" className="inputField" type="text" value={interruptionCanton} onChange={onChangeCanton}  required></input>
        <h6 className="titleInput">Paroquia</h6>
        <input placeholder="Parroquia" className="inputField" type="text" value={interruptionParish} onChange={onChangeParish}  required></input>
      </div>
    )
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(InterruptionAddress);