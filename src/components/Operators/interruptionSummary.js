import React from 'react';
import { connect } from 'react-redux';
import RadioBase from './radioBase';
// import {  } from "../../actions";
import './interruption.css';

const mapStateToProps = (state) => {
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

		sessionController: state.sessionReducer.dataUser,

		interruptionRadioBase: state.radioBasesAddReducer
	};
};
const mapDispatchToProps = (dispatch) => {
	return {
		// onChangeInterruptionCode: (event)=> dispatch(interruptionCodeEstAction(event.target.value)),
		// onChangeBS: (event)=> dispatch(interruptionBSAction(event.target.value)),
		// onChangeCodeEst: (event)=>dispatch(interruptionCodeEstAction(event.target.value)),
		// onChangeProvince: (event)=> dispatch(interruptionProvinceAction(event.target.value)),
		// onChangeCanton: (event)=> dispatch(interruptionCantonAction(event.target.value)),
		// onChangeParish: (event)=> dispatch(interruptionParishAction(event.target.value)),
		// onChangeInterruptionLevel: (level)=>dispatch(interruptionLevelSelectedAction(level)),
		// onReceiveRadioBase: (id,data)=>dispatch(addRadioBaseAction(id,data)),
	};
};

class InterruptionSummary extends React.Component {
	render() {
		const dataRb = this.props.interruptionRadioBase.radioBasesAdd;
		return (
			<div className="containerInterruptionSummary">
				{Object.keys(dataRb).map(function(key, index) {
					return <RadioBase key={key} data={dataRb[key]} />;
				})}
			</div>
		);
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(InterruptionSummary);
