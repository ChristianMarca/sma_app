import React from 'react';
import { connect } from "react-redux";

import './style.css';

const mapStateToProps=state=>{
	return {
    // Elección del tipo de interrupción
    sessionData: state.sessionReducer,
	}
}
const mapDispatchToProps=(dispatch)=>{
	return{
    
	}
}

class InfoCard extends React.Component{

  render(){
    return(
      <div className="infoCardContainer">
        <h1>
          Bienvenido
          <hr/>
          <p>{this.props.sessionData.dataUser.username}</p>
        </h1>
      </div>
    )
  }

}

export default connect(mapStateToProps,mapDispatchToProps)(InfoCard);