import * as React from 'react';
// import { CreateDonutAPI } from './chartbusiness';
import { createDonutChart } from './pieChart';
import {data} from './species';
const donutChartInit = createDonutChart();

//const style = require("../chart.style.css");

export class BridgeComponentDonut extends React.Component{
  // constructor(props) {
  //   super(props);
  // }

  rootNodeRef = null;

  setRef = (componentNode) => {
    this.rootNodeRef = componentNode;
    // if (componentNode) {
    //   console.log(componentNode.getBoundingClientRect());
    // }
   // console.log('aqui',componentNode)
  }

  componentDidMount() {
    // donutAPI.createChart(this.rootNodeRef, this.props.data);
    donutChartInit.donutChart_(this.rootNodeRef,data);
  }

  shouldComponentUpdate(prevProps) {
    return Boolean(prevProps.data !== this.props.data)
  }

  componentDidUpdate() {
    //donutAPI.updateChart(this.props.data);
    //donutChartInit.donutChart_(this.props.data);
  }

  render() {
    // console.log('aqui',this.setRef)
    return (
      <div ref={this.setRef } />
    );
  }
}
