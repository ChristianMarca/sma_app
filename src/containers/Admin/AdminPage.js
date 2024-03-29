import React from 'react';
import axios from 'axios';
import { API_URL } from '../../config';
import './style.css';

class AdminPage extends React.Component {
	constructor() {
		super();
		this.state = {
			rol: '',
			operator: '',
			email: '',
			selectedFile: null,
			loaded: 0
		};
	}
	onRolChanged = (e) => {
		this.setState({
			rol: e.currentTarget.value
		});
	};

	onOperatorChanged = (e) => {
		this.setState({
			operator: e.currentTarget.value
		});
	};

	onHandleSubmit = (event) => {
		event.preventDefault();
		const token = window.sessionStorage.getItem('token') || window.localStorage.getItem('token');
		if (this.state.rol.length !== 0) {
			if ((this.state.rol === 'OPERADOR' && this.state.operator.length !== 0) || this.state.rol !== 'OPERADOR') {
				// axios.post(`${API_URL}/register`,{
				//   rol: this.state.rol,
				//   operator: this.state.operator,
				//   email: this.state.email
				// })
				axios({
					method: 'POST',
					url: `${API_URL}/register`,
					data: {
						rol: this.state.rol,
						operator: this.state.operator,
						email: this.state.email
					},
					headers: {
						'Content-Type': 'application/json',
						authorization: token
					}
				})
					.then((data) => {
						if (data.status === 200) {
							this.setState({
								operator: '',
								rol: '',
								email: ''
							});
							alert('Completado');
						} else {
							alert('ERROR');
						}
					})
					.catch((error) => {
						console.log('Error', error);
						alert('ERROR');
					});
			} else {
				alert('Selecione un Operadora');
			}
		} else {
			alert('Seleccione un Rol');
		}
	};

	onHandleSubmitRB = (event) => {
		event.preventDefault();
		const token = window.sessionStorage.getItem('token') || window.localStorage.getItem('token');
		const data = new FormData();
		data.append('file', this.state.selectedFile, this.state.selectedFile.name);
		axios
			.post(`${API_URL}/files/updateRadiobase`, data, {
				onUploadProgress: (ProgressEvent) => {
					this.setState({
						loaded: ProgressEvent.loaded / ProgressEvent.total * 100
					});
				},
				headers: { authorization: token }
			})
			.then((res) => {
				console.log(res, res.statusText);
				alert('Actualizado');
			})
			.catch((error) => {
				console.log(error);
				alert('Error');
			});

		// 		axios({
		// 			method: 'POST',
		// 			url: `${API_URL}/register`,
		// 			data: {
		// 				rol: this.state.rol,
		// 				operator: this.state.operator,
		// 				email: this.state.email
		// 			},
		// 			headers: {
		// 				'Content-Type': 'application/json',
		// 				authorization: token
		// 			}
		// 		})
		// 			.then((data) => {
		// 				console.log('test')
		// 			})
		// 			.catch((error) => {
		// 				alert('ERROR');
		// 			});
	};

	onChangeEmail = (e) => {
		this.setState({
			email: e.currentTarget.value
		});
	};

	addFileName = (event) => {
		document.querySelector('html').classList.add('js');
		var the_return = document.querySelector('.file-return');
		the_return.innerHTML = event.target.value;
		this.setState({
			selectedFile: event.target.files[0],
			loaded: 0
		});
	};

	render() {
		return (
			<div className="superContainerAdmin">
				<form className="adminContainer" onSubmit={this.onHandleSubmit}>
					<h1>Registro de Usuario</h1>
					<h6>Email</h6>
					<input
						placeholder="Email"
						className="inputField"
						type="email"
						onChange={this.onChangeEmail}
						value={this.state.email}
						required
					/>
					<h6>ROL</h6>
					<div className="groupRadioButtons">
						<input
							className="radioButton"
							id="operador"
							type="radio"
							name="rol"
							value={'OPERADOR'}
							checked={this.state.rol === 'OPERADOR'}
							onChange={this.onRolChanged}
						/>
						<label className="marca" htmlFor="operador">
							Operador
						</label>
						<input
							className="radioButton"
							id="arcotel"
							type="radio"
							name="rol"
							value={'ARCOTEL'}
							checked={this.state.rol === 'ARCOTEL'}
							onChange={this.onRolChanged}
						/>
						<label className="marca" htmlFor="arcotel">
							ARCOTEL
						</label>
					</div>
					{this.state.rol === 'OPERADOR' && (
						<div>
							<h6>OPERADORA</h6>
							<div className="groupRadioButtons">
								<input
									className="radioButton"
									id="conecel"
									type="radio"
									name="operador"
									value={'CONECEL'}
									checked={this.state.operator === 'CONECEL'}
									onChange={this.onOperatorChanged}
								/>
								<label className="marca" htmlFor="conecel">
									CONECEL
								</label>
								<input
									className="radioButton"
									id="otecel"
									type="radio"
									name="operador"
									value={'OTECEL'}
									checked={this.state.operator === 'OTECEL'}
									onChange={this.onOperatorChanged}
								/>
								<label className="marca" htmlFor="otecel">
									OTECEL
								</label>
								<input
									className="radioButton"
									id="cnt"
									type="radio"
									name="operador"
									value={'CNT'}
									checked={this.state.operator === 'CNT'}
									onChange={this.onOperatorChanged}
								/>
								<label className="marca" htmlFor="cnt">
									CNT
								</label>
							</div>
						</div>
					)}
					<button type="submit" id="buttonTypeS" className="buttonSubmit">
						<i className="fas fa-share-square" /> Save
					</button>
				</form>
				<form
					ref="uploadForm"
					id="uploadForm"
					onSubmit={this.onHandleSubmitRB}
					// action={`${API_URL}/upload`}
					// method="post"
					encType="multipart/form-data"
					className="adminContainer uploadFileForm"
				>
					<h1>Actualizar Radiobases</h1>
					<div className="uploadFileForm">
						<input
							className="inputForFile"
							id="my-file"
							type="file"
							name="sampleFile"
							onChange={this.addFileName}
							accept=".csv"
						/>
						<div className="drag-text">
							<h3>Ingrese el archivo .csv</h3>
						</div>
						<p className="file-return" />
					</div>
					<input className="buttonForSendFile" type="submit" value="Enviar y Actualizar!" />
					<h3>Cargado {Math.round(this.state.loaded)}%</h3>
				</form>
			</div>
		);
	}
}

export default AdminPage;
