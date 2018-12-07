import React from 'react';
import { connect } from "react-redux";
import { removeRadioBaseAction
    // ,removeRadioBaseIDAction
   } from "../../actions";

import './interruption.css';

const mapStateToProps=state=>{
	return {
    // Elección del tipo de interrupción
    interruptionType: state.interruptionTypeReducer.interruptionType,
    interruptionRB: state.interruptionAddressReducer,
    interruptionDate: state.interruptionDateReducer,
    interruptionCauses: state.interruptionCausesReducer,
	}
}
const mapDispatchToProps=(dispatch)=>{
	return{
    // Elección del tipo de interrupción
    // onReceiveRadioBase: (id,data)=>dispatch(addRadioBaseAction(id,data)),
    onDeleteRadioBase: (id)=>dispatch(removeRadioBaseAction(id)),
    // onDeleteRadioBaseID: (id)=>dispatch(removeRadioBaseIDAction(id))
	}
}

class RadioBase extends React.Component{

  handleClose=(event)=>{
    // this.props.onDeleteRadioBase(this.props.data.interruptionCode)
    this.props.onDeleteRadioBase(this.props.data.cod_est);
    // this.props.onDeleteRadioBaseID(this.props.data.cod_est);
  }

  render(){
    const {data}=this.props;
    console.log('sads',data)
    return(
      // <div className="card-body">
      // <div className="containerCards">
        <div className="rbCard ">
          <div className="contentRB">
          {/* {data.interruptionCode} ~ {data.interruptionBS} ~ {data.interruptionParish} */}
          {data.cod_est}
            {/* <div className="itemCardRB">{data.interruptionCode}</div>
            <div className="itemCardRB">{data.interruptionBS}</div>
            <div className="itemCardRB">{data.interruptionParish}</div>  */}
          </div>
          <a href="#"><i href="#" onClick={this.handleClose} className="closeButton fas fa-times"></i></a>
        </div>
      // </div>
    )
  }

}

export default connect(mapStateToProps,mapDispatchToProps)(RadioBase);