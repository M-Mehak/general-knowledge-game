export default function QuestionCounter({ currentQuestion, totalQuestions }) {
    return (
      <div className="question-counter">
        Question {currentQuestion + 1} of {totalQuestions}
      </div>
    );
  }