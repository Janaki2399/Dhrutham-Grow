import { ACTIONTYPE } from "../game/gameReducer.types";
import { gameReducer, initialState } from "./gameReducer";

describe("testing game reducer", () => {
  it("increments the question number", () => {
    const action: ACTIONTYPE = {
      type: "INCREMENT_QUESTION_NUMBER",
    };

    const state = gameReducer(initialState, action);

    expect(state).toEqual({
      currentQuestionIndex: 1,
      score: 0,
      numberOfCorrectAnswers: 0,
      numberOfWrongAnswers: 0,
    });
  });

  it("calculates score based on points", () => {
    const action: ACTIONTYPE = {
      type: "CALCULATE_SCORE",
      payload: { points: 5 },
    };

    const state = gameReducer(initialState, action);

    expect(state).toEqual({
      currentQuestionIndex: 0,
      score: 5,
      numberOfCorrectAnswers: 0,
      numberOfWrongAnswers: 0,
    });
  });

  it("increments correct answer count", () => {
    const action: ACTIONTYPE = {
      type: "INCREMENT_CORRECT_ANSWER_COUNT",
    };

    const state = gameReducer(initialState, action);

    expect(state).toEqual({
      currentQuestionIndex: 0,
      score: 0,
      numberOfCorrectAnswers: 1,
      numberOfWrongAnswers: 0,
    });
  });

  it("increments wrong answer count", () => {
    const action: ACTIONTYPE = {
      type: "INCREMENT_WRONG_ANSWER_COUNT",
    };

    const state = gameReducer(initialState, action);

    expect(state).toEqual({
      currentQuestionIndex: 0,
      score: 0,
      numberOfCorrectAnswers: 0,
      numberOfWrongAnswers: 1,
    });
  });
});
