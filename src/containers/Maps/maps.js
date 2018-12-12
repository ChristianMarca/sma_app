import React from 'react';
// import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import {withRouter} from 'react-router-dom';
// import axios from "axios";
import { isSignInAction, receiveDataUserAction } from "../../actions";
import { BridgeComponent } from "./chart/interruptionChart";
import { getRandomArray } from './randomize';
import { setup } from './chart/chart-setup';
import Map from "./map/mapa";
import { API_URL } from "../../config";

import TablaInt from "../../components/Card/tabla";
import PageBar from '../../components/Card/pgBar';

import './chart.style.css'

const numBars=12;

const mapStateToProps=state=>{
	return {
    sessionController: state.sessionReducer,
	}
}
const mapDispatchToProps=(dispatch)=>{
	return{
    // Elección del tipo de interrupción
    onSignInApproved: ()=> dispatch(isSignInAction(true)),
    onReceiveDataUser: (data)=>dispatch(receiveDataUserAction(data))
	}
}

class Maps extends React.Component{
  constructor(props) {
    super(props);
    const randomGenerator = getRandomArray(numBars || 20, setup.dataRangeMin, setup.dataRangeMax);
    this.state = {
      data: randomGenerator(),
      data1: randomGenerator(),
      data2: randomGenerator(),
      randomGenerator,

      pagina: 1,
      elementosPagina: 6,
      campOrden: "fecha_inicio",
      orden: "DESC",
      campos: [
        "0", "9", "1"
      ],
      dataInt: [],
      totalInt: 0,
      bandera: true,
      fetchOffset: 0,
      filtroFechaInicial: new Date('January 1, 2018 00:00:00'),
      filtroFechaFinal: new Date(),
      filtroParroquia: "'%'",
      filtroCanton: "'%'",
      filtroProvincia: "'%'"
    }
  }

  startDynamicData() {
    setInterval(() => {
      this._isMounted&& this.setState ({
        ...this.state,
        data: this.state.randomGenerator(),
        data1: this.state.randomGenerator(),
        data2: this.state.randomGenerator(),
      });
    }, this.props.interval || 5000);
  }

  updateDimensions=()=> {
    // this.setState({width: $(window).width(), height: $(window).height()});
    var w = window,
        d = document,
        documentElement = d.documentElement,
        body = d.getElementsByTagName('body')[0],
        width = w.innerWidth || documentElement.clientWidth || body.clientWidth,
        height = w.innerHeight|| documentElement.clientHeight|| body.clientHeight;
    console.log(width,height)
}
  // componentDidMount=()=> {
  //   //if (this.props.dynamic) 
  //   this.startDynamicData();
  //   window.addEventListener("resize", this.updateDimensions);
  // }

