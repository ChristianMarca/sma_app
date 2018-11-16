import React from "react";
//import "./tarjeta.css";

export default class ListaInt extends React.Component {

  constructor(props) {
      super(props);
      this.handleClick = this.handleClick.bind(this);
    }
  handleClick(e){
    //console.log('--------------',e.target.getAttribute('data-key'))
    this.props.handleClick(e.target.getAttribute('data-key'));
  }


  columnas() {
    try {

      let {columns} = this.props;
      let {data} = this.props;
      if ( Object.keys(data).length !== 0 ) {
        let seleccion = [];
        if (Array.isArray(data)) {
          let selec = columns.map((elemento, index) => {
            let ele = elemento.replace('_',' ')
            let elem = ele.charAt(0).toUpperCase() + ele.slice(1);
            return (<td key={elemento} data-key={elemento} onClick={this.handleClick}>{elem}</td>)
          })
          seleccion = Array.prototype.concat(selec, [<td key="RevC">Revision</td>
            ])
        } else {
          let selec = columns.map((elemento, index) => {
            return (<td key={index}>{data[elemento]}</td>)
          })
          seleccion = Array.prototype.concat(selec, [<td key="Ins">
            <button>Inspeccionar</button>
          </td>
            ])
        }

        return (seleccion)
      } else {
        return ([])
      }
    } catch (error) {
      console.error('no hay datos');
      // expected output: SyntaxError: unterminated string literal
      // Note - error messages will vary depending on browser
    }
  }

  /*  componentDidMount() {
    columnas();

  }*/

  render() {
    let card = <tr>{this.columnas()}</tr>;
    return (card)
  }
}
