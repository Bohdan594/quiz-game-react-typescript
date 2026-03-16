import './Game.scss';
import AnswerOption from './AnswerOption.tsx';
import Result from './Result.tsx';
import { useQuiz } from '../QuizContext.tsx';

function Game() {

    const {state} = useQuiz();
    
    return (
        <>
            <div className="container game-screen">
                <h2>Question</h2>
                <h4>{state.question?.question}</h4>
                <div className="options">
                    {state.question?.incorrect_answers.map((answer) => {
                        return (
                            <AnswerOption key={answer} answer={answer} />
                        );
                    })}
                </div>
               
                <button>Submit</button>
                
                <Result />
                
            </div>
            
        </>
    )
}

export default Game
