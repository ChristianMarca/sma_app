import React from "react";
import "./lista.css";
import TablaInt from "./tabla.js";
import NavBar from "./navBar.js";
import Filter from "./filtros.js";

import Dropdown from 'rc-dropdown';
import Menu, {Item as MenuItem, Divider} from 'rc-menu';
import 'rc-dropdown/assets/index.css';

export default class Lista extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      pagina: 1,
      elementosPagina: 5,
      campOrden: "id_inte",
      orden: "DESC",
      campos: [
        "0", "10", "1"
      ],
      dataInt: [],
      totalInt: 0,
      fetchOffset: 0
    };
    this.onSelectSimple = this.onSelectSimple.bind(this);
    this.handleFieldChange = this.handleFieldChange.bind(this);
    this.ordenarTabla = this.ordenarTabla.bind(this);
    this.handleClickNav = this.handleClickNav.bind(this);
  }

  async fetchInterrupciones() {
    let offset = this.state.elementosPagina*(this.state.pagina-1);
    let datos = [offset, this.state.elementosPagina, this.state.orden, this.state.campOrden];
    const response = await fetch('http://192.168.1.15:3000/interrupcion/inter', {
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

  handleClickNav(campo){
    this.setState({pagina: campo})
  }

  handleFieldChange(campo) {
    if (campo === this.state.campOrden) {
      if (this.state.orden === "ASC") {
        this.setState({orden: "DESC"})
      } else if (this.state.orden === "DESC") {
        this.setState({orden: "ASC"})
      }
    } else {
      //let temp = campo;
      this.setState({campOrden: campo, orden: 'ASC'})
    }

  }

  ordenarTabla() {
    var campo = this.state.campOrden;
    var orden = this.state.orden;
    let temp = this.state.dataInt;
    temp.sort(function(a, b) {
      if (typeof a === 'string') {
        var valA = a[campo].toUpperCase();
        var valB = b[campo].toUpperCase();
      } else {
        var valA = a[campo];
        var valB = b[campo];
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
  onSelectSimple({key}) {
    let pg = parseInt(key);
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
    let llaves = ["0", "10", "1"].concat(selectedKeys.sort());
    this.setState({campos: llaves})
  }

  componentDidUpdate(prevProps, prevState) {

    if (this.state.elementosPagina !== prevState.elementosPagina || this.state.pagina !== prevState.pagina) {
      this.fetchInterrupciones().then(res => {
        this.setState({totalInt: res[0], dataInt: res[1]})
      })
    }

    if (this.state.campOrden !== prevState.campOrden || this.state.orden !== prevState.orden) {
      this.ordenarTabla();
    }
  }

  componentDidMount() {
    this.fetchInterrupciones().then(res => {
      this.setState({totalInt: res[0], dataInt: res[1]})
    })
  }

  render() {

    const cantidad = (<Menu onSelect={this.onSelectSimple}>
      <MenuItem key="3">3</MenuItem>
      <Divider/>
      <MenuItem key="5">5</MenuItem>
      <Divider/>
      <MenuItem key="10">10</MenuItem>
    </Menu>);
    const campos = (<Menu style={{
        width: 140
      }} multiple={true} onSelect={this.saveSelectedMultiple} onDeselect={this.saveSelectedMultiple}>
      <MenuItem key="2">Fecha Fin</MenuItem>
      <Divider/>
      <MenuItem key="3">Duracion</MenuItem>
      <Divider/>
      <MenuItem key="4">Causa</MenuItem>
      <Divider/>
      <MenuItem key="5">Areas afectadas</MenuItem>
      <Divider/>
      <MenuItem key="6">Estado</MenuItem>
      <Divider/>
      <MenuItem key="8">Operadora</MenuItem>
      <Divider/>
      <MenuItem key="9">Tipo</MenuItem>
    </Menu>);

    let card = <div className="Lista">
      <h1>Interrupciones del Servicio Movil Avanzado</h1>

      <TablaInt data={this.state.dataInt} campos={this.state.campos} fCampo={this.handleFieldChange}/>
      <NavBar actual={this.state.pagina} totalInt={this.state.totalInt} elementos={this.state.elementosPagina} page={this.state.pagina} handleClickNav={this.handleClickNav}/>
      <div>
        <Dropdown trigger={['click']} overlay={cantidad} animation="slide-up" onVisibleChange={this.onVisibleChangesimple}>
          <button>Cantidad</button>
        </Dropdown>
        <Dropdown trigger={['click']} onVisibleChange={this.onVisibleChangeMultiple} visible={this.state.visible} closeOnSelect={false} overlay={campos} animation="slide-up">
          <button>Campos</button>
        </Dropdown>
      </div>

    </div>;
    return (card)
  }
}
