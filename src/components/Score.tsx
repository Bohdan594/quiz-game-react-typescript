import './Score.scss';
import { useQuiz } from '../QuizContext.tsx';

function Score() {

    const {state} = useQuiz();

    return (
        <>  
            <div className="score">
                <div>
                    <small>Correct</small>
                    <span className="point">{state.score.correct}</span>
                    <span>X</span>
                    <span className="point">{state.score.incorrect}</span>
                    <small>Incorrect</small>
                </div>
            </div>
            
        </>
    )
}

export default Score
