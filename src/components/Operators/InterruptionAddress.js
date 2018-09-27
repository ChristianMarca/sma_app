import React from 'react';
import {connect} from 'react-redux';
import axios from 'axios';

import {interruptionCodeAction,
  interruptionBSAction,
  interruptionProvinceAction,
  interruptionCantonAction,
  interruptionParishAction,
  interruptionSectorAction,
} from '../../actions';
// import SuggestField from './SuggestFields';
import SuggestionID from './SuggestionID';
import './interruption.css'
import SuggestionEST from './SuggestionEST';

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
    interruptionParish: state.interruptionAddressReducer.interruptionParish,

    interruptionSector: state.interruptionAddressReducer.interruptionSector,
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
    //Sector
    onChangeSector: (event)=> dispatch(interruptionSectorAction(event.target.value)),
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
    console.log(event.target.value.length)
    event.target.value.length>=3 && axios.get(`http://192.168.1.102:3000/radioBases?id=${event.target.value}`)
      .then(resp=>{console.log(resp.data)})
      .catch(console.log)
  }
  render(){
    const {onChangeProvince,onChangeCanton,onChangeParish,onChangeSector}=this.props;
    const {interruptionProvince, interruptionCanton,interruptionParish} = this.props;
    return(
      <div className="addressContainer">
        {/* <SuggestField /> */}
        <h6 className="titleInput">Código</h6>
        <SuggestionID  />
        {/* <input placeholder="1A23" className="inputField" type="text" onChange={onChangeInterruptionCode} required></input>
        <input placeholder="Test" className="inputField" type="text" onChange={this.onChangeTest} required></input> */}
        <h6 className="titleInput">Radio Base</h6>
        <SuggestionEST />
        {/* <input placeholder="Nodo Principal" className="inputField" type="text" onChange={onChangeBS} required></input> */}
        <h6 className="titleInput">Provincia</h6>
        <input placeholder="Azuay" className="inputField" type="text" value={interruptionProvince} onChange={onChangeProvince} required></input>
        <h6 className="titleInput">Cantón</h6>
        <input placeholder="Cantón" className="inputField" type="text" value={interruptionCanton} onChange={onChangeCanton}  required></input>
        <h6 className="titleInput">Paroquia</h6>
        <input placeholder="Parroquia" className="inputField" type="text" value={interruptionParish} onChange={onChangeParish}  required></input>
        <h6 className="titleInput">Lugar Afectado</h6>
        {/* <input placeholder="Azuay" className="inputField" id="inputResize" type="text" size="1" onChange={onChangeSector} required></input> */}
        <div className="textarea-container">
          <textarea placeholder="Azuay" id="inputResize" type="text" size="1" onChange={onChangeSector} required></textarea>
          <div className="textarea-size"></div>
        </div>
      </div>
    )
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(InterruptionAddress);