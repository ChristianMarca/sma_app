//Depenencias
import React from 'react';
import { Route, Switch } from 'react-router-dom';

//componentes
import App from './App';
import AddReport from './containers/Operators/AddReport/AddReport';
import RadioBasesPage from './containers/RadioBases/RadioBases';
import Home from './containers/HomePage/Home';
import Maps from './containers/Maps/maps.js';
import Page404 from './containers/Page404';
import OperatorViewInteruption from './containers/InterruptionViews/viewOperatorInterruption';

// import AdminPage from "./containers/Admin/AdminPage";
import ListaInt from './containers/Listas/listas.js';

class AppRoutes extends React.Component {
	render() {
		return (
			<App>
				<Switch>
					<Route exact path="/" component={Home} />
					<Route exact path="/newinterruption" component={AddReport} />
					<Route exact path="/maps" component={Maps} />
					{/* <Route exact path="/maps" component={AdminPage} /> */}
					<Route exact path="/radiobases" component={RadioBasesPage} />
					<Route exact path="/listas" component={ListaInt} />
					<Route exact path="/interruptionOperator" component={OperatorViewInteruption} />
					<Route exact path="/" component={RadioBasesPage} />
					<Route component={Page404} />
				</Switch>
			</App>
		);
	}
}

export default AppRoutes;
