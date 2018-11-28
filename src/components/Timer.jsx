import React, { PureComponent } from "react";

const timerStyle = {
  position: "fixed",
  top: 0,
  right: 0,
  fontSize: "1.5rem",
  fontFamily: "Orbitron, sans-serif",
  padding: "2rem",
  color: "green",
  backgroundColor: "black",
  width: "15rem",
  textAlign: "center"
};

export default class Timer extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      secondsRemaining: this.props.seconds
    };

    this.startCountDown = this.startCountDown.bind(this);
    this.tick = this.tick.bind(this);
  }

  async tick() {
    await this.setState({ secondsRemaining: this.state.secondsRemaining - 1 });

    if (this.state.secondsRemaining === 0) {
      this.props.stop();
      clearInterval(this.intervalHandle);
    }
  }

  startCountDown() {
    this.setState({ startCounter: true });
    this.intervalHandle = setInterval(this.tick, 1000);
  }

  componentDidMount() {
    if (this.props.start) {
      this.startCountDown();
    }
  }

  render() {
    return <div style={timerStyle}>Tempo: {this.state.secondsRemaining}s</div>;
  }
}
