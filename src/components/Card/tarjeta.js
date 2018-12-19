import React from "react";
import { connect } from "react-redux";
import io from "socket.io-client";
import {Redirect, withRouter} from 'react-router-dom';
import { interruptionViewIdAction } from "../../actions";
import {API_URL} from '../../config';
import moment from 'moment'
import "./table.css";

const mapStateToProps=state=>{
	return {
    // Inicio de Interrupción 
	}
}

const mapDispatchToProps=(dispatch)=>{
	return{
    onSubmitInterruptionView: (event)=> {dispatch(interruptionViewIdAction(event))},
	}
}

class ListaInt extends React.Component {

  constructor(props) {
      super(props);
      this.state={
        openInterruption:false,
        data:{},
        test_:'inicio'
      }
      this.handleClick = this.handleClick.bind(this);
    }
  handleClick(e){
    this.props.handleClick(e.target.getAttribute('data-key'));
  }
  handleClickSelectInterruption=(id_interruption)=>{
    this.props.onSubmitInterruptionView(id_interruption);
    this.setState((prevState) => ({ openInterruption: !prevState.openInterruption }))
  }

  socketConnectionEnable=(id_interruption)=>{
    const socket = io.connect(`${API_URL}`,{path:'/socket'});
    socket.on('connect',function(){
        console.log('Conectado al Servidor')
    })
    socket.on('disconnect',function(){
        console.log('Perdimos la conexion al server')
    })
  }
  componentDidMount=()=>{
    const token = window.sessionStorage.getItem('token')||window.localStorage.getItem('token');
    fetch(`${API_URL}/radioBases/interruptionTime?interruption_id=${this.props.data.id_inte}`,{
      method: 'GET',
      headers: {
          'Content-Type': 'application/json',
          'authorization': token
      },
      })
            .then(data=>data.json())
            .then(time=>{
                time.countdown.split(':').some(v=>v<0)?this.setState((prevState) => 
                  ({ test_: "finalizado" })
                  ):
                  this.setState((prevState) => 
                    ({ test_: "inicio" })
                  )
            })
            .catch(error=>console.log({Error:error}))
  }

  columnas=()=> {
    try {
      let {columns} = this.props;
      let {data} = this.props;
      if ( Object.keys(data).length !== 0 ) {
        let seleccion = [];
        if (Array.isArray(data)) {
          let selec = columns.map((elemento, index) => {
            let ele = elemento.replace('_',' ')
            let elem = ele.charAt(0).toUpperCase() + ele.slice(1);
            return (
                <td key={elemento+moment()} data-key={elemento} onClick={this.handleClick}>{elem}</td>
              )
          })
          seleccion = Array.prototype.concat(selec, [<td key="RevC">Revision</td>
            ])
        } else {
          let selec = columns.map((elemento, index) => {
            return (
              <td key={index+moment()}>
                {data[elemento]}
              </td>)
          })
          seleccion = Array.prototype.concat(selec, [<td key={data.id_inte}>
            <div key={data.id_inte+moment()} onClick={()=>this.handleClickSelectInterruption(data.id_inte)} className="mouse_scroll">
            <div className="mouse inicio">
              <div className="wheel">Ir</div>
            </div>
            <div>
              <span className={`m_scroll_arrows unu ${this.state.test_}`}></span>
              <span className={`m_scroll_arrows doi ${this.state.test_}`}></span>
              <span className={`m_scroll_arrows trei ${this.state.test_}`}></span>
            </div>
            </div>
          
            {this.state.openInterruption && <Redirect to="/interruptionOperator" push={true} />}
          </td>
            ])
        }
        return (seleccion)
      } else {
        return ([])
      }
    } catch (error) {
      console.error({Error:error});
    }
  }

  render() {
    let card = <tr key={moment()} className="rowTarget nfl">
      {this.columnas()}</tr>;
    return (card)
  }
}

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(ListaInt));