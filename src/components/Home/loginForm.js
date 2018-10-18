import React from 'react';
import './style.css';

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
        console.log('evento', event.target.value)
		this.setState({signInEmail: event.target.value})
    }

    onPasswordChange=(event)=>{
		this.setState({signInPasword: event.target.value})
    }
    
    onRememberChange=(event)=>{
        this.setState((prevState)=>({signInRemember: !prevState.signInRemember}))
	}

	saveAuthTokenInSession=(token)=>{
        this.props.singnInRemember=true?
		window.localStorage.setItem('token',token):
		window.sessionStorage.setItem('token',token);
    }

    onSubmitSignIn=(event)=>{
        console.log(this.state)
        event.preventDefault()
        fetch('http://192.168.1.102:3000/authentication/signin',{
            method: 'post',
			headers: {'Content-Type': 'application/json'},
			body: JSON.stringify({
				email: this.state.signInEmail,
				password: this.state.signInPasword,
			})
        }).then((resp) => {
            return resp.json();
        }).then((data)=>{
            console.log('la data', data)
        })
        .catch((err) => {
            console.log('El error', err)
        });
		// fetch('http://localhost:3000/signin',{
		// 	method: 'post',
		// 	headers: {'Content-Type': 'application/json'},
		// 	body: JSON.stringify({
		// 		email: this.state.signInEmail,
		// 		password: this.state.signInPasword,
		// 	})
		// }).then(respon=>{
		// 	return respon.json()
		// }).then(data=>{
		// 	// console.log(data)
		// 	if (data.userId && data.success=== true){
		// 		this.saveAuthTokenInSession(data.token);
		// 		fetch(`http://localhost:3000/profile/${data.userId}`,{
		// 				method: 'GET',
		// 				headers: {
		// 						'Content-Type': 'application/json',
		// 						'authorization': data.token
		// 				},
		// 				})
		// 				.then(resp=>resp.json())
		// 				.then(user=>{
		// 						if (user && user.email){
		// 								this.props.loadUser(user);
		// 								this.props.onRouteChange('Home')
		// 						}
		// 				})
		// 				.catch(console.log)
		// 		}else{
		// 		// console.log('Email or Passward Incorrect')
		// 	}
		// }).catch(console.log)

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
                                    <input onChange={this.onEmailChange} type="email" name="email-address" id="email-address" className="form-control" placeholder="" />
                                </div>
                                <div     className="form-group">
                                    <label htmlFor="exampleInputPassword1" className="text-uppercase">Contraceña</label>
                                    <input onChange={this.onPasswordChange} type="password" name="password" id="password" className="form-control" placeholder="" />
                                </div>
                                <div className="form-check">
                                    <label className="form-check-label">
                                        <input type="checkbox" onClick={this.onRememberChange} className="form-check-input" />
                                        <small>Remember Me</small>
                                    </label>
                                    <br/>
                                    <button type="submit" onClick={this.onSubmitSignIn} className="btn btn-login float-right">Submit</button>
                                </div>
                            </form>
                            <div className="copy-text">La presenta plataforma se encuentra en proceso de desarrollo, para mas información dirigirse a  <i className="fab fa-github" ><a href="https://github.com/ChristianMarca"></a></i> o en  <a href="http://www.arcotel.gob.ec/">ARCOTEL</a>
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

export default LoginForm;