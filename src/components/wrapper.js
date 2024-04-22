import React from "react";
import QuestionWrapper from "./questionWrapper";

export default function Wrapper(props) {
    const [startBtn, setStartBtn] = React.useState(false);

    function startQuiz() {
        setStartBtn(true);
    }

    return (
        <div>
            {/* Conditionally render based on startBtn state */}
            {!startBtn ? (
                <div className="wrapper">
                    <h1 className="content-title">Quizzical</h1>
                    <p className="content-desc">Some description if needed</p>
                    <button className="start-btn" onClick={startQuiz}>Start Quiz</button>
                </div>
            ) : null}

            {/* QuestionWrapper - o nly render when startBtn is true */}
            {startBtn && (
                <QuestionWrapper
                    questions={props.questions}
                    submitted={props.submitted}
                    setSubmitted={props.setSubmitted}
                    chosenChoices={props.chosenChoices}
                    setChosenChoices={props.setChosenChoices}
                    playAgain={props.playAgain}
                    startQuestions={props.startQuestions}
                    setStartQuestions={props.setStartQuestions}
                />
            )}

        </div>
    );
}
