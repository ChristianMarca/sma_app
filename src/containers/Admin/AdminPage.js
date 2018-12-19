import React from 'react';
import axios from 'axios';
import { API_URL } from "../../config";
import './style.css';

class AdminPage extends React.Component{
  constructor(){
    super();
    this.state={
      rol: '',
      operator: '',
      email:''
    }
  }
  onRolChanged=(e)=>{
    this.setState({
      rol: e.currentTarget.value
    });
  }

  onOperatorChanged=(e)=>{
    this.setState({
      operator: e.currentTarget.value
    });
  }

  onHandleSubmit=(event)=>{
    event.preventDefault();
    const token = window.sessionStorage.getItem('token')||window.localStorage.getItem('token');
    if(this.state.rol.length!==0){
      if ((this.state.rol==='OPERADOR' && this.state.operator.length!==0)||(this.state.rol!=='OPERADOR')){
        // axios.post(`${API_URL}/register`,{
        //   rol: this.state.rol,
        //   operator: this.state.operator,
        //   email: this.state.email
        // })
        axios({
          method: 'POST',
          url:`${API_URL}/register`,
          data: {
            rol: this.state.rol,
            operator: this.state.operator,
            email: this.state.email
          },
          headers: {
            'Content-Type': 'application/json',
            'authorization': token
          }
        })
        .then((data)=>{
          if(data.status===200){
            this.setState({
              operator:'',
              rol:'',
              email:''
            })
            alert('Completado')
          }else{
            alert('ERROR')
          }
        })
        .catch((error)=>{
          alert('ERROR')  
        })
      }
      else{
        alert('Selecione un Operadora')
      }
    }else{
      alert('Seleccione un Rol')
    }
  }

  onChangeEmail=(e)=>{
    this.setState({
      email: e.currentTarget.value
      });
  }

  render(){
      return (
        <form className="adminContainer" onSubmit={this.onHandleSubmit}>
            <h1>Registro de Usuario</h1>
            <h6>Email</h6>
            <input placeholder="Email" className="inputField" type="email" onChange={this.onChangeEmail} value={this.state.email}  required></input>
            <h6>ROL</h6>
            <div className="groupRadioButtons">
              <input className="radioButton" id="operador" type="radio" name="rol" 
                        value={"OPERADOR"} 
                        checked={this.state.rol === "OPERADOR"} 
                        onChange={this.onRolChanged} />
              <label className="marca" htmlFor="operador">Operador</label>
              <input className="radioButton" id="arcotel" type="radio" name="rol" 
                        value={"ARCOTEL"}  
                        checked={this.state.rol ==="ARCOTEL"} 
                        onChange={this.onRolChanged} />
              <label className="marca" htmlFor="arcotel">ARCOTEL</label>
            </div>
            {
              this.state.rol==="OPERADOR"&&(
                <div>
                  <h6>OPERADORA</h6> 
                  <div className="groupRadioButtons">
                      <input className="radioButton" id="conecel" type="radio" name="operador" 
                                value={"CONECEL"} 
                                checked={this.state.operator === "CONECEL"} 
                                onChange={this.onOperatorChanged} />
                      <label className="marca" htmlFor="conecel">CONECEL</label>
                      <input className="radioButton" id="otecel" type="radio" name="operador" 
                                value={"OTECEL"} 
                                checked={this.state.operator === "OTECEL"} 
                                onChange={this.onOperatorChanged} />
                      <label className="marca" htmlFor="otecel">OTECEL</label>
                      <input className="radioButton" id="cnt" type="radio" name="operador" 
                                value={"CNT"} 
                                checked={this.state.operator === "CNT"} 
                                onChange={this.onOperatorChanged} />
                      <label className="marca" htmlFor="cnt">CNT</label>
                </div>
                </div>
              )
            }
            <button type="submit" id="buttonTypeS" className="buttonSubmit" ><i className="fas fa-share-square"></i> Save</button>
        </form>
      );
  }
}

export default AdminPage;