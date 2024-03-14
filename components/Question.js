import React, { useState } from 'react';
import PropTypes from 'prop-types';

const Question = (props) => {
  const { question, answer } = props;
  const [isCollapsed, setIsCollapsed] = useState(true);

  return (
    <>
      <div className="question" onClick={() => setIsCollapsed(!isCollapsed)}>
        <i className="material-icons">{isCollapsed ? 'arrow_right' : 'arrow_drop_down'}</i>
        <p>{question}</p>
      </div>
      <div className="answer" style={{ display: isCollapsed ? 'none' : 'block' }}>
        <p>{answer}</p>
      </div>
    </>
  );
};

Question.propTypes = {
  question: PropTypes.string,
  answer: PropTypes.string,
};

export default Question;