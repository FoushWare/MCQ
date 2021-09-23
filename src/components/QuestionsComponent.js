/* eslint-disable no-constant-condition */
import {questions} from 'questions'

export default function Questions() {
  const [currentQuestion, setCurrentQuestion] = React.useState(0)

  //Go to the next question when click the answer button  .. when reach the last question show the Result score
  const handleAnswerOptionClick = () => {
    const nextQuestion = currentQuestion + 1
    if (nextQuestion < questions.length) {
      setCurrentQuestion(nextQuestion)
    } else {
      alert('You can see you score now')
    }
  }

  return (
    <>
      {false ? (
        <div className="score-section">
          You scored 1 out of {questions.length}
        </div>
      ) : (
        <>
          <div className="question-section">
            <div className="question-count">
              <span>Question 1</span>/{questions.length}
            </div>
            <div className="question-text">
              {questions[currentQuestion].questionText}
            </div>
          </div>
          <div className="answer-section">
            {questions[currentQuestion].answerOptions.map(
              (answerOption, index) => (
                <button key={index} onClick={() => handleAnswerOptionClick()}>
                  {answerOption.answerText}
                </button>
              ),
            )}
          </div>
        </>
      )}
    </>
  )
}
