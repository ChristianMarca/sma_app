import React from 'react';
import { CreateChartAPI } from './chart';
const chartAPI = CreateChartAPI();

const style = require("./chart.style.css");

export class BridgeComponent extends React.Component{

  rootNodeRef = null;

  setRef = (componentNode) => {
    this.rootNodeRef = componentNode;
  }

  componentDidMount() {
    chartAPI.createChart(this.rootNodeRef, this.props.data, this.props.data1, this.props.data2);
  }

  shouldComponentUpdate(prevProps) {
    return Boolean(prevProps.data !== this.props.data)
  }

  componentDidUpdate() {
    chartAPI.updateChart(this.props.data,this.props.data1, this.props.data2);
  }

  render() {
    return (
      <div className="bridgeComponent" ref={this.setRef} />
    );
  }
}
