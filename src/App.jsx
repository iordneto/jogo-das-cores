import React, { PureComponent } from "react";

import Title from "./components/Title";
import StartButton from "./components/StartButton";
import Timer from "./components/Timer";
import GameBoard from "./components/GameBoard";

import { wordsAndAnswers } from "./data";

const mainStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  textAlign: "center",
  width: "100%",
  height: "100vh",
  backgroundColor: "#F1F8FF"
};

export default class App extends PureComponent {
  constructor(props) {
    super(props);

    this.startCountDown = this.startCountDown.bind(this);
    this.showResults = this.showResults.bind(this);
    this.handleScore = this.handleScore.bind(this);

    this.state = {
      score: 0,
      startCounter: false,
      showResults: false
    };
  }

  handleScore() {
    this.setState({ score: this.state.score + 1 });
  }

  startCountDown() {
    this.setState({
      score: 0,
      startCounter: true,
      showResults: false
    });
  }

  showResults() {
    alert(
      `Você acertou ${this.state.score} de um total de ${
        wordsAndAnswers.length
      } palavras!`
    );

    this.setState({
      startCounter: false,
      showResults: true
    });
  }

  render() {
    return (
      <div style={mainStyle}>
        {!this.state.startCounter && (
          <div>
            <Title>Jogo das Cores</Title>
            <StartButton onStart={this.startCountDown} />
          </div>
        )}
        {this.state.startCounter && (
          <div>
            <Timer
              seconds={60}
              start={this.state.startCounter}
              stop={this.showResults}
            />
            <GameBoard
              wordsAndAnswers={wordsAndAnswers}
              onScore={this.handleScore}
              onFinish={this.showResults}
            />
          </div>
        )}
      </div>
    );
  }
}
