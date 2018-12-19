import React from 'react';
import { connect } from "react-redux";
import io from "socket.io-client";
import { API_URL } from "../../config";
import "./style.chat.css";

const mapStateToProps=state=>{
	return {
    interruptionData: state.requestInterruptionDataReducer,
    interruptionViewSelected: state.interruptionViewReducer.interruptionView,
    sessionController: state.sessionReducer.dataUser
	}
}
const mapDispatchToProps=(dispatch)=>{
	return{}
}

class Chat extends React.Component{
    constructor(){
        super();
        this.state={
            comments:[]
        }
    }
    socketConnectionEnable=()=>{
        this.socket = io.connect(`${API_URL}`,{path:'/socket'});
        let {username}=this.props.sessionController;
        let interruptionView=this.props.interruptionViewSelected;
        
        const updateMessages=(newMessage)=>{
            let prevComments=this.state.comments;
            prevComments.push(newMessage)
            this.setState({ comments: prevComments })
        }

        this.socket.on('connect', ()=> {
            console.log('Conectado al servidor',this.socket.id);
            var usuario={
                nombre: username,
                sala: interruptionView                
            }
            this.socket.emit('entrarChat', usuario, function(resp) {
                console.log('Usuarios conectados', resp);
                // renderizarUsuarios(resp);
            });
        
        });
        
        // escuchar
        this.socket.on('disconnect', function() {
        
            console.log('Perdimos conexión con el servidor');
        
        });

        // Escuchar información
        this.socket.on('crearMensaje', function(mensaje,updateMessages_=updateMessages) {
            updateMessages_(mensaje)
        });
        
        // Escuchar cambios de usuarios
        // cuando un usuario entra o sale del chat
        this.socket.on('listaPersona', function(personas) {
            console.log('personas',personas)
        });
        
        // Mensajes privados
        this.socket.on('mensajePrivado', function(mensaje) {
        
            console.log('Mensaje Privado:', mensaje);
        
        });

        // this.socket.emit('connectedComments',{id_interruption:this.props.interruptionData.ID.data.data.id_inte})
        
        // this.socket.on('mountComments',(comments)=>{
        //     this.setState({comments})
        // })
      }

    componentDidMount=()=>{
        const token = window.sessionStorage.getItem('token')||window.localStorage.getItem('token');
        fetch(`${API_URL}/interrupcion/getComments?id_interruption=${this.props.interruptionViewSelected}`,{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'authorization': token
            }
            })
          .then(resp=>resp.json())
          .then(report=>{
            this.setState({comments:report})
            })
            .catch(e=>this.setState({comments:[]}))
        this.socketConnectionEnable()
        this.scrollToBottom();
    }
    componentWillUnmount=()=>{
        this.socket.disconnect();
    }

    getSnapshotBeforeUpdate(prevProps, prevState) {
        // Are we adding new items to the list?
        // Capture the scroll position so we can adjust scroll later.
        if (prevProps.message !== this.props.message) {
          return this.props.message;
        }
        return null;
      }
    
      componentDidUpdate=(prevProps, prevState, snapshot)=> {
        // If we have a snapshot value, we've just added new items.
        // Adjust scroll so these new items don't push the old ones out of view.
        // (snapshot here is the value returned from getSnapshotBeforeUpdate)
        const updateMessages=(newMessage)=>{
            let prevComments=this.state.comments;
            prevComments.push(newMessage)
            this.setState({ comments: prevComments })
        }
        if (snapshot !== null) {
            let {username,id_user}=this.props.sessionController;
        let interruptionView=this.props.interruptionViewSelected;
          this.socket.emit('crearMensaje', {
            nombre: username,
            mensaje: this.props.message,
            id_user: id_user,
            id_interruption:interruptionView
            }, function(mensaje,updateMessages_=updateMessages) {
                updateMessages_(mensaje)
            });
    
        }
        this.scrollToBottom();
      }

      scrollToBottom = () => {
        this.messagesEnd.scrollIntoView({block: "start", behavior: "smooth"});
      }
    
    handleComments=()=>{
        return this.state.comments.map((comment,index)=>{
            return <li key={index} className={comment.id_user3===this.props.sessionController.id_user?'self':'other'}>
                        <div className="avatar" />
                        <div className="msg">
                            <p>{comment.comentario}</p>
                            <time>{comment.fecha}</time>
                        </div>
                    </li>
        })
    }
    render(){
        return(
            <div className="ContainerChat">
                <ol className="chat">
                    {
                        this.state.comments.map((comment,index)=>{
                            return <li key={index} className={comment.id_user3===this.props.sessionController.id_user?'self':'other'}>
                                    <div className="avatar" />
                                        <div className="msg">
                                            <p>{comment.comentario}</p>
                                            <time>{comment.fecha}</time>
                                        </div>
                                    </li>
                        })
                    }
                    <li style={{ float:"left", clear: "both" }}
                        ref={(el) => { this.messagesEnd = el; }}>
                    </li>
                </ol>
            </div>
        )
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Chat);