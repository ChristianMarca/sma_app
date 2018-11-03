import React from "react";
import "./lista.css";
import TablaInt from "../../components/Card/tabla.js";

import Dropdown from 'rc-dropdown';
import Menu, {Item as MenuItem, Divider} from 'rc-menu';
import 'rc-dropdown/assets/index.css';


var datosI = [
  {
    fecha: "2018/05/12",
    cellId: 40,
    estructura: "cerro",
    provincia: "Azuay",
    canton: "Cuenca",
    parroquia: "Cuenca",
    causas: "Corte de Fibra",
    operadora: "Conecel",
    estado: "Activo"
  }, {
    fecha: "2018/06/12",
    cellId: 5,
    estructura: "cerro",
    provincia: "Azuay",
    canton: "Cuenca",
    parroquia: "Cuenca",
    causas: "Corte de Fibra",
    operadora: "Otecel",
    estado: "Activo"
  }, {
    fecha: "2018/10/14",
    cellId: 54,
    estructura: "cerro",
    provincia: "Azuay",
    canton: "Cuenca",
    parroquia: "Cuenca",
    causas: "Corte de Fibra",
    operadora: "CNT",
    estado: "Activo"
  }, {
    fecha: "2018/02/01",
    cellId: 74,
    estructura: "cerro",
    provincia: "Azuay",
    canton: "Cuenca",
    parroquia: "Cuenca",
    causas: "Corte de Fibra",
    operadora: "Conecel",
    estado: "Activo"
  }, {
    fecha: "Activo",
    cellId: 14,
    estructura: "cerro",
    provincia: "Azuay",
    canton: "Cuenca",
    parroquia: "Cuenca",
    causas: "Corte de Fibra",
    operadora: "CNT",
    estado: "Activo"
  }, {
    fecha: "Activo",
    cellId: 23,
    estructura: "cerro",
    provincia: "Azuay",
    canton: "Cuenca",
    parroquia: "Cuenca",
    causas: "Corte de Fibra",
    operadora: "Conecel",
    estado: "Activo"
  }, {
    fecha: "Activo",
    cellId: 88,
    estructura: "cerro",
    provincia: "Azuay",
    canton: "Cuenca",
    parroquia: "Cuenca",
    causas: "Corte de Fibra",
    operadora: "Otecel",
    estado: "Activo"
  }
];

export default class ListaInt extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      pagina: 0,
      orden: 0,
      campos: [0]
    }
  }

  async fetchInterrupciones() {
    let datos = [this.state.pagina, this.state.orden, this.state.campos];
    const response = await fetch('http://192.168.1.15:3000/interrupcion/inter', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(datos)
    })
    let resultado = await response.json();
    let temp = await resultado.jsonData
    let {total} = await temp;
    let {interrupciones} = await temp;
    return [total, interrupciones]
  }

  //Dropdow simple
  onSelectSimple({key}) {
    return (key)
  }

  onVisibleChangesimple(visible) {
    //console.log(visible);
  }

  //Dropdown saveSelectedMultiple
  onVisibleChangeMultiple = (visible) => {
    this.setState({visible});
  }

  saveSelectedMultiple = ({selectedKeys}) => {
    let llaves = [0].concat(selectedKeys);

    this.setState({campos: llaves.sort()})
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
      <MenuItem key="1">Cell Id</MenuItem>
      <Divider/>
      <MenuItem key="2">Estructura</MenuItem>
      <Divider/>
      <MenuItem key="3">Provincia</MenuItem>
      <Divider/>
      <MenuItem key="4">Canton</MenuItem>
      <Divider/>
      <MenuItem key="5">Parroquia</MenuItem>
      <Divider/>
      <MenuItem key="6">Causas</MenuItem>
      <Divider/>
      <MenuItem key="7">Operadora</MenuItem>
      <Divider/>
      <MenuItem key="8">Estado</MenuItem>
    </Menu>);

    this.fetchInterrupciones().then(esto => console.log( Object.keys((esto[1])[0]) ))
    let card = <div className="Lista">
      <div>Interrupciones del Servicio Movil Avanzado</div>
      <table>
        <tbody>
          <tr className="Elementos">

            <td>Elementos por pagina:</td>
            <td>
              <Dropdown trigger={['click']} overlay={cantidad} animation="slide-up" onVisibleChange={this.onVisibleChangesimple}>
                <button>Cantidad</button>
              </Dropdown>
            </td>
            <td>Columnas:</td>
            <td>
              <Dropdown trigger={['click']} onVisibleChange={this.onVisibleChangeMultiple} visible={this.state.visible} closeOnSelect={false} overlay={campos} animation="slide-up">
                <button>Campos</button>
              </Dropdown>
            </td>
          </tr>
        </tbody>
      </table>
      <TablaInt data={datosI} campos={this.state.campos}/>
    </div>;
    return (card)
  }
}
