import React from "react";





export default function SubmitCheck(props) {
    
    return (
        <div className="submit-check">
            <p> {props.score}
                <button
                    className="submit-ans"
                    onClick={!props.submitted ? (props.checkAnswer): (props.playAgain)}
                >{props.submitted ? "Play Again" : "Check Answers"}</button>
            </p>

        </div>
    )
}