import React, { ReactNode } from "react";

export type ChildrenProps = {
  children: ReactNode;
};

export type State = {
  questions: Question[];
  currentQuestionIndex: number;
  score: Number;
  numberOfCorrectAnswers: Number;
  numberOfWrongAnswers: Number;
};

export type Question = {
  [key: number]: Question;
  topic: String;
  question: String;
  points: Number;
  level: String;
  options: Option[];
};

export type Option = {
  text: String;
  isRight: Boolean;
};

export type ACTIONTYPE = { type: "SET_GAME"; payload: Question[] };

export type ContextType = {
  state: State;
  dispatch: React.Dispatch<ACTIONTYPE>;
};
