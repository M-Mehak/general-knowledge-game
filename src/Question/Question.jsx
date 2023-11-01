import PropTypes from 'prop-types';

const Question = ({ question, options, onSelect }) => {
  return (
    <div>
      <h2>{question}</h2>
      <ul>
        {options.map((option, index) => (
          <li key={index}>
            <button onClick={() => onSelect(option)}>{option}</button>
          </li>
        ))}
      </ul>
    </div>
  );
};
Question.propTypes = {
    question: PropTypes.string.isRequired,
    options: PropTypes.arrayOf(PropTypes.string).isRequired,
    onSelect: PropTypes.func.isRequired,
};

export default Question;