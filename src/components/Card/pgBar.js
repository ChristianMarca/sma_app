import React from 'react';
import './style.css';

export default class PageBar extends React.Component {
	handleClick = (e) => {
		this.props.handleClickNav(e.target.getAttribute('data-key'));
	};

	navegador() {
		let paginas = Math.ceil(this.props.totalInt / this.props.elementos);
		let actual = parseInt(this.props.page, 10);
		let prev = actual - 2;
		let next = actual + 2;
		var navNum = [];
		if (paginas <= 5) {
			for (let i = 1; i <= paginas; i++) {
				navNum = navNum.concat([
					<button key={i} className="pagButton" onClick={this.handleClick} data-key={i}>
						{i}
					</button>
				]);
			}
		} else {
			if (actual > 3) {
				if (next < paginas) {
					for (let i = prev; i <= next; i++) {
						navNum = navNum.concat([
							<button key={i} className="pagButton" onClick={this.handleClick} data-key={i}>
								{i}
							</button>
						]);
					}
				} else {
					for (let i = paginas - 4; i <= paginas; i++) {
						navNum = navNum.concat([
							<button key={i} className="pagButton" onClick={this.handleClick} data-key={i}>
								{i}
							</button>
						]);
					}
				}
			} else {
				for (let i = 1; i <= 5; i++) {
					navNum = navNum.concat([
						<button key={i} className="pagButton" onClick={this.handleClick} data-key={i}>
							{i}
						</button>
					]);
				}
			}
		}
		let init = [
			<div key="init">
				<button className="pagButton pagButtonLeft" onClick={this.handleClick} data-key={-1}>
					START
				</button>
			</div>
		];
		let end = [
			<div key="end">
				<button className="pagButton pagButtonRight" onClick={this.handleClick} data-key={0}>
					END
				</button>
			</div>
		];
		let navControls = init.concat(navNum, end);
		return navControls;
	}

	render() {
		let card = (
			<div className="paginacionContainer">
				<div className="paginacion">{this.navegador()}</div>
			</div>
		);
		return card;
	}
}
