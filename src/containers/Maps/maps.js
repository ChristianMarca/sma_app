import React from 'react';
import { BridgeComponent } from "./chart/interruptionChart";
import { getRandomArray } from './randomize';
import { setup } from './chart/chart-setup';


import './chart.style.css'

const numBars=12;
class Maps extends React.Component{
  constructor(props) {
    super(props);
    const randomGenerator = getRandomArray(numBars || 20, setup.dataRangeMin, setup.dataRangeMax);
    this.state = {
      data: randomGenerator(),
      data1: randomGenerator(),
      data2: randomGenerator(),
      randomGenerator,
    }
  }

  startDynamicData() {
    setInterval(() => {
      this.setState ({
        ...this.state,
        data: this.state.randomGenerator(),
        data1: this.state.randomGenerator(),
        data2: this.state.randomGenerator(),
      });
    }, this.props.interval || 5000);
  }

  updateDimensions=()=> {
    // this.setState({width: $(window).width(), height: $(window).height()});
    var w = window,
        d = document,
        documentElement = d.documentElement,
        body = d.getElementsByTagName('body')[0],
        width = w.innerWidth || documentElement.clientWidth || body.clientWidth,
        height = w.innerHeight|| documentElement.clientHeight|| body.clientHeight;
    console.log(width,height)
}
  componentDidMount=()=> {
    //if (this.props.dynamic)
    this.startDynamicData();
    window.addEventListener("resize", this.updateDimensions);
  }
  render(){
    return(
      // <div>Maps Here!</div>
      // <div id="containerChart" className='svg-containerChart'>
        <div>
          <div className="minimap">data Here</div>
          <BridgeComponent data={this.state.data} data1={this.state.data1} data2={this.state.data2} />
        </div>
      // </div>
    )
  }
}

export default Maps;
