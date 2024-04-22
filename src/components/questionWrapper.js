import React from "react";
import Choice from "./choice"
import SubmitCheck from "./submit-check";
import he from "he";

// Current Score
let score;
export default function QuestionWrapper(props) {
  
  // Function to handle choice selection
  function handleChoice(questionIndex, choiceIndex, e) {

    if (!props.submitted) { // only check when not submitted
      e.stopPropagation()
      props.setChosenChoices((prevChosenChoices) => {
        const updatedChoices = [...prevChosenChoices]; // Copy the previous state
        const selectedChoice = props.questions[questionIndex].choices[choiceIndex];
        const isCorrect = selectedChoice === props.questions[questionIndex].correctAnswer;  

        updatedChoices[questionIndex] = {
          choice: props.questions[questionIndex].choices[choiceIndex],
          isHeld: !prevChosenChoices[questionIndex].isHeld, // Toggle the current value
          isCorrect: isCorrect 
        };

        return updatedChoices;
      });
    } else { // Check if all questions are answered before submission
      const allChoicesSelected = props.chosenChoices.every(choice => choice.isHeld);
  
      if (!allChoicesSelected) {
        // If one submits without selecting all the answers, set submitted to false
        props.setSubmitted(false);
      }
    }
  }

  // check answers
  function checkAnswer() {
    props.setStartQuestions(false)
    const allChoicesSelected = props.chosenChoices.every(choice => choice.isHeld);
    if (!allChoicesSelected) {
        // If one submits without selecting all the answers, set submitted to false
        props.setSubmitted(false);
    }
    else {
      props.setSubmitted(true);
    }
    
  
    const allSelected = props.chosenChoices.every((choice) => choice.isHeld);
  
    if (allSelected) {
      const isCorrectArray = props.chosenChoices.map((chosenChoice, index) => {
        const correctAnswerForChoice = props.questions[index].correctAnswer;
        return chosenChoice.choice === correctAnswerForChoice;
      });
  
      const numberOfCorrectAnswers = isCorrectArray.filter((isCorrect) => isCorrect).length;
      score = `${numberOfCorrectAnswers}/${props.questions.length} correct answers`;
      console.log(`You scored ${score}`);
      
      return isCorrectArray;
    } else {
      alert("Please select all the answers");
      return [];
    }
  }




  return (
    <div className="question wrapper">
      <div className="question-body">
        
        {/* Mapping over the questions array */}
        {props.questions.map((question, questionIndex) => (

          <div key={questionIndex} className="question-container">
            {/* Display the question content */}
            <h1 className="question-content">{he.decode(question.question)}</h1>

            {/* Render choices */}
            <div className="multiple-choices">
              {question.choices.map((choice, choiceIndex) => (
                <Choice
                  key={choiceIndex}
                  choice={choice}
                  chosenChoices = {props.chosenChoices}
                  onClick={(e) => handleChoice(questionIndex, choiceIndex, e)}
                  isHeld={props.chosenChoices[questionIndex].choice === choice && props.chosenChoices[questionIndex].isHeld}
                  isCorrect={props.questions[questionIndex].correctAnswer === choice}
                  isSubmitted = {props.submitted}
                />
              ))}
            </div>
            <hr />
          </div>

        ))}
        <SubmitCheck 
          score = {score}
          checkAnswer = {checkAnswer}
          submitted = {props.submitted}
          playAgain = {props.playAgain}
        />
      </div>
    </div>
  );
}
