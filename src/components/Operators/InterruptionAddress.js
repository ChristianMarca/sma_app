import React from 'react';
import {connect} from 'react-redux';
import {interruptionCodeAction,interruptionBSAction,interruptionProvinceAction,interruptionCantonAction,interruptionParishAction,interruptionSectorAction} from '../../actions';

import './interruption.css'

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
  textContainer = document.querySelector('.textarea-container');
  textareaSize = textContainer.querySelector('.textarea-size');
  input = textContainer.querySelector('textarea');
  autoSize();
  input.addEventListener('input', autoSize);
});

class InterruptionAddress extends React.Component{
  render(){
    const {onChangeInterruptionCode,onChangeBS,onChangeProvince,onChangeCanton,onChangeParish,onChangeSector}=this.props;
    return(
      <form className="addressContainer">
        <h6 className="titleInput">Código</h6>
        <input placeholder="1A23" className="inputField" type="text" onChange={onChangeInterruptionCode} required></input>
        <h6 className="titleInput">Radio Base</h6>
        <input placeholder="Nodo Principal" className="inputField" type="text" onChange={onChangeBS} required></input>
        <h6 className="titleInput">Provincia</h6>
        <input placeholder="Azuay" className="inputField" type="text" onChange={onChangeProvince} required></input>
        <h6 className="titleInput">Cantón</h6>
        <input placeholder="Cantón" className="inputField" type="text" onChange={onChangeCanton}  required></input>
        <h6 className="titleInput">Paroquia</h6>
        <input placeholder="Parroquia" className="inputField" type="text" onChange={onChangeParish}  required></input>
        <h6 className="titleInput">Lugar Afectado</h6>
        {/* <input placeholder="Azuay" className="inputField" id="inputResize" type="text" size="1" onChange={onChangeSector} required></input> */}
        <div className="textarea-container">
          <textarea placeholder="Azuay" id="inputResize" type="text" size="1" onChange={onChangeSector} required></textarea>
          <div className="textarea-size"></div>
        </div>
      </form>
    )
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(InterruptionAddress);