  async fetchInterrupciones() {
    const {id_rol,id_user}= this.props.sessionController.dataUser;
    let offset = this.state.elementosPagina * (this.state.pagina - 1);
    let datos = [
      offset,
      this.state.elementosPagina,
      this.state.orden,
      this.state.campOrden,
      this.state.filtroFechaInicial.valueOf(),
      this.state.filtroFechaFinal.valueOf(),
      this.state.filtroParroquia,
      id_rol,
      id_user
    ];
    const response = await fetch(`${API_URL}/interrupcion/inter`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(datos)
    })
    let resultado = await response.json();
    let {total} = await resultado;
    let {interrupciones} = await resultado;
    return [total, interrupciones]
  }

  

  handleClickNav = (campo) => {
    let tmp = parseInt(campo, 10);
    var paginaActual;
    switch (tmp) {
      case - 1:
        this.setState({
          pagina: 1,
          bandera: !this.state.bandera
        })
        break;
      case 0:
        paginaActual = Math.ceil(this.state.totalInt / this.state.elementosPagina);
        this.setState({
          pagina: paginaActual,
          bandera: !this.state.bandera
        })
        break;
      default:
        this.setState({pagina: tmp});
        break;
    }
  }

  handleFieldChange = (campo) => {
    if (campo === this.state.campOrden) {
      if (this.state.orden === "ASC") {
        this.setState({orden: "DESC"})
      } else if (this.state.orden === "DESC") {
        this.setState({orden: "ASC"})
      }
    } else {
      this.setState({campOrden: campo, orden: 'ASC'})
    }
  }

  ordenarTabla() {
    var campo = this.state.campOrden;
    var orden = this.state.orden;
    let temp = this.state.dataInt;
    var valA;
    var valB;
    temp.sort(function(a, b) {
      if (typeof a === 'string') {
        valA = a[campo].toUpperCase();
        valB = b[campo].toUpperCase();
      } else {
        valA = a[campo];
        valB = b[campo];
      }
      if (orden === "ASC") {
        if (valA < valB) {
          return -1;
        }
        if (valA > valB) {
          return 1;
        }
        return 0;
      } else {
        if (valA < valB) {
          return 1;
        }
        if (valA > valB) {
          return -1;
        }
        return 0;
      }
    });
    this.setState({dataInt: temp})
  }

  //Dropdow simple
  onSelectSimple = ({key}) => {
    let pg = parseInt(key, 10);
    this.setState({elementosPagina: pg})
  }

  onVisibleChangesimple(visible) {
    //this.setState({elementosPagina: key})
  }

  //Dropdown saveSelectedMultiple
  onVisibleChangeMultiple = (visible) => {
    this.setState({visible});
  }

  saveSelectedMultiple = ({selectedKeys}) => {
    let llaves = ["0", "9", "1"].concat(selectedKeys.sort());
    this.setState({campos: llaves})
  }

  componentDidUpdate(prevProps, prevState) {

    if (this.state.elementosPagina !== prevState.elementosPagina || this.state.pagina !== prevState.pagina || this.state.bandera !== prevState.bandera) {
      this._isMounted&& this.fetchInterrupciones().then(res => {
        res[1]?this.setState({totalInt: res[0], dataInt: res[1]}):this.setState({totalInt: res[0], dataInt: []})
      })
      .catch(error=>console.log('io Error',error))
    }
    
    if (this.state.campOrden !== prevState.campOrden || this.state.orden !== prevState.orden) {
      this.ordenarTabla();
    }
  }

  componentWillUnmount=()=>{
    // if(this._isMounted){
    //   this._asyncRequest.cancel();
    // }
    this._isMounted=false;
  }

  componentDidMount(){
    const token = sessionStorage.getItem('token')||localStorage.getItem('token');
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
                  if (user && user.email){
                    // console.log(user, 'continueWithToken')
                    this.props.onSignInApproved();
                    this.props.onReceiveDataUser(user);
                    this._isMounted=true;

                    // if(this.props.sessionController.dataUser.id_rol===3){
                      this._isMounted&&this.fetchInterrupciones().then(res => {
                        this.setState({totalInt: res[0], dataInt: res[1]})
                      })
                    // }

                      // this.loadUser(user);
                      // this.onRouteChange('Home')
                      // alert('entro')
                      // this.startDynamicData();
                      // window.addEventListener("resize", this.updateDimensions);
                  }
              })
          }
      })
      .catch(err=>{
        // this.props.history.push('/');
      })
    }else{
      this.props.history.push('/');
    }
  }
  shouldComponentUpdate=(nextProps,nextState)=>{
    return this.props.sessionController.isSessionInit?true:false
//   componentDidMount=()=> {
//     //if (this.props.dynamic)
//     this.startDynamicData();
//     window.addEventListener("resize", this.updateDimensions);
  }

  getContentFromPage=()=>{
    // if(!this.props.sessionController.dataUser.id_rol) return <Redirect to="/" push={true} />;
    if(!this.props.sessionController.dataUser.id_rol) return <div>Wait or Redirect</div>;
    if(this.props.sessionController.dataUser.id_rol!==3){
      const loginRender=
        <div>
          <div className='containersa'>
              <div className="minimap">
                <TablaInt 
                  data={this.state.dataInt} 
                  campos={this.state.campos} 
                  fCampo={this.handleFieldChange}/>
                <PageBar 
                  actual={this.state.pagina} 
                  totalInt={this.state.totalInt} 
                  elementos={this.state.elementosPagina} 
                  page={this.state.pagina} 
                  handleClickNav={this.handleClickNav}/>
                {/* <article className="mw5 center bg-white br3 pa3 pa4-ns mv3 ba b--black-10">
                  <div className="tc">
                    <img src="http://tachyons.io/img/avatar_1.jpg" className="br-100 h3 w3 dib" title="Photo of a kitty staring at you" alt="testImage" />
                    <h1 className="f4">Mimi Whitehouse</h1>
                    <hr className="mw3 bb bw1 b--black-10"/>
                  </div>
                  <p className="lh-copy measure center f6 black-70">
                    Quite affectionate and outgoing.
                    She loves to get chin scratches and will
                    roll around on the floor waiting for you give her more of them.
                  </p>
                </article> */}
              </div>
                <div className="minimap">
                  <Map isDashboardComponent={true}/>
                </div>
            </div>
              <BridgeComponent data={this.state.data} data1={this.state.data1} data2={this.state.data2} />
        </div>
      return(
        <div id="containerChart" className='svg-containerChart'>
          {this.props.sessionController.isSessionInit?loginRender:<div></div>} 
        </div>
      )
    }
  }

  render(){
    return(
      // <div>Maps Here!</div>
      this.getContentFromPage()
    )
  }
}

// export default withRouter(connect(mapStateToProps,mapDispatchToProps)(Maps));
export default withRouter(connect(mapStateToProps,mapDispatchToProps)(Maps));
