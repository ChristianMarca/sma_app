import React from "react";
import "./tabla.css";
import ListaInt from "./tarjeta.js";

class TablaInt extends React.Component {
/*
  constructor(props) {
    super(props);
    this.state = {
      pagina: 0,
      orden: 0,

    }
  }
*/

  tablaGen() {

    let {data} = this.props;
    let base = Object.keys(data[0]);
    let headData = this.props.campos.map(res=>base[res])

    let seleccion = data.map((elemento, index) => {
      return (<ListaInt key={index} columns={headData} data={elemento}></ListaInt>)
    })
    let etiquetas = [<ListaInt key="Cabecera" id="Head" columns={headData} data={headData}></ListaInt>
      ];
    let tabla = etiquetas.concat(seleccion)
    return (tabla)
  }

  tableSort(){

  }

  render() {

    return (
    // <div>Maps Here!</div>
    // <div id="containerChart" className='svg-containerChart'>
    <div className="Tabla">

      <table>
        <tbody className="TBod">{this.tablaGen()}</tbody>
      </table>
    </div>)
  }
}

export default TablaInt;
