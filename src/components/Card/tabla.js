import React from 'react';
import ListaInt from './tarjeta.js';
import './style.css';
import './table.css';

class TablaInt extends React.Component {
	constructor() {
		super();
		this.state = {
			interruptionClassName: '__inicio__operador__'
		};
	}

	setStateFromChild = (data) => {
		console.log(data, 'tes asa data');
	};

	tablaGen() {
		try {
			let { data } = this.props;
			if (Object.keys(data).length !== 0) {
				let base = Object.keys(data[0]);
				// console.log('headers', base);
				let headData = this.props.campos.map((res) => base[res]);

				let seleccion = data.map((elemento, index) => {
					return (
						<ListaInt
							stateOfInterruption={this.setStateFromChild}
							key={elemento.id_inte}
							columns={headData}
							data={elemento}
						/>
					);
				});
				let etiquetas = [
					<ListaInt
						key="Cabecera"
						id="Head"
						columns={headData}
						data={headData}
						handleClick={this.props.fCampo}
					/>
				];
				let tabla = etiquetas.concat(seleccion);
				return tabla;
			} else {
				return [];
			}
		} catch (error) {
			console.error({ Error: error });
		}
	}
	render() {
		var divition = this.tablaGen().map((row, index) => {
			if (index !== 0) {
				return (
					<tbody key={index} className={`TBod wrapper row-fadeIn-wrapper`}>
						{row}
					</tbody>
				);
			} else {
				return (
					<thead key={index} className="TBod wrapperHead row-fadeIn-wrapperHead">
						{row}
					</thead>
				);
			}
		});
		return (
			<table className="tableContainerInterruption" id="TableContainer">
				{divition}
			</table>
		);
	}
}

export default TablaInt;
