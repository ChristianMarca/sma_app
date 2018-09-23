import React from 'react';

import './interruption.css'

var textContainer, textareaSize, input;
var autoSize=()=> {
  textareaSize.innerHTML = input.value + '\n';
};

document.addEventListener('DOMContentLoaded', function() {
  textContainer = document.querySelector('.textarea-containerCauses');
  textareaSize = textContainer.querySelector('.textarea-size');
  input = textContainer.querySelector('textarea');
  autoSize();
  input.addEventListener('input', autoSize);
});

class InterruptionCauses extends React.Component{
  getMatches=(string, regex, index)=> {
    index || (index = 1); // default to the first capturing group
    var matches = [];
    var match;
    while ((match = regex.exec(string))!==null) {
      matches.push(match[index]);
    }
    return matches;
  }
  regexA=(texto)=>{
    const regex = /-b-([^-<\\]*(?:\\.[^-<\\]*)*)-/g,reemp = "<b class='tags'>$1</b>",resultado = document.getElementById("resultado");
    var matches = this.getMatches(texto.target.value, regex, 1);
    console.log(matches)
    resultado.innerHTML = texto.target.value.replace(regex,reemp);
  }
  render(){
    return(
      <form className="addressContainer">
        <h6 className="titleInput">Causas</h6>
        <div className="card searchContainer">
          <div className="textarea-containerCauses">
            <textarea placeholder="Azuay" id="inputCauses" className="card-header" type="text" size="1" onChange={this.regexA}  required></textarea>
            <div className="textarea-size"></div>
          </div>
          <p className="textField card-body" id="resultado"></p>
        </div>
      </form>
    )
  }
}

export default InterruptionCauses;