import React from 'react';
import { ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { API_URL } from '../../config';
import { isSignOutAction } from '../../actions';
import './Profile.css';

const mapStateToProps = (state) => {
	return {
		// Elección del tipo de interrupción
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		// Elección del tipo de interrupción
		onSignOutApproved: () => dispatch(isSignOutAction(false))
	};
};

class ProfileIcon extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			dropdownOpen: false
		};
	}

	toggle = () => {
		this.setState({
			dropdownOpen: !this.state.dropdownOpen
		});
	};
	onSingOutSubmit = (event) => {
		event.preventDefault();
		const token = window.sessionStorage.getItem('token') || window.localStorage.getItem('token');
		fetch(`${API_URL}/authentication/revokeToken`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				authorization: token
			}
		})
			.then((resp) => resp.json())
			// .then(console.log)
			.catch((error) => console.log({ Error: error }));
		window.localStorage.removeItem('token') || window.sessionStorage.removeItem('token');
		this.props.onSignOutApproved();
		this.props.history.push('/');
		// return <Redirect to="/" push={true} />
	};

	render() {
		return (
			<div className="pa4 tc">
				<ButtonDropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
					<DropdownToggle tag="span" data-toggle="dropdown" aria-expanded={this.state.dropdownOpen}>
						<img src="/images/avatar.svg" className="br-100 ba h3 w3 dib avatar" alt="avatar" />
					</DropdownToggle>
					<DropdownMenu
						right
						className="b--transparent shadow-5 dropDownMenu"
						style={{ backgroundColor: 'rgba(255,255,255,0.5)', zIndex: '1' }}
					>
						<DropdownItem onClick={this.props.toogleModal}>Ver Perfil</DropdownItem>
						<br />
						<DropdownItem onClick={this.onSingOutSubmit}>Sign Out</DropdownItem>
					</DropdownMenu>
				</ButtonDropdown>
			</div>
		);
	}
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ProfileIcon));
