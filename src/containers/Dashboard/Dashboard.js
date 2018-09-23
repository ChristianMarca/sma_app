import React from 'react';
import './Dashboard.css'

class Dashboard extends React.Component{
  // constructor(){
  //   super();
  // }
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

export default Dashboard;