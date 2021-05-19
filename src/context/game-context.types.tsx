import React, { ReactNode } from "react";

export type ContextType = {
  //   questions: Question[] | null;
  //   setQuestions: React.Dispatch<React.SetStateAction<Question[] | null>>;
  dataState: State;
  dataDispatch: React.Dispatch<ACTIONTYPE>;
};
export type State = {
  questions: Question[];
};
export type ChildrenProps = {
  children: ReactNode;
};
export type Question = {
  [key: number]: Question;
  topic: String;
  question: String;
  points: number;
  level: String;
  options: Option[];
};
export type Option = {
  text: String;
  isRight: Boolean;
  isSelected: Boolean;
};
export type ACTIONTYPE =
  | { type: "SET_DATA"; payload: Question[] }
  | {
      type: "UPDATE_OPTION_STATE";
      payload: { optionIndex: number; questionIndex: number };
    };