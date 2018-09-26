import React, { Component } from 'react';
import {connect} from 'react-redux';
import propTypes from 'prop-types';
import {Link} from 'react-router-dom';

// import Dashboard from './containers/Dashboard/Dashboard'
// import AddReport from './containers/Operators/AddReport/AddReport';
// import Maps from './containers/Maps/maps';
// import logo from './logo.svg';
import './App.css';

const mapStateToProps=state=>{
	return {
    interruptionType: state.interruptionTypeReducer.interruptionType,
	}
}

class App extends Component {

  changeNav=()=>{
    var x = document.getElementById("myTopnav");
    x.className === "listNav"?x.className += " responsive":x.className = "listNav";
    // if (x.className === "listNav") {
    //     x.className += " responsive";
    // } else {
    //     x.className = "listNav";
    // }
  }

  render() {
    // console.log('This is sparta',this.state.onChangeInputReducer.textState)
    const {children}= this.props;
    return (
      <div className="App">
          <ul className="listNav" id="myTopnav">
           <li className="headerItem active">SMA</li>
            <li className="headerItem" onClick={this.changeNav}><Link to="/"><i className="fas fa-chart-line"></i> Activity</Link></li>
            <li className="headerItem" onClick={this.changeNav}><Link to="/newinterruption"><i className="fas fa-file-medical-alt"></i> Report</Link></li>
            <li className="headerItem" onClick={this.changeNav}><i className="fas fa-chart-bar"></i> Stadistics</li>
            <li className="headerItem" onClick={this.changeNav}><Link to="/maps"><i className="fas fa-map-marked-alt"></i> Maps</Link></li>

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
          {/* <Dashboard />
          <AddReport />
          <Maps /> */}
          <div>
            {children}
          </div>
      </div>
    );
  }
}

App.propTypes={
  children: propTypes.object.isRequired,
}
export default connect(mapStateToProps)(App);
