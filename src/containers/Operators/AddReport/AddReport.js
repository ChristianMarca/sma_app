//#########################################################################################
//#########################################################################################
//#########################################################################################
//El componente AddReport realiza la función de: Recibir las parametros del formulario y validar parea el envío al servidor
//            Autor: Christian Marca
//            Fecha de Creación: 25/09/2018
//            Fecha de Ultima Modificación:----------
//            Descripción: Es el contenedor de los componentes de fomulario y permite la valudación de la información antes de ser cargada al servidor para procegir el proceso de el amnejo de la interrupción
//            inputs: Campos de información de la interrupción
//            outputs: Objeto con la información del formulario pasada por primera verificación de datos
//            methods: Reducers de comabio de estado
//            resumen: Toma la entrada del usuario y genera un objeto con datos validos para el envío hacia el servidor.
//#########################################################################################
//#########################################################################################
//#########################################################################################
//AddReport

import React from 'react';
import { interruptionTypeAction,
  interruptionSubmitedAction,
  isSignInAction,
  receiveDataUserAction,
} from '../../../actions';
import {connect} from 'react-redux';
import {Redirect, withRouter} from 'react-router-dom';
import axios from 'axios';
import { API_URL } from "../../../config";

import InterruptionAddress from '../../../components/Operators/InterruptionAddress';
import InterruptionDate from '../../../components/Operators/InterruptionDate';
import InterruptionCauses from '../../../components/Operators/InterruptionCauses';
import InterruptionFiles from '../../../components/Operators/InterruptionFiles';

import '../Operators.css'

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
    onSubmitInterruptionType: (type)=> dispatch(interruptionTypeAction(type)),
    onSubmitInterruptionComplete: ()=>dispatch(interruptionSubmitedAction()),
    onSignInApproved: ()=> dispatch(isSignInAction(true)),
    onReceiveDataUser: (data)=>dispatch(receiveDataUserAction(data))
	}
}

class AddReport extends React.Component{
  constructor(){
    super();
    this.state={
      submitForm:false,
    }
  }
  componentDidMount(){
    const token = window.sessionStorage.getItem('token')||window.localStorage.getItem('token');
    if(token){
      fetch(`${API_URL}/authentication/signin`,{
          method: 'post',
          headers: {
              'Content-Type': 'application/json',
              'authorization': token
          },
      })
      .then(resp=>resp.json())
      .then(data=>{
          if( data && data.id_user){
              fetch(`${API_URL}/authentication/profile/${data.id_user}`,{
              method: 'GET',
              headers: {
                  'Content-Type': 'application/json',
                  'authorization': token
              },
              })
              .then(resp=>resp.json())
              .then(user=>{
                  console.log('adqui esta',user)
                  if (user && user.email){
                    console.log(user, 'continueWithToken')
                    this.props.onSignInApproved();
                    this.props.onReceiveDataUser(user);

                      // this.loadUser(user);
                      // this.onRouteChange('Home')
                      document.getElementById("buttonTypeR").style.background=this.props.interruptionType==='Random'?'rgba(255,255,255,0.5)':'#2E2E2E';
                      document.getElementById("buttonTypeR").style.color=this.props.interruptionType==='Random'?'#2E2E2E':'rgba(255,255,255,0.5)';;
                      document.getElementById("buttonTypeS").style.background=this.props.interruptionType==='Random'?'#2E2E2E':'rgba(255,255,255,0.5)';
                      document.getElementById("buttonTypeS").style.color=this.props.interruptionType==='Random'?'rgba(255,255,255,0.5)':'#2E2E2E';
                  }
              })
          }
      })
      .catch(err=>{
        // this.props.history.push('/');
        console.log('Aqui un error', err)
      })
    }else{
      this.props.history.push('/');
    }
  }
  componentWillReceiveProps(nextProps){
    document.getElementById("buttonTypeR").style.background=nextProps.interruptionType==='Random'?'rgba(255,255,255,0.5)':'#2E2E2E';
    document.getElementById("buttonTypeR").style.color=nextProps.interruptionType==='Random'?'#2E2E2E':'rgba(255,255,255,0.5)';;
    document.getElementById("buttonTypeS").style.background=nextProps.interruptionType==='Random'?'#2E2E2E':'rgba(255,255,255,0.5)';
    document.getElementById("buttonTypeS").style.color=nextProps.interruptionType==='Random'?'rgba(255,255,255,0.5)':'#2E2E2E';
  }
  handleSubmit=async(event)=> {
    event.preventDefault();
    const {interruptionType,interruptionRB,interruptionDate,interruptionCauses}=this.props
    var probe=interruptionType==='Scheduled'?interruptionDate.interruptionTime.split(':').map((item)=>item<0?false:true):[]
    if(probe.indexOf(false) !== -1)  return alert('Fechas Invalida')
    var keys={
        interruptionType,
        interruptionRB,
        interruptionDate,
        interruptionCauses
    }
    axios.post(`${API_URL}/radioBases/newInterruption`,keys)
      .then(resp=>{
        console.log(resp.data);
        this.props.onSubmitInterruptionComplete()
        this.setState((prevState) => ({ submitForm: !prevState.submitForm }))
      })
      .catch(err=>alert(err.response.data))
    // axios.get(`http://192.168.1.140:3000/radioBases?province=${interruptionRB.interruptionProvince}`)
    //   .then(resp=>{console.log(resp.data)})
    //   .catch(console.log)
    // this.setState((prevState) => ({ submitForm: !prevState.submitForm }))
  }
  cancel=()=>{
    this.setState((prevState) => ({ submitForm: !prevState.submitForm }))
  }

  render(){
    const {onSubmitInterruptionType}=this.props;
    return(
 
      <form className="containeNewInterruption" onSubmit={this.handleSubmit}>

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

        <div className="bodyContainer">
          <div className="itemContainer">
            <div className="card-header newHeader">
              <h4>Agregar Nueva Interrupción</h4>
              <div className="typeButtons">
                  {/* <a className="">Tipo de interrupción</a> */}
                  <button type="button" id="buttonTypeS" className="buttonTypeRight" onClick={()=>onSubmitInterruptionType('Scheduled')} ><i className="far fa-calendar-alt"></i> Programada</button>
                  <button type="button" id="buttonTypeR" className="buttonTypeLeft" onClick={()=>onSubmitInterruptionType('Random')} ><i className="fas fa-random"></i>  Fortuita</button>
              </div>
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
              <div className="itemContainer">
                <InterruptionFiles />
              </div>
            </div>
          </div>
          <div className="submitsButtons">
            <button type="submit" id="buttonTypeS" className="buttonSubmits" ><i className="fas fa-save"></i> Save</button>
            <button type="button" id="buttonTypeS" className="buttonSubmits" onClick={this.cancel} ><i className="fas fa-ban"></i> Cancel</button>
            {this.state.submitForm && <Redirect to="/" push={true} />}
          </div>
        </div>
      </form>
    )
  }
};

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(AddReport));