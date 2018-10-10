import * as React from 'react';
import { CreateChartAPI } from './chartbusiness';
const chartAPI = CreateChartAPI();

const style = require("./chart.style.css");

export class ChartStaticComponent extends React.Component{
  constructor(props) {
    super(props);
  }

  rootNodeRef = null;

  setRef = (componentNode) => {
    this.rootNodeRef = componentNode;
  }

  componentDidMount() {
    chartAPI.createChart(this.rootNodeRef, this.props.data);
  }

  shouldComponentUpdate() {
    return false;
  }

  render() {
    return (
      <div className={style.container} ref={this.setRef} />
    );
  }
}
