import React from 'react';
import { BridgeComponent } from "./chart/interruptionChart";
import { getRandomArray } from './randomize';
import { setup } from './chart/chart-setup';
import Map from "./map/mapa";

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
      <div id="containerChart" className='svg-containerChart'>
        <div className='containersa'>
          <div className="minimap">
            <article className="mw5 center bg-white br3 pa3 pa4-ns mv3 ba b--black-10">
              <div className="tc">
                <img src="http://tachyons.io/img/avatar_1.jpg" className="br-100 h3 w3 dib" title="Photo of a kitty staring at you" />
                <h1 className="f4">Mimi Whitehouse</h1>
                <hr className="mw3 bb bw1 b--black-10"/>
              </div>
              <p className="lh-copy measure center f6 black-70">
                Quite affectionate and outgoing.
                She loves to get chin scratches and will
                roll around on the floor waiting for you give her more of them.
              </p>
            </article>
          </div>
            <div className="minimap">
              <Map isDashboardComponent={false}/>
            </div>
        </div>
          <BridgeComponent data={this.state.data} data1={this.state.data1} data2={this.state.data2} /> 
      </div>
    )
  }
}

export default Maps;
