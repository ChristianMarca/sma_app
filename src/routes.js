//Depenencias 
import React from 'react';
import {Route, Switch} from 'react-router-dom';

//componentes
import App from './App';
import AddReport from './containers/Operators/AddReport/AddReport';
import Dashboard from './containers/Dashboard/Dashboard';
import Home from './containers/HomePage/Home';
// import Maps from './containers/Maps/maps.js';
import Page404 from './containers/Page404';

import AdminPage from "./containers/Admin/AdminPage";

class AppRoutes extends React.Component{
  render(){
    return(
      <App>
        <Switch>
          <Route exact path="/" component={Home}/>
          <Route exact path="/newinterruption" component={AddReport} />
          {/* <Route exact path="/maps" component={Maps} /> */}
          <Route exact path="/maps" component={AdminPage} />
          <Route exact path="/dashboard" component={Dashboard} />
          <Route component={Page404} />
        </Switch>
      </App>
    )
  }
}

export default AppRoutes;