import React from 'react';
import { connect } from "react-redux";
import { removeRadioBaseAction
   } from "../../actions";

import './interruption.css';

const mapStateToProps=state=>{
	return {
    interruptionType: state.interruptionTypeReducer.interruptionType,
    interruptionRB: state.interruptionAddressReducer,
    interruptionDate: state.interruptionDateReducer,
    interruptionCauses: state.interruptionCausesReducer,
	}
}
const mapDispatchToProps=(dispatch)=>{
	return{
    onDeleteRadioBase: (id)=>dispatch(removeRadioBaseAction(id)),
	}
}

class RadioBase extends React.Component{

  handleClose=(event)=>{
    this.props.onDeleteRadioBase(this.props.data.cod_est);
  }

  render(){
    const {data}=this.props;
    return(
        <div className="rbCard ">
          <div className="contentRB">
          {data.cod_est}
          </div>
          <button className="ButtonTag">
            <i onClick={this.handleClose} className="closeButton fas fa-times"></i>
          </button>
        </div>
    )
  }

}

export default connect(mapStateToProps,mapDispatchToProps)(RadioBase);