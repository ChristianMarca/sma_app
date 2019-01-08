import React from 'react';
import { isSignInAction, receiveDataUserAction } from '../../actions';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { API_URL } from '../../config';
import SearchCodEst from '../../components/Operators/suggestions/SuggestionEST';
import './style.css';

const mapStateToProps = (state, ownProps) => {
	return {
		sessionController: state.sessionReducer,
		codEstSeleted: state.structureToUpdateReducer.structureToUpdate
	};
};
const mapDispatchToProps = (dispatch) => {
	return {
		onSignInApproved: () => dispatch(isSignInAction(true)),
		onReceiveDataUser: (data) => dispatch(receiveDataUserAction(data))
	};
};

class Dashboard extends React.Component {
	constructor() {
		super();
		this.state = {
			modifyRBInfo: 'CREAR',
			prevInfo: {},
			codigo_estacion: '',
			direccion_RB: '',
			nombre_est_RB: '',
			latitud_RB: '',
			longitud_RB: ''
		};
	}

	componentDidMount() {
		const token = sessionStorage.getItem('token') || localStorage.getItem('token');
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
								}
								if (user.id_rol !== 1) this.props.history.push('/');
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

	getSnapshotBeforeUpdate(prevProps, prevState) {
		// Are we adding new items to the list?
		// Capture the scroll position so we can adjust scroll later.
		if (prevProps.codEstSeleted !== this.props.codEstSeleted) {
			return this.props.codEstSeleted;
		}
		return null;
	}

	componentDidUpdate(prevProps, prevState, snapshot) {
		// If we have a snapshot value, we've just added new items.
		// Adjust scroll so these new items don't push the old ones out of view.
		// (snapshot here is the value returned from getSnapshotBeforeUpdate)
		if (snapshot !== null) {
			console.log(this.props.codEstSeleted, 'tetsgaga ');
			this.setState({ prevInfo: this.props.codEstSeleted });
			this.setState({
				codigo_estacion: this.props.codEstSeleted.cod_est,
				direccion_RB: this.props.codEstSeleted.dir,
				nombre_est_RB: this.props.codEstSeleted.nom_sit,
				latitud_RB: this.props.codEstSeleted.lat,
				longitud_RB: this.props.codEstSeleted.long
			});
		}
	}

	handleModifyRBInfo = (selected) => {
		this.setState({ modifyRBInfo: selected.currentTarget.value });
	};

	onFormChange = (event) => {
		switch (event.target.name) {
			case 'rb-dir':
				this.setState({ direccion_RB: event.target.value });
				break;
			case 'rb-nom_est':
				this.setState({ nombre_est_RB: event.target.value });
				break;
			case 'rb-lat':
				this.setState({ latitud_RB: event.target.value });
				break;
			case 'rb-long':
				this.setState({ longitud_RB: event.target.value });
				break;
			default:
				return;
		}
	};

	cancelUpdateRB = () => {
		this.props.history.push('/');
	};

	handleSubmitUpdate = () => {
		const token = sessionStorage.getItem('token') || localStorage.getItem('token');
		if (token) {
			fetch(`${API_URL}/radiobases/updateRB`, {
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json',
					authorization: token
				},
				body: JSON.stringify({
					cod_est: this.state.codigo_estacion,
					direccion: this.state.direccion_RB,
					nombre_estructura: this.state.nombre_est_RB,
					prev_nombre_estructura: this.state.prevInfo.nom_sit,
					latitud: this.state.latitud_RB,
					longitud: this.state.longitud_RB
				})
			})
				.then((resp) => resp.json())
				.then((resp) => {
					this.setState({ prevInfo: {} });
					this.setState({
						codigo_estacion: '',
						direccion_RB: '',
						nombre_est_RB: '',
						latitud_RB: '',
						longitud_RB: ''
					});
				})
				.catch((error) => {
					console.log({ Error: error });
				});
		} else {
			alert('Error: Falta Credenciales');
		}
	};

	getModifyOptions = () => {
		return this.state.modifyRBInfo === 'ACTUALIZAR' ? (
			<div className="containerFieldRB">
				<span className="titleUpdateCodEst">Codigo de Estructura</span>
				<div className="containerEstSuggest">
					<SearchCodEst />
				</div>
				<label className="labelForm headerform" htmlFor="direccion__">
					Direccion:{' '}
				</label>
				<input
					onChange={this.onFormChange}
					className="inputform"
					placeholder={this.state.direccion_RB}
					value={this.state.direccion_RB}
					type="text"
					name="rb-dir"
					id="direccion__"
				/>
				<label className="labelForm headerform" htmlFor="nombre_est__">
					Nombre de Estructura:{' '}
				</label>
				<input
					onChange={this.onFormChange}
					className="inputform"
					placeholder={this.state.nombre_est_RB}
					value={this.state.nombre_est_RB}
					type="text"
					name="rb-nom_est"
					id="nombre_est__"
				/>
				<label className="labelForm" htmlFor="latitud__">
					Latitud:{' '}
				</label>
				<input
					onChange={this.onFormChange}
					className="inputform"
					placeholder={this.state.latitud_RB}
					value={this.state.latitud_RB}
					type="text"
					name="rb-lat"
					id="latitud__"
				/>

				<label className="labelForm" htmlFor="longitud__">
					Longitud:{' '}
				</label>
				<input
					onChange={this.onFormChange}
					className="inputform"
					placeholder={this.state.longitud_RB}
					value={this.state.longitud_RB}
					type="text"
					name="rb-long"
					id="longitud__"
				/>
				<div className="submitButtonsPreview">
					<button
						type="submit"
						id="SendInterruption"
						className="buttonSubmitPreview"
						onClick={this.handleSubmitUpdate}
					>
						<i className="fas fa-save" /> Save
					</button>
					<button
						type="submit"
						id="buttonTypeS"
						className="buttonCancelPreview"
						onClick={this.cancelUpdateRB}
					>
						<i className="fas fa-ban" /> Cancelar
					</button>
					<div className="betaversion">Beta Version</div>
				</div>
			</div>
		) : (
			<div className="containerInBuild">
				<span>En Construccion</span>
			</div>
		);
	};

	render() {
		return (
			// <div className="wrapper">
			// 	<div className="headerContainer">One</div>
			// 	<div className="userContainer">Two</div>
			// 	<div className="mapContainer">Three</div>
			// 	<div className="stadisticsContainer">Four</div>
			// 	<div className="listContainer">Five</div>
			// </div>
			<div className="containerModifyRBInfo">
				<div className="containerTypeOfUpdateRB">
					<input
						className="radioButton"
						id="modifyRBInfoCreate"
						type="radio"
						name="modifyRBInfo"
						value={'CREAR'}
						checked={this.state.modifyRBInfo === 'CREAR'}
						onChange={this.handleModifyRBInfo}
					/>
					<label className="interruptionLevel" htmlFor="modifyRBInfoCreate">
						Crear
					</label>
					<input
						className="radioButton"
						id="modifyRBInfoUpdate"
						type="radio"
						name="modifyRBInfo"
						value={'ACTUALIZAR'}
						checked={this.state.modifyRBInfo === 'ACTUALIZAR'}
						onChange={this.handleModifyRBInfo}
					/>
					<label className="interruptionLevel" htmlFor="modifyRBInfoUpdate">
						Actualizar
					</label>
				</div>
				{this.getModifyOptions()}
			</div>
		);
	}
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Dashboard));
