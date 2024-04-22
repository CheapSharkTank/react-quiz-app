import React from 'react';
import './App.css';
import Wrapper from "./components/wrapper.js"
import FetchTriviaQuestions from "./components/fetchTriviaQuestions.js";


// Shuffle the array of questions (Fisher-Yates (Knuth) Shuffle Algorithm)
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function App() {
  const [startQuestions, setStartQuestions] = React.useState(false);
  // Using state to store the fetched questions and answers
  const [questionsAndAnswers, setQuestionsAndAnswers] = React.useState([]);

  const [submitted, setSubmitted] = React.useState(false);
  const [chosenChoices, setChosenChoices] = React.useState([
    { choice: null, isHeld: false },
    { choice: null, isHeld: false },
    { choice: null, isHeld: false },
    { choice: null, isHeld: false },
    { choice: null, isHeld: false }
  ]);

  // Play again
  function playAgain() {
    setSubmitted(false);
    setStartQuestions(true)
    setChosenChoices(
      questionsAndAnswers.map(() => ({ choice: null, isHeld: false, isCorrect: false }))
    );
  }

  React.useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const questions = await FetchTriviaQuestions(5);

        // Format questions with randomized choices
        const formattedQuestions = questions.map((question, index) => {
          // Combine correct answer and incorrect answers
          const choices = [...question.incorrectAnswers, question.correctAnswer];

          // Shuffle the choices array to randomize the position of correctAnswer
          shuffleArray(choices);

          return {
            index: index + 1,
            question: question.question,
            choices: choices,
            correctAnswer: question.correctAnswer
          };
        });

        setQuestionsAndAnswers(formattedQuestions);
      } catch (error) {
        console.error('Error fetching trivia questions:', error.message);
      }
    };

    fetchQuestions();
  }, [startQuestions]); // Run once on component mount

  return (
    <main className='main-body'>
      <Wrapper 
        // passing props for QuestionWrapper
        questions={questionsAndAnswers}
        startQuestions = {startQuestions}
        setStartQuestions = {setStartQuestions}
        submitted={submitted}
        setSubmitted={setSubmitted}
        chosenChoices={chosenChoices}
        setChosenChoices ={setChosenChoices}
        playAgain = {playAgain}


        // passing props for Wrapper

      />
    </main>
  );
}

export default App;
