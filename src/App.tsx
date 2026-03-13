import { useEffect } from 'react';
import './App.scss';
import Score from './components/Score.tsx';
import Game from './components/Game.tsx';
import { useQuiz } from './QuizContext.tsx';

function App() {

  const {state, dispatch} = useQuiz();
  //console.log(state);

  async function fetchQuestion(){
    const response = await fetch('https://opentdb.com/api.php?amount=1&category=18');
    let data = await(response.json());
    let question = data.results[0];
    console.log(data);
  }

  useEffect(() => {
    if(state.gameStatus == 'idle'){
      fetchQuestion();
    }
  });

  return (
    <>
      <Score />
      <Game />
      <h2>Status: {state.gameStatus}</h2>
      <button onClick={() => {dispatch({type: "setStatus", payload: "fetching"})}}>Set Loading</button>
    </>
  )
}

export default App
