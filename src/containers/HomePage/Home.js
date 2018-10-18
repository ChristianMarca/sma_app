import React from 'react';
import CarrucelComponent from '../../components/Home/images';
import YouTube from 'react-youtube';
import LoginForm from "../../components/Home/loginForm";
// import {ImageInfo} from '../../components/Home/infoImages';

import "./style.css";

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
        return(
            <div className="containerHome">
                <div className="carrucelContainer">
                    	<CarrucelComponent />
                </div>
                <div className="loginMenu">
                    <LoginForm />              
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

export default HomePage;