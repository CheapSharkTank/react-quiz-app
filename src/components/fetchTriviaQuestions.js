// FetchTriviaQuestions.js

async function fetchTriviaQuestions(amount, difficulty = 'medium', type = 'multiple') {
  try {
    const response = await fetch(`https://opentdb.com/api.php?amount=${amount}&difficulty=${difficulty}&type=${type}`);

    if (!response.ok) {
      throw new Error('Network response was not ok');
      console.log("Reload")
    }

    const data = await response.json();

    const formattedQuestions = data.results.map((question, index) => {
      return {
        question: question.question,
        correctAnswer: question.correct_answer,
        incorrectAnswers: question.incorrect_answers
      };
    });

    return formattedQuestions;
  } catch (error) {
    throw new Error(`Failed to fetch trivia questions: ${error.message}`);
  }
}

export default fetchTriviaQuestions;
