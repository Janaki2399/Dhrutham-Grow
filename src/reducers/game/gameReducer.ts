import { State } from "./gameReducer.types";
import { ACTIONTYPE } from "./gameReducer.types";

export function gameReducer(state: State, action: ACTIONTYPE): State {
  switch (action.type) {
    case "INCREMENT_QUESTION_NUMBER":
      return {
        ...state,
        currentQuestionIndex: state.currentQuestionIndex + 1,
      };
    case "INCREMENT_SCORE":
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
