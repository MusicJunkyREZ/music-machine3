import React, { Component } from "react";

const activeBtn = {
  color: "#65C850",
  transform: "scale(0.9)",
  boxShadow:
    "0px 0px 5px 3px #65C850,-0px -0px 5px 3px #65C850"
};
const inactiveBtn = {
  color: "gray",
  transform: "scale(1)",
  boxShadow: "none"
};

class Interface extends Component {
  constructor(props) {
    super(props);

    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.playAudio = this.playAudio.bind(this);

    this.state = {
      active: false
    };
  }

  componentDidMount() {
    document.addEventListener("keydown", this.handleKeyDown);
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this.handleKeyDown);
  }

  handleKeyDown = e => {
    if (e.keyCode === this.props.keyCode) {
      this.playAudio();
    }
  };

  playAudio = () => {
    if (this.props.power) {
      const sound = document.getElementById(this.props.keyTrigger);
      sound.currentTime = 0;
      sound.volume = this.props.volume / 100;
      sound.play();
      this.props.displayStatus(this.props.id);

      this.setState({ active: !this.state.active });
      setTimeout(() => {
        this.setState({ active: !this.state.active });
      }, 200);
    }
  };
  getBtnStyle = () => {
    return this.state.active ? activeBtn : inactiveBtn;
  };

  render() {
    return (
      <div
        className="drum-pad btn"
        onClick={this.playAudio}
        style={this.getBtnStyle()}
      >
        <span>{this.props.keyTrigger}</span>
        <audio
          src={this.props.url}
          className="clip"
          id={this.props.keyTrigger}
        />
      </div>
    );
  }
}

export default Interface;
