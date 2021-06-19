import React, { createContext, Reducer, useContext, useReducer } from "react";
import { dataReducer } from "../../reducers/data/dataReducer";
import { ChildrenProps, ContextType, Question } from "./data-context.types";

const DataContext = createContext<ContextType>({} as ContextType);

export const DataProvider = ({ children }: ChildrenProps) => {
  const [dataState, dataDispatch] = useReducer(dataReducer, {
    questions: [],
  });

  return (
    <DataContext.Provider value={{ dataState, dataDispatch }}>
      {children}
    </DataContext.Provider>
  );
};

export const useGameContext = () => {
  return useContext(DataContext);
};
