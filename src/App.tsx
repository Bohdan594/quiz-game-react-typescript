import { useEffect } from 'react';
import './App.scss';
import Loader from './components/FullPageLoader.tsx';
import Score from './components/Score.tsx';
import Game from './components/Game.tsx';
import { useQuiz, Question, QuestionsResponse } from './QuizContext.tsx';

function App() {

  const {state, dispatch} = useQuiz();
  //console.log(state);

  const shuffleArray = (arr: string[]): string[] => {
    const result = [...arr];
    for (let i = result.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [result[i], result[j]] = [result[j], result[i]];
    }
    return result;
  }

  async function fetchQuestion(){

    try{

      dispatch({type: "setStatus", payload: "fetching"});
      const response = await fetch('https://opentdb.com/api.php?amount=1&category=18');
      let data : QuestionsResponse = await(response.json());

      if(data.response_code === 0){

        let question : Question = {...data.results[0],
          incorrect_answers: shuffleArray([
            ...data.results[0].incorrect_answers,
            data.results[0].correct_answer
          ])
        };

        dispatch({type: "setStatus", payload: "ready"});
        dispatch({type: "setQuestion", payload: question});

      } else {
        dispatch({type: "setStatus", payload: "error"});
      }
    } catch (err) {
      console.error('error: ', err);
      dispatch({type: "setStatus", payload: "error"});
    }

  }

  useEffect(() => {
    if(state.gameStatus === 'idle'){
      fetchQuestion();
    }
  });

  return (
    <>
      {
        state.gameStatus === 'fetching' ?
          <Loader/> : state.gameStatus === 'error' ?
          <p>Error...</p> : state.gameStatus === 'ready' ?
          <>
            <Score />
            <Game />
          </> :
          null
      }
    </>
  )
}

export default App
