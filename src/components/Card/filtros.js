import React from "react";
import DateTimePicker from 'react-datetime-picker';

export default class Filtro extends React.Component {

  constructor() {
    super();
  }
  onChangeInit = date => this.props.onChangeI(date);
  onChangeEnd = date => this.props.onChangeE(date);
  handleClick = e => this.props.onClicGO(e);
  onChangeInput = e => this.props.onChangeInput(e.target.value);

  render() {

    let filters = <table>
      <tbody>
      <tr>
        <td>Desde:</td>
        <td><DateTimePicker onChange={this.onChangeInit} value={this.props.valueI}/></td>
        <td>Hasta:</td>
        <td><DateTimePicker onChange={this.onChangeEnd} value={this.props.valueE}/></td>
      </tr>
      <tr>
        <td>Parroquia:</td>
        <td>
          <input type="text" id="name" onChange={this.onChangeInput}></input>
        </td>
        <td>Canton:</td>
        <td>
          <input type="text" id="name" onChange={this.onChangeInput}></input>
        </td>
        <td>Provincia:</td>
        <td>
          <input type="text" id="name" onChange={this.onChangeInput}></input>
        </td>
        <td><button onClick={this.handleClick} data-key={0}>Ir</button></td>
      </tr>
    </tbody>
    </table>;

    return (filters)
  }
}
