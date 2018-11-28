import React, { PureComponent } from "react";

import { colors, nameOfColors } from "../data";
import { getRandomIntInclusive, shuffle } from "../utils";

const mainStyle = {
  display: "flex",
  flexDirection: "column"
};

const topStyle = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  margin: "4rem 0"
};

const answersBoardStyle = {
  display: "flex",
  flexDirection: "row",
  flexWrap: "wrap",
  justifyContent: "center"
};

const wordStyle = {
  fontFamily: "Montserrat, sans-serif",
  fontWeight: "bold",
  padding: "1rem",
  textTransform: "capitalize"
};

const mainWordStyle = {
  fontSize: "6rem"
};

const answerWordStyle = {
  fontSize: "4rem",
  width: "35%",
  margin: "1rem",
  textAlign: "center",
  cursor: "pointer"
};

export default class GameBoard extends PureComponent {
  constructor(props) {
    super(props);

    this.wordsAndAnswers = shuffle(this.props.wordsAndAnswers);

    this.next = this.next.bind(this);

    this.state = {
      question: 0,
      lastColorsIndexes: []
    };
  }

  async next(correctAnswer, answer) {
    if (correctAnswer === answer) {
      await this.props.onScore();
    }

    if (this.state.question !== this.wordsAndAnswers.length - 1) {
      await this.setState({
        question: this.state.question + 1
      });
    } else {
      this.props.onFinish();
    }
  }

  getRandomColorStyle = () => {
    const randomNumber = getRandomIntInclusive(0, 7);
    const randomColor = colors[randomNumber];

    return {
      backgroundColor: randomColor.backGroundColor,
      border: `2px solid ${randomColor.textColor}`,
      color: randomColor.textColor
    };
  };

  getAnswerOptions = correctAnswer => {
    const correctAnswerOption = nameOfColors.filter(
      value => value.answer === correctAnswer
    );

    const optionsWithoutCorrectAnswer = nameOfColors.filter(
      value => value.answer !== correctAnswer
    );

    const otherAnswerOptions = shuffle(optionsWithoutCorrectAnswer).filter(
      (value, index) => index < 3
    );

    return shuffle([...correctAnswerOption, ...otherAnswerOptions]);
  };

  render() {
    const wordAndAnswer = this.wordsAndAnswers[this.state.question];
    const answerOptions = this.getAnswerOptions(wordAndAnswer.answer);
    const randomColorStyle = this.getRandomColorStyle();

    return (
      <div style={mainStyle}>
        <div style={topStyle}>
          <div
            style={{
              ...wordStyle,
              ...mainWordStyle,
              ...randomColorStyle
            }}
          >
            {wordAndAnswer.word}
          </div>
        </div>
        <div style={answersBoardStyle}>
          {answerOptions.map(({ name, answer }, index) => (
            <div
              key={index}
              style={{
                ...wordStyle,
                ...answerWordStyle,
                ...this.getRandomColorStyle()
              }}
              onClick={() => this.next(wordAndAnswer.answer, answer)}
            >
              {name}
            </div>
          ))}
        </div>
      </div>
    );
  }
}
