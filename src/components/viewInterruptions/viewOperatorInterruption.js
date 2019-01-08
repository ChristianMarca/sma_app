import React from 'react';

import { connect } from 'react-redux';
import io from 'socket.io-client';
import { withRouter } from 'react-router-dom';
// import  moment from 'moment';
import moment from 'moment-timezone';
import { requestInterruptionFetchAction, isSignInAction, receiveDataUserAction } from '../../actions';

import { API_URL } from '../../config';

const mapStateToProps = (state) => {
	return {
		interruptionData: state.requestInterruptionDataReducer,
		interruptionViewSelected: state.interruptionViewReducer.interruptionView,
		sessionController: state.sessionReducer.dataUser
	};
};
const mapDispatchToProps = (dispatch) => {
	return {
		onRequestDataInterruption: (id_interruption, id_user) =>
			dispatch(requestInterruptionFetchAction(id_interruption, id_user)),
		onSignInApproved: () => dispatch(isSignInAction(true)),
		onReceiveDataUser: (data) => dispatch(receiveDataUserAction(data))
	};
};
class InterruptionOperatorView extends React.Component {
	constructor() {
		super();
		this.state = {
			isReceiveDataOfInterruption: false,
			time: '',
			showExternalHTML: false
		};
	}

	socketConnectionEnable = () => {
		this.socket = io.connect(`${API_URL}`, { path: '/socket' });

		this.socket.on('connect', function() {
			console.log('Conectado al Servidor');
		});
		this.socket.on('disconnect', function() {
			console.log('Perdimos la conexion al server');
		});
		this.socket.on('message', (data) => {
			console.log('llego :', data);
		});
		this.socket.emit('echo', 'Es el Socket');
		this.socket.emit('temir', 'testk');
		this.socket.emit('interruptionSelected', { interruption: this.props.interruptionViewSelected });
		this.socket.on('timer', (time) => {
			var time_ = time.countdown.split(':').map((item, index) => {
				switch (index) {
					case 0:
						return `${item} h `;
					case 1:
						return `${item} min `;
					default:
						return `${item} seg`;
				}
			});
			this.setState({ time: time_ });
		});

		// this.socket.on('update',data=>{console.log('si leyo ',data)})
		this.socket.on('FromAPI', (data) => this.setState({ response: data }));
	};

	componentDidMount = async () => {
		const token = window.sessionStorage.getItem('token') || window.localStorage.getItem('token');
		if (token) {
			if (this.props.interruptionViewSelected) {
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
										this.props.onRequestDataInterruption(
											this.props.interruptionViewSelected,
											user.id_user
										);
										this.setState({ isReceiveDataOfInterruption: true });
										this.socketConnectionEnable();
									} else {
										this.props.history.push('/listas');
									}
								});
						}
					})
					.catch((err) => {
						// this.props.history.push('/');
						console.log({ Error: err });
					});
			} else {
				this.props.history.push('/listas');
			}
		} else {
			this.props.history.push('/');
		}
	};

	componentWillUnmount = () => {
		this.socket.disconnect();
	};

	getInfoInterruption = () => {
		const { data } = this.props.interruptionData.ID;
		if (this.props.interruptionData.ID.data.data) {
			return (
				<div className="cardInfoInterruption cardInfoDetails">
					<div className="titleInterruption titleInfo">Informacion de la Interrupcion</div>
					<div className="containerInfoInterruption">
						<div className="titleInfo">Tiempo:</div>
						<div className="body-info">{this.state.time}</div>
					</div>
					<div className="containerInfoInterruption">
						<div className="titleInfo">Tipo:</div>
						<div className="body-info">{data.data.tipo}</div>
					</div>
					<div className="containerInfoInterruption">
						<div className="titleInfo">Fecha Inicio:</div>
						<div className="body-info">
							{moment(data.data.fecha_inicio).tz('America/Guayaquil').format('MM-DD-YYYY / HH:mm:ss')}
						</div>
					</div>
					{data.data.id_tipo === 1 && (
						<div className="containerInfoInterruption">
							<div className="titleInfo">Fecha Finalizacion:</div>
							<div className="body-info">
								{moment(data.data.fecha_fin).tz('America/Guayaquil').format('MM-DD-YYYY / HH:mm:ss')}
							</div>
						</div>
					)}
					{data.data.id_tipo === 1 && (
						<div className="containerInfoInterruption">
							<div className="titleInfo">Duracion:</div>
							<div className="body-info">
								{data.data.duracion.split(':').map((item, index) => {
									switch (index) {
										case 0:
											return `${item} h `;
										case 1:
											return `${item} min `;
										default:
											return `${item} seg`;
									}
								})}
							</div>
						</div>
					)}
					<div className="containerInfoInterruption">
						<div className="titleInfo">Area:</div>
						<div className="body-info">{data.data.area}</div>
					</div>
					<div className="containerInfoInterruption">
						<div className="titleInfo">Causa:</div>
						<div className="body-info">{data.data.causa}</div>
					</div>
					<div className="containerInfoInterruption">
						<div className="titleInfo">Tecnologias Afectadas:</div>
						<div className="body-info">
							{data.technologies.map((technology, index) => {
								return (
									<div className="mapItems" key={index}>
										{technology.tecnologia}
									</div>
								);
							})}
						</div>
					</div>
					<div className="containerInfoInterruption">
						<div className="titleInfo">Servicios Afectados:</div>
						<div className="body-info">
							{data.services.map((service, index) => {
								return (
									<div className="mapItems" key={index}>
										{service.servicio}
									</div>
								);
							})}
						</div>
					</div>
					<div className="containerInfoInterruption">
						<div className="titleInfo">Estado:</div>
						<div className="body-info">{data.data.estado_int}</div>
					</div>
				</div>
			);
		} else {
			return <div className="cardInfoInterruption cardInfoDetails">Not Found</div>;
		}
	};

	render() {
		return this.getInfoInterruption();
	}
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(InterruptionOperatorView));
