import React, { PureComponent } from "react";

import { colors } from "../data";
import { getRandomIntInclusive } from "../utils";

class StartButton extends PureComponent {
  constructor(props) {
    super(props);

    this.startButtonStyle = {
      fontSize: "3rem",
      padding: "2rem"
    };
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

  render() {
    const startButtonStyleCombined = {
      ...this.getRandomColorStyle(),
      ...this.startButtonStyle
    };
    return (
      <button onClick={this.props.onStart} style={startButtonStyleCombined}>
        Começar
      </button>
    );
  }
}

export default StartButton;
