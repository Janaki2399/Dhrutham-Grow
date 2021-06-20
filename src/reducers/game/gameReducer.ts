import { State } from "./gameReducer.types";
import { ACTIONTYPE } from "./gameReducer.types";

export const initialState: State = {
  currentQuestionIndex: 0,
  score: 0,
  numberOfCorrectAnswers: 0,
  numberOfWrongAnswers: 0,
};

export function gameReducer(state: State, action: ACTIONTYPE): State {
  switch (action.type) {
    case "INCREMENT_QUESTION_NUMBER":
      return {
        ...state,
        currentQuestionIndex: state.currentQuestionIndex + 1,
      };
    case "CALCULATE_SCORE":
      return {
        ...state,
        score: state.score + action.payload.points,
      };
    case "INCREMENT_CORRECT_ANSWER_COUNT":
      return {
        ...state,
        numberOfCorrectAnswers: state.numberOfCorrectAnswers + 1,
      };
    case "INCREMENT_WRONG_ANSWER_COUNT":
      return {
        ...state,
        numberOfWrongAnswers: state.numberOfWrongAnswers + 1,
      };
    default:
      return state;
  }
}
