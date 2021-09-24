/* eslint-disable no-constant-condition */
// import { questions } from 'questions'
import API from '../config/api'
import {shuffle} from '../shared/utils'
export default function Questions() {
  const [apiQuestions, setApiQuestions] = React.useState({})

  React.useEffect(() => {
    const getQuestions = async () => {
      const res = await API.get('questions')
        .then(res => {
          //Randomize the Questions
          shuffle(res.data)
          console.log(res.data)
          //pick first 5 questions
          const FiveQuestion = res.data.slice(0, 5)
          console.log(FiveQuestion)

          //Randomize the choices
          for (let i = 0; i < FiveQuestion.length; i++) {
            shuffle(FiveQuestion[i].answerOptions)
          }

          console.log(FiveQuestion)
          setApiQuestions(FiveQuestion)

          // setApiQuestions(res.data)
          // console.log(apiQuestions)
        })
        .catch(error => alert(error))
      return res
    }
    getQuestions()
  }, [])

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
    if (nextQuestion < apiQuestions.length) {
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
          You scored {score} out of {apiQuestions.length}
        </div>
      ) : apiQuestions.length ? (
        <>
          <div className="question-section">
            <div className="question-count">
              <span>{currentQuestion + 1}</span>/{apiQuestions.length}
            </div>
            <div className="question-text">
              {apiQuestions[currentQuestion].questionText}
            </div>
          </div>
          <div className="answer-section">
            {apiQuestions[currentQuestion].answerOptions.map(
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
      ) : (
        <>
          <h1>Loading...</h1>
        </>
      )}
    </>
  )
}
