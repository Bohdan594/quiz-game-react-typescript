import './AnswerOption.scss';
import {decode} from 'html-entities';
import { useQuiz } from '../QuizContext';


function AnswerOption({answer}: {answer : string}) {

    const {state, dispatch} = useQuiz();

    return (
        <>  
            {
                answer &&
                <div className="answer-option">
                    <p className={`
                        ${state.userAnswer === answer ? "selected" : ""}
                        ${state.gameStatus === 'answered' && state.question?.correct_answer === answer ? "correct" : ""}
                    `}
                    onClick={() => {dispatch({type: "setUserAnswer", payload: answer})}}> 
                       {decode(answer)}
                    </p>
                </div>
            }
            
        </>
    )
}

export default AnswerOption
