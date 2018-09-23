import React, { Component } from 'react';
import {connect} from 'react-redux';
import Dashboard from './containers/Dashboard/Dashboard'
import AddReport from './containers/Operators/AddReport/AddReport';
import Maps from './containers/Maps/maps';
// import logo from './logo.svg';
import './App.css';

const mapStateToProps=state=>{
	return {
    interruptionType: state.interruptionTypeReducer.interruptionType,
	}
}

class App extends Component {
  render() {
    // console.log('This is sparta',this.state.onChangeInputReducer.textState)
    return (
      <div className="App">
          <ul className="listNav" id="myTopnav">
           <li className="headerItem active"><a className="ItemList">SMA</a></li>
            <li className="headerItem"><a className="ItemList"><i className="fas fa-chart-line"></i> Activity</a></li>
            <li className="headerItem"><a className="ItemList"><i className="fas fa-file-medical-alt"></i> Report</a></li>
            <li className="headerItem"><a className="ItemList"><i className="fas fa-chart-bar"></i> Stadistics</a></li>
            <li className="headerItem"><a className="ItemList"><i className="fas fa-map-marked-alt"></i> Maps</a></li>

            <li className="headerItemRight">
              <a className="searchItem">
                <input placeholder="search" className="search" />
                <i className="fas fa-search searchIcon"></i>
              </a>
            </li>
            <li className="itemName"><a className=""> Name</a></li>
            <li className="itemCollapse"><a className=""><img src="http://rocaldent.com.ve/rocaldent/public/images/image-not-found.png" alt="Avatar" className="avatar"/></a></li>
            <li className="icon headerItemRight" onClick={this.changeNav}>
              <i className="fas fa-bars"></i>
            </li>
          </ul>
           <Dashboard />
          <AddReport />
          <Maps />
      </div>
    );
  }
}

export default connect(mapStateToProps)(App);
