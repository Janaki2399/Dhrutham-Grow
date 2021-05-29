import React, { createContext, Reducer, useContext, useReducer } from "react";
import { dataReducer } from "./Reducer/dataReducer";
import { ChildrenProps, ContextType, Question } from "./game-context.types";

const GameContext = createContext<ContextType>({} as ContextType);

export const GameProvider = ({ children }: ChildrenProps) => {
  const [dataState, dataDispatch] = useReducer(dataReducer, {
    questions: [],
  });

  return (
    <GameContext.Provider value={{ dataState, dataDispatch }}>
      {children}
    </GameContext.Provider>
  );
};

export const useGameContext = () => {
  return useContext(GameContext);
};
