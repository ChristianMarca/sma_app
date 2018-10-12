import * as React from 'react';
import { CreateChartAPI } from './chartbusiness';
const chartAPI = CreateChartAPI();

const style = require("./chart.style.css");

export class ChartDynamicComponent extends React.Component{
  // constructor(props) {
  //   super(props);
  // }

  rootNodeRef = null;

  setRef = (componentNode) => {
    this.rootNodeRef = componentNode;
  }

  componentDidMount() {
    chartAPI.createChart(this.rootNodeRef, this.props.data);
  }

  shouldComponentUpdate(prevProps) {
    return Boolean(prevProps.data !== this.props.data)
  }

  componentDidUpdate() {
    chartAPI.updateChart(this.props.data);
  }

  render() {
    return (
      <div className={style.container} ref={this.setRef} />
    );
  }
}
