import React from 'react';
import { connect } from "react-redux";
// import io from "socket.io-client";
import {withRouter} from 'react-router-dom';
import { SortablePane, Pane } from 'react-sortable-pane';
import ContentEditable from "react-contenteditable";
import sanitizeHtml from "sanitize-html";
import { 
  requestInterruptionFetchAction,
  isSignInAction,
  receiveDataUserAction
} from "../../actions";

import Map from "../Maps/map/mapa";
import '../Maps/chart.style.css';
import '../../components/viewInterruptions/style.chat.css'

import {Chat_} from '../../components/viewInterruptions/chat';

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
      html: `<div class="lds-ripple"><div></div><div></div></div>`,
      comments:``,
      asunto: ``,
      coordinacionZonal:``,
      codigoReport:``,
      editable: true,
      messageToSend:''
    }
  }

  // socketConnectionEnable=()=>{
  //   this.socket = io.connect(`${API_URL}`,{path:'/socket'});
  //   let {username}=this.props.sessionController;
  //   let interruptionView=this.props.interruptionViewSelected;
  //   this.socket.on('connect', ()=> {
  //       console.log('Conectado al servidor',this.socket.id);
  //       var usuario={
  //           nombre: username,
  //           sala: String(interruptionView)                
  //       }
  //       this.socket.emit('entrarChat', usuario, function(resp) {
  //           console.log('Usuarios conectados', resp);
  //           // renderizarUsuarios(resp);
  //       });
    
  //   });
    
  //   // escuchar
  //   this.socket.on('disconnect', function() {
    
  //       console.log('Perdimos conexión con el servidor');
    
  //   });
  // }

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
                    // console.log('adqui esta',user)
                    if (user && user.email){
                      console.log(user, 'continueWithToken')
                      this.props.onSignInApproved();
                      this.props.onReceiveDataUser(user);
                      this.props.onRequestDataInterruption(this.props.interruptionViewSelected,user.id_user)
                        .then(data=>{
                          this.setState({isReceiveDataOfInterruption:true})
                          // console.log(this.props.interruptionData.ID.data,'data',this.props.interruptionData.ID.data.data.id_inte)
                          fetch(`${API_URL}/interrupcion/getReport?id_interruption=${this.props.interruptionData.ID.data.data.id_inte}`,{
                            method: 'GET',
                            })
                          .then(resp=>resp.json())
                          .then(report=>{
                            // this.setState({html: report})
                            this.setState({
                              html: report.html,
                              asunto: report.asunto,
                              coordinacionZonal: report.coordinacionZonal,
                              codigoReporte:report.codigoReport
                            })
                          })
                          .catch(e=>this.setState({html:<h1>Something Fail</h1>}))
                        })
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

  handleChange = (stateName,event) => {
    // this.setState({ html: evt.target.value });
    this.setState({[stateName]: event.target.value});
  };

  handleSendComment=(event)=>{
    // console.log("test",this.state.comments)
    if(event.key==='Enter'){
      this.setState({messageToSend:this.state.comments})
      this.setState({comments:``})
    }

    // event.key==='Enter' && fetch(`${API_URL}/interrupcion/addComment?id_interruption=${this.props.interruptionData.ID.data.data.id_inte}&id_user=${this.props.sessionController.id_user}`,{
    //   method: 'PUT',
    //   body: JSON.stringify({comment:this.state.comments}),
    //   headers:{
    //     'Content-Type': 'application/json'
    //   }
    //   })
    // .then(resp=>resp.json())
    // .then(report=>{
    //   // alert(report)
    //   this.setState({comments:``})
    // })
    // .catch(e=>{console.log(e);alert('Something Fail')})
  }

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
  saveReportChanges=()=>{
    var jsonStringify=JSON.stringify({
      contentHtml:this.state.html,
      contentHeader:{
        asunto:this.state.asunto,
        codigoReport: this.state.codigoReport,
        coordinacionZonal: this.state.coordinacionZonal
      }
    });
    // console.log(this.state.html,jsonStringify)
    // var sendHtml=jsonStringify.replace(/\\n/g, "")
    //               .replace(/\\'/g, "'")
    //               .replace(/\\"/g, '"')
    //               .replace(/\\&/g, "")
    //               .replace(/\\r/g, "")
    //               .replace(/\\t/g, "")
    //               .replace(/\\b/g, "")
    //               .replace(/\\f/g, "");
    // console.log(sendHtml)
    // console.log(jsonStringify)
    fetch(`${API_URL}/interrupcion/updateReport?id_interruption=${this.props.interruptionData.ID.data.data.id_inte}`,{
      method: 'PUT',
      // body: JSON.stringify({contentHtml:sendHtml}),
      body: jsonStringify,
      // body: JSON.stringify({contentHtml:this.state.html}),
      headers:{
        'Content-Type': 'application/json',
        // 'Accept': 'application/json, text/plain, */*',
      }
      })
    .then(resp=>resp.json())
    .then(report=>{
      alert(report)
    })
    .catch(e=>{console.log(e);alert('Something Fail')})
  }

  updateHeaders=(stateName,event)=>{
    this.setState({[stateName]: event.target.value});
  }

  getInfoInterruption=()=>{
    // const {data}= this.props.interruptionData.ID;
    // console.log('es re render')
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
        {
          this.props.sessionController.id_rol===1
          ?
          <Pane key="interruptionReport" defaultSize={{ width: '59.2%', height: '100%' }} style={this.paneStyle}>
            <div className="cardInfoInterruption viewReport">
              <div className="containerHeaderFields">
                <div className="containerInputsHeader">
                  <label className="field a-field a-field_a1 page__field">
                    <input className="field__input a-field__input" placeholder="Coordinación Zonal X" value={this.state.coordinacionZonal} onChange={this.updateHeaders.bind(this,'coordinacionZonal')}/>
                    <span className="a-field__label-wrap">
                      <span className="a-field__label">Coordinación Zonal</span>
                    </span>
                  </label>
                  <label className="field a-field a-field_a1 page__field">
                    <input className="field__input a-field__input" placeholder="No. IT-CZXX-X-XXXX-XXXX" value={this.state.codigoReporte} onChange={this.updateHeaders.bind(this,'codigoReporte')}/>
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
                    <textarea className="field__input a-field__input" placeholder="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididuntut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitationullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor inreprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sintoccaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id estlaborum." value={this.state.asunto} onChange={this.updateHeaders.bind(this,'asunto')}/>
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
                  // onChange={this.handleChange} // handle innerHTML change
                  onChange={this.handleChange.bind(this,'html')}
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
            :
            <Pane key="interruptionReport" defaultSize={{ width: '59.2%', height: '100%' }} style={this.paneStyle}>
              <div className="cardInfoInterruption viewReport">
                {/* <div className="minimap"> */}
                  <Map isDashboardComponent={true}/>
                {/* </div> */}
              </div>
            </Pane>
        }
        {
          this.props.sessionController.id_rol===1?
          <Pane key="interruptionCode" defaultSize={{ width: '20%', height: '100%' }} style={this.paneStyle}>
            <div className="cardInfoInterruption viewCode">
              <textarea className="editableContainer" value={this.state.html} onChange={this.handleChange.bind(this,'html')} />
              <div className="SaveButtonContainer">
                <button onClick={this.saveReportChanges} className="reportButtons">Save Changes</button>
                <button className="reportButtons">Rebuild Report</button>
              </div>
              <div className="commentsContainer">
                  <Chat_ message={this.state.messageToSend}/>
                  {/* <textarea className="commentInput" value={this.state.comments} onChange={this.handleChange.bind(this,'comments')} /> */}
                  <div className="sendCommentContainer">
                    <input className="textarea" onKeyPress={this.handleSendComment} value={this.state.comments} onChange={this.handleChange.bind(this,'comments')} type="text" placeholder="Type here!"/>
                    {/* <button className="fas fa-share-square buttonComment" onClick={this.handleSendComment}></button> */}
                  </div>
              </div>
            </div>
          </Pane>
          :
          <Pane key="interruptionCode" defaultSize={{ width: '20%', height: '100%' }} style={this.paneStyle}>
            <div className="cardInfoInterruption viewCode">
              <div className="commentsContainer">
                  <Chat_ message={this.state.messageToSend} interruptionID={this.props.interruptionData.ID.data.data.id_inte}/>
                  {/* <textarea className="commentInput" value={this.state.comments} onChange={this.handleChange.bind(this,'comments')} /> */}
                  <div className="sendCommentContainer">
                    <input className="textarea" onKeyPress={this.handleSendComment} value={this.state.comments} onChange={this.handleChange.bind(this,'comments')} type="text" placeholder="Type here!"/>
                    {/* <button className="fas fa-share-square buttonComment" onClick={this.handleSendComment}></button> */}
                  </div>
              </div>
            </div>
          </Pane>
          }
        </SortablePane>
      </div>
    }else{
      return <div >Please Wait or Edit Report for Enable HTML Code</div>
    }
  }
  toggleExternalHTML=()=>{
    this.setState({showExternalHTML: !this.state.showExternalHTML});
  }
  
  render(){
    return(
      this.getInfoInterruption()
    )
  }
}

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(InterruptionOperatorView))
