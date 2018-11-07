import React from "react";
import "./lista.css";
import TablaInt from "../../components/Card/tabla.js";

import Dropdown from 'rc-dropdown';
import Menu, {Item as MenuItem, Divider} from 'rc-menu';
import 'rc-dropdown/assets/index.css';

export default class ListaInt extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      pagina: 1,
      elementosPagina: 3,
      campOrden: "fecha_inicio",
      orden: "ASC",
      puntero: "'2018-05-07'",
      campos: [
        "0", "10", "1"
      ],
      dataInt: [],
      totalInt: 0
    };
    this.onSelectSimple = this.onSelectSimple.bind(this);
    this.handleFieldChange = this.handleFieldChange.bind(this);
    this.ordenarTabla = this.ordenarTabla.bind(this);
  }

  async fetchInterrupciones() {
    let datos = [this.state.pagina, this.state.elementosPagina, this.state.campOrden, this.state.orden, this.state.puntero];
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

  handleFieldChange(campo) {
    this.setState({campOrden: campo})
    //console.log(this.state.dataInt)
  }

  ordenarTabla() {
    var campo = this.state.campOrden;
    //console.log(campo)
    this.state.dataInt.sort(function(a, b) {
      if(typeof a == 'string'){
        var nameA = a[campo].toUpperCase(); // ignore upper and lowercase
        var nameB = b[campo].toUpperCase(); // ignore upper and lowercase
      }else{
        var nameA = a[campo]; // ignore upper and lowercase
        var nameB = b[campo];
      }

      if (nameA < nameB) {
        return -1;
      }
      if (nameA > nameB) {
        return 1;
      }
      return 0;
    });
  }

  //Dropdow simple
  onSelectSimple({key}) {
    let pg = parseInt(key)
    this.setState({elementosPagina: pg})
  }

  onVisibleChangesimple(visible) {
    //this.setState({elemetosPagina: key})
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

    if (this.state.elementosPagina !== prevState.elementosPagina) {
      this.fetchInterrupciones().then(res => {
        this.setState({totalInt: res[0], dataInt: res[1]})
      })
    }
    if(this.state.campOrden !== prevState.campOrden){
      this.ordenarTabla();
      let fin = this.state.dataInt
      let fi = (fin[0])[this.state.campOrden]
      this.setState({puntero: fi})
    }
  }

  componentDidMount() {
    this.fetchInterrupciones().then(res => {
      this.setState({totalInt: res[0], dataInt: res[1]})
    })
  }

  /*
if(res[1])
let final = (res[1])[this.state.elementosPagina - 1]
let fina = final[this.state.campOrden]

if(this.state.campOrden === "fecha_inicio" || this.state.campOrden === "fecha_fin" || this.state.campOrden === "duracion"){
  let fin = ("'").concat(fina,"'")

  this.setState({puntero: fin})
}else{
    this.setState({puntero: fina})
}
*/

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

    //console.log("Cambio de estado", this.state.campOrden)
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
      <TablaInt data={this.state.dataInt} campos={this.state.campos} fCampos={this.handleFieldChange}/>
    </div>;
    return (card)
  }
}
