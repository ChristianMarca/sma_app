import React from "react";
import ListaInt from "./tarjeta.js";
import "./style.css";
import "./table.css";

class TablaInt extends React.Component {

  tablaGen() {
    try {
      let {data} = this.props;
      if (Object.keys(data).length !== 0) {
        let base = Object.keys(data[0]);
        let headData = this.props.campos.map(res => base[res])

        let seleccion = data.map((elemento, index) => {
          // console.log('saf',index,elemento.id_inte)
          return (<ListaInt key={elemento.id_inte} columns={headData} data={elemento}></ListaInt>)
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
    var divition=this.tablaGen().map((row,index)=>{
      if(index!==0){
        // return row
          return <tbody key={index} className="TBod wrapper row-fadeIn-wrapper">
              {row}
          </tbody>
        }
        else{
          return <thead key={index} className="TBod wrapperHead row-fadeIn-wrapperHead">
              {row}
            </thead>
        }
    })
    return (
      // <div className="Tabla">
        <table className="tableContainerInterruption" id='TableContainer'>
          {divition}
        </table>
      // </div>
    )
  }
}

export default TablaInt;
