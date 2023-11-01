import PropTypes from 'prop-types';


export default function ScoreDisplay({ score }) {
  return (
    <div className="score-display">
      Score: {score}
    </div>
  );
}

ScoreDisplay.propTypes = {
  score: PropTypes.number.isRequired, 
};