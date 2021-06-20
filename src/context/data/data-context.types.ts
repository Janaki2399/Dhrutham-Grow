import React, { ReactNode } from "react";

export type ContextType = {
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
  // [key: number]: Question;
  _id: string;
  topic: string;
  question: string;
  points: number;
  level: string;
  isAttempted: boolean;
  options: Option[];
};
export type Option = {
  text: string;
  isRight: boolean;
  isSelected: boolean;
};
export type ACTIONTYPE =
  | { type: "SET_DATA"; payload: { questions: Question[] } }
  | {
      type: "UPDATE_OPTION_STATE";
      payload: { optionIndex: number; questionIndex: number };
    };
