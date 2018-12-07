import React from 'react';
import { connect } from "react-redux";
import io from "socket.io-client";
import {withRouter} from 'react-router-dom';
import { SortablePane, Pane } from 'react-sortable-pane';
import ContentEditable from "react-contenteditable";
import sanitizeHtml from "sanitize-html";
// import { DraftailEditor, BLOCK_TYPE, INLINE_STYLE,ENTITY_TYPE } from "draftail";
// import { convertFromHTML, convertToHTML } from "draft-convert"
// import { convertToRaw, convertFromRaw  } from "draft-js";
// import "draft-js/dist/Draft.css";
// import "draftail/dist/draftail.css";
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
    this.editorRef = React.createRef();
    this.state={
      isReceiveDataOfInterruption: false,
      time:"",
      showExternalHTML: false,
      isSortable:false,
      html: `<p>Hello <b>World</b> !</p><p>Paragraph 2</p>`,
      editable: true
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
                      this.setState({html: this.content})
                      // this.socketConnectionEnable()
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

  content1=`<p style="box-sizing: border-box; font-size: 11pt;word-wrap:break-word;">INFORME SOBRE LA INTERRUPCIÓN PROGRAMADA DEL SERVICIO MÓVIL AVANZADO DE LA OPERADORA CONECEL, OCURRIDA EL DÍA , EN LAS POBLACIONES CHORDELEG, GUALACEO, SIGSIG, DE LA PROVINCIA AZUAY.</p>`

  content=`<p style="box-sizing: border-box; font-size: 11pt; white-space: normal; text-align: justify;">
    <strong style="box-sizing: border-box; font-size: 11pt; white-space: normal; text-align: justify;">
      INFORME SOBRE LA INTERRUPCIÓN PROGRAMADA DEL SERVICIO MÓVIL AVANZADO DE LA OPERADORA CONECEL, OCURRIDA EL DÍA , EN LAS POBLACIONES CHORDELEG, GUALACEO, SIGSIG, DE LA PROVINCIA AZUAY.
    </strong>
  </p>

  <ol style="box-sizing: border-box;">
    <li style="box-sizing: border-box;">
      <strong style="box-sizing: border-box; font-size: 11pt; white-space: normal; text-align: justify;">DATOS GENERALES</strong>
      <table style="box-sizing: border-box; width: 80%; font-size: 12px;" width="80%">
        <tr style="box-sizing: border-box;">
          <td style="box-sizing: border-box;"><strong style="box-sizing: border-box; font-size: 11pt; white-space: normal; text-align: justify;">OPERADORA:</strong></td>
          <td style="box-sizing: border-box;">OTECEL S.A.</td>
        </tr>
        <tr style="box-sizing: border-box;">
          <td style="box-sizing: border-box;"><strong style="box-sizing: border-box; font-size: 11pt; white-space: normal; text-align: justify;">RUC:</strong></td>
          <td style="box-sizing: border-box;">1791256115001</td>
        </tr>
        <tr style="box-sizing: border-box;">
          <td style="box-sizing: border-box;"><strong style="box-sizing: border-box; font-size: 11pt; white-space: normal; text-align: justify;">REPRESENTANTE LEGAL:</strong></td>
          <td style="box-sizing: border-box;">DONOSO ECHANIQUE ANDRES FRANCISCO</td>
        </tr>
        <tr style="box-sizing: border-box;">
          <td style="box-sizing: border-box;"><strong style="box-sizing: border-box; font-size: 11pt; white-space: normal; text-align: justify;">DIRECCION:</strong></td>
          <td style="box-sizing: border-box;">Vía a Nayón, complejo ECOPARK, Torre 3.</td>
        </tr>
        <tr style="box-sizing: border-box;">
          <td style="box-sizing: border-box;"><strong style="box-sizing: border-box; font-size: 11pt; white-space: normal; text-align: justify;">CIUDAD:</strong></td>
          <td style="box-sizing: border-box;">Quito</td>
        </tr>
        <tr style="box-sizing: border-box;">
          <td style="box-sizing: border-box;"><strong style="box-sizing: border-box; font-size: 11pt; white-space: normal; text-align: justify;">TELEFONO:</strong></td>
          <td style="box-sizing: border-box;">(02) 2227700</td>
        </tr>
        <tr style="box-sizing: border-box;">
          <td style="box-sizing: border-box;"><strong style="box-sizing: border-box; font-size: 11pt; white-space: normal; text-align: justify;">TIPO DE SERVICIO:</strong></td>
          <td style="box-sizing: border-box;">Servicios de telecomunicaciones: SMA</td>
        </tr>
        <tr style="box-sizing: border-box;">
          <td style="box-sizing: border-box;"><strong style="box-sizing: border-box; font-size: 11pt; white-space: normal; text-align: justify;">FECHA DE AUTORIZACION</strong></td>
          <td style="box-sizing: border-box;">20 de noviembre de 2008.</td>
        </tr>
      </table>
    </li>
    <br style="box-sizing: border-box;">
    <li style="box-sizing: border-box;">
      <strong style="box-sizing: border-box; font-size: 11pt; white-space: normal; text-align: justify;">ANTECEDENTES</strong>
      <p align="justify" style="box-sizing: border-box; font-size: 11pt; white-space: normal; text-align: justify;">
        Mediante correo electrónico el día 12 MAYO DE 2018 a las 18:00 remitido a las direcciones dcsintsma@arcotel.gob.ec, y cz6intsma@arcotel.gob.ec, la operadora de servicio móvil avanzado CONECEL. notificó a la Agencia de Regulación y Control de las Telecomunicaciones, que el día  a partir de las 14:00 aproximadamente, debido a causas aún no establecidas, tienen “afectación” del servicio brindado por CONECEL. en las poblaciones CHORDELEG, GUALACEO, SIGSIG, de la provincia AZUAY.
        <br style="box-sizing: border-box;">
        <br style="box-sizing: border-box;">
        Con correo electrónico, el día 13 MAYO DE 2018 a las 13:00, CONECEL. reportó que el servicio se restableció a la normalidad aproximadamente a las 13 MAYO DE 2018, (duración de la interrupción 18 minutos) y que se hará llegar el informe con los detalles y sustentos técnicos en los próximos días. 
        <br style="box-sizing: border-box;">
        <br style="box-sizing: border-box;">
        Con oficio "Nro. GR-1332-2018" de 20 MAYO DE 2018, ingresado a la Agencia de Regulación y Control de las Telecomunicaciones el día 20 MAYO DE 2018 con número de trámite ARCOTEL-DEDA-2018-013888-E, CONECEL S.A. presentó el informe técnico sobre el evento ocurrido el día  indicando que el mismo fue ocasionado "por problemas de atenuación del enlace de fibra óptica ZAMORACEN – YANTZAZACEN, debido a fallas en el patch cord del enlace desde el lado de ZAMORACEN. En el oficio GR- 1332-2018 se presenta además una cronología del evento ocurrido, la descripción de las acciones tomadas para su solución, el diagrama esquemático de conexión de la ruta afectada."
      </p>
    </li>
    <br style="box-sizing: border-box;">
    <li style="box-sizing: border-box;">
      <strong style="box-sizing: border-box; font-size: 11pt; white-space: normal; text-align: justify;">OBJETIVO</strong>
      <p style="box-sizing: border-box; font-size: 11pt; white-space: normal; text-align: justify;">
        Establecer si la interrupción programada del servicio móvil avanzado de 	OTECEL S.A., se efectuó acorde a lo comunicado a la ARCOTEL y bajo el procedimiento establecido en el numeral 34.5 de la cláusula 34 del contrato de concesión de servicio.
      </p>
    </li>
    <br style="box-sizing: border-box;">
    <li style="box-sizing: border-box;">
      <strong style="box-sizing: border-box; font-size: 11pt; white-space: normal; text-align: justify;">
        Conclusiones
      </strong>
      <p style="box-sizing: border-box; font-size: 11pt; white-space: normal; text-align: justify;">
        Aquí las conclusiones
      </p>
    </li>
    <br style="box-sizing: border-box;">
    <li style="box-sizing: border-box;">
      <strong style="box-sizing: border-box; font-size: 11pt; white-space: normal; text-align: justify;">
        Recomendaciones
      </strong>
      <p style="box-sizing: border-box; font-size: 11pt; white-space: normal; text-align: justify;">
        Aquí las Recomendaciones
      </p>
    </li>
  </ol>
  <strong style="box-sizing: border-box; font-size: 11pt; white-space: normal; text-align: justify;">Informe realizado por:</strong>
  <div class="infoReport" style="box-sizing: border-box; display: flex; flex-direction: column; width: 100%; text-align: center; align-content: center; align-items: center; font-size: 11pt;">
    <div style="box-sizing: border-box; padding-top: 60px;">Ing. Esteban Andrade Guerrero</div>
    <strong style="box-sizing: border-box; font-size: 11pt; white-space: normal; text-align: justify;">PROFESIONAL TECNICO 1</strong>
    <br style="box-sizing: border-box;">
    <table style="box-sizing: border-box; border: 1px solid black; border-collapse: collapse; width: 70%; font-size: 12px; align-self: center;" width="70%">
      <tr style="box-sizing: border-box;">
        <td style="box-sizing: border-box; border: 1px solid black; border-collapse: collapse;">Informe supervizado por:</td>
        <td style="box-sizing: border-box; border: 1px solid black; border-collapse: collapse;">APROBADO POR:</td>
      </tr>
      <tr style="box-sizing: border-box;">
        <td style="box-sizing: border-box; border: 1px solid black; border-collapse: collapse;">
          <div style="box-sizing: border-box; padding-top: 50px;">Ing. Wilson Penafiel Palacios</div>
          <strong style="box-sizing: border-box; font-size: 11pt; white-space: normal; text-align: justify;">PROFESIONAL TECNICO 3</strong>
        </td>
        <td style="box-sizing: border-box; border: 1px solid black; border-collapse: collapse;">
          <div style="box-sizing: border-box; padding-top: 50px;">Ing. Edgar Ochoa FIgueroa</div>
          <strong style="box-sizing: border-box; font-size: 11pt; white-space: normal; text-align: justify;">DIRECTOR TECNICO ZONAL 6</strong>
        </td>
      </tr>
      
    </table>
  </div>
`

  paneStyle = {
    display: 'flex',
    alignItems: 'center',
    // justifyContent: 'center',
    // border: 'solid 1px #ddd',
    // backgroundColor: '#f0f0f0',
  };

  initDrag=(event)=>{
    if (event.ctrlKey) {
      this.setState({isSortable: true});
    } else {
      this.setState({isSortable: false});
    }
  }

  endDrag=()=>{
    this.setState({isSortable: false});
  }

  initial = JSON.parse(sessionStorage.getItem("draftail:content"))

  // onSave = (content) => {
  //   console.log("saving", content)
  //   sessionStorage.setItem("draftail:content", JSON.stringify(content))
  // }

  // fromHTML = (html) => {const a=convertToRaw(convertFromHTML(this.importerConfig)(html));
  //   console.log(a); return a;
  // }

  handleChange = evt => {
    this.setState({ html: evt.target.value });
  };

  sanitizeConf = {
    allowedTags: ["b", "i", "em", "strong", "a", "p", "h1","html","body","ol","li","table","tr","td","br","hr","div"],
    allowedAttributes: { a: ["href"],i:["style", "class"],em:["style", "class"],strong:["style", "class"],
      p:["style", "class"],h1:["style", "class"],html:["style", "class"],body:["style", "class"],ol:["style", "class"],
      li:["style", "class"],table:["style", "class"],tr:["style", "class"],td:["style", "class"]
      ,br:["style", "class"],hr:["style", "class"],div:["style", "class"] }
  };

  sanitize = () => {
    this.setState({ html: sanitizeHtml(this.state.html, this.sanitizeConf) });
  };

  toggleEditable = () => {
    this.setState({ editable: !this.state.editable });
  };

  // shouldComponentUpdate(nextProps, nextState) {
  //   if (this.state.html === nextState.html || !this.props.interruptionData.ID.data.data) {
  //     return false;
  //   } else {
  //     return true;
  //   }
  // }

  getInfoInterruption=()=>{
    // const {data}= this.props.interruptionData.ID;
    console.log('es re render')
    if(this.props.interruptionData.ID.data.data){
      return <div onDoubleClick={this.initDrag} className="containerInterruption">
      {/* return <div onMouseOver={this.initDrag} onMouseDown={this.initDrag} onMouseOut={this.endDrag} className="containerInterruption"> */}
      {/* // return <div className="containerInterruption"> */}
        <SortablePane className="viewInformation" direction="horizontal" margin={5} isSortable={this.state.isSortable}>
          <Pane key="interruptionView" defaultSize={{ width: '20%', height: '100%' }} style={this.paneStyle}>
            <div className="cardInfoInterruption viewInformation">
                <InterruptionView />
            </div>
          </Pane>
        <Pane key="interruptionReport" defaultSize={{ width: '59.2%', height: '100%' }} style={this.paneStyle}>
          <div className="cardInfoInterruption viewReport">
            <div className="containerHeaderFields">
              <div className="containerInputsHeader">
                <label className="field a-field a-field_a1 page__field">
                  <input className="field__input a-field__input" placeholder="Coordinación Zonal X" />
                  <span className="a-field__label-wrap">
                    <span className="a-field__label">Coordinación Zonal</span>
                  </span>
                </label>
                <label className="field a-field a-field_a1 page__field">
                  <input className="field__input a-field__input" placeholder="No. IT-CZXX-X-XXXX-XXXX" />
                  <span className="a-field__label-wrap">
                    <span className="a-field__label">Código de Informe</span>
                  </span>
                </label>
              </div>
              <div className="subjectContainer">
                <label className="field a-field a-field_a1 page__field">
                  {/* <span className="a-field__label-wrap"> */}
                    <span className="a-field__label__textarea">Asunto</span>
                  {/* </span> */}
                  <textarea className="field__input a-field__input" placeholder="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididuntut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitationullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor inreprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sintoccaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id estlaborum." />
                </label>
              </div>
            </div>
            <div className="editableReportContainer">
              <ContentEditable
                className="editableReport"
                innerRef={this.editorRef}
                tagName="pre"
                html={this.state.html} // innerHTML of the editable div
                disabled={!this.state.editable} // use true to disable edition
                onChange={this.handleChange} // handle innerHTML change
                onBlur={this.sanitize}
                style={{width:"100%"}}
              />
            </div>
          {/* <DraftailEditor
              rawContentState={this.initial || null}
              onSave={this.onSave}
              blockTypes={[
                { type: BLOCK_TYPE.HEADER_THREE },
                { type: BLOCK_TYPE.UNORDERED_LIST_ITEM },
              ]}
              inlineStyles={[{ type: INLINE_STYLE.BOLD }, { type: INLINE_STYLE.ITALIC }]}
            /> */}
          </div>
        </Pane>
        <Pane key="interruptionCode" defaultSize={{ width: '20%', height: '100%' }} style={this.paneStyle}>
          <div className="cardInfoInterruption viewCode">
            <textarea className="editableContainer" onChange={this.handleChange}>
              {this.state.html}
            </textarea>
          </div>
        </Pane>
        </SortablePane>
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