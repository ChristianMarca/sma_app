import React from "react";
import "./tabla.css";
import ListaInt from "./tarjeta.js";

class TablaInt extends React.Component {

  tablaGen() {
    try {
      let {data} = this.props;
      if (Object.keys(data).length !== 0) {
        let base = Object.keys(data[0]);
        //console.log('keys en tabla',base)
        let headData = this.props.campos.map(res => base[res])

        let seleccion = data.map((elemento, index) => {
          return (<ListaInt key={index} columns={headData} data={elemento}></ListaInt>)
        })
        let etiquetas = [<ListaInt key="Cabecera" id="Head" columns={headData} data={headData} handleClick={this.props.fCampo}></ListaInt>
          ];
        let tabla = etiquetas.concat(seleccion)
        return (tabla)
      } else {
        return ([])
      }
    } catch (error) {
      console.error('no hay datos');
      // expected output: SyntaxError: unterminated string literal
      // Note - error messages will vary depending on browser
    }
  }
  render() {

    return (<div className="Tabla">

      <table>
        <tbody className="TBod">{this.tablaGen()}</tbody>
      </table>
    </div>)
  }
}

export default TablaInt;
