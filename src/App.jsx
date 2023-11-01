import  { useState, useEffect } from 'react';
import Question from './Question/Question';
import Counter from './Question/counter'
import Score from './Question/Score';

function decodeHTMLEntities(text) {
  const textArea = document.createElement('textarea');
  textArea.innerHTML = text;
  return textArea.value;
}

export default function App() {
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [loading, setLoading] = useState(true);

  // Define a function to start a new game
  const startNewGame = () => {
    fetch('https://opentdb.com/api.php?amount=10&category=9')
      .then((response) => response.json())
      .then((data) => {
        // ! Decode the questions and answers using the decodeHTMLEntities function
        const decodedResults = data.results.map((result) => ({
          ...result,
          question: decodeHTMLEntities(result.question),
          correct_answer: decodeHTMLEntities(result.correct_answer),
          incorrect_answers: result.incorrect_answers.map((answer) => decodeHTMLEntities(answer)),
        }));

        setQuestions(decodedResults);
        setCurrentQuestion(0);
        setScore(0); 
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        setLoading(false);
      });
  };

  // ! starting a new game
  useEffect(() => {
    startNewGame(); 
  }, []);

  const handleAnswerSelect = (selectedOption) => {
    const currentQ = questions[currentQuestion];

    
    if (currentQ.correct_answer === selectedOption) {
      setScore(score + 1);
    }

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // ! Game over logic
      alert(`Game over! Your score: ${score}/${questions.length}`);

      // ! Start a new game
      startNewGame();
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  // ! Render the game content
  return (
    <div className='main-div'>
      <div className="score">
        <Counter currentQuestion={currentQuestion} totalQuestions={questions.length} />
        <Score score={score} />
      </div>
      <h1>General Knowledge</h1>
      {currentQuestion < questions.length ? (
        <Question
          question={questions[currentQuestion].question}
          options={[
            ...questions[currentQuestion].incorrect_answers,
            questions[currentQuestion].correct_answer,
          ]}
          onSelect={handleAnswerSelect}
        />
      ) : (
        <div>Game Over</div>
      )}
    </div>
  );
}