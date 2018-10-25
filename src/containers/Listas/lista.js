import React from "react";
import "./lista.css";
import TablaInt from "../../components/Card/tabla.js";

var datosI = [
  {
    fecha: "Cualqueir dia",
    cellId: 50,
    estructura: "cerro",
    provincia: "Azuay",
    canton: "Cuenca",
    parroquia: "Cuenca",
    causas: "Corte de Fibra",
    operadora: "Conecel",
    estado: "Activo"
  }, {
    fecha: "20-8-45",
    cellId: 50,
    estructura: "cerro",
    provincia: "Azuay",
    canton: "Cuenca",
    parroquia: "Cuenca",
    causas: "Corte de Fibra",
    operadora: "Conecel",
    estado: "Activo"
  }, {
    fecha: "Activo",
    cellId: 50,
    estructura: "cerro",
    provincia: "Azuay",
    canton: "Cuenca",
    parroquia: "Cuenca",
    causas: "Corte de Fibra",
    operadora: "Conecel",
    estado: "Activo"
  }, {
    fecha: "Activo",
    cellId: 50,
    estructura: "cerro",
    provincia: "Azuay",
    canton: "Cuenca",
    parroquia: "Cuenca",
    causas: "Corte de Fibra",
    operadora: "Conecel",
    estado: "Activo"
  }, {
    fecha: "Activo",
    cellId: 50,
    estructura: "cerro",
    provincia: "Azuay",
    canton: "Cuenca",
    parroquia: "Cuenca",
    causas: "Corte de Fibra",
    operadora: "Conecel",
    estado: "Activo"
  }, {
    fecha: "Activo",
    cellId: 50,
    estructura: "cerro",
    provincia: "Azuay",
    canton: "Cuenca",
    parroquia: "Cuenca",
    causas: "Corte de Fibra",
    operadora: "Conecel",
    estado: "Activo"
  }, {
    fecha: "Activo",
    cellId: 50,
    estructura: "cerro",
    provincia: "Azuay",
    canton: "Cuenca",
    parroquia: "Cuenca",
    causas: "Corte de Fibra",
    operadora: "Conecel",
    estado: "Activo"
  }
];

export default class ListaInt extends React.Component {

  render() {

    let card = <div id="tarjeta">
      <TablaInt data={datosI}/>
    </div>;
    return (card)
  }
}
