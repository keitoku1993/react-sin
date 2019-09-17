import React, { Component } from 'react';
import './App.css';

const styles = {
  canvas: {
    border: "1px solid gray",
    backgroundColor: "white",
    margin:"0 50px",
  },
  range: {
    width: 300
  },
  rangeBox: {
    margin: 50,
    display: "flex"
  },
  button: {
    fontSize: 20,
    marginLeft: 50
  }
};

class App extends Component {
  constructor() {
    super();
    this.state = {
      width: 750,
      height: 340,
      amplitude: 150,
      waveLength: 750,
    };
  }

  pointX = 0;

  drawTick = null;

  componentDidMount() {
    this.drawCurve();
  }

  componentDidUpdate() {
    this.drawCurve();
  }

  drawCurve() {
    const ctx = this.refs.canvas.getContext("2d");
    ctx.clearRect(0, 0, this.state.width, this.state.height )
    ctx.beginPath();
    ctx.moveTo(0, this.state.height / 2);
    ctx.lineTo(this.state.width, this.state.height / 2);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(0, this.state.height / 2);
    for (let pointX = 0; pointX <= this.state.width; pointX++) {
      const pointY = - this.state.amplitude * Math.sin((Math.PI * 2 / this.state.waveLength) * pointX);
      ctx.lineTo(pointX, pointY + this.state.height / 2);
    }
    ctx.stroke();
  }

  handleGoClick = () => {
    this.drawTick = setInterval(this.drawAnimation, 5 )
  }

  drawAnimation = () => {
    const ctx = this.refs.canvas.getContext("2d");
    ctx.clearRect(0, 0, this.state.width, this.state.height )
    ctx.beginPath();
    ctx.moveTo(0, this.state.height / 2);
    ctx.lineTo(this.state.width, this.state.height / 2);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(0, this.state.height / 2);
    for (let pointX = 0; pointX <= this.state.width; pointX++) {
      const pointY = - this.state.amplitude * Math.sin((Math.PI * 2 / this.state.waveLength) * pointX);
      ctx.lineTo(pointX, pointY + this.state.height / 2);
    }
    ctx.stroke();
    
    ctx.beginPath();

    const arcPositionX = this.pointX;
    const arcPositionY = this.state.height/2  - this.state.amplitude * Math.sin((Math.PI * 2 / this.state.waveLength) * this.pointX) - 50

    const img = new Image();
    img.src = `${process.env.PUBLIC_URL}/go.png`

    ctx.drawImage(img, arcPositionX, arcPositionY, 100, 100);

    this.pointX++;

    if(this.pointX >= this.state.width + 100) {
      clearInterval(this.drawTick);
      this.pointX = 0;
    }

  }

  render() {
    return (
      <React.Fragment>
        <h1 style={{marginLeft: 50}}>SinCurve Generator</h1>
        <canvas
          ref="canvas"
          width={this.state.width}
          height={this.state.height}
          style={styles.canvas}
        />
        <div style={styles.rangeBox}>
          <label style={{width: 150}} htmlFor="amplitude">windowWidth: </label>
          <input defaultValue={this.state.width} style={styles.range} type="range" name='width' min='0' max='3000' onChange={e => this.setState({ width: e.target.value })}  />
          <div>{this.state.width}px</div>
        </div>
        <div style={styles.rangeBox}>
          <label style={{width: 150}} htmlFor="wavelength">windowHeight: </label>
          <input defaultValue={this.state.height} style={styles.range} type="range" name='height' min='0' max='2000' onChange={e => this.setState({ height: e.target.value })} />
          <div>{this.state.height}px</div>
        </div>
        <div style={styles.rangeBox}>
          <label style={{width: 150}} htmlFor="amplitude">amplitude: </label>
          <input defaultValue={this.state.amplitude} style={styles.range} type="range" name='amplitude' min='0' max='1600' onChange={e => this.setState({ amplitude: e.target.value })}  />
          <div>{this.state.amplitude}px</div>
        </div>
        <div style={styles.rangeBox}>
          <label style={{width: 150}} htmlFor="wavelength">wavelength: </label>
          <input defaultValue={this.state.waveLength} style={styles.range} type="range" name='wavelength' min='0' max='1000' onChange={e => this.setState({ waveLength: e.target.value })} />
          <div>{this.state.waveLength}px</div>
        </div>
        <button style={styles.button} onClick={() => this.handleGoClick()}>GO!</button>
      </React.Fragment>
    );
  }
}

export default App;
