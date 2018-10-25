import React from "react";
import "./tarjeta.css";

export default class ListaInt extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      campos: [],
      col: {}
    }
  }

  columnas() {
    let {columns} = this.props;
    let {data} = this.props;
    let seleccion = columns.map(elemento => {return (<td>{data[elemento]}</td>)})
    //console.log('tarjeta',seleccion)
    return (seleccion)
  }

  /*  componentDidMount() {
    columnas();

  }*/

  render() {
    let card = <div id="tarjeta">{this.columnas()}</div>;
    return (card)
  }
}
