import React, { Component } from "react";
import "../../index.scss";

import Drums from "../../components/Drums";
// Can't import just the index because of multiple export of boxes?
import { Box1 } from "../../components/Boxes/Boxes";
import { Box2 } from "../../components/Boxes/Boxes";
import { Box3 } from "../../components/Boxes/Boxes";
import Metronome from "../../components/Metronome";
import TopNav from "../../components/TopNav";
import TopNav2 from "../../components/TopNav2"


const powerStyle = {
  color: "#65C850",
  textShadow: "0 0 20px #65C850, 0 0 20px #65C850"
};
const noPowerStyle = {
  color: "rgba(219, 246, 255, 0.5)",
  textShadow: "none"
};
const activeBorderStyle = {
  boxShadow: "0 0 20px #65C850, 0 0 20px #65C850",
  borderColor: "#65C850"
};
const inactiveBorderStyle = {
  boxShadow: "none",
  borderColor: "rgba(219, 246, 255, 0.5)"
};

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      power: true,
      volume: 50,
      drum: "",
      box: Box1,
      // display: "Waiting for a beat"
    };
  }
  getTextStyle = () => {
    return this.state.power ? powerStyle : noPowerStyle;
  };
  getBorderStyle = () => {
    return this.state.power ? activeBorderStyle : inactiveBorderStyle;
  };

  volumeHandler = e => {
    if (this.state.power) {
      this.setState({ volume: e.target.value });
    }
  };

  displayStatus = displayVal => {
    this.setState({ display: displayVal });
  };

  togglePower = () => {
    this.setState({ power: !this.state.power });
    if (this.state.power) {
      this.displayStatus("Off");
    } else {
      this.displayStatus("On");
    }
  };
  toggleBox = event => {
    if (this.state.power) {
      event.target.id === "Box1"
        ? this.setState({ box: Box1 })
        : this.setState({ box: Box2 });
    }
  };

  render() {
    return (
      
      <div id="drum-machine" className="App">
      
      
        <div className="dashboard-container" style={this.getTextStyle()}>
        
          <div id="auth-nav">
            <TopNav2 />
          </div>
        
      
          <div id="power-wrapper">
            
            <input
              id="power"
              type="checkbox"
              className="checkBox"
              onChange={this.togglePower}
            />
            <label className="powerLabel" htmlFor="power">
              <i className="fas fa-power-off fa-2x" />
            </label>
          </div>
            
          <div id="h1-drum-machine">
            <h1>Drum Machine</h1>
          </div>
          

          <div id="display" className="control-container">

            <div className="center-it">
              <div className="screen-wrapper" style={this.getBorderStyle()}>
                <div className="screen">{this.state.display}</div>
                <div className="volume">
                  <span className="fas fa-volume-up">
                    {" " + this.state.volume}%
                  </span>
                </div>
              </div>

              <div className="volume-wrapper">
                <input
                  className="volume-slider"
                  type="range"
                  min="0"
                  max="100"
                  step="1"
                  value={this.state.volume}
                  onChange={this.volumeHandler}
                  style={this.getBorderStyle()}
                />
              </div>
              <div className="box-wrapper">
                <button
                  className={
                    "box" + (this.state.box === Box1 ? " activeBox" : "")
                  }
                  id="Box1"
                  onClick={this.toggleBox}
                  style={{
                    ...this.getTextStyle(),
                    ...this.getBorderStyle()
                  }}
                >
                  Drums & Chords #1
                </button>
                <button
                  className={
                    "box" + (this.state.box === Box2 ? " activeBox" : "")
                  }
                  id="Box2"
                  onClick={this.toggleBox}
                  style={{ ...this.getTextStyle(), ...this.getBorderStyle() }}
                >
                  Drums & Chords #2
                </button>
                {/* <button
                  className={
                    "box" + (this.state.box === Box3 ? " activeBox" : "")
                  }
                  id="Box3"
                  onClick={this.toggleBox}
                  style={{ ...this.getTextStyle(), ...this.getBorderStyle() }}
                >
                  Drums #3
                </button>
                <button
                  className={
                    "box" + (this.state.box === Box2 ? " activeBox" : "")
                  }
                  id="Box2"
                  onClick={this.toggleBox}
                  style={{ ...this.getTextStyle(), ...this.getBorderStyle() }}
                >
                  Drums #4
                </button> */}
              </div>
            </div>
          </div>  

          <Drums
            volume={this.state.volume}
            displayStatus={this.displayStatus}
            power={this.state.power}
            box={this.state.box}
          />

        <Metronome />
        </div>
      </div>
    );
  }
}

export default Home;

