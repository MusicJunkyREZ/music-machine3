import React, {Component} from "react";
import click1 from "../../metronomeClicks/click1.wav"
import click2 from "../../metronomeClicks/click2.wav"

class Metronome extends Component {
    constructor(props){
        super(props);
        let beatsPerMeasure = 4;

        this.state = {
            playing: false,
            count: 0,
            bpm: 100,
            beatsPerMeasure: beatsPerMeasure
        };
        

        this.click1 = new Audio(click1);
        this.click2 = new Audio(click2);
        
    }

    startStop = () => {
        if (this.state.playing){
            // Stop timer
            clearInterval(this.timer);
            this.setState({
                playing: false
            });
        } else {
            // Start timer with current BPM
            this.timer = setInterval(
                this.playClick,
                (60/this.state.bpm) * 1000
            );
            this.setState(
                {
                    count: 0,
                    playing: true
                    // Play click after setState finishes
                },
                this.playClick
            );
        }
    }

    playClick = () => {
        const {count, beatsPerMeasure} = this.state;

        if (count % beatsPerMeasure === 0){
            this.click2.play();
        } else {
            this.click1.play();
        }

        this.setState(state => ({
            count: (state.count + 1) % state.beatsPerMeasure
        }))
    }


    handleBpmChange = event => {
        const bpm = event.target.value;
        if (this.state.play){
            clearInterval(this.timer);
            this.timer = setInterval(this.playClick, (60/bpm) * 1000);

            this.setState({
                count: 0,
                bpm
            });
        } else {
            this.setState({bpm});
        }
    }

    desiredNumberInput = () => {
        var desiredNumber = document.getElementById("desired-number")
        

        switch(desiredNumber){
            case "1":
                this.beatsPerMeasure = 1;
                break;
            case "2":
                this.beatsPerMeasure = 2;
                break;
            case "3":
                break;
            case "4":
                break;
            case "5":
                break;
            case "6":
                break;
            default:
                break;
        }
    }

    

    render(){
        const {playing, bpm} = this.state

        return (
            <div className="metronome">
                <div className = "bpm-slider">
                    <div>{bpm} BPM</div>
                        <input 
                            type="range" 
                            min="60" 
                            max="240" 
                            value={bpm} 
                            onChange = {this.handleBpmChange}
                        />
                </div>
                <button onClick={this.startStop}>
                    {playing ? "Stop Metronome" : "Start Metronome"}
                </button>
                {"      "}
                {/* <select id="desired-number">
                    <option id= "1">1</option>
                    <option id= "2">2</option>
                    <option id= "3">3</option>
                    <option id= "4">4</option>
                    <option id= "5">5</option>
                    <option id= "6">6</option>
                </select> */}
            </div>
        );   
    }
}

export default Metronome;