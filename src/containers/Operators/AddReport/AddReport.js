//#########################################################################################
//#########################################################################################
//#########################################################################################
//El componente AddReport realiza la función de: Recibir las parametros del formulario y validar parea el envío al servidor
//            Autor: Christian Marca
//            Fecha de Creación: 25/09/2018
//            Fecha de Ultima Modificación:----------
//            Descripción: Es el contenedor de los componentes de fomulario y permite la valudación de la información antes de ser cargada al servidor para procegir el proceso de el amnejo de la interrupción
//            inputs: Campos de información de la interrupción
//            outputs: Objeto con la información del formulario pasada por primera verificación de datos
//            methods: Reducers de comabio de estado
//            resumen: Toma la entrada del usuario y genera un objeto con datos validos para el envío hacia el servidor.
//#########################################################################################
//#########################################################################################
//#########################################################################################
//AddReport

import React from 'react';
import {
	interruptionTypeAction,
	interruptionSubmitedAction,
	isSignInAction,
	receiveDataUserAction,
	addRadioBaseAction,
	addRadioBaseIDAction,
	interruptionIdBsAction,
	interruptionServicesRemoveAllActions,
	interruptionTechnologyRemoveAllActions,
	removeAllRadioBaseAction
} from '../../../actions';
import { connect } from 'react-redux';
import { Redirect, withRouter } from 'react-router-dom';
import axios from 'axios';
import { API_URL } from '../../../config';
import InterruptionRadioBases from '../../../components/Operators/InterruptionRadioBases';
import InterruptionDate from '../../../components/Operators/InterruptionDate';
import InterruptionCauses from '../../../components/Operators/InterruptionCauses';
import InterruptionFiles from '../../../components/Operators/InterruptionFiles';
// import RadioBase from "../../../components/Operators/radioBase";
import ModalPreview from '../../../components/Operators/Modal_Interruption_Preview';
import PreviewForm from '../../../components/Operators/interruptionPreviewSend';

import '../Operators.css';
import InterruptionSummary from '../../../components/Operators/interruptionSummary';

const mapStateToProps = (state) => {
	return {
		interruptionType: state.interruptionTypeReducer.interruptionType,
		interruptionRB: state.interruptionAddressReducer,
		interruptionDate: state.interruptionDateReducer,
		interruptionCauses: state.interruptionCausesReducer,
		interruptionServices: state.interruptionServicesReducer.interruptionServices,
		interruptionLevel: state.interruptionAddressReducer.interruptionLevel,
		interruptionTechnologies: state.interruptionTechnologiesReducer.interruptionTechnologies,
		interruptionRadioBase: state.radioBasesAddReducer,
		interruptionProvince: state.reducerSuggestProvincia.value,
		interruptionCanton: state.reducerSuggestCanton.value,
		interruptionParish: state.reducerSuggestParish.value,
		sessionController: state.sessionReducer.dataUser
	};
};
const mapDispatchToProps = (dispatch) => {
	return {
		onSubmitInterruptionType: (type) => dispatch(interruptionTypeAction(type)),
		onSubmitInterruptionComplete: () => dispatch(interruptionSubmitedAction()),
		onSignInApproved: () => dispatch(isSignInAction(true)),
		onReceiveDataUser: (data) => dispatch(receiveDataUserAction(data)),
		onReceiveRadioBase: (id, data) => dispatch(addRadioBaseAction(id, data)),
		onReceiveRadioBaseID: (id, data) => dispatch(addRadioBaseIDAction(id, data)),
		onReceiveRadioBaseIdRemove: (data) => dispatch(interruptionIdBsAction(data)),
		onRemoveAllServices: () => dispatch(interruptionServicesRemoveAllActions()),
		onRemoveAllTechnologies: () => dispatch(interruptionTechnologyRemoveAllActions()),
		onRemoveAllRadioBases: () => dispatch(removeAllRadioBaseAction())
	};
};

