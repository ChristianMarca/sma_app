import React from 'react';
import {D3RenderSample} from './BarsGraph'
import {BridgeComponent} from './donut/chartConnector';
import { BridgeComponentDonut } from "./DonuChart/componentConnector";
import { getRandomArray } from './randomize';
import { setup } from './chart-setup';


import './chart.style.css'

class Maps extends React.Component{
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
    }, this.props.interval || 1000);
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
      <div className='containerChart'>
        <D3RenderSample className="barsChart" dynamic={true} numBars={50} />
        <BridgeComponent className='donutChart' data={this.state.data}/>
        <BridgeComponentDonut />
      </div>
    )
  }
}

export default Maps;
