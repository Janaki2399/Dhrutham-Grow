import React, { ReactNode } from "react";

export type ChildrenProps = {
  children: ReactNode;
};

export type State = {
  questions: Question[];
  currentQuestionIndex: number;
  score: number;
  numberOfCorrectAnswers: number;
  numberOfWrongAnswers: number;
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
  | { type: "SET_GAME"; payload: Question[] }
  | { type: "INCREMENT_QUESTION_NUMBER" }
  | { type: "INCREMENT_SCORE"; payload: { points: number } }
  | { type: "INCREMENT_CORRECT_ANSWER_COUNT" }
  | { type: "INCREMENT_WRONG_ANSWER_COUNT" };

// export type ContextType = {
//   state: State;
//   dispatch: React.Dispatch<ACTIONTYPE>;
// };
