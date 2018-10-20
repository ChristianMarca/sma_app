import React from 'react';
//import {CajaTxt} from '../search/loc';
import './map.css';
import 'tachyons';
import L from "leaflet";

// import './infoCard';

import ReactModal from 'react-modal';
import ListComponent from './infoCard';

class Side extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      address: "",
      coordinates: "",
      BaseStations: {}
    }
  }

  componentWillReceiveProps(nextProps) {
    const {dataSearch} = this.props;
    //console.log('next', nextProps.dataSearch, 'this', dataSearch)
    if (nextProps.dataSearch !== dataSearch || dataSearch) {

      this.setState({BaseStations: nextProps.dataSearch})
      //console.log('nuevo esatdor', nextProps.dataSearch)
      // const {value, dataSearch}=this.props;
      // console.log('asdd',this.props.dataSearch)
      try {

        this.forceUpdate(this.setState({name: this.props.dataSearch.properties.no, address: this.props.dataSearch.properties.f3cos_est, coordinates: this.props.dataSearch.properties.coordinates}));
        this.forceUpdate(this.render)

      } catch (e) {
        // console.log(e)
      }

    }
  }

  imageData(props) {

    // if(props.existe){
    alert('entro')
    return (<li className="tc pa4">
      <img src="http://tachyons.io/img/logo.jpg" className="br-100 pa1 ba b--black-10 h3 w3" alt="avatar"/>
    </li>)
    // }

  }
  componentWillMount = () => {}

  getEstructura_id = () => {
    try {
      return this.state.BaseStations.properties.cod_est;
    } catch (e) {
      return '';
    }
  }
  getEstructura = () => {
    try {
      return this.state.BaseStations.properties.nom_sit;
    } catch (e) {
      return '';
    }
  }
  getProvincia = () => {
    try {
      return this.state.BaseStations.properties.provincia;
    } catch (e) {
      return '';
    }
  }
  getCanton = () => {
    try {
      return this.state.BaseStations.properties.canton;
    } catch (e) {
      return '';
    }
  }
  getParroquia = () => {
    try {
      return this.state.BaseStations.properties.parroquia;
    } catch (e) {
      return '';
    }
  }
  getDireccion = () => {
    try {
      return this.state.BaseStations.properties.dir;
    } catch (e) {
      return '';
    }
  }
  getCellID = () => {
    try {
      return this.state.BaseStations.properties.cell_id;
    } catch (e) {
      return '';
    }
  }
  getTecnologia = () => {
    try {
      return this.state.BaseStations.properties.tecnologia;
    } catch (e) {
      return '';
    }
  }
  getDensidad = () => {
    try {
      return this.state.BaseStations.properties.densidad;
    } catch (e) {
      return '';
    }
  }
  getOperadora = () => {
    try {
      return this.state.BaseStations.properties.operadora;
    } catch (e) {
      return '';
    }
  }
  getStatus = () => {
    try {
      return this.state.BaseStations.properties.estado;
    } catch (e) {
      return '';
    }
  }
  getCoodenadas = () => {
    try {
      return `${this.state.BaseStations.properties.lat}~${this.state.BaseStations.properties.long}`
    } catch (e) {
      return '';
    }
  }

  logoOperadora = () => {
    var path = "";
    switch (this.getOperadora()) {
      case 'CONECEL':
        path = "./logoOp/claro-logo.png";
        //path='../../../public/logoOp/claro-logo.png'
        break;
      case 'OTECEL':
        //path = "../../../logoOp/movistar-logo.png";
        path = "./logoOp/movistar-logo.png";
        break;
      case 'CNT':
        //path = "../../../logoOp/cnt-logo.png";
        path = "./logoOp/cnt-logo.png";
        break;
      default:
        break;
    }
    return path;
  }

  render() {

    // let elemento=<imageData existe={true}/>
    let elemento = <img src={this.logoOperadora()} className="br1 imageComponent" alt="avatar"/>;
    return (<div id="sidebar">
      <h3 className="title">Información</h3>

      {/* <h1>{value}</h1> */}
      {/* <ul className="list pl0 ml0 center mw7 ba b--light-silver br3 informationContainer"> */}
        {/* <li className="info">{elemento}</li> */}

        {/* <li className="info"> */}
          <div className="br2 ba cardComponent">
            {/* <h4 className="white mv0 pv2 ph3 titleCardComponent">Radio Base</h4> */}
            {elemento}
            <div className="pa3 bt">
              <ListComponent title={'Cell ID'} content={this.getCellID()}/>
              <ListComponent title={'Provincia'} content={this.getProvincia()}/>
              <ListComponent title={'Canton'} content={this.getCanton()}/>
              <ListComponent title={'Parrroquia'} content={this.getParroquia()}/>
              <ListComponent title={'Dirección'} content={this.getDireccion()}/>
              <ListComponent title={'Tecnología'} content={this.getTecnologia()}/>
              <ListComponent title={'Densidad'} content={this.getDensidad()}/>
              <ListComponent title={'Operador'} content={this.getOperadora()}/>
              <ListComponent title={'Status'} content={this.getStatus()}/>
              <ListComponent title={'Coordenadas'} content={this.getCoodenadas()}/>
              <ListComponent title={'Estructura'} content={this.getEstructura()}/>
              <ListComponent title={'Estructura ID'} content={this.getEstructura_id()}/>
            </div>
          </div>
        {/* </li>
      </ul> */}
    </div>)
  }
}

class SideMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      nameSideMenu: "",
      showModal: false
    };
    this.handleOpenModal = this.handleOpenModal.bind(this);
    // ,
    // this.handleOpenModal = this.handleOpenModal.bind(this);
    // this.handleCloseModal = this.handleCloseModal.bind(this);

  }
  changeName = (value) => {
    const h = new Side();
    this.setState({nameSideMenu: value})
    this.props.value_return(value);
    h.setState({name: value})
  }

  locate = (data) => {
    this.props.locate(data)
  }

  componentWillMount = () => {
    this._div = L.DomUtil.create('div', 'informacion');
    // L.DomEvent.on(this._div,'click', function (ev) {
    //   alert('Se dio click')
    //   ev.stopPropagation();
    //   L.DomEvent.stopPropagation(ev);
    // })
  }

  // _disableClickPropagation(element) {
  //   if (!L.Browser.touch || L.Browser.ie) {
  //       L.DomEvent.disableClickPropagation(element);
  //       L.DomEvent.on(element, 'mousewheel', L.DomEvent.stopPropagation);
  //   } else {
  //       L.DomEvent.on(element, 'click', L.DomEvent.stopPropagation);
  //   }
  // }

  handleOpenModal(e) {
    e.stopPropagation();
    e.nativeEvent.stopImmediatePropagation();
    alert('ENTRO EL CLICK')
    // this.setState({ showModal: true });
  }

  // handleCloseModal () {
  //   this.setState({ showModal: false });
  // }

  stopPropagation(e) {
    e.stopPropagation();
    e.nativeEvent.stopImmediatePropagation();
  }
  _disableClickPropagation(element) {
    if (!L.Browser.touch || L.Browser.ie) {
      L.DomEvent.disableClickPropagation(element);
      L.DomEvent.on(element, 'mousewheel', L.DomEvent.stopPropagation);
    } else {
      L.DomEvent.on(element, 'click', L.DomEvent.stopPropagation);
    }
  }

  //   setContent: function (content) {
  //     var container = this.getContainer();

  //     if (typeof content === 'string') {
  //         container.innerHTML = content;
  //     } else {
  //          clean current content
  //         while (container.firstChild) {
  //             container.removeChild(container.firstChild);
  //         }

  //         container.appendChild(content);
  //     }

  //     return this;
  // },

  render() {
    //const {menu} = this.props;
    //console.log('hubo un cambio', menu)
    // const {menuList} = this.props;

    //const element = this._div.innerHTML = <CajaTxt className='menu' value={this.changeName.toString()} menuList={menuList} locate={this.locate}/>
    const eleme = <button onClick={this.handleOpenModal}>Trigger Modal</button>
    // this. _disableClickPropagation(eleme)
    // L.DomEvent.stopPropagation(element);
    // this.stopPropagation(eleme)
    return (<div>
      <div id="sidebar_menu">

        <h1 className="title">Buscar BS</h1>
        {/* {element} */}
        {this.innerHTML = <h1>Be YOURSELF</h1>}
        <hr/>
        <div>

          {eleme}

          <ReactModal isOpen={this.state.showModal} contentLabel="Minimal Modal Example">
            <button onClick={this.handleCloseModal}>Close Modal</button>
          </ReactModal>

        </div>

      </div>
      <div>
        {/* {element} */}
      </div>
    </div>)
  }
}

export {
  Side,
  SideMenu
};
