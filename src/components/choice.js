import React from "react";
import he from "he";

export default function Choice(props) {
  const style = {
    backgroundColor: props.isHeld ? "#D6DBF5" : "white"
  };

  let dynamicStyle = style; // Start with the default style

  if (props.isSubmitted) {
    // If the question has been submitted
    if (props.isCorrect) {
      // If this choice is correct
      dynamicStyle = {
        ...style,
        backgroundColor: "#94D7A2" // Apply correct answer style
      };
    } else if (props.chosenChoices.map(obj => obj.choice).includes(props.choice)) {
      // If this choice was chosen but is incorrect
      dynamicStyle = {
        ...style,
        backgroundColor: "#F8BCBC",// Apply wrong answer style
        color: "#293264"
      };
    }
  }

  return (
    <div
      className="choice chosen"
      onClick={props.onClick}
      style={dynamicStyle}
    >
      <span>{he.decode(props.choice)}</span>
    </div>
  );
}
