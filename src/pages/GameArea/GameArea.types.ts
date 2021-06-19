import React from "react";
import { State, ACTIONTYPE } from "../../reducers/game/gameReducer.types";
import { Question } from "../../context/data/data-context.types";
export type Game = {
  _id: React.Key;
  game: {
    questions: Question[];
    totalScore: Number;
  };
};

export type ErrorMessage = {
  success: Boolean;
  errorMessage: String;
};

export type OptionItemProps = {
  text: String;
  isRight: Boolean;
  isSelected: Boolean;
  index: number;
  currentQuestionIndex: number;
  dispatch: React.Dispatch<ACTIONTYPE>;
  swipeToNextQuestion: () => void;
};

export type OptionsProps = {
  state: State;
  dispatch: React.Dispatch<ACTIONTYPE>;
  swipeToNextQuestion: () => void;
};

export type HeaderProps = {
  score: number;
  currentQuestionIndex: number;
};

export type SkipButtonProps = {
  swipeToNextQuestion: () => void;
  navigateToScorePage: () => void;
  currentQuestionIndex: number;
};

export type QuestionProps = {
  currentQuestionIndex: number;
};
