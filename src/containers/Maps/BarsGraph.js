import * as React from 'react';
import { ChartStaticComponent } from './chart-static';
import { ChartDynamicComponent } from './chart-dynamic';
import { getRandomArray } from './randomize';
import { setup } from './chart-setup';

export class D3RenderSample extends React.Component {
  constructor(props) {
    super(props);
    const randomGenerator = getRandomArray(this.props.numBars || 20, setup.dataRangeMin, setup.dataRangeMax);
    this.state = {
      data: randomGenerator(),
      randomGenerator,
    }
  }

  startDynamicData() {
    setInterval(() => {
      this.setState ({
        ...this.state,
        data: this.state.randomGenerator(),
      });
    }, this.props.interval || 3000);
  }

  componentDidMount() {
    if (this.props.dynamic) this.startDynamicData();
  }

  render() {
    return (
      this.props.dynamic ?
        <ChartDynamicComponent data={this.state.data}/> :
        <ChartStaticComponent data={this.state.data}/>
    );
  }
}
