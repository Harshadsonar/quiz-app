import React, { useState } from 'react';
import './App.css';
import questions from './quiz_data'; 

function App() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState('');
  const [feedback, setFeedback] = useState('');
  const [score, setScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);

  const handleOptionChange = (option) => {
    setSelectedOption(option);
  };

  const handleSubmit = () => {
    const currentQuestion = questions[currentQuestionIndex];
    if (selectedOption === currentQuestion.correct) {
      setFeedback('Correct!');
      setScore(score + 1);
    } else {
      setFeedback('Incorrect!');
    }

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedOption('');
    } else {
      setQuizCompleted(true);
    }
  };

  return (
    <div className='container'>
      <h1>Quiz App</h1>
      {quizCompleted ? (
        <div>
          <div className='feedback'>Quiz Complete! You scored {score} out of {questions.length}</div>
        </div>
      ) : (
        <div>
          <div className='question'>{questions[currentQuestionIndex].question}</div>
          <div className='options'>
            {questions[currentQuestionIndex].options.map((option, index) => (
              <div key={index}>
                <input
                  type="radio"
                  id={`option${index + 1}`}
                  name="option"
                  value={option}
                  checked={selectedOption === option}
                  onChange={() => handleOptionChange(option)}
                />
                <label htmlFor={`option${index + 1}`}>{option}</label>
              </div>
            ))}
          </div>
          <button className='button' id="submitBtn" onClick={handleSubmit}>
            Submit
          </button>
          <div className='feedback'>{feedback}</div>
        </div>
      )}
    </div>
  );
}

export default App;