class AddReport extends React.Component {
	constructor() {
		super();
		this.state = {
			submitForm: false,
			isPreviewModalOpen: false,
			emailAddress: [],
			CZ: ''
		};
	}
	componentDidMount() {
		const token = window.sessionStorage.getItem('token') || window.localStorage.getItem('token');
		if (token) {
			fetch(`${API_URL}/authentication/signin`, {
				method: 'post',
				headers: {
					'Content-Type': 'application/json',
					authorization: token
				}
			})
				.then((resp) => resp.json())
				.then((data) => {
					if (data && data.id_user) {
						fetch(`${API_URL}/authentication/profile/${data.id_user}`, {
							method: 'GET',
							headers: {
								'Content-Type': 'application/json',
								authorization: token
							}
						})
							.then((resp) => resp.json())
							.then((user) => {
								if (user && user.email) {
									this.props.onSignInApproved();
									this.props.onReceiveDataUser(user);
									if (this.props.sessionController.id_rol === 2) {
										document.getElementById('buttonTypeR').style.background =
											this.props.interruptionType === 'Random'
												? 'rgba(255,255,255,0.5)'
												: '#2E2E2E';
										document.getElementById('buttonTypeR').style.color =
											this.props.interruptionType === 'Random'
												? '#2E2E2E'
												: 'rgba(255,255,255,0.5)';
										document.getElementById('buttonTypeS').style.background =
											this.props.interruptionType === 'Random'
												? '#2E2E2E'
												: 'rgba(255,255,255,0.5)';
										document.getElementById('buttonTypeS').style.color =
											this.props.interruptionType === 'Random'
												? 'rgba(255,255,255,0.5)'
												: '#2E2E2E';
									}
								}
							});
					}
				})
				.catch((err) => {
					// this.props.history.push('/');
					console.log({ Error: err });
				});
		} else {
			this.props.history.push('/');
		}
	}
	componentWillReceiveProps(nextProps) {
		if (this.props.sessionController.id_rol === 2) {
			document.getElementById('buttonTypeR').style.background =
				nextProps.interruptionType === 'Random' ? 'rgba(255,255,255,0.5)' : '#2E2E2E';
			document.getElementById('buttonTypeR').style.color =
				nextProps.interruptionType === 'Random' ? '#2E2E2E' : 'rgba(255,255,255,0.5)';
			document.getElementById('buttonTypeS').style.background =
				nextProps.interruptionType === 'Random' ? '#2E2E2E' : 'rgba(255,255,255,0.5)';
			document.getElementById('buttonTypeS').style.color =
				nextProps.interruptionType === 'Random' ? 'rgba(255,255,255,0.5)' : '#2E2E2E';
		}
	}
	handleSubmit = async (event) => {
		event.preventDefault();
		try {
			document.getElementById('lds-ellipsis').style.visibility = 'visible';
			document.getElementById('SendInterruption').disabled = true;
		} catch (e) {}
		const token = window.sessionStorage.getItem('token') || window.localStorage.getItem('token');
		const {
			interruptionType,
			interruptionDate,
			interruptionCauses,
			interruptionRadioBase,
			interruptionServices,
			interruptionTechnologies,
			interruptionProvince,
			interruptionCanton,
			interruptionParish,
			interruptionRB
		} = this.props;
		var probe =
			interruptionType === 'Scheduled'
				? interruptionDate.interruptionTime.split(':').map((item) => (item < 0 ? false : true))
				: [];
		if (probe.indexOf(false) !== -1) return alert('Fechas Invalidas');
		if (interruptionRB.interruptionLevel.length === 0) return alert('Seleccione al menos una tecnologia afectada');
		var keys = {
			interruptionType,
			interruptionDate,
			interruptionCauses,
			interruptionServices,
			interruptionTechnologies,
			interruptionRadioBase,
			interruptionProvince,
			interruptionCanton,
			interruptionParish,
			interruptionIdUser: this.props.sessionController.id_user,
			interruptionRB,
			interruptionEmailAddress: this.state.emailAddress,
			coordinacion_zonal: this.state.CZ
		};
		// axios.post(`${API_URL}/radioBases/newInterruption`,keys)
		axios({
			method: 'POST',
			url: `${API_URL}/interrupcion/newInterruption`,
			data: keys,
			headers: {
				'Content-Type': 'application/json',
				authorization: token
			}
		})
			.then((resp) => {
				console.log('respuesta iterrupcion', resp);
				this.props.onSubmitInterruptionComplete();
				this.props.onRemoveAllServices();
				this.props.onRemoveAllRadioBases();
				this.props.onRemoveAllTechnologies();
				this.setState((prevState) => ({ submitForm: !prevState.submitForm }));
			})
			.catch((err) => {
				alert(err);
				document.getElementById('SendInterruption').disabled = false;
			});
	};
	handleSubmitTest = async (event) => {
		event.preventDefault();
		const token = window.sessionStorage.getItem('token') || window.localStorage.getItem('token');
		const {
			interruptionType,
			interruptionDate,
			interruptionCauses,
			interruptionRadioBase,
			interruptionServices,
			interruptionTechnologies,
			interruptionSector
		} = this.props;
		var probe =
			interruptionType === 'Scheduled'
				? interruptionDate.interruptionTime.split(':').map((item) => (item < 0 ? false : true))
				: [];
		if (probe.indexOf(false) !== -1) return alert('Fechas Invalida');
		var keys = {
			interruptionType,
			interruptionSector,
			interruptionDate,
			interruptionCauses,
			interruptionServices,
			interruptionTechnologies,
			interruptionRadioBase,
			interruptionIdUser: this.props.sessionController.id_user,
			emailAddress: this.state.emailAddress
		};
		// axios.post(`${API_URL}/radioBases/newInterruption`,keys)
		axios({
			method: 'POST',
			url: `${API_URL}/radioBases/newInterruption`,
			data: keys,
			headers: {
				'Content-Type': 'application/json',
				authorization: token
			}
		})
			.then((resp) => {
				this.props.onSubmitInterruptionComplete();
				this.props.onRemoveAllServices();
				this.props.onRemoveAllRadioBases();
				this.setState((prevState) => ({ submitForm: !prevState.submitForm }));
			})
			.catch((err) => alert(err));
	};
	handleSubmitTest1 = (event) => {
		event.preventDefault();
		this.toogleModalPreview();
	};
	cancel = () => {
		this.setState((prevState) => ({ submitForm: !prevState.submitForm }));
	};
	// handleAddRadioBase=()=>{
	//   const token = window.sessionStorage.getItem('token')||window.localStorage.getItem('token');
	//   if(this.props.interruptionTechnologies.length){
	//     const { interruptionProvince,interruptionCanton,interruptionParish}=this.props;
	//     const id_usuario=this.props.sessionController.id_user;
	//     const nivel_interrupcion=this.props.interruptionLevel;
	//     const location={provincia:interruptionProvince,canton:interruptionCanton,parroquia: interruptionParish};
	//     // axios.post(`${API_URL}/radioBases/getRadioBasesForLocation?id_user=${id_usuario}`,{
	//     //   nivel_interrupcion:nivel_interrupcion,
	//     //   location:location,
	//     //   tecnologias_afectadas:this.props.interruptionTechnologies
	//     // })
	//     axios({
	//       method: 'POST',
	//       url:`${API_URL}/radioBases/getRadioBasesForLocation?id_user=${id_usuario}`,
	//       data:{
	//           nivel_interrupcion:nivel_interrupcion,
	//           location:location,
	//           tecnologias_afectadas:this.props.interruptionTechnologies
	//         },
	//       headers: {
	//         'Content-Type': 'application/json',
	//         'authorization': token
	//     }
	//     })
	//     .then(data=>{
	//       data.data.codigo_estacion.map((estacion=>{
	//         return this.props.onReceiveRadioBase(estacion.cod_est,estacion)
	//       }));
	//     })
	//     .catch(error=>{console.log({Error:error})})
	//   }else{
	//     alert('Seleccion una RB')
	//   }
	// }
	toogleModalPreview = () => {
		this.setState((prevState) => ({
			...prevState,
			isPreviewModalOpen: !prevState.isPreviewModalOpen
		}));
	};

