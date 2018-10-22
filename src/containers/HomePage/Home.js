import React from 'react';
import YouTube from 'react-youtube';
import { connect } from "react-redux";
import CarrucelComponent from '../../components/Home/images';
import LoginForm from "../../components/Home/loginForm";
import InfoCard from "../../components/Home/infoCard";
// import {ImageInfo} from '../../components/Home/infoImages';

import "./style.css";

const mapStateToProps=state=>{
	return {
    // Elección del tipo de interrupción
    sessionData: state.sessionReducer,
	}
}
const mapDispatchToProps=(dispatch)=>{
	return{
    
	}
}

class HomePage extends React.Component{
    _onReady(event) {
        // access to player in all event handlers via event.target
        event.target.pauseVideo();
      }
    render(){
        const opts = {
            height: '100%',
            width: '100%',
            playerVars: { // https://developers.google.com/youtube/player_parameters
              autoplay: 0
            }
          };
          console.log(this.props.sessionData.isSessionInit,'dadsd')
        return(
            <div className="containerHome">
                <div className="carrucelContainer">
                    	<CarrucelComponent />
                </div>
                <div className="loginMenu">
                    {this.props.sessionData.isSessionInit?<InfoCard />:<LoginForm />}              
                </div>
                {/* <div className="videosContainer"> */}
                    <div className="videoContainer">
                        <YouTube
                            videoId="QK-Z1K67uaA"
                            opts={opts}
                            onReady={this._onReady}
                        />
                    </div>
                    <div className="videoContainer1">
                        <YouTube
                            videoId="QK-Z1K67uaA"
                            opts={opts}
                            onReady={this._onReady}
                        />
                    </div>
                {/* </div> */}
            </div>
        )
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(HomePage);