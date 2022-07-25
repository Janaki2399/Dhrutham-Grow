import { Question } from "../../context/data/data-context.types";

export type State = {
  currentQuestionIndex: number;
  score: number;
  numberOfCorrectAnswers: number;
  numberOfWrongAnswers: number;
};

export type ACTIONTYPE =
  | { type: "INCREMENT_QUESTION_NUMBER" }
  | { type: "CALCULATE_SCORE"; payload: { points: number } }
  | { type: "INCREMENT_CORRECT_ANSWER_COUNT" }
  | { type: "INCREMENT_WRONG_ANSWER_COUNT" };
