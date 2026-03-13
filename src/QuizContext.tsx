import { createContext, useContext, useReducer } from 'react';

// Interfaces and types for states

interface QuizContext {
    state: QuizState,
    dispatch: React.Dispatch<QuizAction>
}

type Status = "idle" | "fetching" | "ready";

interface QuizState {
    gameStatus: Status
};

// Interfaces and types for actions

type QuizAction =
    { type: "setStatus"; payload: Status }

// States

const initialState : QuizState = {
    gameStatus: "idle"
};

// Contexts for states

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
    case "setStatus":
      return {...state, gameStatus: action.payload};
    default:
      throw new Error("Unknown action");
  }
}