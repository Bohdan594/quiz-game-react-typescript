import { createContext, useContext, useState } from 'react';

interface QuizState {
    gameStatus: "idle" | "fetching" | "ready"
};

const initialState : QuizState = {
    gameStatus: "idle"
};

const QuizContext = createContext<QuizState>(initialState);

export function QuizProvider({children} : {children: React.ReactElement}){
    const [state, setState] = useState(initialState);

    return (
        <QuizContext.Provider value={state}>
            {children}
        </QuizContext.Provider>
    );
};

export function useQuiz(){
    return useContext(QuizContext);
}

