import React from "react";
import { connect } from "react-redux";
import {Redirect, withRouter} from 'react-router-dom';
import { interruptionViewIdAction } from "../../actions";
import "./table.css";

const mapStateToProps=state=>{
	return {
    // Inicio de Interrupción
    
	}
}

const mapDispatchToProps=(dispatch)=>{
	return{
    // Inicio de Interrupción
    onSubmitInterruptionView: (event)=> {dispatch(interruptionViewIdAction(event))},
	}
}

class ListaInt extends React.Component {

  constructor(props) {
      super(props);
      this.state={
        openInterruption:false,
      }
      this.handleClick = this.handleClick.bind(this);
    }
  handleClick(e){
    //console.log('--------------',e.target.getAttribute('data-key'))
    this.props.handleClick(e.target.getAttribute('data-key'));
  }
  handleClickSelectInterruption=(id_interruption)=>{
    this.props.onSubmitInterruptionView(id_interruption);
    this.setState((prevState) => ({ openInterruption: !prevState.openInterruption }))
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
            return (
                <td key={elemento} data-key={elemento} onClick={this.handleClick}>{elem}</td>
              )
          })
          seleccion = Array.prototype.concat(selec, [<td key="RevC">Revision</td>
            ])
        } else {
          // var keyButton=undefined;
          let selec = columns.map((elemento, index) => {
            // keyButton=data
            return (
              <td key={index}>
                {data[elemento]}
                {/* <button className="goInterruptionButton" >Inspeccionar</button> */}
              </td>)
          })
          seleccion = Array.prototype.concat(selec, [<td key={data.id_inte}>
            {/* <button key={data.id_inte} onClick={()=>this.props.onSubmitInterruptionView(data.id_inte)} className="goInterruptionButton" >Inspeccionar</button> */}
            <button key={data.id_inte} onClick={()=>this.handleClickSelectInterruption(data.id_inte)} className="goInterruptionButton" >Inspeccionar</button>
            {this.state.openInterruption && <Redirect to="/interruptionOperator" push={true} />}
          </td>
            ])
          // seleccion = Array.prototype.concat(selec, [<td key="Ins">
          //   <button className="goInterruptionButton" >Inspeccionar</button>
          // </td>
          //   ])
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
    // let card = <tr className="tableSubContainer rowTarget">{this.columnas()}</tr>;
    let card = <tr className="rowTarget nfl">
      {this.columnas()}</tr>;
    return (card)
  }
}

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(ListaInt));