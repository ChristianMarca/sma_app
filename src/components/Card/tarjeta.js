import React from "react";
//import "./tarjeta.css";

export default class ListaInt extends React.Component {

  columnas() {
    let {columns} = this.props;
    let {data} = this.props;
    let seleccion = [];
    if(Array.isArray(data)){
      let selec = columns.map((elemento,index) => {return (<td key={index}>{elemento}</td>)})
      seleccion = Array.prototype.concat(selec,[<td key="RevC">Revision</td>])
    }else{
      let selec = columns.map((elemento,index) => {return (<td key={index}>{data[elemento]}</td>)})
      seleccion = Array.prototype.concat(selec,[<td key="Ins"><button>Inspeccionar</button></td>])
    }

    return (seleccion)
  }

  /*  componentDidMount() {
    columnas();

  }*/

  render() {
    let card = <tr>{this.columnas()}</tr>;
    return (card)
  }
}
