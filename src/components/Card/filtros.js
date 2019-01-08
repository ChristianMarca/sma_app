import React from 'react';
import DateTimePicker from 'react-datetime-picker/dist/entry.nostyle';

export default class Filtro extends React.Component {
	onChangeInit = (date) => this.props.onChangeI(date);
	onChangeEnd = (date) => this.props.onChangeE(date);
	handleClick = (e) => this.props.onClicGO(e);
	onChangeInput = (e) => {
		this.props.onChangeInput(e.target.value);
	};

	render() {
		let filters = (
			<div className="tableFilters">
				<div className="dateFilterContainer">
					<div className="titleNav">Desde:</div>
					<DateTimePicker
						className="dateFilterPag"
						onChange={this.onChangeInit}
						value={this.props.valueI}
						disableClock={true}
						clearIcon={<i className="fas fa-eraser" />}
						calendarIcon={<i className="far fa-calendar-alt" />}
					/>
					<div className="titleNav">Hasta:</div>
					<DateTimePicker
						className="dateFilterPag"
						onChange={this.onChangeEnd}
						value={this.props.valueE}
						disableClock={true}
						clearIcon={<i className="fas fa-eraser" />}
						calendarIcon={<i className="far fa-calendar-alt" />}
					/>
				</div>
				<div className="titleNav">Area afectada:</div>
				<div className="areaAfectadaContainer">
					<input
						className="areaAfectadaInput"
						type="text"
						id="name"
						onKeyPress={this.handleClick}
						onChange={this.onChangeInput}
					/>
					<button className="searchButton goButton" onClick={this.handleClick} data-key={0}>
						Ir
					</button>
				</div>
			</div>
		);

		return filters;
	}
}
