import React from 'react';
import './App.css';
import { Oscillator } from 'tone';

function plotSine(ctx, xOffset) {
  var width = ctx.canvas.width;
  var height = ctx.canvas.height;

  ctx.beginPath();
  ctx.lineWidth = 2;
  ctx.strokeStyle = "red";

  var x = 4;
  var y = 0;
  var amplitude = 40;
  var frequency = 20;
  ctx.moveTo(x, 50);
  while (x < width) {
      y = height/2 + amplitude * Math.sin((x+xOffset)/frequency);
      ctx.lineTo(x, y);
      x++;
  }
  ctx.stroke();
  ctx.save();
}
function drawWave(id, animate) {
  var canvas = document.getElementById(id);
  var ctx = canvas.getContext("2d");

  ctx.clearRect(0, 0, 600, 600);

  plotSine(ctx, step, 50);

  step += 4;
  if (animate) {
    window.requestAnimationFrame(drawWave);
  }
}
var step = -4;

function playOscillator(oscillator) {
  if (oscillator.state === "stopped") {
    oscillator.start();
  } else {
    oscillator.stop();
  }
}

class WavePlayer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sliderValue: 50,
      oscillator: new Oscillator(400, "sine").toDestination()
    };
  }

  componentDidMount() {
    drawWave(this.props.id, false);
  }

  render() {
    return (
      <div>
        <canvas id={this.props.id} width="600" height="100"></canvas>
        <button
          onClick={() => {
            playOscillator(this.state.oscillator)
          }}
        >Play</button>

        <input
          type="range"
          min="1"
          max="100"
          value={this.state.sliderValue}
          onChange={event => {
            this.setState({ sliderValue: event.target.value });
            this.state.oscillator.frequency.value = event.target.value;
          }}
        />
      </div>
    );
  }
}

class App extends React.Component {
  render() {
    return (
      <div className="App">
        This is a single sine wave.
        <WavePlayer
          id="0"
        />
        These are two sine waves.
        <WavePlayer/>
        <WavePlayer/>
      </div>
    );
  }
}

export default App;
