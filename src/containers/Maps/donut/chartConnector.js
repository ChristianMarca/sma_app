import * as React from 'react';
// import { CreateDonutAPI } from './chartbusiness';
import { CreateDonutAPI } from './Donut';
import {freqData} from './data';
const donutAPI = CreateDonutAPI();

const style = require("../chart.style.css");

export class BridgeComponent extends React.Component{
  constructor(props) {
    super(props);
  }

  rootNodeRef = null;

  setRef = (componentNode) => {
    this.rootNodeRef = componentNode;
  }

  componentDidMount() {
    // donutAPI.createChart(this.rootNodeRef, this.props.data);
    donutAPI.dashboard(this.rootNodeRef, freqData);
  }

  // shouldComponentUpdate(prevProps) {
  //   return Boolean(prevProps.data !== this.props.data)
  // }

  // componentDidUpdate() {
  //   donutAPI.updateChart(this.props.data);
  // }

  render() {
    return (
      <div className={style.container} ref={this.setRef} />
    );
  }
}
