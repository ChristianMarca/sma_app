import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { SortablePane, Pane } from 'react-sortable-pane';
import ContentEditable from 'react-contenteditable';
import sanitizeHtml from 'sanitize-html';
import Dropdown from 'rc-dropdown';
import Menu, { Item as MenuItemDropdown, Divider } from 'rc-menu';
import 'rc-dropdown/assets/index.css';
import { requestInterruptionFetchAction, isSignInAction, receiveDataUserAction } from '../../actions';

import Map from '../Maps/map/mapa';
import '../Maps/chart.style.css';
import '../../components/viewInterruptions/style.chat.css';

import Chat from '../../components/viewInterruptions/chat';

import { API_URL } from '../../config';

import InterruptionView from '../../components/viewInterruptions/viewOperatorInterruption';

import './style.css';

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
		this.editorRef = React.createRef();
		this.state = {
			isReceiveDataOfInterruption: false,
			time: '',
			showExternalHTML: false,
			isSortable: false,
			html: `<div class="lds-ripple"><div></div><div></div></div>`,
			comments: '',
			asunto: '',
			coordinacionZonal: ``,
			codigoReporte: ``,
			editable: true,
			messageToSend: '',
			stateOfRadiobase: [ 'inProcess' ],
			selectedKeysMenuReport: [],
			stateOfInterruption: 'Cargando...'
		};
	}

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
										this.props
											.onRequestDataInterruption(
												this.props.interruptionViewSelected,
												user.id_user
											)
											.then((data) => {
												this.setState({ isReceiveDataOfInterruption: true });
												fetch(
													`${API_URL}/interrupcion/getReport?id_interruption=${this.props
														.interruptionData.ID.data.data.id_inte}`,
													{
														method: 'GET',
														headers: {
															'Content-Type': 'application/json',
															authorization: token
														}
													}
												)
													.then((resp) => resp.json())
													.then((report) => {
														this.setState({
															stateOfInterruption: this.props.interruptionData.ID.data
																.data.estado_int
														});
														this.setState({
															html: report.html,
															asunto: report.asunto,
															coordinacionZonal: report.coordinacionZonal,
															codigoReporte: report.codigoReport
														});
													})
													.catch((err) => {
														console.log({ Error: err });
														this.setState({ html: <h1>Something Fail</h1> });
													});
											});
									} else {
										this.props.history.push('/listas');
									}
								});
						}
					})
					.catch((err) => {
						console.log({ Error: err });
					});
			} else {
				this.props.history.push('/listas');
			}
		} else {
			this.props.history.push('/');
		}
	};

	paneStyle = {
		display: 'flex',
		alignItems: 'center'
	};

	initDrag = (event) => {
		if (event.ctrlKey) {
			this.setState({ isSortable: true });
		} else {
			this.setState({ isSortable: false });
		}
	};

	endDrag = () => {
		this.setState({ isSortable: false });
	};

	handleChange = (stateName, event) => {
		this.setState({ [stateName]: event.target.value });
	};

	handleSendComment = (event) => {
		if (event.key === 'Enter') {
			this.setState({ messageToSend: this.state.comments });
			this.setState({ comments: `` });
		}
	};

	sanitizeConf = {
		allowedTags: [
			'b',
			'i',
			'em',
			'strong',
			'a',
			'p',
			'h1',
			'html',
			'body',
			'ol',
			'li',
			'table',
			'tr',
			'td',
			'br',
			'hr',
			'div'
		],
		allowedAttributes: {
			a: [ 'href' ],
			i: [ 'style', 'class' ],
			em: [ 'style', 'class' ],
			strong: [ 'style', 'class' ],
			p: [ 'style', 'class' ],
			h1: [ 'style', 'class' ],
			html: [ 'style', 'class' ],
			body: [ 'style', 'class' ],
			ol: [ 'style', 'class' ],
			li: [ 'style', 'class' ],
			table: [ 'style', 'class' ],
			tr: [ 'style', 'class' ],
			td: [ 'style', 'class' ],
			br: [ 'style', 'class' ],
			hr: [ 'style', 'class' ],
			div: [ 'style', 'class' ]
		}
	};

	sanitize = () => {
		this.setState({ html: sanitizeHtml(this.state.html, this.sanitizeConf) });
	};

	toggleEditable = () => {
		this.setState({ editable: !this.state.editable });
	};

	saveReportChanges = () => {
		const token = window.sessionStorage.getItem('token') || window.localStorage.getItem('token');
		var jsonStringify = JSON.stringify({
			contentHtml: this.state.html,
			contentHeader: {
				asunto: this.state.asunto,
				codigoReport: this.state.codigoReporte,
				coordinacionZonal: this.state.coordinacionZonal
			}
		});
		// var sendHtml=jsonStringify.replace(/\\n/g, "")
		//               .replace(/\\'/g, "'")
		//               .replace(/\\"/g, '"')
		//               .replace(/\\&/g, "")
		//               .replace(/\\r/g, "")
		//               .replace(/\\t/g, "")
		//               .replace(/\\b/g, "")
		//               .replace(/\\f/g, "");
		fetch(
			`${API_URL}/interrupcion/updateReport?id_interruption=${this.props.interruptionData.ID.data.data.id_inte}`,
			{
				method: 'PUT',
				body: jsonStringify,
				headers: {
					'Content-Type': 'application/json',
					authorization: token
				}
			}
		)
			.then((resp) => resp.json())
			.then((report) => {
				alert(report);
			})
			.catch((err) => {
				console.log({ Error: err });
				alert('Something Fail');
			});
	};

	updateHeaders = (stateName, event) => {
		this.setState({ [stateName]: event.target.value });
	};

	getItemsForStateInterruption = () => {
		return (
			<Menu
				onSelect={this.onSelectInterruptionState}
				defaultSelectedKeys={this.state.stateOfRadiobase}
				className="menuInterruptionState"
			>
				<MenuItemDropdown key="ACTIVO" group="StateOfInterruption">
					ACTIVO
				</MenuItemDropdown>
				<Divider />
				<MenuItemDropdown key="REVISION" group="StateOfInterruption">
					REVISION
				</MenuItemDropdown>
				<Divider />
				<MenuItemDropdown key="INACTIVO" group="StateOfInterruption">
					INACTIVO
				</MenuItemDropdown>
			</Menu>
		);
	};

	getItemsForMenuReport = () => {
		return (
			<Menu
				onSelect={this.onSelectInterruptionState}
				selectedKeys={this.state.selectedKeys}
				className="menuInterruptionState"
			>
				<MenuItemDropdown key="saveChanges" group="actionInReport">
					Guardar Cambios
				</MenuItemDropdown>
				<Divider />
				<MenuItemDropdown key="rebuildReport" group="actionInReport">
					Restablecer Informe
				</MenuItemDropdown>
				<Divider />
				<MenuItemDropdown key="sendReport" group="actionInReport">
					Enviar por Correo
				</MenuItemDropdown>
			</Menu>
		);
	};

	getItemsForUpdateInterruptionState = () => {
		console.log('tetsdavs?><>$#@$#', [ this.props.interruptionData.ID.data.data.estado_int.replace(' ', '_') ]);
		return (
			<Menu
				onSelect={this.onSelectInterruptionState}
				// selectedKeys={this.state.selectedKeys}
				defaultSelectedKeys={[ this.props.interruptionData.ID.data.data.estado_int.replace(' ', '_') ]}
				className="menuInterruptionState"
			>
				<MenuItemDropdown key="EN_REVISION" group="updateInterruptionState">
					EN REVISION
				</MenuItemDropdown>
				<Divider />
				<MenuItemDropdown key="AUTORIZADO" group="updateInterruptionState">
					AUTORIZADO
				</MenuItemDropdown>
				<Divider />
				<MenuItemDropdown key="NEGADO" group="updateInterruptionState">
					NEGADO
				</MenuItemDropdown>
				<Divider />
				<MenuItemDropdown key="REPORTE_INCOMPLETO" group="updateInterruptionState">
					REPORTE INCOMPLETO
				</MenuItemDropdown>
				<Divider />
				<MenuItemDropdown key="COMPLETADO" group="updateInterruptionState">
					COMPLETADO
				</MenuItemDropdown>
			</Menu>
		);
	};

	getItemsForAddInterruption = () => {
		return (
			<Menu
				onSelect={this.onSelectInterruptionState}
				selectedKeys={this.state.selectedKeys}
				className="menuInterruptionState"
			>
				<MenuItemDropdown key="saveChanges" group="actionInReport">
					Reportar por Email
				</MenuItemDropdown>
			</Menu>
		);
	};

	//Dropdow simple
	// onSelectInterruptionState = ({key}) => {
	onSelectInterruptionState = (selected) => {
		const token = window.sessionStorage.getItem('token') || window.localStorage.getItem('token');
		fetch(`${API_URL}/interrupcion/actions`, {
			method: 'post',
			body: JSON.stringify({
				group: selected.item.props.group,
				selected: selected.key,
				contentHtml: this.state.html,
				id_interruption: this.props.interruptionViewSelected,
				sessionController: this.props.sessionController,
				contentHeader: {
					asunto: this.state.asunto,
					codigoReport: this.state.codigoReporte,
					coordinacionZonal: this.state.coordinacionZonal
				}
			}),
			headers: {
				'Content-Type': 'application/json',
				authorization: token
			}
		})
			.then((resp) => resp.json())
			.then((resp) => {
				// console.log('tetsva>?<?><>????????', resp);
				switch (selected.key) {
					case 'rebuildReport':
						this.setState({ html: resp.html });
						break;
					case 'sendReport':
						alert('Enviado');
						break;
					default:
						break;
				}
				if (selected.item.props.group === 'updateInterruptionState') {
					this.setState({ stateOfInterruption: resp });
				}
			})
			.catch((error) => {
				console.log({ Error: error });
				alert('Something Fail');
			});
		this.setState({ selectedKeysMenuReport: [] });
		// switch(key){
		//   case 'initiation':
		//     break;
		//   case 'inProcess':
		// }
		// this.setState({stateOfInterruption: key})
		// alert(key)
	};

	onVisibleChangeInterruptionState(visible) {
		//this.setState({elementosPagina: key})
	}

	getInfoInterruption = () => {
		if (this.props.interruptionData.ID.data.data) {
			return (
				<div onDoubleClick={this.initDrag} className="containerInterruption">
					<SortablePane
						className="viewInformation"
						direction="horizontal"
						margin={5}
						isSortable={this.state.isSortable}
					>
						<Pane
							key="interruptionView"
							defaultSize={{ width: '20%', height: '100%' }}
							style={this.paneStyle}
						>
							<Dropdown
								trigger={[ 'contextMenu' ]}
								overlay={this.getItemsForStateInterruption()}
								animation="slide-up"
								onVisibleChange={this.onVisibleChangeInterruptionState}
								alignPoint
							>
								<div className="cardInfoInterruption viewInformation">
									<InterruptionView />
								</div>
							</Dropdown>
						</Pane>
						{this.props.sessionController.id_rol === 1 ? (
							<Pane
								key="interruptionReport"
								defaultSize={{ width: '59.2%', height: '100%' }}
								style={this.paneStyle}
							>
								<Dropdown
									trigger={[ 'contextMenu' ]}
									overlay={this.getItemsForMenuReport()}
									animation="slide-up"
									onVisibleChange={this.onVisibleChangeInterruptionState}
									alignPoint
								>
									<div className="cardInfoInterruption viewReport">
										<div className="containerHeaderFields">
											<div className="containerInputsHeader">
												<label className="field a-field a-field_a1 page__field">
													<input
														className="field__input a-field__input"
														placeholder="Coordinación Zonal X"
														value={this.state.coordinacionZonal}
														onChange={this.updateHeaders.bind(this, 'coordinacionZonal')}
													/>
													<span className="a-field__label-wrap">
														<span className="a-field__label">Coordinación Zonal</span>
													</span>
												</label>
												<label className="field a-field a-field_a1 page__field">
													<input
														className="field__input a-field__input"
														placeholder="No. IT-CZXX-X-XXXX-XXXX"
														value={this.state.codigoReporte}
														onChange={this.updateHeaders.bind(this, 'codigoReporte')}
													/>
													<span className="a-field__label-wrap">
														<span className="a-field__label">Código de Informe</span>
													</span>
												</label>
											</div>
											<div className="subjectContainer">
												<label className="field a-field a-field_a1 page__field">
													<span className="a-field__label__textarea">Asunto</span>
													<textarea
														className="field__input a-field__input"
														placeholder="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididuntut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitationullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor inreprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sintoccaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id estlaborum."
														value={this.state.asunto}
														onChange={this.updateHeaders.bind(this, 'asunto')}
													/>
												</label>
											</div>
										</div>
										<div className="editableReportContainer">
											<ContentEditable
												className="editableReport"
												innerRef={this.editorRef}
												tagName="pre"
												html={this.state.html} // innerHTML of the editable div
												disabled={!this.state.editable} // use true to disable edition
												// onChange={this.handleChange} // handle innerHTML change
												onChange={this.handleChange.bind(this, 'html')}
												onBlur={this.sanitize}
												style={{ width: '100%' }}
											/>
										</div>
									</div>
								</Dropdown>
							</Pane>
						) : (
							<Pane
								key="interruptionReport"
								defaultSize={{ width: '59.2%', height: '100%' }}
								style={this.paneStyle}
							>
								<div className="cardInfoInterruption viewReport">
									<Map isDashboardComponent={true} />
								</div>
							</Pane>
						)}
						{this.props.sessionController.id_rol === 1 ? (
							<Pane
								key="interruptionCode"
								defaultSize={{ width: '20%', height: '100%' }}
								style={this.paneStyle}
							>
								<div className="cardInfoInterruption viewCode">
									<textarea
										className="editableContainer"
										value={this.state.html}
										onChange={this.handleChange.bind(this, 'html')}
									/>
									{/* <div className="SaveButtonContainer"> */}
									<Dropdown
										trigger={[ 'contextMenu', 'click' ]}
										overlay={this.getItemsForUpdateInterruptionState()}
										animation="slide-up"
										onVisibleChange={this.onVisibleChangeInterruptionState}
										alignPoint
									>
										<div className="interruptionStateDropDown">
											{/* <button onClick={this.saveReportChanges} className="reportButtons">
												Save Changes
											</button>
											<button className="reportButtons">Rebuild Report</button> */}
											{this.state.stateOfInterruption}
										</div>
									</Dropdown>
									<div className="commentsContainer">
										<Chat message={this.state.messageToSend} />
										<div className="sendCommentContainer">
											<input
												className="textarea"
												onKeyPress={this.handleSendComment}
												value={this.state.comments}
												onChange={this.handleChange.bind(this, 'comments')}
												type="text"
												placeholder="Type here!"
											/>
										</div>
									</div>
								</div>
							</Pane>
						) : (
							<Pane
								key="interruptionCode"
								defaultSize={{ width: '20%', height: '100%' }}
								style={this.paneStyle}
							>
								<div className="cardInfoInterruption viewCode">
									<div className="commentsContainer">
										<Chat message={this.state.messageToSend} />
										<div className="sendCommentContainer">
											<input
												className="textarea"
												onKeyPress={this.handleSendComment}
												value={this.state.comments}
												onChange={this.handleChange.bind(this, 'comments')}
												type="text"
												placeholder="Type here!"
											/>
										</div>
									</div>
									{/* <button className="SendInterruptionForEmail">
										Enviar Reporte Por Interrupcion
									</button> */}
								</div>
							</Pane>
						)}
					</SortablePane>
				</div>
			);
		} else {
			return <div>Please Wait or Edit Report for Enable HTML Code</div>;
		}
	};

	render() {
		console.log(this.props.interruptionData, 'testa<>?><?');
		return this.getInfoInterruption();
	}
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(InterruptionOperatorView));
