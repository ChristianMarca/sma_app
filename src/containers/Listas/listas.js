import React from "react";
import { connect } from "react-redux";
import {Redirect,withRouter} from 'react-router-dom';
// import axios from 'axios';
import { API_URL } from "../../config";

import { isSignInAction,receiveDataUserAction } from "../../actions";
import Lista from "../../components/Card/lista.js";

const mapStateToProps=state=>{
	return {
    // Elección del tipo de interrupción
    sessionController: state.sessionReducer.dataUser
	}
}
const mapDispatchToProps=(dispatch)=>{
	return{
    onSignInApproved: ()=> dispatch(isSignInAction(true)),
    onReceiveDataUser: (data)=>dispatch(receiveDataUserAction(data)),
	}
}

class ListaInt extends React.Component {

  componentDidMount(){
    const token = window.sessionStorage.getItem('token')||window.localStorage.getItem('token');
    if(token){
      fetch(`${API_URL}/authentication/signin`,{
          method: 'post',
          headers: {
              'Content-Type': 'application/json',
              'authorization': token
          },
      })
      .then(resp=>resp.json())
      .then(data=>{
          if( data && data.id_user){
              fetch(`${API_URL}/authentication/profile/${data.id_user}`,{
              method: 'GET',
              headers: {
                  'Content-Type': 'application/json',
                  'authorization': token
              },
              })
              .then(resp=>resp.json())
              .then(user=>{
                  console.log('adqui esta',user)
                  if (user && user.email){
                    console.log(user, 'continueWithToken')
                    this.props.onSignInApproved();
                    this.props.onReceiveDataUser(user);
                  }
              })
          }
      })
      .catch(err=>{
        // this.props.history.push('/');
        console.log('Aqui un error', err)
      })
    }else{
      this.props.history.push('/');
    }
  }

  getContentFromPage=()=>{
    if(!this.props.sessionController.id_rol) return <Redirect to="/" push={true} />;
    if(this.props.sessionController.id_rol!==3){
      return(
        <div className="containerListSuper">
          <Lista/>
        </div>
      )
    }else{
      return(
        <Redirect to="/" push={true} />
      )
    }
  }

  render() {
    // let card =<div className="containerListSuper">
    //   <Lista/>
    // </div>
    // return (card)
    return(
      this.getContentFromPage()
    )
  }
}

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(ListaInt));