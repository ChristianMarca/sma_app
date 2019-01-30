import React from 'react';
import { connect } from 'react-redux';
// import io from 'socket.io-client';
import { Redirect, withRouter } from 'react-router-dom';
import { interruptionViewIdAction } from '../../actions';
import { API_URL } from '../../config';
// import moment from 'moment'
// var moment = require('moment-timezone');
import moment from 'moment-timezone';
import 'moment-duration-format';
import './table.css';

const mapStateToProps = (state, ownProps) => {
	// console.log('sa../////', ownProps);
	return {
		// Inicio de Interrupción
		// _stateOfInterruption: ownProps.stateOfInterruption
	};
};

const mapDispatchToProps = (dispatch, props) => {
	return {
		onSubmitInterruptionView: (event) => dispatch(interruptionViewIdAction(event)),
		_stateOfInterruption: () => props.stateOfInterruption
	};
};

class ListaInt extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			openInterruption: false,
			data: {},
			_className: '',
			_classNameButton: '',
			infoTime: {}
		};
		this.handleClick = this.handleClick.bind(this);
	}
	handleClick(e) {
		this.props.handleClick(e.target.getAttribute('data-key'));
	}
	handleClickSelectInterruption = (id_interruption) => {
		this.props.onSubmitInterruptionView(id_interruption);
		this.setState((prevState) => ({ openInterruption: !prevState.openInterruption }));
	};

	// socketConnectionEnable = (id_interruption) => {
	// 	this.socket = io.connect(`${API_URL}`, { path: '/socket' });
	// 	this.socket.on('connect', function() {
	// 		console.log('Conectado al Servidor');
	// 	});
	// 	this.socket.on('disconnect', function() {
	// 		console.log('Perdimos la conexion al server');
	// 	});
	// };

	dataRequest = async () => {
		const token = window.sessionStorage.getItem('token') || window.localStorage.getItem('token');
		fetch(`${API_URL}/interrupcion/getStateInterruption?interruption_id=${this.props.data.id_inte}`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				authorization: token
			}
		})
			.then((res) => res.json())
			.then((res) => {
				this._asyncStateTarget = this.setState(
					{
						_className: `__${res.status}__${res.level}__`,
						_classNameButton: `__${res.status}__${res.level}__button__`,
						infoTime: res
					},
					(this._asyncStateTarget = null)
				);
				this.props._stateOfInterruption(res);
			})
			.catch((err) => console.log({ Error: err }));
	};

	componentDidMount = () => {
		// const token = window.sessionStorage.getItem('token') || window.localStorage.getItem('token');
		// fetch(`${API_URL}/radioBases/interruptionTime?interruption_id=${this.props.data.id_inte}`,{
		//   method: 'GET',
		//   headers: {
		//       'Content-Type': 'application/json',
		//       'authorization': token
		//   },
		//   })
		//         .then(data=>data.json())
		//         .then(time=>{
		//             time.countdown.split(':').some(v=>v<0)?this.setState((prevState) =>
		//               ({ test_: "finalizado" })
		//               ):
		//               this.setState((prevState) =>
		//                 ({ test_: "inicio" })
		//               )
		//         })
		//         .catch(error=>console.log({Error:error}))
		this._asyncRequest = this.dataRequest().then(() => {
			this._asyncRequest = null;
		});
		// this._asyncRequest = fetch(
		// 	`${API_URL}/interrupcion/getStateInterruption?interruption_id=${this.props.data.id_inte}`,
		// 	{
		// 		method: 'GET',
		// 		headers: {
		// 			'Content-Type': 'application/json',
		// 			authorization: token
		// 		}
		// 	}
		// )
		// 	.then((res) => res.json())
		// 	.then((res) => {
		// 		console.log('tetsa..??', res);
		// 		this.setState({
		// 			_className: `__${res.status}__${res.level}__`,
		// 			_classNameButton: `__${res.status}__${res.level}__button__`,
		// 			infoTime: res
		// 		});
		// 		this.props.stateOfInterruption(res);
		// 	})
		// 	.catch((err) => console.log({ Error: err }));
	};
	componentWillUnmount = () => {
		if (this._asyncRequest) {
			this._asyncRequest.cancel();
		}
		if (this._asyncStateTarget) {
			this._asyncStateTarget.cancel();
		}
		if (this._asyncRequestColumns) {
			this._asyncRequestColumns.cancel();
		}
		// this.socket.disconnect();
	};

	columnas = () => {
		try {
			let { columns } = this.props;
			let { data } = this.props;
			// const isArray = function(a) {
			//   return (!!a) && (a.constructor === Array);
			// };
			const getLocationForInterruption = (_data) => {
				switch (_data.nivel_interrupcion) {
					case 'PARROQUIA':
						return _data.parroquia_inte;
					case 'CANTON':
						return _data.canton_inte;
					default:
						return _data.provincia_inte;
				}
			};
			if (Object.keys(data).length !== 0) {
				let seleccion = [];
				if (Array.isArray(data)) {
					let selec = columns.map((elemento, index) => {
						let ele = elemento.replace('_', ' ');
						let elem = ele.charAt(0).toUpperCase() + ele.slice(1);
						return (
							<td key={elemento + moment()} data-key={elemento} onClick={this.handleClick}>
								{elem.toUpperCase()}
							</td>
						);
					});
					seleccion = Array.prototype.concat([ <td key="RevE">{'Estado'.toUpperCase()}</td> ], selec, [
						<td key="RevL">{'Localidad'.toUpperCase()}</td>,
						<td key="RevT">{'Tiempo Transcurrido'.toUpperCase()}</td>,
						<td key="RevC">{'Revisión'.toUpperCase()}</td>
					]);
				} else {
					let selec = columns.map((elemento, index) => {
						if (elemento.includes('fecha')) {
							return (
								<td key={index + moment()}>
									{moment(data[elemento]).tz('America/Guayaquil').format('MM-DD-YYYY / HH:mm:ss')}
								</td>
							);
						}
						return <td key={index + moment()}>{data[elemento]}</td>;
					});
					seleccion = Array.prototype.concat(
						[ <td key={'estado_interrupcion' + moment() + data.estado_int}>{data.estado_int}</td> ],
						selec,
						[
							<td key={'locate' + moment() + data.id}>{getLocationForInterruption(data)}</td>,
							<td key={this.state._className + moment() + data.id}>
								{/* {console.log(
								moment.duration(this.state.infoTime.actualDay, 'days'),
								this.state.infoTime.actualDay,
								'sdfs'
							)} */}
								{moment
									.duration(this.state.infoTime.actualDay, 'days')
									.format('dd:hh:mm')
									.split(':')
									.map((item, index, array) => {
										if (array.length === 2) {
											if (index === 0) {
												return `${item} h : `;
											} else {
												return `${item} m`;
											}
										} else if (array.length === 3) {
											if (index === 0) {
												return `${item} d : `;
											} else if (index === 1) {
												return `${item} h : `;
											} else {
												return `${item} m`;
											}
										} else {
											return `${item} m`;
										}
									})}
							</td>,
							<td key={data.id_inte}>
								<div
									key={data.id_inte + moment()}
									onClick={() => this.handleClickSelectInterruption(data.id_inte)}
									className="mouse_scroll"
								>
									<div className="mouse inicio">
										<div className="wheel">Ir</div>
									</div>
									<div>
										<span className={`m_scroll_arrows unu ${this.state._classNameButton}`} />
										<span className={`m_scroll_arrows doi ${this.state._classNameButton}`} />
										<span className={`m_scroll_arrows trei ${this.state._classNameButton}`} />
									</div>
								</div>

								{this.state.openInterruption && <Redirect to="/interruptionOperator" push={true} />}
							</td>
						]
					);
				}
				return seleccion;
			} else {
				return [];
			}
		} catch (error) {
			console.error({ Error: error });
		}
	};

	render() {
		let card = (
			<tr key={moment()} className={`rowTarget nfl ${this.state._className}`}>
				{this.columnas()}
			</tr>
		);
		return card;
	}
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ListaInt));
