import { createContext, useContext, useReducer } from 'react';

// Interfaces and types for QUESTION

type QuestionType = "multiple" | "boolean";

type Difficulty = "easy" | "medium" | "hard";

export interface Question {
  type: QuestionType;
  difficulty: Difficulty;
  category: string;
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
}

export interface QuestionsResponse {
  response_code: number;
  results: Question[];
}

interface Score {
  correct: number, 
  incorrect: number
}

// Interfaces and types for ALL

type Status = "idle" | "fetching" | "ready" | "error" | "answered";

interface QuizState {
    question: Question | null,
    gameStatus: Status,
    userAnswer: string | null,
    score: Score,
    effects: boolean
};

const initialState : QuizState = {
    question: null,
    gameStatus: "idle",
    userAnswer: null,
    score: {correct: 0, incorrect: 0},
    effects: false
};

type QuizAction =
    | { type: "setStatus"; payload: Status }
    | { type: "setQuestion"; payload: Question }
    | { type: "setUserAnswer"; payload: string | null }
    | { type: "setScore"; payload: "correct" | "incorrect" }
    | { type: "setEffects"; payload: boolean }

interface QuizContext {
    state: QuizState,
    dispatch: React.Dispatch<QuizAction>
};

const QuizContext = createContext<QuizContext>({
    state: initialState,
    dispatch: () => null
});

// Provider

export function QuizProvider({children} : {children: React.ReactNode}){

    const [state, dispatch] = useReducer(QuizReducer, initialState);

    return (
        <QuizContext.Provider value={{state, dispatch}}>
            {children}
        </QuizContext.Provider>
    );
    
};

// Exporting the states

export function useQuiz(){
    return useContext(QuizContext);
}

// Reducers

function QuizReducer(state: QuizState, action: QuizAction): QuizState {
  switch (action.type) {
    case "setQuestion":
      return {...state, question: action.payload};
    case "setStatus":
      return {...state, gameStatus: action.payload};
    case "setUserAnswer":
      return {...state, userAnswer: action.payload};
    case "setScore":
      let score = state.score;
      score[action.payload] += 1;
      return {...state, score: score};
    case "setEffects":
      return {...state, effects: action.payload};
    default:
      throw new Error("Unknown action");
  }
}