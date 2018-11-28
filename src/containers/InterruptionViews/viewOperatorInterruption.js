import React from 'react';
import { connect } from "react-redux";
import io from "socket.io-client";
import {Redirect, withRouter} from 'react-router-dom';
import { 
  requestInterruptionFetchAction,
  isSignInAction,
  receiveDataUserAction
 } from "../../actions";

import { API_URL } from "../../config";

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
      time:""
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
      this.props.interruptionViewSelected&&fetch(`${API_URL}/authentication/signin`,{
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
  getHtml=()=>{

  }

  getInfoInterruption=()=>{
    const {data}= this.props.interruptionData.ID;
    const infoInt=data.data;
    if(this.props.interruptionData.ID.data.data){
      return <div className="containerInterruption">
        <div className="containerTitle">
            {<h1>{data.data.tipo}</h1>}
          </div>
          <div>
            <h1>
              Informacion de la interrupcion
            </h1>
              Fecha inicio: {data.data.fecha_inicio}
              Fecha FIn: {data.data.fecha_fin}
            <h1>
              Causas
            </h1>
            <h2>
              {data.data.causa}
            </h2>
            <h3>
              {this.state.time}
            </h3>
            </div>
            <div>
              {this.getHtml()}
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

  render(){
    console.log('77hhh',this.props.interruptionData)
    const {data}= this.props.interruptionData.ID;
    const infoInt=data.data;
    console.log(data,'h/?',data.data,'?j',infoInt,this.state.isReceiveDataOfInterruption)
    return(
      this.getInfoInterruption()
    )
  }
}

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(InterruptionOperatorView))