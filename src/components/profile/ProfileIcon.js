import React from 'react';
import { ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import {withRouter} from 'react-router-dom';
import { connect } from "react-redux";

import { isSignOutAction } from "../../actions";
import './Profile.css';

const mapStateToProps=state=>{
	return {
    // Elección del tipo de interrupción
	}
}

const mapDispatchToProps=(dispatch)=>{
	return{
    // Elección del tipo de interrupción
    onSignOutApproved: ()=> dispatch(isSignOutAction(false)),
	}
}

class ProfileIcon extends React.Component{
  constructor(props){
    super(props);

    this.state={
      dropdownOpen: false
    };
  }

  toggle=()=> {
    this.setState({
      dropdownOpen: !this.state.dropdownOpen
    });
  }
  onSingOutSubmit=(event)=>{
    event.preventDefault();
    window.localStorage.removeItem("token")||window.sessionStorage.removeItem("token")
    this.props.onSignOutApproved()
    this.props.history.push('/');
    // return <Redirect to="/" push={true} />
  }

  render(){
    return(
      <div className="pa4 tc">
         <ButtonDropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
            <DropdownToggle
              tag="span"
              data-toggle="dropdown"
              aria-expanded={this.state.dropdownOpen}
            >
                <img
                    src="http://tachyons.io/img/logo.jpg"
                    className="br-100 ba h3 w3 dib avatar" alt="avatar" />
            </DropdownToggle>
            <DropdownMenu 
              right
              className='b--transparent shadow-5 dropDownMenu'
              style={{backgroundColor: "rgba(255,255,255,0.5)", zIndex:"1"} }
            >
              <DropdownItem onClick={this.props.toogleModal}>View Profile</DropdownItem>
              <br/>
              <DropdownItem onClick={this.onSingOutSubmit}>Sign Out</DropdownItem>
            </DropdownMenu>
          </ButtonDropdown>

      </div>
    );
  }
}

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(ProfileIcon));