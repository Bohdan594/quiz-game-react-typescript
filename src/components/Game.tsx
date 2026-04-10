import './Game.scss';
import AnswerOption from './AnswerOption.tsx';
import Result from './Result.tsx';
import { useQuiz } from '../QuizContext.tsx';
import {decode} from 'html-entities';
// @ts-ignore
import confetti from "https://cdn.skypack.dev/canvas-confetti";

function Game() {

    const {state, dispatch} = useQuiz();

    let wonAudio = new Audio('./sounds/won.wav');
    let lostAudio = new Audio('./sounds/lost.wav');

    const handleSubmit = () => {
        dispatch({type: "setStatus", payload: "answered"});
        if (state.userAnswer === state.question?.correct_answer) {
            dispatch({type: "setScore", payload: "correct"});
            wonAudio.play();
            confetti();
        } else {
            dispatch({type: "setScore", payload: "incorrect"});
            lostAudio.play();
        }
    }
    
    return (
        <>
            <div className="container game-screen">
                <h2>Question</h2>
                <h4>{decode(state.question?.question)}</h4>
                <div className="options">
                    {state.question?.incorrect_answers.map((answer) => {
                        return (
                            <AnswerOption key={answer} answer={answer} />
                        );
                    })}
                </div>

                {state.userAnswer && state.gameStatus != "answered" &&
                    <button onClick={handleSubmit}>Submit</button>
                }

                {state.gameStatus == "answered" &&
                    <>
                        <Result />
                        <button onClick={() => {dispatch({type: "setStatus", payload: "idle"})}}>Next Question</button>
                    </>   
                }
                
            </div>
            
        </>
    )
}

export default Game
