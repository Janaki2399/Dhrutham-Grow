import React, { createContext, Reducer, useContext, useReducer } from "react";
import { dataReducer } from "./Reducer/dataReducer";
import { ChildrenProps, ContextType, Question } from "./game-context.types";

const GameContext = createContext<ContextType | null>(null);

export function GameProvider({ children }: ChildrenProps) {
  const [dataState, dataDispatch] = useReducer(dataReducer, {
    questions: [],
  });

  return (
    <GameContext.Provider value={{ dataState, dataDispatch }}>
      {children}
    </GameContext.Provider>
  );
}

export function useGameContext() {
  const data = useContext(GameContext);
  return data!;
}
