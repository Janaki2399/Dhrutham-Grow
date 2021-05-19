import React, { createContext, Reducer, useContext, useReducer } from "react";

import { useState } from "react";
import { dataReducer } from "./dataReducer";
import { ChildrenProps, ContextType, Question } from "./game-context.types";
const GameContext = createContext<ContextType | null>(null);

export function GameProvider({ children }: ChildrenProps) {
  //   const [questions, setQuestions] = useState<Question[] | null>(null);
  const [dataState, dataDispatch] = useReducer(dataReducer, {
    questions: [],
  });
  //   function setInitialQuestionState(questions: Question[]) {
  //     const initialState = questions?.map((item) => {
  //       return {
  //         ...item,
  //         options: item.options.map((item) => {
  //           return { ...item, isSelected: false };
  //         }),
  //       };
  //     });
  //     setQuestions(initialState);
  //   }
  //   function updateOptionState(
  //     questions: Question[],
  //     optionIndex: number,
  //     questionIndex: number
  //   ) {
  //     const updatedState = questions?.map((question, index) => {
  //       if (index === questionIndex) {
  //         return {
  //           ...question,
  //           options: question.options.map((option, index) => {
  //             if (index === (optionIndex as number)) {
  //               return { ...option, isSelected: true };
  //             }
  //             return { ...option, isSelected: false };
  //           }),
  //         };
  //       }
  //       return { ...question };
  //     });

  //     setQuestions(updatedState);
  //   }
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
