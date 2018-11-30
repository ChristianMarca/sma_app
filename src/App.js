import React, { Component } from 'react';
import {connect} from 'react-redux';
import propTypes from 'prop-types';
import {Link} from 'react-router-dom';
import ProfileIcon from "./components/profile/ProfileIcon";
import { isSignInAction, receiveDataUserAction } from "./actions";
import Modal from './components/Modal/Modal';
import Profile from './components/profile/Profile';
import AdminPage from './containers/Admin/AdminPage';
import { API_URL } from "./config";

// import Dashboard from './containers/Dashboard/Dashboard'
// import AddReport from './containers/Operators/AddReport/AddReport';
// import Maps from './containers/Maps/maps';
// import logo from './logo.svg';
import './App.css';
//import { stat } from 'fs';

const mapStateToProps=state=>{
	return {
    interruptionType: state.interruptionTypeReducer.interruptionType,
    sessionController: state.sessionReducer,
	}
}
const mapDispatchToProps=(dispatch)=>{
	return{
    // Elección del tipo de interrupción
        onSigninApproved: ()=> dispatch(isSignInAction(true)),
        onReceiveDataUser: (data)=>dispatch(receiveDataUserAction(data))
	}
}

class App extends Component {

  constructor(){
    super();
    this.state={
      isProfileOpen:false,
    }
  }
  
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
                    // console.log('adqui esta',user)
                    if (user && user.email){
                      // console.log(user, 'continueWithToken')
                      this.props.onSigninApproved()
                      this.props.onReceiveDataUser(user)
                        // this.loadUser(user);
                        // this.onRouteChange('Home')
                    }
                })
            }
        })
        .catch(console.log)
    }
}

  changeNav=()=>{
    var x = document.getElementById("myTopnav");
    x.className === "listNav"?x.className += " responsive":x.className = "listNav";
    // if (x.className === "listNav") {
    //     x.className += " responsive";
    // } else {
    //     x.className = "listNav";
    // }
  }
  toogleModal=()=>{
    this.setState(prevState=>(
        {
            ...prevState,
            isProfileOpen: !prevState.isProfileOpen
        }
    ) )
}
  onRouterAccess=()=>{
    if(!this.props.sessionController.dataUser.issysadmin){
      return([
          <li key='dashboard' className="headerItem" onClick={this.changeNav}><Link to="/dashboard"><i className="fas fa-chart-line"></i> Activity</Link></li>,
          <li key='listado' className="headerItem" onClick={this.changeNav}><Link to="/listas"><i className="fas fa-chart-bar"></i>Stats</Link></li>,
          <li key='newINterruption' className="headerItem" onClick={this.changeNav}><Link to="/newinterruption"><i className="fas fa-file-medical-alt"></i> Report</Link></li>,
          <li key='home' className="headerItem" onClick={this.changeNav}><Link to="/"><i className="fas fa-home"></i> Home</Link></li>,
          <li key='maps' className="headerItem" onClick={this.changeNav}><Link to="/maps"><i className="fas fa-map-marked-alt"></i> Maps</Link></li>
        ]
        )
      }
  }
  render() {
    // console.log('This is sparta',this.state.onChangeInputReducer.textState)
    const {children}= this.props;
    //console.log('el papu de los test', this.props.sessionController)
    const accessToApp=(
      <ul className="listNav" id="myTopnav">
        <li className="headerItem">SMA</li>
        {this.onRouterAccess()}
        {/* <li className="headerItemRight">
          <a className="searchItem">
            <input placeholder="search" className="search" />
            <i className="fas fa-search searchIcon"></i>
          </a>
        </li> */}
        <li className="headerItemRight itemName"><a className=""> {this.props.sessionController.dataUser.username}</a></li>
        <li>
          <ProfileIcon toogleModal={this.toogleModal} />
          {this.state.isProfileOpen &&
                <Modal>
                    <Profile isProfileOpen={this.state.isProfileOpen} toogleModal={this.toogleModal}/>
                </Modal>
            }
        </li>
        {/* <li className="itemCollapse"><a className=""><img src="http://rocaldent.com.ve/rocaldent/public/images/image-not-found.png" alt="Avatar" className="avatar"/></a></li> */}
        <li className="icon headerItemRight" onClick={this.changeNav}>
          <i className="fas fa-bars"></i>
        </li>
      </ul>
    )
    const accessDenied=(
      <ul className="listNav" id="myTopnav">
        <li className="headerItem">SMA</li>
        <li className="headerItem" onClick={this.changeNav}><a href="http://www.arcotel.gob.ec/"><i className=""></i> ARCOTEL</a></li>
        {/* <li className="headerItem" onClick={this.changeNav}><Link to="/newinterruption"><i className="fas fa-file-medical-alt"></i> About</Link></li> */}
        {/* <li className="headerItem" onClick={this.changeNav}><Link to="/"><i className="fas fa-home"></i> Home</Link></li> */}
        {/* <li className="headerItem" onClick={this.changeNav}><Link to="/maps"><i className="fas fa-map-marked-alt"></i> Maps</Link></li> */}

        {/* <li className="headerItemRight">
          <a className="searchItem">
            <input placeholder="search" className="search" />
            <i className="fas fa-search searchIcon"></i>
          </a>
        </li> */}
        <li className="itemName headerItemRight"><a className=""> Not Authorized</a></li>
        {/* <li className="itemCollapse"><a className=""><img src="http://rocaldent.com.ve/rocaldent/public/images/image-not-found.png" alt="Avatar" className="avatar"/></a></li> */}
        <li className="itemCollapse"><a className="">About</a></li>
        <li className="icon headerItemRight" onClick={this.changeNav}>
          <i className="fas fa-bars"></i>
        </li>
      </ul>
    )
    // console.log('esto es lo que paso: ',this.props)
    return (
      <div className="App">
        {
          this.props.sessionController.isSessionInit?accessToApp:accessDenied
        }
{/* //           <ul className="listNav" id="myTopnav">
//            <li className="headerItem active">SMA</li>
//             <li className="headerItem" onClick={this.changeNav}><Link to="/"><i className="fas fa-chart-line"></i> Activity</Link></li>
//             <li className="headerItem" onClick={this.changeNav}><Link to="/newinterruption"><i className="fas fa-file-medical-alt"></i> Report</Link></li>
//             <li className="headerItem" onClick={this.changeNav}><Link to="/listas"><i className="fas fa-chart-bar"></i>Stats</Link></li>
//             <li className="headerItem" onClick={this.changeNav}><Link to="/maps"><i className="fas fa-map-marked-alt"></i> Maps</Link></li>

//             <li className="headerItemRight">
//               <a className="searchItem">
//                 <input placeholder="search" className="search" />
//                 <i className="fas fa-search searchIcon"></i>
//               </a>
//             </li>
//             <li className="itemName"><a className=""> Name</a></li>
//             <li className="itemCollapse"><a className=""><img src="http://rocaldent.com.ve/rocaldent/public/images/image-not-found.png" alt="Avatar" className="avatar"/></a></li>
//             <li className="icon headerItemRight" onClick={this.changeNav}>
//               <i className="fas fa-bars"></i>
//             </li>
//           </ul> */}
          {/* <Dashboard />
          <AddReport />
          <Maps /> */}
        {
          this.props.sessionController.dataUser.issysadmin?
            <AdminPage />
            :
            <div>
              {children}
            </div>
        }
      </div>
    );
  }
}

App.propTypes={
  children: propTypes.object.isRequired,
}
export default connect(mapStateToProps,mapDispatchToProps)(App);
