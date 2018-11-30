import React from "react";
import Lista from "../../components/Card/lista.js";

export default class ListaInt extends React.Component {

  // constructor(props) {
  //     super(props);
  //   }
  render() {
    let card =<div className="containerListSuper">
      <Lista/>
    </div>
    return (card)
  }
}
