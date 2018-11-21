import React from 'react';
import { connect } from "react-redux";
// import axios from 'axios';
// import { Redirect } from "react-router-dom";
import { isSignInAction, receiveDataUserAction } from "../../actions";
import { API_URL } from "../../config";
import './style.css';

const mapStateToProps=state=>{
	return {
    // Elección del tipo de interrupción
    interruptionType: state.interruptionTypeReducer.interruptionType,
    interruptionRB: state.interruptionAddressReducer,
    interruptionDate: state.interruptionDateReducer,
    interruptionCauses: state.interruptionCausesReducer,
	}
}
const mapDispatchToProps=(dispatch)=>{
	return{
    // Elección del tipo de interrupción
        onSigninApproved: ()=> dispatch(isSignInAction(true)),
        onReceiveDataUser: (data)=>dispatch(receiveDataUserAction(data))
	}
}

class LoginForm extends React.Component{
    constructor(){
        super();
        this.state={
            signInEmail:'',
            signInPassword:'',
            signInRemember:false,
        }
    }

    onEmailChange=(event)=>{
        this.setState({signInEmail: event.target.value})
    }

    onPasswordChange=(event)=>{
		this.setState({signInPasword: event.target.value})
    }
    
    onRememberChange=(event)=>{
        this.setState((prevState)=>({signInRemember: !prevState.signInRemember}))
    }
    
    onCLickEvent=()=>{
        let message=document.getElementById("failMessage");
        if (message.style.visibility === 'visible'){
            message.style.visibility = 'hidden';
            message.style.height='0';
            message.style.padding='0';
        }
    }

	saveAuthTokenInSession=(token)=>{
        this.state.signInRemember===true?
		window.localStorage.setItem('token',token):
		window.sessionStorage.setItem('token',token);
    }

    onSubmitSignIn=(event)=>{
        // console.log(this.state)
        let message=document.getElementById("failMessage");
        if (message.style.visibility === 'visible'){
            message.style.visibility = 'hidden';
            message.style.height='0';
            message.style.padding='0';
        }
        event.preventDefault()
		fetch(`${API_URL}/authentication/signin`,{
			method: 'post',
			headers: {'Content-Type': 'application/json'},
			body: JSON.stringify({
				email: this.state.signInEmail,
				password: this.state.signInPasword,
			})
        })
        .then(respon=>{return respon.json()})
        .then(data=>{
			console.log(data)
			if (data.userId && data.success=== true){
				this.saveAuthTokenInSession(data.token);
				fetch(`${API_URL}/authentication/profile/${data.userId}`,{
						method: 'GET',
						headers: {
								'Content-Type': 'application/json',
								'authorization': data.token
						},
						})
						.then(resp=>resp.json())
						.then(user=>{
                            console.log('user', user)
								if (user && user.email){
                                        // console.log(user, 'continue')
                                        this.props.onSigninApproved()
                                        this.props.onReceiveDataUser(user)
										// this.props.loadUser(user);
										// this.props.onRouteChange('Home')
								}
						})
						.catch(console.log)
				}else{
                    const message=document.getElementById("failMessage");
                    message.style.visibility="visible";
                    message.style.height='auto';
                    message.style.padding='.5em';
			}
		}).catch(console.log)

	}

    render(){
        return(
            <section className="login-block">
                <div className="containerLogin">
                    <div className="row">
                        <div className="col-md-4 login-sec">
                            <h2 className="text-center">Iniciar Sesion</h2>
                            <form className="login-form">
                                <div className="form-group">
                                    <label htmlFor="exampleInputEmail1" className="text-uppercase">Email</label>
                                    <input onChange={this.onEmailChange} onClick={this.onCLickEvent} type="email" name="email-address" id="email-address" className="form-control" placeholder="" required />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="exampleInputPassword1" className="text-uppercase">Contraseña</label>
                                    <input onChange={this.onPasswordChange} onClick={this.onCLickEvent} type="password" name="password" id="password" className="form-control" placeholder="" required />
                                </div>
                                <div className="failLogin" id="failMessage">
                                    <i className="fas fa-exclamation-triangle"></i>Correo o Contraseña incorrectos
                                </div>
                                <div className="form-check">
                                    {/* <label className="form-check-label"> */}
                                        <input type="checkbox" id="rememberMe" onClick={this.onRememberChange} className="form-check-input" />
                                        <label className="marca" htmlFor="rememberMe">Remember Me</label>
                                        {/* <small>Remember Me</small> */}
                                    {/* </label> */}
                                    <br/>
                                    <button type="submit" onClick={this.onSubmitSignIn} className="btn btn-login float-right">Submit</button>
                                </div>
                            </form>
                            <div className="copy-text">La presenta plataforma se encuentra en proceso de desarrollo, para mas información dirigirse a  <i className="fab fa-github" ></i> o en  <a href="http://www.arcotel.gob.ec/">ARCOTEL</a>
                            </div>
                        </div>
                        {/* <div className="col-md-8 banner-sec"> */}
                            {/* <a href="#" class="photo">
                            <h1>Amber Heard</h1>
                                <img src="https://s-media-cache-ak0.pinimg.com/736x/06/d1/5f/06d15fc8a69e2ab67143e5357a4184d7.jpg" />
                            <div class="glow-wrap">
                                <i class="glow"></i>
                            </div>
                            </a> */}
                            {/* <a href="http://tiagoalexandrelopes.com/" target="_blank" id="author">About me</a> */}
                        {/* </div> */}
                    </div>
                </div>
            </section>
        )
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(LoginForm);