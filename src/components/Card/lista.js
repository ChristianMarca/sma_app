import React from "react";
import "./lista.css";
import TablaInt from "./tabla.js";
import PageBar from "./pgBar.js";
import Filtro from "./filtros.js";

import Dropdown from 'rc-dropdown';
import Menu, {Item as MenuItem, Divider} from 'rc-menu';
import 'rc-dropdown/assets/index.css';

export default class Lista extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      pagina: 1,
      elementosPagina: 5,
      campOrden: "fecha_inicio",
      orden: "DESC",
      campos: [
        "0", "10", "1"
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
    };
  }

  async fetchInterrupciones() {

    let offset = this.state.elementosPagina * (this.state.pagina - 1);
    let datos = [
      offset,
      this.state.elementosPagina,
      this.state.orden,
      this.state.campOrden,
      this.state.filtroFechaInicial.valueOf(),
      this.state.filtroFechaFinal.valueOf(),
      this.state.filtroParroquia
    ];
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
    let llaves = ["0", "10", "1"].concat(selectedKeys.sort());
    this.setState({campos: llaves})
  }

  componentDidUpdate(prevProps, prevState) {

    if (this.state.elementosPagina !== prevState.elementosPagina || this.state.pagina !== prevState.pagina || this.state.bandera !== prevState.bandera) {
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

  onChangeI = date => {
    this.setState({filtroFechaInicial: date})
  }
  onChangeE = date => {
    this.setState({filtroFechaFinal: date})
  }
  onClickGO = e => {
    this.setState({
      bandera: !this.state.bandera
    })
  }
  onChangeInput = txt => {
    let ftxt = ("'%").concat(txt,"%'");
    this.setState({filtroParroquia: ftxt})
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
    //console.log(this.state.totalInt, this.state.dataInt)
    let card = <div className="Lista">
      <Filtro onChangeI={this.onChangeI} onChangeE={this.onChangeE} onClicGO={this.onClickGO} onChangeInput={this.onChangeInput} valueI={this.state.filtroFechaInicial} valueE={this.state.filtroFechaFinal}/>
      <TablaInt data={this.state.dataInt} campos={this.state.campos} fCampo={this.handleFieldChange}/>
      <PageBar actual={this.state.pagina} totalInt={this.state.totalInt} elementos={this.state.elementosPagina} page={this.state.pagina} handleClickNav={this.handleClickNav}/>
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
