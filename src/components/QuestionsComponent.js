/* eslint-disable no-constant-condition */
import {questions} from 'questions'

export default function Questions() {
  //####Local Status
  const [currentQuestion, setCurrentQuestion] = React.useState(0)
  const [showScore, setShowScore] = React.useState(false)
  const [score, setScore] = React.useState(0)

  //####HanleAnswer function
  //Go to the next question when click the answer button  .. when reach the last question show the Result score
  const handleAnswerOptionClick = isCorrect => {
    // if the answer is correct update the score
    if (isCorrect) {
      setScore(score + 1)
    }
    // Handle going to the next Qusetion
    const nextQuestion = currentQuestion + 1
    if (nextQuestion < questions.length) {
      setCurrentQuestion(nextQuestion)
    } else {
      setShowScore(true)
    }
  }
  //#####Render the Questions
  return (
    <>
      {/* ####if the User Reached the final Qusetion Show the Final Score */}
      {showScore ? (
        <div className="score-section">
          You scored {score} out of {questions.length}
        </div>
      ) : (
        <>
          <div className="question-section">
            <div className="question-count">
              <span>{currentQuestion + 1}</span>/{questions.length}
            </div>
            <div className="question-text">
              {questions[currentQuestion].questionText}
            </div>
          </div>
          <div className="answer-section">
            {questions[currentQuestion].answerOptions.map(
              (answerOption, index) => (
                <button
                  key={index}
                  onClick={() =>
                    handleAnswerOptionClick(answerOption.isCorrect)
                  }
                >
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
