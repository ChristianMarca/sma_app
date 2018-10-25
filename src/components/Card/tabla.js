import React from "react";
import "./tabla.css";
import ListaInt from "./tarjeta.js";

import Dropdown from 'rc-dropdown';
import Menu, {Item as MenuItem, Divider} from 'rc-menu';
import 'rc-dropdown/assets/index.css';

var colu = ["fecha", "estructura", "provincia", "estado", "canton"];

class TablaInt extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      datosInt: {},
      campos:[]
    }
  }

  //Dropdow simple
  onSelectSimple({key}) {
    return (key)
  }

  onVisibleChangesimple(visible) {
    console.log(visible);
  }

  //Dropdown saveSelectedMultiple
  onVisibleChangeMultiple = (visible) => {
    this.setState({visible});
  }

  saveSelectedMultiple = ({selectedKeys}) => {
    let llaves = ['fecha']
    this.setState({campos: llaves.concat(selectedKeys)})
}
  tablaGen() {
    let {data} = this.props;
    let seleccion = data.map(elemento => {
      return (<ListaInt columns={this.state.campos} data={elemento}></ListaInt>)
    })
    let etiquetas = <ListaInt columns={this.state.campos} data={this.state.campos}></ListaInt>;
    let tabla = {etiquetas,seleccion}
    return (seleccion)
  }
  /*
  dataRequest = async () => {
    this.props.isDashboardComponent !== true
      ? (() => {
        fetch('http://192.168.1.15:3000/mapa/data_radiobase', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        }).then(response => response.json()).then(datosnuev => datosnuev.jsonData).then(myData => {
          var rbTodo = {
            features: (myData.conecel.features.concat(myData.otecel.features, myData.cnt.features)),
            type: "FeatureCollection"
          }
          this.getData(rbTodo).then(datos => {
            this.setState({dataToSearch: datos})
            handleData(datos)
            return datos
          });

          return [
            this.clusterFunction(myData.conecel),
            this.clusterFunction(myData.otecel),
            this.clusterFunction(myData.cnt)
          ]

        }).then((barLayer) => {
          markerConecel.addLayer(barLayer[0]);
          this.map.addLayer(markerConecel);

          markerOtecel.addLayer(barLayer[1]);
          this.map.addLayer(markerOtecel);

          markerCNT.addLayer(barLayer[2]);
          this.map.addLayer(markerCNT);

          document.getElementById("spinner").style.visibility = "hidden";
        }).catch(err => console.log(err))
        //Fin de funcion de pedido de datos

        const handleData = (datos) => {
          this.props.obtainList(datos)
        }

        this.props.isDashboardComponent !== true && L.easyButton('https://cdn2.iconfinder.com/data/icons/filled-icons/493/Search-512.png', function(btn, map) {
          clickMenu()

        }).addTo(this.map);

        const clickMenu = () => {
          this.props.search('click')
        }
      })()
      : alert('sorry')
    // setTimeout(function() {
    //   sidebar.show();
    // }, 500);
    // setTimeout(function() {
    //   sidebar.hide();
    // }, 1500);
  }
  */

  render() {
    const cantidad = (<Menu onSelect={this.onSelectSimple}>
      <MenuItem key="10">10</MenuItem>
      <Divider/>
      <MenuItem key="20">20</MenuItem>
    </Menu>);
    const campos = (<Menu style={{
        width: 140
      }} multiple="multiple" onSelect={this.saveSelectedMultiple} onDeselect={this.saveSelectedMultiple}>
      <MenuItem key="cellId">Cell Id</MenuItem>
      <Divider/>
      <MenuItem key="estructura">Estructura</MenuItem>
      <Divider/>
      <MenuItem key="provincia">Provincia</MenuItem>
      <Divider/>
      <MenuItem key="canton">Canton</MenuItem>
      <Divider/>
      <MenuItem key="parroquia">Parroquia</MenuItem>
      <Divider/>
      <MenuItem key="causas">Causas</MenuItem>
      <Divider/>
      <MenuItem key="operadora">Operadora</MenuItem>
      <Divider/>
      <MenuItem key="estado">Estado</MenuItem>
    </Menu>);

    return (
    // <div>Maps Here!</div>
    // <div id="containerChart" className='svg-containerChart'>
    <div>
      <div>Interrupciones del Servicio Movil Avanzado</div>
      <div>
        Elementos por pagina:
        <Dropdown trigger={['click']} overlay={cantidad} animation="slide-up" onVisibleChange={this.onVisibleChangesimple}>
          <button style={{width: 100}}>Cantidad</button>
        </Dropdown>
        Columnas:
        <Dropdown trigger={['click']} onVisibleChange={this.onVisibleChangeMultiple} visible={this.state.visible} closeOnSelect={false} overlay={campos} animation="slide-up">
          <button>Campos</button>
        </Dropdown>
      </div>
      <table>
        <tbody>{this.tablaGen()}</tbody>
      </table>
    </div>)
  }
}

export default TablaInt;
