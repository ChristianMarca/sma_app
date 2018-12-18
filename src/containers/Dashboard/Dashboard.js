import React from 'react';
import './Dashboard.css';
import { isSignInAction,receiveDataUserAction } from "../../actions";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { API_URL } from "../../config";

const mapStateToProps=state=>{
	return {
    sessionController: state.sessionReducer,
	}
}
const mapDispatchToProps=(dispatch)=>{
	return{
        onSignInApproved: ()=> dispatch(isSignInAction(true)),
        onReceiveDataUser: (data)=>dispatch(receiveDataUserAction(data))
	}
}

class Dashboard extends React.Component{
  
  componentDidMount(){
    const token = sessionStorage.getItem('token')||localStorage.getItem('token');
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
                  if (user && user.email){
                    this.props.onSignInApproved();
                    this.props.onReceiveDataUser(user);
                  }
              })
          }
      })
      .catch(err=>{
        // this.props.history.push('/');
        console.log({Error: err})
      })
    }else{
      this.props.history.push('/');
    }
  }
  render(){
    return(
      <div className="wrapper">
        <div className="headerContainer">One</div>
        <div className="userContainer">Two</div>
        <div className="mapContainer">Three</div>
        <div className="stadisticsContainer">Four</div>
        <div className="listContainer">Five</div>
      </div>
    )
  }
}

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(Dashboard));