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
  addRadioBaseAction,
  addRadioBaseIDAction,
  interruptionIdBsAction,
  interruptionServicesRemoveAllActions,
  interruptionTechnologyRemoveAllActions,
  removeAllRadioBaseAction,
  // removeAllRadioBaseIDAction
} from '../../../actions';
import {connect} from 'react-redux';
import {Redirect, withRouter} from 'react-router-dom';
import axios from 'axios';
import { API_URL } from "../../../config";

// import InterruptionAddress from '../../../components/Operators/InterruptionAddress';
import InterruptionRadioBases from '../../../components/Operators/InterruptionRadioBases';
import InterruptionDate from '../../../components/Operators/InterruptionDate';
import InterruptionCauses from '../../../components/Operators/InterruptionCauses';
import InterruptionFiles from '../../../components/Operators/InterruptionFiles';
import RadioBase from "../../../components/Operators/radioBase";

import '../Operators.css'

const mapStateToProps=state=>{
	return {
    // Elección del tipo de interrupción
    interruptionType: state.interruptionTypeReducer.interruptionType,
    interruptionRB: state.interruptionAddressReducer,
    interruptionDate: state.interruptionDateReducer,
    interruptionCauses: state.interruptionCausesReducer,
    interruptionServices: state.interruptionServicesReducer.interruptionServices,
    interruptionLevel: state.interruptionAddressReducer.interruptionLevel,
    interruptionTechnologies: state.interruptionTechnologiesReducer.interruptionTechnologies,
    interruptionRadioBase: state.radioBasesAddReducer,
    // interruptionSector: state.interruptionAddressReducer.interruptionSector,
    interruptionProvince: state.reducerSuggestProvincia.value,
    interruptionCanton: state.reducerSuggestCanton.value,
    interruptionParish: state.reducerSuggestParish.value,
    sessionController: state.sessionReducer.dataUser
	}
}
const mapDispatchToProps=(dispatch)=>{
	return{
    // Elección del tipo de interrupción
    onSubmitInterruptionType: (type)=> dispatch(interruptionTypeAction(type)),
    onSubmitInterruptionComplete: ()=>dispatch(interruptionSubmitedAction()),
    onSignInApproved: ()=> dispatch(isSignInAction(true)),
    onReceiveDataUser: (data)=>dispatch(receiveDataUserAction(data)),
    onReceiveRadioBase: (id,data)=>dispatch(addRadioBaseAction(id,data)),
    onReceiveRadioBaseID: (id,data)=>dispatch(addRadioBaseIDAction(id,data)),
    onReceiveRadioBaseIdRemove:(data)=>dispatch(interruptionIdBsAction(data)),
    onRemoveAllServices: ()=>dispatch(interruptionServicesRemoveAllActions()),
    onRemoveAllTechnologies: ()=>dispatch(interruptionTechnologyRemoveAllActions()),
    onRemoveAllRadioBases: ()=>dispatch(removeAllRadioBaseAction()),
    // onRemoveAllRadioBasesID: ()=>dispatch(removeAllRadioBaseIDAction())
    
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
                      if(this.props.sessionController.id_rol===2){
                        document.getElementById("buttonTypeR").style.background=this.props.interruptionType==='Random'?'rgba(255,255,255,0.5)':'#2E2E2E';
                        document.getElementById("buttonTypeR").style.color=this.props.interruptionType==='Random'?'#2E2E2E':'rgba(255,255,255,0.5)';;
                        document.getElementById("buttonTypeS").style.background=this.props.interruptionType==='Random'?'#2E2E2E':'rgba(255,255,255,0.5)';
                        document.getElementById("buttonTypeS").style.color=this.props.interruptionType==='Random'?'rgba(255,255,255,0.5)':'#2E2E2E';
                      }
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
    if(this.props.sessionController.id_rol===2){
      document.getElementById("buttonTypeR").style.background=nextProps.interruptionType==='Random'?'rgba(255,255,255,0.5)':'#2E2E2E';
      document.getElementById("buttonTypeR").style.color=nextProps.interruptionType==='Random'?'#2E2E2E':'rgba(255,255,255,0.5)';;
      document.getElementById("buttonTypeS").style.background=nextProps.interruptionType==='Random'?'#2E2E2E':'rgba(255,255,255,0.5)';
      document.getElementById("buttonTypeS").style.color=nextProps.interruptionType==='Random'?'rgba(255,255,255,0.5)':'#2E2E2E';
    }
  }
  handleSubmit=async(event)=>{
    event.preventDefault();
    const {
      interruptionType,
      interruptionDate,
      interruptionCauses,
      interruptionRadioBase,
      interruptionServices,
      interruptionTechnologies,
      // interruptionSector,
      // interruptionLevel,
      interruptionProvince,
      interruptionCanton,
      interruptionParish,
      interruptionRB
    }=this.props
    var probe=interruptionType==='Scheduled'?interruptionDate.interruptionTime.split(':').map((item)=>item<0?false:true):[]
    if(probe.indexOf(false) !== -1)  return alert('Fechas Invalida')
    if(interruptionRB.interruptionLevel.length===0) return alert('Seleccione al menos una tecnologia afectada')
    var keys={
        interruptionType,
        // interruptionSector,
        interruptionDate,
        interruptionCauses,
        interruptionServices,
        interruptionTechnologies,
        interruptionRadioBase,
        // interruptionLevel,
        interruptionProvince,
        interruptionCanton,
        interruptionParish,
        interruptionIdUser: this.props.sessionController.id_user,
        interruptionRB
    }
    axios.post(`${API_URL}/radioBases/newInterruption`,keys)
      .then(resp=>{
        console.log(resp.data,'realizando test');
        this.props.onSubmitInterruptionComplete();
        this.props.onRemoveAllServices();
        this.props.onRemoveAllRadioBases();
        this.props.onRemoveAllTechnologies();
        this.setState((prevState) => ({ submitForm: !prevState.submitForm }))
      })
      .catch(err=>alert(err))
  }
  handleSubmitTest=async(event)=> {
    event.preventDefault();
    // const {interruptionType,interruptionRB,interruptionDate,interruptionCauses,interruptionRadioBase,interruptionServices}=this.props
    const {interruptionType,interruptionDate,interruptionCauses,interruptionRadioBase,interruptionServices,interruptionTechnologies,interruptionSector}=this.props
    var probe=interruptionType==='Scheduled'?interruptionDate.interruptionTime.split(':').map((item)=>item<0?false:true):[]
    if(probe.indexOf(false) !== -1)  return alert('Fechas Invalida')
    var keys={
        interruptionType,
        interruptionSector,
        interruptionDate,
        interruptionCauses,
        interruptionServices,
        interruptionTechnologies,
        interruptionRadioBase,
        interruptionIdUser: this.props.sessionController.id_user
    }
    axios.post(`${API_URL}/radioBases/newInterruption`,keys)
      .then(resp=>{
        console.log(resp.data);
        this.props.onSubmitInterruptionComplete();
        this.props.onRemoveAllServices();
        this.props.onRemoveAllRadioBases();
        this.setState((prevState) => ({ submitForm: !prevState.submitForm }))
      })
      .catch(err=>alert(err))
      // .catch(err=>alert(err.response.data))
    // axios.get(`http://192.168.1.140:3000/radioBases?province=${interruptionRB.interruptionProvince}`)
    //   .then(resp=>{console.log(resp.data)})
    //   .catch(console.log)
    // this.setState((prevState) => ({ submitForm: !prevState.submitForm }))
  }
  cancel=()=>{
    this.setState((prevState) => ({ submitForm: !prevState.submitForm }))
  }
  handleAddRadioBase=()=>{
    //Version 1
    // const {interruptionCode,interruptionIdBs}=this.props.interruptionRB;
    // console.log('hola',this.props.interruptionRB, interruptionIdBs)
    // axios.post(`${API_URL}/radioBases/getRadioBasesCellId`,{interruptionIdBs})
    //   .then(data=>{console.log(data)})
    // this.props.onReceiveRadioBase(interruptionCode,this.props.interruptionRB);
    //Version 1
    // this.props.onReceiveRadioBaseIdRemove(null)
    //Version 1
    if(this.props.interruptionTechnologies.length){
      const { interruptionProvince,interruptionCanton,interruptionParish}=this.props;
      const id_usuario=this.props.sessionController.id_user;
      const nivel_interrupcion=this.props.interruptionLevel;
      const location={provincia:interruptionProvince,canton:interruptionCanton,parroquia: interruptionParish};
      axios.post(`${API_URL}/radioBases/getRadioBasesForLocation?id_user=${id_usuario}`,{
        nivel_interrupcion:nivel_interrupcion,
        location:location,
        tecnologias_afectadas:this.props.interruptionTechnologies
      }
      )
      .then(data=>{
        console.log(data.data,'fjhk??')
        data.data.codigo_estacion.map((estacion=>{
          return this.props.onReceiveRadioBase(estacion.cod_est,estacion)
        }));
        // data.data.cell_ids.map((estacion=>{
        //   this.props.onReceiveRadioBaseID(estacion.cod_est+estacion.id_bs,estacion)
        // }))
      })
      .catch(error=>{console.log(error)})
    }else{
      alert('Seleccion una RB')
    }
  }
  getContentFromPage=()=>{
    const {onSubmitInterruptionType}=this.props;
    const dataRb=this.props.interruptionRadioBase.radioBasesAdd;
    if(this.props.sessionController.id_rol===2){
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
                <h6 className="card-header containerADD"><div>Radio Base</div><a><i onClick={this.handleAddRadioBase} className="addButton fas fa-plus-square"></i></a></h6>
                {/* <InterruptionAddress className="itemContainer card-body" /> */}
                <InterruptionRadioBases className="itemContainer card-body" />
              </div>
              <div className="card cardInput"> 
                <h6 className="card-header">Resumen</h6>
                {/* {this.handleMapRadioBases} */}
                <div className='card-body miniCards'>
                  {console.log(this.props.interruptionRadioBase)}
                  {Object.keys(dataRb).map(function(key, index) {

                    return <RadioBase key={key} data={dataRb[key]}/>
                    // return this.props.interruptionRadioBase[key];
                  })}
                </div>
              </div>
              <div className="card cardInput">
                <h6 className="card-header">Descripción</h6>
                <InterruptionCauses className="itemContainer" />
              </div>
              <div className="card cardInput">
                <h6 className="card-header">Fecha</h6>
                <InterruptionDate className="itemContainer" />

                <InterruptionFiles />
              </div>
              {/* <div className="card cardInput">
                <h6 className="card-header">Anexos</h6>
                <div className="itemContainer">
                  <InterruptionFiles />
                </div>
              </div> */}
            </div>
            <div className="submitsButtons">
              <button type="submit" id="buttonTypeS" className="buttonSubmits" ><i className="fas fa-save"></i> Save</button>
              <button type="button" id="buttonTypeS" className="buttonSubmits" onClick={this.cancel} ><i className="fas fa-ban"></i> Cancel</button>
              {this.state.submitForm && <Redirect to="/" push={true} />}
            </div>
          </div>
        </form>
      )
    }else{
      return(
        // <Redirect to="/" push={true} />
        <div>
          Wait or Redirect
        </div>
      )
    }
  }

  render(){
    // const {onSubmitInterruptionType}=this.props;
    // const dataRb=this.props.interruptionRadioBase.radioBasesAdd;
    return(
      this.getContentFromPage()
    )
  }
};

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(AddReport));