	getEmailsToSendReport = (emails) => {
		this.setState({ emailAddress: emails });
	};
	getCZToSend = (Cz) => {
		this.setState({ CZ: Cz });
	};

	getContentFromPage = () => {
		const { onSubmitInterruptionType } = this.props;
		// const dataRb=this.props.interruptionRadioBase.radioBasesAdd;
		if (this.props.sessionController.id_rol === 2) {
			return (
				// <form className="containerNewInterruption" onSubmit={this.handleSubmit}>
				<form className="containerNewInterruption" onSubmit={this.handleSubmit}>
					<div className="bodyContainer">
						<div className="itemContainer">
							<div className="card-header newHeader">
								<h4>Agregar Nueva Interrupción</h4>
								<div className="typeButtons">
									<button
										type="button"
										id="buttonTypeS"
										className="buttonTypeRight"
										onClick={() => onSubmitInterruptionType('Scheduled')}
									>
										<i className="far fa-calendar-alt" /> Programada
									</button>
									<button
										type="button"
										id="buttonTypeR"
										className="buttonTypeLeft"
										onClick={() => onSubmitInterruptionType('Random')}
									>
										<i className="fas fa-random" /> Fortuita
									</button>
								</div>
							</div>
						</div>
						<div className="card-body cardComponents">
							<div className="card cardInput">
								<h6 className="card-header containerADD">
									<div>Radio Base</div>
									{/* <button className="ButtonTag"><i onClick={this.handleAddRadioBase} className="addButton fas fa-plus-square"></i></button> */}
								</h6>
								<InterruptionRadioBases className="itemContainer card-body" />
							</div>
							<div className="card cardInput">
								<h6 className="card-header">
									<div>Resumen</div>
									{/* <button className=""> */}
									<div className="buttonRemoveAllRadioBases">
										<button className="custom-underline" onClick={this.props.onRemoveAllRadioBases}>
											Eliminar todo
										</button>
									</div>
									{/* </button> */}
								</h6>
								<div className="card-body resumenBodyContaniner">
									<InterruptionSummary />
									{/* {Object.keys(dataRb).map(function(key, index) {
                    return <RadioBase key={key} data={dataRb[key]}/>
                  })} */}
								</div>
							</div>
							<div className="card cardInput">
								<h6 className="card-header">Descripción</h6>
								<InterruptionCauses className="itemContainer" />
							</div>
							<div className="card cardInput">
								<h6 className="card-header">Fecha</h6>
								<InterruptionDate className="itemContainer" />
								<InterruptionFiles />
							</div>
						</div>
						<div className="submitsButtons">
							<button
								type="button"
								id="buttonTypeS"
								className="buttonSubmits"
								onClick={this.toogleModalPreview}
							>
								<i className="fas fa-save" /> Save
							</button>
							<button type="button" id="buttonTypeS" className="buttonSubmits" onClick={this.cancel}>
								<i className="fas fa-ban" /> Cancel
							</button>
							{this.state.submitForm && <Redirect to="/" push={true} />}
							{this.state.isPreviewModalOpen && (
								<ModalPreview>
									{/* <Profile isProfileOpen={this.state.isProfileOpen} toogleModal={this.toogleModal}/> */}
									<div className="preview-modal">
										<div className="containerInfoPreview">
											<PreviewForm
												emailsSelected={this.getEmailsToSendReport}
												_CZ={this.getCZToSend}
											/>
											<div className="submitButtonsPreview">
												<button
													type="submit"
													id="SendInterruption"
													className="buttonSubmitPreview"
													onClick={this.handleSubmit}
												>
													<i className="fas fa-save" /> Save
												</button>
												<button
													type="submit"
													id="buttonTypeS"
													className="buttonCancelPreview"
													onClick={this.toogleModalPreview}
												>
													<i className="fas fa-edit" /> Modificar
												</button>
											</div>
										</div>
									</div>
									<div className="lds-ellipsis" id="lds-ellipsis">
										<div />
										<div />
										<div />
										<div />
									</div>
								</ModalPreview>
							)}
						</div>
					</div>
				</form>
			);
		} else {
			return (
				// <Redirect to="/" push={true} />
				<div>Wait or Redirect</div>
			);
		}
	};

	render() {
		return this.getContentFromPage();
	}
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AddReport));
