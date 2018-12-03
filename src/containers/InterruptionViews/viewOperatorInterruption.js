import React from 'react';
import { connect } from "react-redux";
import io from "socket.io-client";
import {withRouter} from 'react-router-dom';
// import  moment from 'moment';
import { 
  requestInterruptionFetchAction,
  isSignInAction,
  receiveDataUserAction
 } from "../../actions";

import { API_URL } from "../../config";

import InterruptionView from "../../components/viewInterruptions/viewOperatorInterruption";

import './style.css';

const mapStateToProps=state=>{
	return {
    interruptionData: state.requestInterruptionDataReducer,
    interruptionViewSelected: state.interruptionViewReducer.interruptionView,
    sessionController: state.sessionReducer.dataUser
	}
}
const mapDispatchToProps=(dispatch)=>{
	return{
    onRequestDataInterruption: (id_interruption,id_user)=>dispatch(requestInterruptionFetchAction(id_interruption,id_user)),
    onSignInApproved: ()=> dispatch(isSignInAction(true)),
    onReceiveDataUser: (data)=>dispatch(receiveDataUserAction(data)),
	}
}

class InterruptionOperatorView extends React.Component{
  constructor(){
    super();
    this.state={
      isReceiveDataOfInterruption: false,
      time:"",
      showExternalHTML: false
    }
  }

  socketConnectionEnable=()=>{
    const socket = io.connect(`${API_URL}`,{path:'/socket'});
    // const socket = io.connect(`${API_URL}/socket`);
    // console.log('this', socket, API_URL)
    socket.on('connect',function(){
        console.log('Conectado al Servidor')
    })
    socket.on('disconnect',function(){
        console.log('Perdimos la conexion al server')
    })
    socket.on('message',(data)=>{
        console.log('llego :' , data)
    })
    socket.emit('echo','Es el Socket')
    socket.emit('temir',"testk")
    socket.emit('interruptionSelected',{interruption:this.props.interruptionViewSelected})
    socket.on('timer',(time)=>{
      var time_=time.countdown.split(':').map((item,index)=>{
        switch (index){
          case 0:
            return `${item} h `
          case 1:
            return `${item} min `
          default:
            return `${item} seg`
        }
      })
      this.setState({time: time_})
      // console.log(time,'pepejj')
    })

    socket.on('update',data=>{console.log('si leyo ',data)})
    socket.on("FromAPI", data => this.setState({ response: data }));    
  }

