import React from "react";
//import "./tarjeta.css";

export default class NavBar extends React.Component {

  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick(e) {
    //console.log('--------------',e.target.getAttribute('data-key'))
    //console.log('--------------',e.target.value)
    this.props.handleClickNav(e.target.getAttribute('data-key'));
  }

  navegador() {
    let paginas = Math.ceil(this.props.totalInt / this.props.elementos);
    let actual = parseInt(this.props.page, 10);
    let prev = actual - 2;
    let next = actual + 2;
    var navNum = [];
    if (paginas <= 5) {
      for (let i = 1; i <= paginas; i++) {
        navNum = navNum.concat([<td key={i}>
          <button onClick={this.handleClick} data-key={i}>{i}</button>
        </td>
          ]);
        //console.log(navNum)
      }
    } else {
      if (actual > 3) {
        if (next < paginas) {
          for (let i = prev; i <= next; i++) {
            navNum = navNum.concat([<td key={i}>
              <button onClick={this.handleClick} data-key={i}>{i}</button>
            </td>
              ]);
          }
        } else {
          for (let i = paginas - 4; i <= paginas; i++) {
            navNum = navNum.concat([<td key={i}>
              <button onClick={this.handleClick} data-key={i}>{i}</button>
            </td>
              ]);
          }
        }
      } else {
        for (let i = 1; i <= 5; i++) {
          navNum = navNum.concat([<td key={i}>
            <button onClick={this.handleClick} data-key={i}>{i}</button>
          </td>
            ]);
        }
      }
    }
    let init = [<td key="init"><button onClick={this.handleClick} data-key={1}>&lt;&lt;</button></td>];
    let end = [<td key="end"><button onClick={this.handleClick} data-key={paginas}>&gt;&gt;</button></td>];
    let navControls = (init).concat(navNum,end)
    return (navControls)
  }

  render() {

    let card = <table>
      <tbody className="nav">
        <tr>{this.navegador()}</tr>
      </tbody>
    </table>;
    return (card)
  }
}
