import React, { createContext, useContext, useReducer } from "react";
import { dataReducer } from "../../reducers/data/dataReducer";
import { ChildrenProps, ContextType } from "./data-context.types";

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
