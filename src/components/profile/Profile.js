import React from 'react';
import { connect } from 'react-redux';
import { API_URL } from '../../config';
import './Profile.css';

const mapStateToProps = (state) => {
	return {
		sessionController: state.sessionReducer.dataUser
	};
};
const mapDispatchToProps = (dispatch) => {
	return {};
};

class Profile extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			nombre: this.props.sessionController.nombre,
			apellido: this.props.sessionController.apellido,
			username: this.props.sessionController.username,
			telefono: this.props.sessionController.telefono,
			password: '',
			lastPassword: '',
			repeatNewPassword: '',
			isValidPasswords: false,
			classNamePassword: 'passwordValid',
			classNamePasswordInvalid: 'passwordValid',
			someFail: false
		};
	}

	onFormChange = (event) => {
		switch (event.target.name) {
			case 'user-name':
				this.setState({ nombre: event.target.value });
				break;
			case 'user-last':
				this.setState({ apellido: event.target.value });
				break;
			case 'user-username':
				this.setState({ username: event.target.value });
				break;
			case 'user-phone':
				this.setState({ telefono: event.target.value });
				break;
			case 'user-last-password':
				this.setState({ lastPassword: event.target.value });
				break;
			case 'user-new-password':
				this.setState({ password: event.target.value });
				break;
			case 'user-repeat-password':
				this.setState({ repeatNewPassword: event.target.value });
				break;
			default:
				return;
		}
	};
	validateLastPassword = () => {
		const token = window.sessionStorage.getItem('token') || window.localStorage.getItem('token');
		return fetch(
			`${API_URL}/authentication/passwordValidate/${this.props.sessionController.id_user}&${this.state
				.lastPassword}`,
			{
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
					// 'authorization': window.sessionStorage.getItem('token')
					authorization: token
				}
			}
		)
			.then((resp) => {
				if (resp.status === 400) {
					this.setState({ classNamePassword: 'passwordInvalid' });
					this.setState({ someFail: true });
				}
				return resp;
			})
			.catch((error) => {
				this.setState({ classNamePassword: 'passwordInvalid', someFail: true });
				console.log({ Error: error });
			});
	};
	validatePasswordEquality = () => {
		if (this.state.password.length > 0 && this.state.repeatNewPassword.length > 0) {
			if (this.state.password === this.state.repeatNewPassword) {
				this.setState({ isValidPasswords: true });
				return true;
			} else {
				this.setState({ isValidPasswords: false, classNamePasswordInvalid: 'passwordInvalid' });
				return false;
			}
		}
	};
	onUpdatePassword = () => {
		const token = window.sessionStorage.getItem('token') || window.localStorage.getItem('token');
		this.state.password
			? this.validateLastPassword()
					.then((data) => {
						if (data && this.validatePasswordEquality()) {
							if (data.status && data.ok && this.state.isValidPasswords) {
								return fetch(
									`${API_URL}/authentication/passwordChange/${this.props.sessionController
										.id_user}&${this.state.password}`,
									{
										method: 'POST',
										headers: {
											'Content-Type': 'application/json',
											authorization: token
										}
									}
								)
									.then((resp) => {
										this.setState({ someFail: false });
										return resp;
									})
									.catch((error) => {
										this.setState({ classNamePassword: 'passwordInvalid', someFail: true });
										return console.log({ Error: error });
									});
							} else {
								return console.log('Fail');
							}
						}
					})
					.then(() => {
						fetch(`${API_URL}/authentication/dataChange/${this.props.sessionController.id_user}`, {
							method: 'POST',
							headers: {
								'Content-Type': 'application/json',
								authorization: token
							},
							body: JSON.stringify({
								formInput: {
									nombre: this.state.nombre,
									apellido: this.state.apellido,
									username: this.state.username,
									telefono: this.state.telefono
								}
							})
						})
							.then((resp) => {
								if (resp.status === 200 || resp.status === 304) {
									!this.state.someFail && this.validatePasswordEquality() && this.props.toogleModal();
								}
							})
							.catch((error) => console.log({ Error: error }));
					})
					.catch((err) => {
						this.setState({ someFail: true });
						alert('Fallo Proceso', err);
					})
			: fetch(`${API_URL}/authentication/dataChange/${this.props.sessionController.id_user}`, {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
						authorization: token
					},
					body: JSON.stringify({
						formInput: {
							nombre: this.state.nombre,
							apellido: this.state.apellido,
							username: this.state.username,
							telefono: this.state.telefono
						}
					})
				})
					.then((resp) => {
						if (resp.status === 200 || resp.status === 304) {
							this.props.toogleModal();
							this.forceUpdate();
						}
					})
					.catch((error) => console.log({ Error: error }));
	};
	removeInvalidClass = () => {
		this.setState({ classNamePassword: 'passwordValid' });
		this.setState({ classNamePasswordInvalid: 'passwordValid' });
	};

	render() {
		const { toogleModal } = this.props;
		return (
			<div className="profile-modal">
				<article className="modalInfoContainer">
					<main className="mainModalForm">
						<label className="labelForm headerform" htmlFor="name">
							Nombre:{' '}
						</label>
						<input
							onChange={this.onFormChange}
							className="inputform"
							placeholder={this.state.nombre}
							type="text"
							name="user-name"
							id="name"
						/>

						<label className="labelForm" htmlFor="last">
							Apellido:{' '}
						</label>
						<input
							onChange={this.onFormChange}
							className="inputform"
							placeholder={this.state.apellido}
							type="text"
							name="user-last"
							id="last"
						/>

						<label className="labelForm" htmlFor="username">
							Username:{' '}
						</label>
						<input
							onChange={this.onFormChange}
							className="inputform"
							placeholder={this.state.username}
							type="text"
							name="user-username"
							id="username"
						/>

						<label className="labelForm" htmlFor="phone">
							Telefono:{' '}
						</label>
						<input
							onChange={this.onFormChange}
							className="inputform"
							placeholder={this.state.telefono}
							type="text"
							name="user-phone"
							id="phone"
						/>

						<label className="labelForm" htmlFor="lastPassword">
							Antigua Contraseña:{' '}
						</label>
						<input
							onChange={this.onFormChange}
							onFocus={this.removeInvalidClass}
							className={`inputform ${this.state.classNamePassword}`}
							placeholder={'Last Password'}
							type="password"
							pattern=".{6,}"
							minLength={8}
							name="user-last-password"
							id="lastPassword"
						/>

						<label className="labelForm" htmlFor="newPassword">
							{' '}
							Nueva Contraseña:{' '}
						</label>
						<input
							onChange={this.onFormChange}
							onFocus={this.removeInvalidClass}
							className={`inputform ${this.state.classNamePasswordInvalid}`}
							placeholder={'New Password'}
							type="password"
							pattern=".{6,}"
							minLength={8}
							name="user-new-password"
							id="newPassword"
						/>

						<label className="labelForm" htmlFor="repeatNewPassword">
							Repetir Contraseña:{' '}
						</label>
						<input
							onChange={this.onFormChange}
							onFocus={this.removeInvalidClass}
							onBlur={this.validatePasswordEquality}
							className={`inputform ${this.state.classNamePasswordInvalid}`}
							placeholder={'New Password'}
							type="password"
							pattern=".{6,}"
							minLength={8}
							name="user-repeat-password"
							id="repeatNewPassword"
						/>

						<div className="submitsButtonModal" style={{ display: 'flex', justifyContent: 'space-evenly' }}>
							<button onClick={() => this.onUpdatePassword()} className="buttonSubmitModal">
								Save
							</button>
							<button className="buttonSubmitModal" onClick={toogleModal}>
								Cancel
							</button>
						</div>
					</main>
					<div className="modal-close" onClick={toogleModal}>
						&times;
					</div>
				</article>
			</div>
		);
	}
}
export default connect(mapStateToProps, mapDispatchToProps)(Profile);
