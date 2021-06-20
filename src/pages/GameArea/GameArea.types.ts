import React from "react";
import { State, ACTIONTYPE } from "../../reducers/game/gameReducer.types";
import { Question } from "../../context/data/data-context.types";
export type Game = {
  _id: React.Key;
  game: {
    questions: Question[];
    totalScore: number;
  };
};

export type ErrorMessage = {
  success: boolean;
  errorMessage: string;
};

export type OptionItemProps = {
  key: React.Key;
  text: string;
  isRight: boolean;
  isSelected: boolean;
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
