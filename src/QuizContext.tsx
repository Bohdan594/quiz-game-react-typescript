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

// Interfaces and types for STATUS

interface QuizContext {
    state: QuizState,
    dispatch: React.Dispatch<QuizAction>
}

type Status = "idle" | "fetching" | "ready" | "error";

interface QuizState {
    question: Question | null,
    gameStatus: Status
};

type QuizAction =
    | { type: "setStatus"; payload: Status }
    | { type: "setQuestion"; payload: Question }

const initialState : QuizState = {
    question: null,
    gameStatus: "idle"
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
    default:
      throw new Error("Unknown action");
  }
}