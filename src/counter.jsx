import PropTypes from 'prop-types';

export default function QuestionCounter({ currentQuestion, totalQuestions }) {
  return (
    <div className="question-counter">
      Question {currentQuestion + 1} of {totalQuestions}
    </div>
  );
}

QuestionCounter.propTypes = {
  currentQuestion: PropTypes.number.isRequired, // Ensure currentQuestion is a number
  totalQuestions: PropTypes.number.isRequired, // Ensure totalQuestions is a number
};

