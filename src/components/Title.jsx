import React, { PureComponent } from "react";

import { colors } from "../data";
import { getRandomIntInclusive } from "../utils";

class Title extends PureComponent {
  constructor(props) {
    super(props);

    this.titleStyle = {
      fontSize: "5rem",
      fontFamily: "Montserrat, sans-serif",
      fontWeight: "bold",
      padding: ".5rem",
      textTransform: "uppercase"
    };
  }

  getRandomColorStyle = () => {
    const randomNumber = getRandomIntInclusive(0, 7);
    const randomColor = colors[randomNumber];

    return {
      textShadow: `-1px 0 ${randomColor.textColor}, 0 1px ${
        randomColor.textColor
      }, 1px 0 ${randomColor.textColor}, 0 -1px ${randomColor.textColor}`,
      color: randomColor.backGroundColor
    };
  };

  render() {
    const titleStyleCombined = {
      ...this.getRandomColorStyle(),
      ...this.titleStyle
    };
    return <h1 style={titleStyleCombined}>Jogo das cores</h1>;
  }
}

export default Title;
