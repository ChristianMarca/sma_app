//#########################################################################################
//#########################################################################################
//#########################################################################################
//___Módulo App___
//            Autor: Christian Marca
//            Fecha de Creación: 18/01/2019
//            Fecha de Ultima Modificación:-----
//            Descripción: Contienen los componentes de pagina de  inicio y enrutaminento en el lado del cliente
//            metodos:
//                     changeNav
//                     toogleModal
//                     onRouterAccess
//#########################################################################################
//#########################################################################################
//#########################################################################################
// App

import React, { Component } from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import { Link } from 'react-router-dom';
import ProfileIcon from './components/profile/ProfileIcon';
import { isSignInAction, receiveDataUserAction } from './actions';
import Modal from './components/Modal/Modal';
import Profile from './components/profile/Profile';
import AdminPage from './containers/Admin/AdminPage';
import { API_URL } from './config';
import { withError } from './components/error/ErrorBundary';

// import Dashboard from './containers/Dashboard/Dashboard'
// import AddReport from './containers/Operators/AddReport/AddReport';
// import Maps from './containers/Maps/maps';
// import logo from './logo.svg';
import './App.css';

const mapStateToProps = (state) => {
	return {
		interruptionType: state.interruptionTypeReducer.interruptionType,
		sessionController: state.sessionReducer
	};
};
const mapDispatchToProps = (dispatch) => {
	return {
		onSigninApproved: () => dispatch(isSignInAction(true)),
		onReceiveDataUser: (data) => dispatch(receiveDataUserAction(data))
	};
};

class App extends Component {
	constructor() {
		super();
		this.state = {
			isProfileOpen: false
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
									this.props.onSigninApproved();
									this.props.onReceiveDataUser(user);
								}
							});
					}
				})
				.catch((error) => console.log({ Error: error }));
		}
	}

	changeNav = () => {
		var x = document.getElementById('myTopnav');
		x.className === 'listNav' ? (x.className += ' responsive') : (x.className = 'listNav');
	};
	toogleModal = () => {
		this.setState((prevState) => ({
			...prevState,
			isProfileOpen: !prevState.isProfileOpen
		}));
	};
	onRouterAccess = () => {
		if (!this.props.sessionController.dataUser.issysadmin) {
			return [
				<li key="home" className="headerItem" onClick={this.changeNav}>
					<Link to="/">
						<i className="fas fa-home" /> Home
					</Link>
				</li>,
				<li key="listado" className="headerItem" onClick={this.changeNav}>
					<Link to="/listas">
						<i className="fas fa-chart-bar" />Interrupciones
					</Link>
				</li>,
				this.props.sessionController.dataUser.id_rol === 2 && (
					<li key="newInterruption" className="headerItem" onClick={this.changeNav}>
						<Link to="/newinterruption">
							<i className="fas fa-file-medical-alt" /> Reportar
						</Link>
					</li>
				),
				<li key="maps" className="headerItem" onClick={this.changeNav}>
					<Link to="/maps">
						<i className="fas fa-map-marked-alt" /> Mapas
					</Link>
				</li>,
				this.props.sessionController.dataUser.id_rol === 1 && (
					<li key="dashboard" className="headerItem" onClick={this.changeNav}>
						<Link to="/radiobases">
							<i className="fas fa-broadcast-tower" /> Radio Bases
						</Link>
					</li>
				)
			];
		}
	};
	render() {
		const { children } = this.props;
		const accessToApp = (
			<ul className="listNav" id="myTopnav">
				<li className="headerItem">SMA</li>
				{this.onRouterAccess()}
				<li className="headerItemRight itemName">{this.props.sessionController.dataUser.username}</li>
				<li>
					<ProfileIcon toogleModal={this.toogleModal} />
					{this.state.isProfileOpen && (
						<Modal>
							<Profile isProfileOpen={this.state.isProfileOpen} toogleModal={this.toogleModal} />
						</Modal>
					)}
				</li>
				<li className="icon headerItemRight" onClick={this.changeNav}>
					<i className="fas fa-bars" />
				</li>
			</ul>
		);
		const accessDenied = (
			<ul className="listNav" id="myTopnav">
				<li className="headerItem">SMA</li>
				<li className="headerItem" onClick={this.changeNav}>
					<a href="http://www.arcotel.gob.ec/">
						<i className="" /> ARCOTEL
					</a>
				</li>
				<li className="itemName headerItemRight">Not Authorized</li>
				<li className="itemCollapse">
					<a href="https://github.com/ChristianMarca/sma_app" className="">
						About
					</a>
				</li>
				<li className="icon headerItemRight" onClick={this.changeNav}>
					<i className="fas fa-bars" />
				</li>
			</ul>
		);
		return (
			<div className="App">
				{this.props.sessionController.isSessionInit ? accessToApp : accessDenied}
				{this.props.sessionController.dataUser.issysadmin ? (
					<AdminPage />
				) : (
					<div className="superContainerRoutes">{children}</div>
				)}
				{/* {this.props.sessionController.dataUser.issysadmin ? <AdminPage /> : <div>{children}</div>} */}
			</div>
		);
	}
}

App.propTypes = {
	children: propTypes.object.isRequired
};
export default connect(mapStateToProps, mapDispatchToProps)(withError(App));
