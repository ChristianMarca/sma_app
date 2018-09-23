import React from 'react';
import { interruptionTypeAction} from '../../../actions';
import {connect} from 'react-redux';

import InterruptionAddress from '../../../components/Operators/InterruptionAddress';
import InterruptionDate from '../../../components/Operators/InterruptionDate';
import InterruptionCauses from '../../../components/Operators/InterruptionCauses';
import InterruptionFiles from '../../../components/Operators/InterruptionFiles'

import '../Operators.css'

const mapStateToProps=state=>{
	return {
    // Elección del tipo de interrupción
    interruptionType: state.interruptionTypeReducer.interruptionType,
	}
}
const mapDispatchToProps=(dispatch)=>{
	return{
    // Elección del tipo de interrupción
    onSubmitInterruptionType: (type)=> dispatch(interruptionTypeAction(type))
	}
}

class AddReport extends React.Component{
  constructor(){
    super();
    this.state={
      collapsar:false,
    }
  }
  componentDidMount(){
    document.getElementById("buttonTypeR").style.background=this.props.interruptionType==='Random'?'rgba(255,255,255,0.5)':'#2E2E2E';
    document.getElementById("buttonTypeR").style.color=this.props.interruptionType==='Random'?'#2E2E2E':'rgba(255,255,255,0.5)';;
    document.getElementById("buttonTypeS").style.background=this.props.interruptionType==='Random'?'#2E2E2E':'rgba(255,255,255,0.5)';
    document.getElementById("buttonTypeS").style.color=this.props.interruptionType==='Random'?'rgba(255,255,255,0.5)':'#2E2E2E';
  }
  componentWillReceiveProps(nextProps){
    document.getElementById("buttonTypeR").style.background=nextProps.interruptionType==='Random'?'rgba(255,255,255,0.5)':'#2E2E2E';
    document.getElementById("buttonTypeR").style.color=nextProps.interruptionType==='Random'?'#2E2E2E':'rgba(255,255,255,0.5)';;
    document.getElementById("buttonTypeS").style.background=nextProps.interruptionType==='Random'?'#2E2E2E':'rgba(255,255,255,0.5)';
    document.getElementById("buttonTypeS").style.color=nextProps.interruptionType==='Random'?'rgba(255,255,255,0.5)':'#2E2E2E';
  }
  changeNav=()=>{
    var x = document.getElementById("myTopnav");
    x.className === "listNav"?x.className += " responsive":x.className = "listNav";
    // if (x.className === "listNav") {
    //     x.className += " responsive";
    // } else {
    //     x.className = "listNav";
    // }
  }

  render(){
    const {onSubmitInterruptionType}=this.props;
    return(

      <div className="containeNewInterruption">

          {/* <ul className="listNav" id="myTopnav">
           <li className="headerItem active"><a className="ItemList">SMA</a></li>
            <li className="headerItem"><a className="ItemList"><i className="fas fa-chart-line"></i> Activity</a></li>
            <li className="headerItem"><a className="ItemList"><i className="fas fa-file-medical-alt"></i> Report</a></li>
            <li className="headerItem"><a className="ItemList"><i className="fas fa-chart-bar"></i> Stadistics</a></li>
            <li className="headerItem"><a className="ItemList"><i className="fas fa-map-marked-alt"></i> Maps</a></li>

            <li className="headerItemRight">
              <a className="searchItem">
                <input placeholder="search" className="search" />
                <i className="fas fa-search searchIcon"></i>
              </a>
            </li>
            <li className="itemName"><a className=""> Name</a></li>
            <li className="itemCollapse"><a className=""><img src="http://rocaldent.com.ve/rocaldent/public/images/image-not-found.png" alt="Avatar" className="avatar"/></a></li>
            <li className="icon headerItemRight" onClick={this.changeNav}>
              <i className="fas fa-bars"></i>
            </li>
          </ul> */}

        <div className="bodyContainer card">
          <div className="itemContainer">
            <div className="card-header newHeader">
              <h4>Agregar Nueva Interrupción</h4>
              <form className="typeButtons">
                  {/* <a className="">Tipo de interrupción</a> */}
                  <button type="button" id="buttonTypeS" className="buttonTypeRight" onClick={()=>onSubmitInterruptionType('Scheduled')} ><i className="far fa-calendar-alt"></i> Programada</button>
                  <button type="button" id="buttonTypeR" className="buttonTypeLeft" onClick={()=>onSubmitInterruptionType('Random')} ><i className="fas fa-random"></i>  Fortuita</button>
              </form>
            </div>
          </div>
          <div className="card-body cardComponents">
            <div className="card cardInput">
              <h6 className="card-header">Radio Base</h6>
              <InterruptionAddress className="itemContainer card-body" />
            </div>
            <div className="card cardInput">
              <h6 className="card-header">Fecha</h6>
              <InterruptionDate className="itemContainer" />
            </div>
            <div className="card cardInput">
              <h6 className="card-header">Descripción</h6>
              <InterruptionCauses className="itemContainer" />
            </div>
            <div className="card cardInput">
              <h6 className="card-header">Anexos</h6>
              <form className="itemContainer">
                <InterruptionFiles />
              </form>
            </div>
          </div>
          <div className="submitsButtons">
            <button type="submit" id="buttonTypeS" className="buttonSubmits" ><i className="fas fa-save"></i> Save</button>
            <button type="submit" id="buttonTypeS" className="buttonSubmits" ><i className="fas fa-ban"></i> Cancel</button>
          </div>
        </div>
      </div>
    )
  }
};

export default connect(mapStateToProps,mapDispatchToProps)(AddReport);