  componentDidMount=async()=>{
    const token = window.sessionStorage.getItem('token')||window.localStorage.getItem('token');
    if(token){
      if(this.props.interruptionViewSelected){
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
                      // console.log(user,this.props.interruptionData,this.props.interruptionViewSelected,'.../.a/')
                      this.props.onRequestDataInterruption(this.props.interruptionViewSelected,user.id_user)
                      this.setState({isReceiveDataOfInterruption:true})
                      this.socketConnectionEnable()
                      // try{
                      //   var testd=
                      //   document.getElementById("infoContainerI")
                      //   console.log(testd)
                      //   testd.innerHTML(this.getHtml())
                      // }catch(e){
                      //   alert('g')
                      // }
                    }
                    else{
                      this.props.history.push('/listas');
                    }
                })
            }
        })
        .catch(err=>{
          // this.props.history.push('/');
          console.log('Aqui un error', err)
        })
      }else{
        this.props.history.push('/listas');
      }
      
    }else{
      this.props.history.push('/');
    }
  }
  getHtml=()=>{
    var a=document.getElementById('infoContainerI')
    a.innerHTML(
      `
    <style type="text/css">
    * { box-sizing: border-box; }
  body {
  }
  .container{
    display: block;
    margin: 0;
    padding: 0;
  }
  p{
    font-size: 11pt;
  }
  .info{
    display: flex;
    flex-direction: column;
    width: 100%;
    text-align: center;
    align-content: center;
    align-items: center;
  }
  .info table,.info td,.info td {
      border: 1px solid black;
      border-collapse: collapse;
    }
    
  </style>
  
  <html>
    <body>
      <p>
        <strong>
          INFORME SOBRE LA INTERRUPCIÓN PROGRAMADA DEL SERVICIO MÓVIL AVANZADO DE LA OPERADORA CONECEL, OCURRIDA EL DÍA , EN LAS POBLACIONES CHORDELEG, GUALACEO, SIGSIG, DE LA PROVINCIA AZUAY.
        </strong>
      </p>
  
      <ol>
        <li>
          <strong>DATOS GENERALES</strong>
          <table style="width:80%; font-size:12px;">
            <tr>
              <td><strong>OPERADORA:</strong></td>
              <td>OTECEL S.A.</td>
            </tr>
            <tr>
              <td><strong>RUC:</strong></td>
              <td>1791256115001</td>
            </tr>
            <tr>
              <td><strong>REPRESENTANTE LEGAL:</strong></td>
              <td>DONOSO ECHANIQUE ANDRES FRANCISCO</td>
            </tr>
            <tr>
              <td><strong>DIRECCION:</strong></td>
              <td>Vía a Nayón, complejo ECOPARK, Torre 3.</td>
            </tr>
            <tr>
              <td><strong>CIUDAD:</strong></td>
              <td>Quito</td>
            </tr>
            <tr>
              <td><strong>TELEFONO:</strong></td>
              <td>(02) 2227700</td>
            </tr>
            <tr>
              <td><strong>TIPO DE SERVICIO:</strong></td>
              <td>Servicios de telecomunicaciones: SMA</td>
            </tr>
            <tr>
              <td><strong>FECHA DE AUTORIZACION</strong></td>
              <td>20 de noviembre de 2008.</td>
            </tr>
          </table>
        </li>
        <br/>
        <li>
          <strong>ANTECEDENTES</strong>
          <p align="justify">
            Mediante correo electrónico el día 12 MAYO DE 2018 a las 18:00 remitido a las direcciones dcsintsma@arcotel.gob.ec, y cz6intsma@arcotel.gob.ec, la operadora de servicio móvil avanzado CONECEL. notificó a la Agencia de Regulación y Control de las Telecomunicaciones, que el día  a partir de las 14:00 aproximadamente, debido a causas aún no establecidas, tienen “afectación” del servicio brindado por CONECEL. en las poblaciones CHORDELEG, GUALACEO, SIGSIG, de la provincia AZUAY.
            <br/>
            <br/>
            Con correo electrónico, el día 13 MAYO DE 2018 a las 13:00, CONECEL. reportó que el servicio se restableció a la normalidad aproximadamente a las 13 MAYO DE 2018, (duración de la interrupción 18 minutos) y que se hará llegar el informe con los detalles y sustentos técnicos en los próximos días. 
            <br/>
            <br/>
            Con oficio "Nro. GR-1332-2018" de 20 MAYO DE 2018, ingresado a la Agencia de Regulación y Control de las Telecomunicaciones el día 20 MAYO DE 2018 con número de trámite ARCOTEL-DEDA-2018-013888-E, CONECEL S.A. presentó el informe técnico sobre el evento ocurrido el día  indicando que el mismo fue ocasionado "por problemas de atenuación del enlace de fibra óptica ZAMORACEN – YANTZAZACEN, debido a fallas en el patch cord del enlace desde el lado de ZAMORACEN. En el oficio GR- 1332-2018 se presenta además una cronología del evento ocurrido, la descripción de las acciones tomadas para su solución, el diagrama esquemático de conexión de la ruta afectada."
          </p>
        </li>
        <br />
        <li>
          <strong>OBJETIVO</strong>
          <p>
            Establecer si la interrupción programada del servicio móvil avanzado de 	OTECEL S.A., se efectuó acorde a lo comunicado a la ARCOTEL y bajo el procedimiento establecido en el numeral 34.5 de la cláusula 34 del contrato de concesión de servicio.
          </p>
        </li>
        <br />
        <li>
          Conclusiones
        </li>
        <br/>
        <li>
          Recomendaciones
        </li>
      </ol>
      <strong>Informe realizado por:</strong>
      <div class="info">
        <div style="padding-top:60px;">Ing. Esteban Andrade Guerrero</div>
        <strong>PROFESIONAL TECNICO 1</strong>
        <br/>
        <table style="width:70%; font-size:12px; align-self:center; align='center'">
          <tr>
            <td>Informe supervizado por:</td>
            <td>APROBADO POR:</td>
          </tr>
          <tr>
            <td>
              <div style="padding-top:50px;">Ing. Wilson Penafiel Palacios</div>
              <strong>PROFESIONAL TECNICO 3</strong>
            </td>
            <td>
              <div style="padding-top:50px;">Ing. Edgar Ochoa FIgueroa</div>
              <strong>DIRECTOR TECNICO ZONAL 6</strong>
            </td>
          </tr>
          
        </table>
      </div>
    </body>
  </html>
    `
    )
  }

  getInfoInterruption=()=>{
    // const {data}= this.props.interruptionData.ID;
    if(this.props.interruptionData.ID.data.data){
      return <div className="containerInterruption">
        <InterruptionView />
        <div className="cardInfoInterruption">
          mundo 
        </div>
        <div className="cardInfoInterruption">
          Javascript
        </div>
      </div>
    }else{
      return <div>
        <h1>
          Sorry Somethin Fail
        </h1>
      </div>
    }
  }
  toggleExternalHTML=()=>{
    this.setState({showExternalHTML: !this.state.showExternalHTML});
  }
  
  createMarkup=()=> { 
    return {__html: 
      `<style type="text/css">
      * { box-sizing: border-box; }
    body {
      
    }
    .container{
      display: block;
      margin: 0;
      padding: 0;
    }
    p{
      font-size: 11pt;
    }
    .info{
      display: flex;
      flex-direction: column;
      width: 100%;
      text-align: center;
      align-content: center;
      align-items: center;
    }
    .info table,.info td,.info td {
        border: 1px solid black;
        border-collapse: collapse;
      }
      
    </style>
    
    <html>
      <body>
        <p>
          <strong>
            INFORME SOBRE LA INTERRUPCIÓN PROGRAMADA DEL SERVICIO MÓVIL AVANZADO DE LA OPERADORA CONECEL, OCURRIDA EL DÍA , EN LAS POBLACIONES CHORDELEG, GUALACEO, SIGSIG, DE LA PROVINCIA AZUAY.
          </strong>
        </p>
    
        <ol>
          <li>
            <strong>DATOS GENERALES</strong>
            <table style="width:80%; font-size:12px;">
              <tr>
                <td><strong>OPERADORA:</strong></td>
                <td>OTECEL S.A.</td>
              </tr>
              <tr>
                <td><strong>RUC:</strong></td>
                <td>1791256115001</td>
              </tr>
              <tr>
                <td><strong>REPRESENTANTE LEGAL:</strong></td>
                <td>DONOSO ECHANIQUE ANDRES FRANCISCO</td>
              </tr>
              <tr>
                <td><strong>DIRECCION:</strong></td>
                <td>Vía a Nayón, complejo ECOPARK, Torre 3.</td>
              </tr>
              <tr>
                <td><strong>CIUDAD:</strong></td>
                <td>Quito</td>
              </tr>
              <tr>
                <td><strong>TELEFONO:</strong></td>
                <td>(02) 2227700</td>
              </tr>
              <tr>
                <td><strong>TIPO DE SERVICIO:</strong></td>
                <td>Servicios de telecomunicaciones: SMA</td>
              </tr>
              <tr>
                <td><strong>FECHA DE AUTORIZACION</strong></td>
                <td>20 de noviembre de 2008.</td>
              </tr>
            </table>
          </li>
          <br/>
          <li>
            <strong>ANTECEDENTES</strong>
            <p align="justify">
              Mediante correo electrónico el día 12 MAYO DE 2018 a las 18:00 remitido a las direcciones dcsintsma@arcotel.gob.ec, y cz6intsma@arcotel.gob.ec, la operadora de servicio móvil avanzado CONECEL. notificó a la Agencia de Regulación y Control de las Telecomunicaciones, que el día  a partir de las 14:00 aproximadamente, debido a causas aún no establecidas, tienen “afectación” del servicio brindado por CONECEL. en las poblaciones CHORDELEG, GUALACEO, SIGSIG, de la provincia AZUAY.
              <br/>
              <br/>
              Con correo electrónico, el día 13 MAYO DE 2018 a las 13:00, CONECEL. reportó que el servicio se restableció a la normalidad aproximadamente a las 13 MAYO DE 2018, (duración de la interrupción 18 minutos) y que se hará llegar el informe con los detalles y sustentos técnicos en los próximos días. 
              <br/>
              <br/>
              Con oficio "Nro. GR-1332-2018" de 20 MAYO DE 2018, ingresado a la Agencia de Regulación y Control de las Telecomunicaciones el día 20 MAYO DE 2018 con número de trámite ARCOTEL-DEDA-2018-013888-E, CONECEL S.A. presentó el informe técnico sobre el evento ocurrido el día  indicando que el mismo fue ocasionado "por problemas de atenuación del enlace de fibra óptica ZAMORACEN – YANTZAZACEN, debido a fallas en el patch cord del enlace desde el lado de ZAMORACEN. En el oficio GR- 1332-2018 se presenta además una cronología del evento ocurrido, la descripción de las acciones tomadas para su solución, el diagrama esquemático de conexión de la ruta afectada."
            </p>
          </li>
          <br />
          <li>
            <strong>OBJETIVO</strong>
            <p>
              Establecer si la interrupción programada del servicio móvil avanzado de 	OTECEL S.A., se efectuó acorde a lo comunicado a la ARCOTEL y bajo el procedimiento establecido en el numeral 34.5 de la cláusula 34 del contrato de concesión de servicio.
            </p>
          </li>
          <br />
          <li>
            Conclusiones
          </li>
          <br/>
          <li>
            Recomendaciones
          </li>
        </ol>
        <strong>Informe realizado por:</strong>
        <div class="info">
          <div style="padding-top:60px;">Ing. Esteban Andrade Guerrero</div>
          <strong>PROFESIONAL TECNICO 1</strong>
          <br/>
          <table style="width:70%; font-size:12px; align-self:center; align='center'">
            <tr>
              <td>Informe supervizado por:</td>
              <td>APROBADO POR:</td>
            </tr>
            <tr>
              <td>
                <div style="padding-top:50px;">Ing. Wilson Penafiel Palacios</div>
                <strong>PROFESIONAL TECNICO 3</strong>
              </td>
              <td>
                <div style="padding-top:50px;">Ing. Edgar Ochoa FIgueroa</div>
                <strong>DIRECTOR TECNICO ZONAL 6</strong>
              </td>
            </tr>
            
          </table>
        </div>
      </body>
    </html>
      `
    };
  }
  render(){
    // console.log('77hhh',this.props.interruptionData)
    // const {data}= this.props.interruptionData.ID;
    // const infoInt=data.data;
    // console.log(data,'h/?',data.data,'?j',infoInt,this.state.isReceiveDataOfInterruption)
    return(
      this.getInfoInterruption()
    )
  }
}

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(InterruptionOperatorView))

//save
// {/* <div className="containerTitle">
//   {<h1>{data.data.tipo}</h1>}
// </div>
// <div>
//   <h1>
//     Informacion de la interrupcion
//   </h1>
//     Fecha inicio: {data.data.fecha_inicio}
//     Fecha FIn: {data.data.fecha_fin}
//   <h1>
//     Causas
//   </h1>
//   <h2>
//     {data.data.causa}
//   </h2>
//   <h3>
//     {this.state.time}
//   </h3>
//   </div>
//   {/* <button onClick={this.getHtml}>Test</button> */}
//   <div>
//   <button onClick={this.toggleExternalHTML}>Toggle Html</button>
//   {this.state.showExternalHTML ? <div>
//       <div dangerouslySetInnerHTML={this.createMarkup()} ></div>
//     </div> : null}
//   </div> */}