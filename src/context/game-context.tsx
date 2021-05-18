import React, { createContext, Reducer, useContext, useReducer } from "react";
import { gameReducer } from "./gameReducer";
import { ChildrenProps, ContextType, State } from "./GameReducer.types";
const GameContext = createContext<ContextType | null>(null);

export function GameProvider({ children }: ChildrenProps) {
  const [state, dispatch] = useReducer(gameReducer, {
    questions: [],
    currentQuestionIndex: 0,
    score: 0,
    numberOfCorrectAnswers: 0,
    numberOfWrongAnswers: 0,
  });

  return (
    <GameContext.Provider
      value={{
        state,
        dispatch,
      }}
    >
      {children}
    </GameContext.Provider>
  );
}

export function useGameContext() {
  const data = useContext(GameContext);
  return data!;
}
