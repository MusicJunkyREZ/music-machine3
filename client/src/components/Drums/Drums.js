import React, { Component } from "react";
import Interface from "../Interface";

class Drums extends Component {
  render() {
    let currentBox = this.props.box;

    return (
      <>
      {/* <h1>Drum Machine</h1> */}
      <div className="drum-container">
        <div className="drumbtn-container">
          {currentBox.map(el => {
            return (
              <Interface
                key={el.id}
                id={el.id}
                url={el.url}
                keyCode={el.keyCode}
                keyTrigger={el.keyTrigger}
                volume={this.props.volume}
                displayStatus={this.props.displayStatus}
                power={this.props.power}
              />
            );
          })}
        </div>
      </div>
      </>
    );
  }
}

export default Drums;
